import axios from "../custom-axios/axios";

const DatasetService = {
  fetchDatasets: () => {
    return axios.get("/all");
  },
  getData: (name) => {
    return axios.get(`/${name}`);
  },
};

export default DatasetService;
