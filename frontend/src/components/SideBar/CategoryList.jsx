import { Link } from "react-router-dom";

export const CategoryList = ({ categories, currentPath }) => {
  return (
    <>
      {categories.map((category, index) => (
        <Link to={`/category/${category.code}`}>
          <div
            className={`nav-item ${
              currentPath.trim().toLowerCase() ===
              category.name.trim().toLowerCase()
                ? "active"
                : ""
            }`}
            key={category.code}
          >
            <div>{category.name}</div>
          </div>
        </Link>
      ))}
    </>
  );
};
