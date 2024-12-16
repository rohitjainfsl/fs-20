import express from "express";
import "dotenv/config";
import cors from "cors";
import { startServer } from "./db/connection.js";
import blogRouter from "./routes/blogRouter.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter.js";

const app = express();

const port = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

await startServer();
app.listen(port, () => console.log("Server started at port " + port));
