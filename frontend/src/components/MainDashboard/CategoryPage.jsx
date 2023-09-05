import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { DatasetService } from "../../repository/datasetRepository";

import { Link } from "react-router-dom";

export const CategoryPage = () => {
  // const navigate = useNavigate();
  const { code } = useParams();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    fetchCategoryData();
    // eslint-disable-next-line
  }, [code]);

  const fetchCategoryData = async () => {
    try {
      const response = await DatasetService.fetchCategoryData(code);
      if (response.data) {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  // PETAR
  // const handleClick = async (code) => {
  //   navigate(`/category/${categoryData.name}/${code}`, {
  //     state: { categoryData: code },
  //   });
  // };

  if (categoryData === null) {
    return (
      <div className="loader d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <div className="category-dashboard">
      <div className="row">
        <div className="col-md-6">
          <Link to={"/"} className="backLink">
            ../Back
          </Link>
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
                  <div className="col-md-6" key={index}>
                    <Link to={dataset}>
                      {/* <Link to={`/category/${categoryData.name}/${dataset}`}> */}
                      <div
                        className="box"
                        // onClick={() => handleClick(dataset)}
                      >
                        {dataset}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
