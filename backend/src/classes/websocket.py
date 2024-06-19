import asyncio
import json

import tensorflow as tf
from fastapi import WebSocket


class WebSocketLogger(tf.keras.callbacks.Callback):  # type: ignore
	def __init__(self, websocket: WebSocket):
		super().__init__()
		self.websocket = websocket

	def on_train_begin(self, logs=None):
		asyncio.run(
			self.websocket.send_text(
				json.dumps(
					{
						"message": "Treinamento iniciado",
					}
				)
			)
		)

	def on_epoch_begin(self, epoch, logs=None):
		asyncio.run(
			self.websocket.send_text(
				json.dumps(
					{
						"message": f"Iniciando época {epoch}",
					}
				)
			)
		)

	def on_epoch_end(self, epoch, logs=None):
		logs = logs or {}
		message = {
			"message": f"Época {epoch} finalizada. Atualmente com {logs.get('accuracy', 0) * 100:.2f}% de precisão com uma perda de {logs.get('loss', 0):.2f}.",
		}
		asyncio.run(self.websocket.send_text(json.dumps(message)))

	def on_train_end(self, logs=None):
		asyncio.run(
			self.websocket.send_text(
				json.dumps(
					{
						"message": "Treinamento finalizado",
					}
				)
			)
		)

		asyncio.run(self.websocket.close())
