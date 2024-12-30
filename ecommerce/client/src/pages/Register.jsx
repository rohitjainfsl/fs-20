import { Link } from "react-router-dom";
import instance from "../axiosConfig";
import { useState } from "react";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    cpassword: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formdata = new FormData(e.target);
      const finalData = Object.fromEntries(formdata.entries());
      const response = await instance.post("/user/register", finalData);
      console.log(response);
      if (response.status === 201) setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="min-h-screen mx-auto my-8 w-1/2">
        {message.length > 0 ? <h3>{message}</h3> : ""}

        <form
          action=""
          onSubmit={handleSubmit}
          className="rounded-lg shadow-md p-4"
        >
          <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={data.name}
            onChange={handleChange}
            autoFocus
            className="w-full mb-3 p-2 border rounded"
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={data.email}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <br />
          <input
            type="text"
            name="phone"
            placeholder="Enter your Phone"
            value={data.phone}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <br />
          <input
            type="text"
            name="username"
            placeholder="Pick a Username"
            value={data.username}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Choose a strong password"
            value={data.password}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <br />
          <input
            type="password"
            name="cpassword"
            placeholder="Confirm password"
            value={data.cpassword}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <br />
          <button
            type="submit"
            className="w-full bg-red-500 text-white p-2 rounded mb-2 hover:bg-red-600"
          >
            Register
          </button>
        </form>
        <p className="text-right">
          Already have an account?{" "}
          <Link to="/login" className="underline text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
