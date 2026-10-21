import { Link, useNavigate, useParams } from "react-router-dom";

const BookDetail = ({ books }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);
  const book = Number.isInteger(numericId) ? books.find((item) => item.id === numericId) : undefined;

  if (!book) {
    return <section className="page not-found"><div className="not-found-icon">?</div><h1>Không tìm thấy sách</h1><button className="button button-primary" type="button" onClick={() => navigate(-1)}>Quay lại</button></section>;
  }

  const details = [
    ["Tên sách", book.title],
    ["Tác giả", book.author],
    ["Năm xuất bản", book.year],
    ["Thể loại", book.category],
    ["Trạng thái", book.available ? "Có sẵn" : "Đang mượn"]
  ];

  return (
    <section className="page detail-page">
      <div className="breadcrumbs"><Link to="/books">Danh sách</Link><span>/</span><span>Chi tiết sách</span></div>
      <div className="detail-card">
        <div className="detail-cover"><div className="cover-emblem">L</div><span>LIBRARY COLLECTION</span><strong>{book.title}</strong><small>{book.author}</small></div>
        <div className="detail-content">
          <div className="eyebrow">THÔNG TIN ĐẦU SÁCH</div>
          <h1>Chi tiết sách</h1>
          <div className="detail-list">
            {details.map(([label, value]) => <div className="detail-item" key={label}><span>{label}</span><strong>{value}</strong></div>)}
          </div>
          <button className="button button-ghost back-button" type="button" onClick={() => navigate(-1)}>← Quay lại</button>
        </div>
      </div>
    </section>
  );
};

export default BookDetail;