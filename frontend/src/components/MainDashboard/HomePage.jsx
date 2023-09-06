import { Link } from "react-router-dom";
export const HomePage = () => {
  return (
    <div className="main-dashboard">
      {/* <div className="pyramids">
      </div> */}
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <h3 className="main-title">Data</h3>
          <h5 className="main-sub-title">Visualization</h5>
          <hr className="title-separator" />
          <p>
            The "Sustainable Development Goals (SDGs)" category is dedicated to
            fostering awareness and action towards achieving the United Nations'
            SDGs, which encompass a wide range of global challenges, including
            poverty, inequality, climate change, and sustainable development.
          </p>
          <Link to="/category/Agriculture%20Emissions">Get started</Link>
        </div>
      </div>
    </div>
  );
};
