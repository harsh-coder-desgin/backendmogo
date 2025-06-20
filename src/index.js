// require('dotenv').config({path:'/env'})
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
import dotenv from "dotenv"
import connectDB from "./db/index.js";

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

dotenv.config({
    path:'./.env'
}) 

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is runing at port : ${process.env.PORT}`);
    })
    app.on("error",(error)=>{
            console.log("error",error);
            throw error
        })
})
.catch((err)=>{
    console.log("mongo db connection failed",err)
})

import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users",userRouter)
