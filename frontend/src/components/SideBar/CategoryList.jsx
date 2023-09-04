import { Link } from "react-router-dom";
import "./CategoryList";
export const CategoryList = ({ categories, currentPath }) => {
  return (
    <>
      {categories.map((category, index) => (
        <Link to={`/category/${category.code}`} key={category.code}>
          <div
            className={`nav-item ${
              currentPath.trim().toLowerCase() ===
              category.name.trim().toLowerCase()
                ? "active"
                : ""
            }`}
          >
            <div>{category.name}</div>
          </div>
        </Link>
      ))}
    </>
  );
};
