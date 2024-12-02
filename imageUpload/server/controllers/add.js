import express from "express";
import Add from "../models/addModel.js";

export async function addImage(req, res) {
  // console.log(req.body)
  // console.log(req.file)
  try {
    const { title, author, price, description } = req.body;
    const image = req.file.path;

    const newBook = new Add({ title, author, price, description, image });
    await newBook.save();
    return res.status(201).send({ message: "Book Added" });
  } catch (error) {
    return res.status(500).send({ message: "Error adding book", error });
  }
}
