// const express = require('express');
// const bodyParser = require('body-parser');
// const tf = require('@tensorflow/tfjs-node');

// const app = express();
// const PORT = 3000;

// app.use(bodyParser.json());

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// Load the TensorFlow.js model
// let model;
// async function loadModel() {
//     model = await tf.loadLayersModel('file://path_to_model/model.json');
//     console.log("Model loaded successfully");
// }
// loadModel();

// // Define a prediction endpoint
// app.post('/predict', async (req, res) => {
//     try {
//         const { features } = req.body;

//         // Convert input features to a Tensor
//         const inputTensor = tf.tensor2d(features, [1, features.length]); // Adjust shape as needed

//         // Make prediction
//         const prediction = model.predict(inputTensor);

//         // Extract data from Tensor
//         const result = prediction.dataSync(); // Convert tensor to array

//         res.json({ prediction: Array.from(result) });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error during prediction" });
//     }
// });



