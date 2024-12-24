import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectToDB } from "./db/connection.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import cartRouter from "./routes/cartRouter.js";

const PORT = process.env.PORT;

const app = express();
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://your-frontend-domain.com"
      : "http://localhost:5173",
  credentials: true, // This allows the server to accept cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API VERSIONING
// app.use("/api/v1/product", productRouter); //JWT (auth)
// app.use("/api/v2/product", productRouter); //PASSPORT (auth)

app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cart", cartRouter);

await connectToDB();
app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}`));
