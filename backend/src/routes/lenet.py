import threading
from pathlib import Path

import numpy as np
from classes.lenet import LeNetCNN
from fastapi import APIRouter, UploadFile, WebSocket
from fastapi.responses import FileResponse, JSONResponse
from PIL import Image
from schemas.error import Error
from schemas.prediction import Prediction
from schemas.test import Test

router = APIRouter(
	prefix="/lenet",
	tags=["LeNet-5 CNN"],
)
model = LeNetCNN(
	path="models/lenet.h5",
)


@router.post(
	path="/predict",
	response_model=Prediction,
	responses={
		500: {
			"description": "Internal Server Error",
			"model": Error,
		},
	},
)
async def predict(file: UploadFile):
	try:
		img = Image.open(file.file)

		img = (
			np.array(
				img.resize(
					(28, 28),
				).convert("L")
			)
			/ 255.0
		).reshape(1, 28, 28, 1)

		return model.predict(img)
	except Exception as e:
		return JSONResponse(
			status_code=500,
			content={
				"error": str(e),
			},
		)


@router.get(
	path="/test",
	response_model=Test,
	responses={
		500: {
			"description": "Internal Server Error",
			"model": Error,
		},
	},
)
async def test():
	try:
		return model.test()
	except Exception as e:
		return JSONResponse(
			status_code=500,
			content={
				"error": str(e),
			},
		)


@router.get(
	path="/download",
	response_class=FileResponse,
	responses={
		500: {
			"description": "Internal Server Error",
			"model": Error,
		},
	},
)
async def download():
	try:
		return FileResponse(
			path=Path("models/lenet.h5"),
			media_type="application/octet-stream",
			filename="lenet.h5",
		)
	except Exception as e:
		return JSONResponse(
			status_code=500,
			content={
				"error": str(e),
			},
		)


@router.get(
	path="/save",
	response_class=JSONResponse,
	responses={
		500: {
			"description": "Internal Server Error",
			"model": Error,
		},
	},
)
async def save():
	try:
		model.save()
		return JSONResponse(
			content={
				"message": "Model saved successfully",
			},
		)
	except Exception as e:
		return JSONResponse(
			status_code=500,
			content={
				"error": str(e),
			},
		)


@router.websocket("/train")
async def train(websocket: WebSocket):
	await websocket.accept()

	while True:
		try:
			json = await websocket.receive_json()

			threading.Thread(
				target=model.train,
				kwargs={
					"autosave": False,
					"websocket": websocket,
					"epochs": json["epochs"],
				},
			).start()
		except Exception:
			break
