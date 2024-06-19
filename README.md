# DashboardMNIST

Este projeto é um dashboard que permite a utilização de dois modelos treinados para a classificação de dígitos manuscritos. Os modelos foram treinados utilizando a base de dados MNIST. O dashboard foi desenvolvido em Next.js e o backend em FastAPI. Este projeto foi desenvolvido como atividade ponderada da faculdade INTELI.

## Instalação

O backend vem com uma versão compilada do frontend, então não é necessário instalar e nem rodar o frontend separadamente. Para instalar o projeto, siga os passos abaixo:

1. Clone o repositório

```bash
git clone https://github.com/GustavoWidman/DashboardMNIST.git
```

2. Entre na pasta do projeto

```bash
cd DashboardMNIST/backend
```

3. Crie um ambiente virtual e instale as dependências

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

4. Rode o servidor

```bash
python3 src/main.py
```

5. Acesse o dashboard em <http://localhost:8000> ou a documentação da API em <http://localhost:8000/docs>

## Demonstração

A seguir, uma demonstração do dashboard:

[Dashboard MNIST Demo.webm](https://github.com/GustavoWidman/DashboardMNIST/assets/123963822/47fe112d-d099-4ea4-ae8a-382f32187b6c)

## Sobre o dashboard

O dashboard possui duas páginas, a página de classificação e a página de treinamento. Na página de classificação, o usuário pode fazer o upload de uma imagem e escolher qual modelo deseja utilizar para classificar a imagem. O usuário pode escolher entre o modelo convolucional e o modelo linear. Após a classificação, o usuário pode ver a imagem classificada da maneira que o modelo a interpretou, além de ver a probabilidade de cada classe, o tempo de execução e o resultado com a maior probabilidade. Na página de treinamento, o usuário pode re-treinar os modelos, escolhendo a quantidade de épocas e o modelo que deseja retreinar, acompanhando o progresso do treinamento em tempo real por meio da utilização de uma web socket que fornecerá informações sobre o treinamento e preencherá um 'terminal' com as informações. Na página de treinamento, o usuário pode baixar os pesos dos modelos treinados após o treinamento.

## Sobres os modelos

Foram desenvolvidos dois modelos, um utilizando uma rede neural convolucional e outro utilizando uma rede neural linear. O modelo convolucional obteve uma acurácia de 99.14% e o modelo linear obteve uma acurácia de 97.93%. Ambos os modelos foram treinados utilizando a base de dados MNIST em 10 épocas. O repositório possui os pesos dos modelos treinados, que podem ser encontrados na pasta [backend/src/models](backend/src/models), nos arquivos `lenet.h5` e `linear.h5` respectivamente.

## Dependências do backend

- [Python](https://www.python.org/) 3.11.9
  - [FastAPI](https://fastapi.tiangolo.com/) 0.111.0
  - [Keras](https://keras.io/) 3.3.3
  - [TensorFlow](https://www.tensorflow.org/) 2.16.1
  - [Numpy](https://numpy.org/) 1.26.4

Consultar [requirements.txt](backend/requirements.txt) para mais informações.

## Dependências do frontend

- [Bun](https://bun.sh) 1.1.13 e [Next.js](https://nextjs.org/) 14.2.4
  - [React](https://reactjs.org/) ^18.0.0
  - [Tailwind CSS](https://tailwindcss.com/) 3.4.1
  - [Zod](https://zod.dev) 3.23.8
  - [Sonner](https://sonner.dev) 1.5.0
  - [Input OTP](https://www.npmjs.com/package/input-otp) 1.2.4
  - [Lucide React](https://www.npmjs.com/package/lucide-react) 0.394.0
  - [Class Variance Authority](https://www.npmjs.com/package/class-variance-authority) 0.7.0
  - [Clsx](https://www.npmjs.com/package/clsx) 2.1.1
  - [Tailwind Merge](https://www.npmjs.com/package/tailwind-merge) 2.3.0
  - [Tailwind CSS Animate](https://www.npmjs.com/package/tailwindcss-animate) 1.0.7
  - [Next Themes](https://www.npmjs.com/package/next-themes) 0.3.0
  - [Radix UI](https://www.radix-ui.com/) 1.0.5
  - [React Hook Form](https://react-hook-form.com/) 7.51.5
  - [React Dropzone](https://react-dropzone.js.org/) 14.2.3
  - [Typescript](https://www.typescriptlang.org/) ^5.0.0
  - [Eslint](https://eslint.org/) ^8.0.0
  - [Tailwind CSS](https://tailwindcss.com/) ^3.4.1

Consultar [package.json](frontend/package.json) para mais informações.

## Licença

Este projeto é licenciado sob a licença Creative Commons Zero v1.0 Universal. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
