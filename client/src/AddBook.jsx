import { useState } from "react";
import axios from "axios";

function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    price: "",
    description: "",
  });
  const [successMsg, setSuccessMsg] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:9091/api/add/book",
      formData
    );
    if (response.status === 201) setSuccessMsg(true);
  }

  return (
    <>
      {successMsg && <h3>Book Added</h3>}
      <h2>Add a book</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="description"
          placeholder="Description"
          id=""
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <button type="submit">Add Book</button>
      </form>
    </>
  );
}

export default AddBook;
