require('dotenv').config();
const { ethers } = require('ethers');
const express = require('express');
const routerB = express.Router();

const PRIVATE_KEY = '3ee37d322c95fa45bbbd05e031e9b80019b3f4f40ec6fb438444bb2c37672d63'
const PROVIDER_URL = 'https://ethereum-sepolia-rpc.publicnode.com'
const CONTRACT_ADDRESS = '0x5e17b14ADd6c386305A32928F985b29bbA34Eff5'

// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const PROVIDER_URL = process.env.PROVIDER_URL;
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = require('../constant/diabetes.json'); 

const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);


routerB.post('/store-data', async (req, res) => {
    try {
        const dataArray = req.body;
        console.log('Received data:', dataArray);
        for (const data of dataArray) {
            if (!data.Pregnacies || !data.Glucose || !data.BloodPressure || !data.SkinThickness || !data.Insulin || !data.BMI || !data.Age || !data.diabetesPedigreFunction) {
                console.log("Missing data fields");
                return res.status(400).json({ error: 'Missing data fields' });
            }
         }         

        //   let scaledDiabetesPedigreeFunction = ethers.utils.parseUnits(data.diabetesPedigreeFunction.toString(), 18);
        const tx = await contract.storeDiabetesData(
            dataArray.pregnacies,          
            dataArray.glucose,
            dataArray.bloodPressure,
            dataArray.skinThickness,
            dataArray.insulin,
            dataArray.skinThickness,
            dataArray.bmi,
            dataArray.skinThickness,
            dataArray.age,
            dataArray.skinThickness,
            dataArray.diabetesPedigreeFunction
        );

        console.log("Transaction sent! Waiting for confirmation...");
        await tx.wait(); 

        console.log("Data stored successfully on blockchain:", tx.hash);

   
        // const index = await contract.getRecordCount(); 
        // const storedData = await getStoredData(index - 1); 

        res.status(200).json({
            message: 'Data stored successfully',
            transactionHash: tx.hash,
            storedData
        });

    } catch (error) {
        console.error('Error storing data to blockchain:', error);
        res.status(500).json({ error: 'Failed to store data on blockchain' });
    }
});


// async function getStoredData(index) {
//     try {
//         const record = await contract.getRecord(index);
//         console.log(`Record ${index}:`, {
//             pregnacies: record.pregnacies.toString(),
//             glucose: record.glucose.toString(),
//             bloodPressure: record.bloodPressure.toString(),
//             skinThickness: record.skinThickness.toString(),
//             insulin: record.insulin.toString(),
//             bmi: record.bmi.toString(),
//             age: record.age.toString(),
//             diabetesPedigreeFunction: record.diabetesPedigreeFunction.toString(),
//         });
//         return {
//             pregnacies: record.pregnacies.toString(),
//             glucose: record.glucose.toString(),
//             bloodPressure: record.bloodPressure.toString(),
//             skinThickness: record.skinThickness.toString(),
//             insulin: record.insulin.toString(),
//             bmi: record.bmi.toString(),
//             age: record.age.toString(),
//             diabetesPedigreeFunction: record.diabetesPedigreeFunction.toString(),
//         };
//     } catch (error) {
//         console.error("Error fetching data from blockchain:", error);
//         throw new Error("Error fetching data from blockchain");
//     }
// }

module.exports = routerB;


// routerB.post('/store-data', async (req, res) => {
//     try {
//         const data = req.body;

//         console.log('Received data:', data);

//         const tx = await contract.storeDiabetesData(
//             data.Pregnacies,
//             data.Glucose,
//             data.BloodPressure,
//             data.SkinThickness,
//             data.Insulin,
//             data.BMI,
//             data.Age,
//             data.DiabetesPedigreFunction
//         );

//         console.log("Transaction sent! Waiting for confirmation...");
//         await tx.wait();

//         console.log("Data stored successfully on blockchain:", tx.hash);

//         res.status(200)
//         .json({ message: 'Data stored successfully', transactionHash: tx.hash });

//         const index = await contract.getRecordCount(); 
//         const storedData = await getStoredData(index - 1);

//        } catch (error) {
//         console.error('Error storing data to blockchain:', error);
//         res.status(500).json({ error: 'Failed to store data on blockchain' });
//        }

//     //   const storedData = await contract.getDiabetesData(index); 
//     //   console.log("Stored Data:", storedData);
      
//       async function getStoredData(index) {
//           try {
//               const record = await contract.getRecord(index); 
//               console.log(`Record ${index}:`, {
//                   Pregnacies: record.Pregnacies.toString(),
//                   Glucose: record.Glucose.toString(),
//                   BloodPressure: record.BloodPressure.toString(),
//                   SkinThickness: record.SkinThickness.toString(),
//                   Insulin: record.Insulin.toString(),
//                   BMI: record.BMI.toString(),
//                   Age: record.Age.toString(),
//                   DiabetesPedigreFunction: record.DiabetesPedigreFunction.toString(),
//               });
//           } catch (error) {
//               console.error("Error fetching data from blockchain:", error);
//           }
//       }
      
//       async function fetchAllRecords() {
//           try {
//               const count = await contract.getRecordCount();
//               console.log(`Total records: ${count}`);
//               for (let i = 0; i < count; i++) {
//                   await getStoredData(i);
//               }
//           } catch (error) {
//               console.error("Error fetching all records:", error);
//           }
//       }
      
//       fetchAllRecords();
// })

// module.exports=routerB;


