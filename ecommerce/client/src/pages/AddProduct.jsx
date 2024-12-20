import { useState } from "react";
import instance from "../axiosConfig";

function AddProduct() {
  const [data, setData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    attributes: [{ name: "", value: "" }],
    inStock: "",
    inventory: "",
    image: "",
  });

  function handleAttributeChange(index, field, value) {
    const newAttributes = data.attributes.map((attr, i) => {
      if (i === index) {
        return { ...attr, [field]: value };
      }
      return attr;
    });

    setData({
      ...data,
      attributes: newAttributes,
    });
  }

  function addNewAttribute() {
    setData({
      ...data,
      attributes: [...data.attributes, { name: "", value: "" }],
    });
  }

  function handleChange(e) {
    if (e.target.name === "image") {
      setData({ ...data, [e.target.name]: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(data);
    const formdata = new FormData();
    // const finalData = Object.fromEntries(formdata.entries());

    formdata.append("name", data.name);
    formdata.append("price", data.price);
    formdata.append("category", data.category);
    formdata.append("brand", data.brand);
    formdata.append("description", data.description);
    formdata.append("attributes", JSON.stringify(data.attributes));
    formdata.append("inStock", data.inStock);
    formdata.append("inventory", data.inventory);
    formdata.append("image", data.image);

    const response = await instance.post("/product/add", formdata);
    console.log(response);
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Name"
          value={data.name}
          name="name"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Brand"
          value={data.brand}
          name="brand"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Category"
          value={data.category}
          name="category"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Price"
          value={data.price}
          name="price"
          onChange={handleChange}
        />
        <br />
        <textarea
          name="description"
          value={data.description}
          placeholder="Description"
          id=""
          onChange={handleChange}
        ></textarea>
        <br />
        <div id="attributes">
          {data.attributes.map((attribute, index) => {
            return (
              <div className="attribute-group" key={index}>
                <input
                  type="text"
                  name="attributeName"
                  placeholder="Enter Attribute Name"
                  value={attribute.name}
                  onChange={(e) =>
                    handleAttributeChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  name="attributeValue"
                  placeholder="Enter Attribute Value"
                  value={attribute.value}
                  onChange={(e) =>
                    handleAttributeChange(index, "value", e.target.value)
                  }
                />
              </div>
            );
          })}
          {/*
           */}

          <button
            type="button"
            className="flex items-center gap-2 text-blue-500"
            onClick={addNewAttribute}
          >
            Add Attribute
          </button>
        </div>
        <div id="inStock">
          <input
            type="radio"
            name="inStock"
            value={true}
            onChange={handleChange}
          />
          True
          <input
            type="radio"
            name="inStock"
            value={false}
            onChange={handleChange}
          />
          False
        </div>
        <input
          type="text"
          name="inventory"
          placeholder="Enter Inventory Count"
          value={data.inventory}
          onChange={handleChange}
        />{" "}
        <br />
        <input type="file" name="image" onChange={handleChange} /> <br />
        <button type="submit">Add Product</button>
      </form>
    </>
  );
}

export default AddProduct;
