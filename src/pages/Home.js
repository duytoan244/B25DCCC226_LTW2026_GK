const Home = ({ books }) => {
  const borrowedCount = books.reduce((total, book) => total + (book.available ? 0 : 1), 0);
  const newestYear = books.length ? books.reduce((latest, book) => Math.max(latest, book.year), 0) : 0;

  return (
    <section className="page">
      <div className="page-heading">
        <div className="eyebrow">KHÔNG GIAN TRI THỨC</div>
        <h1>Thư viện sách</h1>
        <p className="page-subtitle">Theo dõi bộ sưu tập và tình trạng sách của thư viện.</p>
      </div>
      <div className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon">▤</div>
          <p>Tổng số sách</p>
          <strong>{books.length}</strong>
          <span>Đầu sách trong thư viện</span>
        </article>
        <article className="stat-card">
          <div className="stat-icon">↗</div>
          <p>Số sách đang cho mượn</p>
          <strong>{borrowedCount}</strong>
          <span>Đang được bạn đọc mượn</span>
        </article>
        <article className="stat-card">
          <div className="stat-icon">✦</div>
          <p>Năm xuất bản mới nhất</p>
          <strong>{newestYear}</strong>
          <span>Ấn bản mới nhất trong bộ sưu tập</span>
        </article>
      </div>
      <div className="home-note">
        <div className="note-mark">i</div>
        <div><strong>Một cuốn sách có thể mở ra cả thế giới.</strong><p>Quản lý sách dễ dàng hơn với danh sách và trạng thái mượn trả được cập nhật tức thì.</p></div>
      </div>
    </section>
  );
};

export default Home;