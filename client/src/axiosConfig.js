import axios from "axios";

const instance = axios.create({
  baseURL: "https://fs-20.onrender.com/",
});
export default instance;
