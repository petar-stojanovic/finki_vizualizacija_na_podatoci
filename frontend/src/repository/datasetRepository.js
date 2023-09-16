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
  addCategory: (name, description) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    return axios.post("/categories", formData);
  },
  addDataset: (category, datasetName, file) => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("dataset", datasetName);
    formData.append("file", file);

    return axios.post("/datasets", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  downloadDataset: (name) => {
    return axios.get(`/${name}/download`);
  },
};
