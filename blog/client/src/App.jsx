import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Footer from "./pages/Footer"
import AddBlog from "./pages/AddBlog";
import "./App.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path:"/header",
        element: <Header />,
      },
      {
        path:"/blog",
        element:<Blog/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/footer",
        element:<Footer/>
      },
      {
        path:"/addblog",
        element:<AddBlog />
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
