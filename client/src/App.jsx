import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Books from "./components/Books";

function App() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await axios.get("http://localhost:9091/api/get/books");
    console.log(response.data);
    setBooks(response.data);
  }

  return (
    <>
      <Header />
      <Books books={books} />
      <Footer />
    </>
  );
}

export default App;
