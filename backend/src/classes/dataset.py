from keras.src.datasets import mnist
from keras.src.utils import to_categorical


class Dataset:
	_instance = None

	def __new__(cls):
		if cls._instance is None:
			cls._instance = super(Dataset, cls).__new__(cls)
		return cls._instance

	def __init__(self):
		(x_train, y_train), (x_test, y_test) = mnist.load_data(path="mnist.npz")

		self.x_train = x_train / x_train.max()
		self.x_test = x_test / x_test.max()

		self.y_train = to_categorical(y_train)
		self.y_test = to_categorical(y_test)
