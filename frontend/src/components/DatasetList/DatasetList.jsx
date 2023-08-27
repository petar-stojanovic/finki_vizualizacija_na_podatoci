import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import DatasetService from "../../repository/datasetRepostitory";

export const DatasetList = ({ onDatasetSelect }) => {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    DatasetService.fetchDatasets()
      .then((response) => {
        setDatasets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching datasets:", error);
      });
  }, []);

  const renderRow = ({ index, style }) => {
    const dataset = datasets[index];

    return (
      <ListItem key={index} style={style}>
        <ListItemButton
          component="a"
          // href={`http://localhost:8080/api/data/${dataset}`}
          onClick={() => onDatasetSelect(dataset)}
        >
          <ListItemText primary={dataset} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <div>
      <h1>List of Datasets</h1>
      <FixedSizeList
        height={200}
        width={700}
        itemSize={40}
        itemCount={datasets.length}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
};
