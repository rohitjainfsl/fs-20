import express from "express";
import {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/books.js";

const bookRouter = express.Router();

//FETCH ALL BOOKS
bookRouter.get("/get/books", getBooks);

// FETCH A SINGLE BOOK
bookRouter.get("/get/book/:id", getBook);
bookRouter.post("/add/book", addBook);
bookRouter.put("/update/:id", updateBook);
bookRouter.delete("/delete/:id", deleteBook);

export default bookRouter;
