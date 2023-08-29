import React, { useEffect, useState } from "react";
import DatasetService from "../../repository/datasetRepository";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import LineChart from "../LineChart/LineChart";

const DatasetViewer = () => {
  const [jsonData, setJsonData] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    DatasetService.fetchDatasets()
      .then((response) => {
        setDatasets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching datasets:", error);
      });
  };

  const fetchDatasetData = async (datasetName) => {
    DatasetService.getData(datasetName)
      .then((response) => {
        setJsonData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dataset data:", error);
      });
  };

  const handleDatasetClick = (datasetName) => {
    setSelectedDataset(datasetName);
    fetchDatasetData(datasetName);
  };

  const clearData = () => {
    setSelectedDataset(null);
    setJsonData([]);
  };

  const renderRow = ({ index, style }) => {
    const dataset = datasets[index];

    return (
      <ListItem key={index} style={style}>
        <ListItemButton
          component="a"
          onClick={() => handleDatasetClick(dataset)}
        >
          <ListItemText primary={dataset} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <div className="dataset-viewer">
      <div className="dataset-list">
        <h2>Datasets</h2>
        <FixedSizeList
          height={200}
          width={700}
          itemSize={40}
          itemCount={datasets.length}
        >
          {renderRow}
        </FixedSizeList>
      </div>

      <div className="data-display">
        <h2>Selected Dataset: {selectedDataset || "None"}</h2>
        {jsonData?.data && jsonData.data.length > 0 && selectedDataset && (
          <div>
            <button onClick={clearData}>Clear Data</button>

            <div style={{ width: "30rem" }}>
              <LineChart
                data={jsonData}
                labelKey="Year"
                valueKey="Value"
                datasetLabel="Line Chart"
              />
            </div>

            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          </div>
        )}
        {jsonData && jsonData.length === 0 && selectedDataset && (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default DatasetViewer;
