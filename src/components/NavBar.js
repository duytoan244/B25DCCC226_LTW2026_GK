import { NavLink } from "react-router-dom";

const NavBar = () => (
  <header className="site-header">
    <nav className="navbar container" aria-label="Menu chính">
      <div className="brand">LIBRARY<span>.</span></div>
      <div className="nav-links">
        <NavLink to="/" end>Trang chủ</NavLink>
        <NavLink to="/books" end>Danh sách</NavLink>
        <NavLink to="/books/new" end>Thêm mới</NavLink>
      </div>
    </nav>
  </header>
);

export default NavBar;