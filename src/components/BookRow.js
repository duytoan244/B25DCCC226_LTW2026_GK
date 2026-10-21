import { Link } from "react-router-dom";

const BookRow = ({ book, onDelete, onToggle }) => (
  <tr className={book.available ? "" : "borrowed-row"}>
    <td className="book-title"><Link to={`/books/${book.id}`}>{book.title}</Link></td>
    <td>{book.author}</td>
    <td>{book.year}</td>
    <td><span className="category-pill">{book.category}</span></td>
    <td>
      <span className={`status ${book.available ? "status-available" : "status-borrowed"}`}>
        {book.available ? "Có sẵn" : "Đang mượn"}
      </span>
    </td>
    <td>
      <div className="actions">
        <button className="button button-small button-soft" type="button" onClick={() => onToggle(book.id)}>
          {book.available ? "Cho mượn" : "Nhận trả"}
        </button>
        <button className="button button-small button-danger" type="button" onClick={() => onDelete(book.id)}>Xóa</button>
      </div>
    </td>
  </tr>
);

export default BookRow;