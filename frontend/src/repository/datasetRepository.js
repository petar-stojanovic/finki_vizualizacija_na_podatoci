import axios from "../custom-axios/axios";

export const DatasetService = {
  fetchCategories: () => {
    return axios.get("/categories");
  },
  fetchCategoryData: (code) => {
    return axios.get(`/category/${code}`);
  },
  fetchDatasets: () => {
    return axios.get("/datasetNames");
  },
  getData: (name) => {
    return axios.get(`/${name}`);
  },
};

