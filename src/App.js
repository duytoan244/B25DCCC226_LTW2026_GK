
import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
const BUILD_TAG = "qf-2817";
const STORAGE_KEY = "gk_books";

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const savedBooks = localStorage.getItem(STORAGE_KEY);

    if (savedBooks !== null) {
      try {
        setBooks(JSON.parse(savedBooks));
        setLoading(false);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        axios.get("/data/books.json", { signal: controller.signal })
          .then((res) => setBooks(res.data))
          .catch((err) => {
            if (!axios.isCancel(err) && err.code !== "ERR_CANCELED") setError(true);
          })
          .finally(() => setLoading(false));
      }
    } else {
      axios.get("/data/books.json", { signal: controller.signal })
        .then((res) => setBooks(res.data))
        .catch((err) => {
          if (!axios.isCancel(err) && err.code !== "ERR_CANCELED") setError(true);
        })
        .finally(() => setLoading(false));
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
  }, [books, loading, error]);

  const addBook = (book) => {
    setBooks((current) => [...current, book]);
  };

  const deleteBook = (id) => {
    setBooks((current) => current.filter((book) => book.id !== id));
  };

  const toggleAvailability = (id) => {
    setBooks((current) => current.map((book) =>
      book.id === id ? { ...book, available: !book.available } : book
    ));
  };

  if (loading) {
    return (
      <>
        <Layout />
        <main className="container loading-state">Đang tải...</main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Layout />
        <main className="container loading-state">Không tải được dữ liệu</main>
      </>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home books={books} />} />
        <Route path="books" element={<BookList books={books} onDelete={deleteBook} onToggle={toggleAvailability} />} />
        <Route path="books/new" element={<AddBook books={books} onAdd={addBook} />} />
        <Route path="books/:id" element={<BookDetail books={books} />} />
      </Route>
    </Routes>
  );
};

export default App;