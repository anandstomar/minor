const express = require('express');
const routerD = express.Router();
// const {authentication} = require("../middleware/authentication")
const multer = require("../middleware/multer.middleware.js")

const userModel = require("../models/diabetesSchema.js")

//authentication,
routerD.get('/diabetes', (req, res) => {
    res.status(200).send("diabetes route is working!");
  });
  
  
routerD.post('/checkup', async(req,res)=>{
    try{
        console.log("user")
        const {  pregnacies,
            glucose,
            bloodPressure,
            skinThickness,
            insulin,
            bmi,
            age,
            diabetesPedigreFunction }=req.body;


    if (!pregnacies || !glucose || !bloodPressure || !bmi || !age) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

        const saveUser = await userModel.create({
            pregnacies:pregnacies,
            glucose: glucose,
            bloodPressure: bloodPressure,
            skinThickness: skinThickness,
            insulin: insulin,
            bmi: bmi,
            age: age,
            diabetesPedigreFunction: diabetesPedigreFunction  
        })
        console.log(saveUser)
        res.status(200).json(saveUser)
    }catch(error){
        console.log(error)
    }
})
module.exports= routerD;