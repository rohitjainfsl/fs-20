import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDB } from "./db/connection.js";
import router from "./routes/router.js";
const port = process.env.PORT;

const app = express();

await connectToDB();
app.listen(port, () => console.log("Server started"));
app.use(cors({origin: "http://localhost:5174"}))

app.use("/api", router);
