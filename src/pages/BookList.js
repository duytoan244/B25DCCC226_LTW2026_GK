import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import BookTable from "../components/BookTable";

const BookList = ({ books, onDelete, onToggle }) => {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [category, setCategory] = useState("Tất cả");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword), 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  const handleQueryShift = (value) => setKeyword(value);

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(debouncedKeyword.trim().toLowerCase());
    const matchesCategory = category === "Tất cả" || book.category === category;
    return matchesTitle && matchesCategory;
  });

  return (
    <section className="page">
      <div className="page-heading heading-row">
        <div>
          <div className="eyebrow">BỘ SƯU TẬP</div>
          <h1>Danh sách sách</h1>
          <p className="page-subtitle">Tìm kiếm, theo dõi và cập nhật sách trong thư viện.</p>
        </div>
        <Link className="button button-primary" to="/books/new"><span className="plus">＋</span> Thêm sách mới</Link>
      </div>
      <FilterBar
        keyword={keyword}
        category={category}
        onQueryChange={handleQueryShift}
        onCategoryChange={setCategory}
        searching={keyword !== debouncedKeyword}
      />
      <div className="results-line">Tìm thấy <strong>{filteredBooks.length}</strong> cuốn sách</div>
      <BookTable books={filteredBooks} onDelete={onDelete} onToggle={onToggle} />
    </section>
  );
};

export default BookList;