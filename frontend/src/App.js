import "./App.css";
import { SideBar } from "./components/SideBar/SideBar";
import { HomePage } from "./components/MainDashboard/HomePage";
import { CategoryPage } from "./components/MainDashboard/CategoryPage";
import { DatasetPage } from "./components/MainDashboard/DatasetPage";

import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="">
      <div className="row">
        <div className="col-md-2">
          <SideBar />
        </div>
        <div className="col-md-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:code" element={<CategoryPage />} />
            <Route path="/category/:categoryName/:code" element={<DatasetPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
