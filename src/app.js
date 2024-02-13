import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({ limit: "16kb" }))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))
//for nested object

app.use(express.static("public"))
//we ned to store file for publilc assets

app.use(cookieParser())


//routes declaration
app.use("/api/v1/users", userRouter)

// http://localhost:8000
export { app }