const mongoose = require("mongoose");
const express = require("express");

const cors = require("cors");
require("dotenv").config(); 

const UserRoutes = require("../routes/userRoutes"); 
const app = express();
const MONGODB_URL = 'mongodb+srv://Ananddb:Anand2003@cluster0.hhg4k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(cors());
app.use(express.json());

app.use("/user", UserRoutes);

const PORT = 3000;

mongoose.connect(MONGODB_URL, {
    })
    .then(() => {
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        setTimeout(() => process.exit(1), 1000); 
    });


process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
    process.exit(1);
});

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});
