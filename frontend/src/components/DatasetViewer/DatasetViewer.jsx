import React, { useEffect, useState } from "react";
import DatasetService from "../../repository/datasetRepostitory";

const DatasetViewer = ({ selectedDataset }) => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const getData = () => {
      // Fetch the JSON data for the selected dataset from the Spring Boot API
      DatasetService.getData(selectedDataset)
        .then((response) => {
          setJsonData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching dataset:", error);
        });
    };

    if (selectedDataset) {
      getData();
    }
  }, [selectedDataset]);

  return (
    <div>
      <h2>Selected Dataset: {selectedDataset}</h2>
      <button onClick={() => setJsonData(null)}>Clear Dataset</button>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default DatasetViewer;
