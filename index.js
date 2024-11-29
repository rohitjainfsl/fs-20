import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

const app = express();

const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:5174" })); //whitelisting this particular IP

app.use(express.urlencoded({ extended: true })); //to accept req which have data in their body
app.use(express.json()); // to check whether that data is in JSON format

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODBURL);
    app.listen(port, () => console.log("Server started at port " + port));
  } catch (error) {
    console.log("Error connecting to the DB", error);
  }
}

//API

//SCHEMA: structure of the data to expect in incoming requests,
// MODEL: the DB collection with which that data will interact

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: [4, "Title should be atleast 4 characters"],
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
});

const Books = mongoose.model("book", BookSchema);

//FETCH ALL BOOKS
app.get("/api/get/books", async (request, response) => {
  try {
    const allBooks = await Books.find();
    response.send(allBooks);
  } catch (error) {
    response.status(500).send({ message: "Error fetching books", error });
  }
});

//ADD A NEW BOOK
app.post("/api/add/book", async (request, response) => {
  try {
    const { title, author, price, description, publisher } = request.body;

    const bookToAdd = new Books({
      title,
      author,
      price,
      description,
      publisher,
    });
    await bookToAdd.save();
    response.status(201).send({ message: "Book added" });
  } catch (error) {
    response.status(500).send({ message: "Error adding book", error });
  }
});

//UPDATE A BOOK BY ID
// app.put();

//DELETE A BOOK BY ID
// app.delete();

startServer();
