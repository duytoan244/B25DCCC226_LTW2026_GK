import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data";

const AddBook = ({ books, onAdd }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("Văn học");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !author.trim() || year === "" || !category) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const numericYear = Number(year);
    if (!Number.isInteger(numericYear) || numericYear < 1900 || numericYear > 2026) {
      setError("Năm xuất bản phải từ 1900 đến 2026");
      return;
    }

    const maxId = books.reduce((max, book) => Math.max(max, book.id), 0);
    onAdd({
      id: maxId + 1,
      title: title.trim(),
      author: author.trim(),
      year: numericYear,
      category,
      available: true
    });
    navigate("/books", { replace: true });
  };

  return (
    <section className="page form-page">
      <div className="page-heading">
        <div className="eyebrow">BỔ SUNG BỘ SƯU TẬP</div>
        <h1>Thêm sách mới</h1>
        <p className="page-subtitle">Điền thông tin bên dưới để thêm đầu sách vào thư viện.</p>
      </div>
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-section-title"><span>01</span><div><strong>Thông tin sách</strong><p>Các trường có dấu * là bắt buộc.</p></div></div>
        <div className="field">
          <label htmlFor="title">Tên sách</label>
          <input id="title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Nhập tên sách" />
        </div>
        <div className="field">
          <label htmlFor="author">Tác giả</label>
          <input id="author" type="text" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="Nhập tên tác giả" />
        </div>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="year">Năm xuất bản</label>
            <input id="year" type="number" value={year} onChange={(event) => setYear(event.target.value)} placeholder="VD: 2020" />
          </div>
          <div className="field">
            <label htmlFor="category">Thể loại</label>
            <select id="category" value={category} onChange={(event) => setCategory(event.target.value)}>
              {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-actions">
          <Link className="button button-ghost" to="/books">Hủy</Link>
          <button className="button button-primary" type="submit">Thêm <span>→</span></button>
        </div>
      </form>
    </section>
  );
};

export default AddBook;