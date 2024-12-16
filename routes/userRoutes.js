const express = require('express');
const routerUser = express.Router();
// const {authentication} = require("../middleware/authentication")
const multer = require("../middleware/multer.middleware.js")

const userModel = require("../models/userSchema.js")

//authentication,
routerUser.get('/', (req, res) => {
    res.status(200).send("User route is working!");
  });
  
  
routerUser.post('/user',multer.uploadCustomer ,async(req,res)=>{
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
module.exports= routerUser;