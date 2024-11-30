import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import AddBook from "./AddBook";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.jsx";
import Book from "./pages/Book.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/book/:id",
        element: <Book />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>
);
