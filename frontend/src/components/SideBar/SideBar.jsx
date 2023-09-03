import { useEffect, useState } from "react";
import { useNavigate, useLocation  } from 'react-router-dom';

import { DatasetService } from "../../repository/datasetRepository";
import { CategoryList } from "./CategoryList";

export const SideBar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const currentPath = decodeURIComponent(location.pathname);
  const parts = currentPath.split('/');

  let category = '';
  (parts.length > 2) ? category = parts[2] : category = "";

  console.log(category);

  const handleClick = async (code) => {
    navigate(`/category/${code}`, { state: { categoryData: code } });
  };

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
        <CategoryList categories={categories} currentPath={category} handleClick={handleClick} />
      </div>
    </div>
  );
};
