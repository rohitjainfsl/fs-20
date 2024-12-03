import express from "express";

import {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/books.js";
import upload from "../middlewares/multer.js";

// const fields = upload.fields([
//   { name: "image", maxCount: 1 },
//   { name: "image2", maxCount: 1 },
// ]);

const bookRouter = express.Router();

//FETCH ALL BOOKS
bookRouter.get("/get/books", getBooks);

// FETCH A SINGLE BOOK
bookRouter.get("/get/book/:id", getBook);

// bookRouter.post("/add/book", fields, addBook);
bookRouter.post("/add/book", upload.single("image"), addBook);

bookRouter.put("/update/:id", updateBook);
bookRouter.delete("/delete/:id", deleteBook);

export default bookRouter;
