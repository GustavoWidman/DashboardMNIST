from pydantic import BaseModel


class Test(BaseModel):
	accuracy: float
	loss: float
