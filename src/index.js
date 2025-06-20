// require('dotenv').config({path:'/env'})
// import { app } from "./app.js"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js";


const app = express()

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



app.use("/api/v1/users",userRouter)


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));




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

export { app }

































// import express from "express"
// const app= express()

// ( async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("error",error);
//             throw error
//         })
        
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("error",error)
//         throw err
        
//     }
// })()
