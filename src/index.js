import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import userRouter from "./routes/user.routes.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "https://frontendmogodb.vercel.app",
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/v1/users", userRouter);

// Connect DB (once per cold start)
connectDB();

// ✅ Export app instead of listening
export default app;
