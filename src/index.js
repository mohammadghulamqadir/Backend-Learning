import mongoose from "mongoose";
import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";
dotenv.config()


connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("Error:", error);
            throw error
        })

        app.listen(process.env.PORT || 9000, () => {
            console.log(`Server is running at PORT: ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGODB Connection failed");
    })








/**
 * 
import express from "express";

const app = express()


function connectDB() { }


(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("Error:", error);
            throw error
        })
        
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on Port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error", error);
    }
})()
*/