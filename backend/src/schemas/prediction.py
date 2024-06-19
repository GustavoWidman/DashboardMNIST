from pydantic import BaseModel


class Prediction(BaseModel):
	prediction: int
	probability: float
	input: str
	time: float
