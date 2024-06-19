import base64
from io import BytesIO
from pathlib import Path
from time import time
from typing import Any

import numpy as np
from classes.dataset import Dataset
from classes.websocket import WebSocketLogger
from fastapi import WebSocket
from keras.src.layers import Conv2D, Dense, Flatten, MaxPooling2D
from keras.src.models import Sequential
from keras.src.optimizers import Adam
from PIL import Image
from schemas.prediction import Prediction
from schemas.test import Test
from tensorflow.keras.models import load_model  # type: ignore


class LeNetCNN:
	def __init__(self, path: str | Path | None = None) -> None:
		"""
		Initialize the LeNetCNN class by creating an instance of the Dataset class, a Sequential model, and an Adam
		"""
		self.dataset = Dataset()

		self.built = False
		self.compiled = False

		if isinstance(path, str):
			path = Path(path)

		if path and path.exists():
			self.load(path)
			return

		self.model = self.build()

		self.compile()

	def summary(self) -> None:
		"""
		Print the model summary
		"""

		self.model.summary()

	def build(self) -> Sequential:
		"""
		Build the model

		Returns:
		Sequential: The built model
		"""

		model = Sequential(
			[
				Conv2D(
					filters=32,
					kernel_size=(5, 5),
					padding="same",
					activation="relu",
					input_shape=(28, 28, 1),
				),
				MaxPooling2D(
					strides=2,
				),
				Conv2D(
					filters=48,
					kernel_size=(5, 5),
					padding="valid",
					activation="relu",
				),
				MaxPooling2D(
					strides=2,
				),
				Flatten(),
				Dense(
					units=256,
					activation="relu",
				),
				Dense(
					units=84,
					activation="relu",
				),
				Dense(
					units=10,
					activation="softmax",
				),
			]
		)

		model.build()

		self.built = True

		return model

	def compile(self) -> None:
		"""
		Compile the model
		"""

		self.model.compile(
			loss="categorical_crossentropy",
			metrics=["accuracy"],
			optimizer=Adam(),  # type: ignore
		)

		self.compiled = True

	def train(
		self,
		autosave: bool = True,
		websocket: WebSocket | None = None,
		epochs: int = 10,
	) -> tuple[Any, float]:
		"""
		Train the model for x epochs and return the history and the time taken

		Returns:
		tuple[Any, float]: The history and the time taken
		"""
		start = time()

		callbacks = []
		if websocket:
			callbacks.append(WebSocketLogger(websocket))

		if not self.built:
			self.model = self.build()

		if not self.compiled:
			self.compile()

		history = self.model.fit(
			self.dataset.x_train,
			self.dataset.y_train,
			epochs=epochs,
			validation_split=0.2,
			callbacks=callbacks,
		)

		if autosave:
			self.save()

		return history, time() - start

	def test(self) -> Test:
		"""
		Evaluate the model on the test dataset

		Returns:
		Test: The test results, an object that contains the loss and accuracy (keys: loss, accuracy)
		"""

		loss, acc = self.model.evaluate(self.dataset.x_test, self.dataset.y_test)

		return Test(
			loss=loss,
			accuracy=acc,
		)

	def save(self, path: str | Path = Path("models/lenet.h5")) -> None:
		"""
		Save the model to the given path

		Args:
		path (Path | str): The path to save the model to
		"""

		if isinstance(path, str):
			path = Path(path)

		if not path.parent.exists():
			path.parent.mkdir(parents=True)

		self.model.save(str(path))

	def load(self, path: str | Path = Path("models/lenet.h5")) -> None:
		"""
		Load the model from the given path

		Args:
		path (Path | str): The path to load the model from
		"""
		if isinstance(path, str):
			path = Path(path)

		if not path.exists():
			raise FileNotFoundError(f"Model file not found: {path}")

		self.model = load_model(path)

	def predict(self, x: np.ndarray[Any, np.dtype[np.floating[Any]]]) -> Prediction:
		"""
		Predict the class of the given input

		Args:
		x (np.ndarray): The input to predict the class of

		Returns:
		Prediction: The prediction, an object that contains the predicted integer, the probability, and the time taken (keys: prediction, probability, time)
		"""

		start = time()
		prediction = self.model.predict(x)
		end = time()

		input_png = Image.fromarray(
			(x.reshape(28, 28) * 255).astype(np.uint8),
		)

		buffer = BytesIO()
		input_png.save(buffer, format="PNG")
		buffer.seek(0)

		return Prediction(
			prediction=int(np.argmax(prediction)),
			probability=float(np.max(prediction)),
			input=base64.b64encode(
				buffer.read(),
			).decode("utf-8"),
			time=end - start,
		)
