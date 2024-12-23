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
      {message.length > 0 && (
        <p>
          <em>{message}</em>
        </p>
      )}
      <h2>Log in to your account</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your Username"
          value={data.username}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={data.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        New User? <Link to="/register">Register</Link>
      </p>
    </>
  );
}

export default Login;
