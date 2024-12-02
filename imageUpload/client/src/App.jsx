import axios from "axios";
import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    image: "",
  });

  // IF YOU PUT VALUE ATTRIBUTE TO INPUT TYPE FILE
  // YOU WILL GET AN ERROR SAYING,
  // CANNOT PUT IMAGE NAME PROGRAMATICALLY

  function handleChange(e) {
    // if (e.target.name === "title") setForm({ ...form, title: e.target.value });
    // if (e.target.name === "author")
    //   setForm({ ...form, author: e.target.value });
    // if (e.target.name === "price") setForm({ ...form, price: e.target.value });
    // if (e.target.name === "description")
    //   setForm({ ...form, description: e.target.value });
    // if (e.target.name === "image")
    //   setForm({ ...form, image: e.target.files[0] });

    const { name, value } = e.target;
    if (name === "image") setForm({ ...form, [name]: e.target.files[0] });
    else setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(form);

    const formdata = new FormData(); //Because I want to carry files to the backend
    formdata.append("title", form.title);
    formdata.append("author", form.author);
    formdata.append("price", form.price);
    formdata.append("description", form.description);
    formdata.append("image", form.image);

    const response = await axios.post(
      "http://localhost:5000/api/add",
      formdata
    );
    console.log(response.data);
  }

  return (
    <>
      <form action="" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Author"
          name="author"
          value={form.author}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Price"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <br />
        <input type="file" name="image" onChange={handleChange} />
        <br />
        <button type="submit">Add Book</button>
      </form>
    </>
  );
}

export default App;
