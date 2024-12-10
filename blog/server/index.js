import express from "express";
import "dotenv/config";
import cors from "cors";
import { startServer } from "./db/connection.js";
import blogRouter from "./routes/blogRouter.js";
import userRouter from "./routes/userRouter.js";
// import authRouter from "./routes/authRouter.js";

const app = express();

const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);
// app.use("/api/auth", authRouter);

await startServer();
app.listen(port, () => console.log("Server started at port " + port));
