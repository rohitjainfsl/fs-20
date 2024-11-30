import Books from "../models/bookModel.js";
import mongoose from "mongoose";

export async function getBooks(request, response) {
  try {
    const allBooks = await Books.find();
    response.send(allBooks);
  } catch (error) {
    response.status(500).send({ message: "Error fetching books", error });
  }
}

export async function getBook(request, response) {
  const idToFetch = request.params.id;
  try {
    if (!idToFetch)
      return response
        .status(400)
        .send({ message: "You must specify a book ID" });

    if (!mongoose.Types.ObjectId.isValid(idToFetch))
      return response
        .status(400)
        .send({ message: "Given ID is not in proper format" });

    const book = await Books.findById(idToFetch);
    console.log("book", book);
    if (!book)
      return response
        .status(404)
        .send({ message: "No book found with the given ID" });

    return response.send(book);
  } catch (error) {
    return response
      .status(500)
      .send({ message: "Error fetching book ", error });
  }
}

export async function addBook(request, response) {
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
}

export async function updateBook(request, response) {
  const idToUpdate = request.params.id;
  const { title, author, price, description, publisher } = request.body;
  try {
    if (!idToUpdate)
      return response
        .status(400)
        .send({ message: "You must specify a book ID" });

    if (!mongoose.Types.ObjectId.isValid(idToUpdate))
      return response
        .status(400)
        .send({ message: "Given ID is not in proper format" });

    const updatedBook = await Books.findByIdAndUpdate(idToUpdate, {
      title,
      author,
      price,
      description,
      publisher,
    });
    if (!updatedBook)
      return response
        .status(404)
        .send({ message: "No book found with the given ID" });

    response.send({ message: "Book with the given ID is updated" });
  } catch (error) {
    return response.status(500).send({ message: "Error updating book", error });
  }
}

export async function deleteBook(request, response) {
  const idToDelete = request.params.id;

  try {
    if (!idToDelete)
      return response
        .status(400)
        .send({ message: "You must specify a book ID" });

    if (!mongoose.Types.ObjectId.isValid(idToDelete))
      return response
        .status(400)
        .send({ message: "Given ID is not in proper format" });

    const deletedBook = await Books.findByIdAndDelete(idToDelete);

    if (!deletedBook)
      return response
        .status(404)
        .send({ message: "No book found with the given ID" });

    response.send({ message: "Book with the given ID deleted" });
  } catch (error) {
    return response.status(500).send({ message: "Error deleting book", error });
  }
}
