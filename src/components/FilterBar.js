import { CATEGORIES } from "../data";

const FilterBar = ({ keyword, category, onQueryChange, onCategoryChange, searching }) => (
  <div className="filter-panel">
    <div className="field search-field">
      <label htmlFor="book-search">Tìm kiếm</label>
      <input
        id="book-search"
        type="text"
        value={keyword}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Nhập tên sách..."
      />
      {searching && <span className="searching">Đang tìm...</span>}
    </div>
    <div className="field">
      <label htmlFor="book-category">Thể loại</label>
      <select id="book-category" value={category} onChange={(event) => onCategoryChange(event.target.value)}>
        <option value="Tất cả">Tất cả</option>
        {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </div>
  </div>
);

export default FilterBar;