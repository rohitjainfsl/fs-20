import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
// import Header from "./pages/Header";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Footer from "./pages/Footer";
import AddBlog from "./pages/AddBlog";
import BookDeatials from "./pages/Bookdeatials";
import "./App.css";
import AuthorPage from "./pages/Author";
// import { useNavigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true, 
        element: <Blog />
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/footer",
        element: <Footer />,
      },
      {
        path: "/addblog",
        element: <AddBlog />,
      },
      {
        path: "/post/:id",
        element: <BookDeatials />,
      },
      {
        path:"/author/:author",
        element:<AuthorPage />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
