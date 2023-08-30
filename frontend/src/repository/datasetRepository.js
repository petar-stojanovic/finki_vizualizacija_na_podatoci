import axios from "../custom-axios/axios";

export const DatasetService = {
  fetchDatasets: () => {
    return axios.get("/all");
  },
  getData: (name) => {
    return axios.get(`/${name}`);
  },
};

