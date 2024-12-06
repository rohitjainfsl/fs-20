import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { startServer } from "./db/connection.js";
import bookRouter from "./routes/bookRoutes.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:5174" })); //whitelisting this particular IP // * allow all IPs

app.use(express.urlencoded({ extended: true })); //to accept req which have data in their body
app.use(express.json()); // to check whether that data is in JSON format

app.use("/api", bookRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

await startServer();
app.listen(port, () => console.log("Server started at port " + port));
