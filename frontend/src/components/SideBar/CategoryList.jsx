import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

import { Link } from "react-router-dom";
import "./CategoryList";

export const CategoryList = ({ categories, currentPath }) => {
  return (
    <>
              <Toolbar />

      {categories.map((category, index) => {
        const isActive =
          currentPath.trim().toLowerCase() === category.name.trim().toLowerCase();

        return (
          <Link
            to={`/category/${category.code}`}
            key={category.code}
            style={{ textDecoration: "none" }}
          >
            <ListItemButton
              sx={{ p: "0.55rem" }}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <ListItemText
                primary={category.name}
                primaryTypographyProps={{
                  color: isActive ? "#3143c9" : "#2a36b2",
                  fontFamily: "Montserrat",
                  fontSize: 14,
                  fontWeight: 500,
                  margin: 0,
                }}
              />
            </ListItemButton>
          </Link>
        );
      })}
    </>
  );
};
