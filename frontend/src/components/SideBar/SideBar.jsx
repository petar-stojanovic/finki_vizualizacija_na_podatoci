import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { DatasetService } from "../../repository/datasetRepository";
import { CategoryList } from "./CategoryList";

export const SideBar = () => {
  const [categories, setCategories] = useState([]);

  const currentPath =
    decodeURIComponent(useLocation().pathname).split("/")[2] ?? "";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await DatasetService.fetchCategories();
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="navigation">
      <div>
        <CategoryList categories={categories} currentPath={currentPath} />
      </div>
    </div>
  );
};
