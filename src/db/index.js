import mongoose from "mongoose";
import dotenv from "dotenv"
import DB_NAME from "../constant.js";
dotenv.config()

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB Connected !! DB HOST:  ${connectionInstance.connection.host}`);//check the host where we connected
    } catch (error) {
        console.log("MONGODB Connection Error", error);
        process.exit(1) //it is build in function in nodejs
    }
}

export default connectDB