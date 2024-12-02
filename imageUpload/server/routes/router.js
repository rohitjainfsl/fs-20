import express from "express";
import multer from "multer";
import { addImage } from "../controllers/add.js";
import path from "path";

const router = express.Router();
// const upload = multer({ dest: "uploads/" }); //absolute basic version of multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("../server/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), addImage);

export default router;
