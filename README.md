# TensorFlow.js Image Recognition via Webcam

This project is a real-time image recognition application using TensorFlow.js with a live webcam feed. It utilizes a pre-trained MobileNet model for image classification and a KNN classifier to dynamically learn from the webcam input.

## Features

- **Real-time Image Recognition**: Classifies images from the webcam in real-time.
- **Interactive Learning**: Allows users to add new classifications on-the-fly.
- **TensorFlow.js Integration**: Leverages the power of TensorFlow.js for in-browser machine learning.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js
- npm or Yarn

### Installation

1. #### Clone the repository:
```bash
git clone https://github.com/your-username/your-repo-name.git
```
2. #### Navigate to the project directory:
```bash
cd image-IA
```

3. #### Install the dependencies:
```bash
npm install
```
OR

```bash
yarn install
```

4. #### To start the application, run:
```bash
npm start
```
OR

```bash
yarn start
```

### Built With

- [React](https://reactjs.org/) - The web framework used for building the user interface.
- [TensorFlow.js](https://www.tensorflow.org/js) - JavaScript library for training and deploying machine learning models in the browser.
- [MobileNet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet) - A pre-trained model for efficient image classification.
- [KNN Classifier](https://github.com/tensorflow/tfjs-models/tree/master/knn-classifier) - A dynamic learning classifier that allows for real-time training with new data.


### Extras

- **Customizable Training**: The application is designed to be flexible. Feel free to choose and train it according to your image needs. You can easily change the classes in the `knnClassifier` to suit different types of image recognition tasks. This feature allows you to experiment with various classifications and see how the model performs with different types of data.

- **Interactive Learning**: Users can dynamically add new categories or examples to the classifier in real-time. This makes the app not only a tool for image recognition but also an interactive platform for understanding and exploring machine learning concepts.
