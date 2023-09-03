import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { DatasetService } from "../../repository/datasetRepository";

export const CategoryPage = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    fetchCategoryData();
  }, [code]);

  const fetchCategoryData = async () => {
    try {
      const response = await DatasetService.fetchCategoryData(code);
      console.log(response);
      if (response.data) {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const handleClick = async (code) => {
    navigate(`/category/${categoryData.name}/${code}`, { state: { categoryData: code } });
  };

  if (categoryData === null) {
    return (
      <div class="loader d-flex justify-content-center align-items-center">
        <div class="spinner-border" role="status">
        </div>
      </div>
    );
  }

  return (
    <div className="category-dashboard">
      
      <div className="row">
        <div className="col-md-6">
        <a href="/" className="backLink">../Back</a>
          <h2>{categoryData.name}</h2>
          <p>{categoryData.description}</p>
          <div className="graph">NEKOJ GRAFIK TUKA</div>
        </div>
        {/* <div className="col-md-1"></div> */}
        <div className="col-md-6">
          <div className="right-column">
            <div className="scrollable-content">
            <div className="row">
              {categoryData.datasets.map((dataset, index) => (
                <div className="col-md-6"><div className="box" key={index} onClick={() => handleClick(dataset)}>{dataset}</div></div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );

};
