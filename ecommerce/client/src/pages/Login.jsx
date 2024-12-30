import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import instance from "../axiosConfig";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";

function Login() {
  const { login, isAuthenticated } = useAuth();

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const referer = searchParams.get("referer");
      console.log("referer", referer);
      if (referer) navigate(referer);
    }
  }, [isAuthenticated, navigate, searchParams]);

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
      const response = await instance.post("/user/login", finalData);
      if (response.status === 200) {
        login();
        return navigate("/");
      }
    } catch (error) {
      console.log(error);
      setMessage(error);
    }
  }

  return (
    <>
      <div className="min-h-screen mx-auto my-8 w-1/2">
        {message.length > 0 && (
          <p>
            <em>{message}</em>
          </p>
        )}
        <form
          action=""
          onSubmit={handleSubmit}
          className="rounded-lg shadow-md p-4"
        >
          <h2>Log in to your account</h2>
          <input
            type="text"
            name="username"
            placeholder="Enter your Username"
            value={data.username}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <br />
          <button
            type="submit"
            className="w-full bg-red-500 text-white p-2 rounded mb-2 hover:bg-red-600"
          >
            Login
          </button>
        </form>
        <p className="text-right">
          New User?{" "}
          <Link to="/register" className="underline text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
