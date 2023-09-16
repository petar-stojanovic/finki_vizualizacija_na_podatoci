import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DatasetService } from "../../repository/datasetRepository";

import { Link } from "react-router-dom";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import {
  BarChartImpl,
  DoughnutChartImpl,
  LineChartImpl,
  PieChartImpl,
} from "../ChartsImpl/chartsImpl";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import { ScatterPlot } from "../ChartsImpl/ScatterPlotImpl";

import { colors } from "../ChartsImpl/colors";

export const DatasetPage = () => {
  const { code } = useParams();

  const [jsonData, setJsonData] = useState(null);

  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedData, setSelectedData] = useState("");
  const [size, setSize] = useState(100);

  const currentPath =
    decodeURIComponent(useLocation().pathname).split("/")[2] ?? "";

  useEffect(() => {
    fetchDataForDataset(code);
  }, [code]);

  const fetchDataForDataset = async (datasetName) => {
    try {
      const response = await DatasetService.getData(datasetName);

    
      const formattedData = response.data.fileData.map((item) => {
        const formattedItem = {};
        for (const key in item) {
          if (!isNaN(item[key])) {
            const floatValue = parseFloat(item[key]);
            formattedItem[key] = Number.isInteger(floatValue)
              ? floatValue
              : floatValue.toFixed(2);
          } else {
            formattedItem[key] = item[key];
          }
        }
        return formattedItem;
      });


      const jsonData = {
        data: formattedData,
        attributes:Object.keys(formattedData[0])

      };

      const selectedLabel = Object.keys(formattedData[0])?.includes("Year")
        ? "Year"
        : jsonData?.attributes[0];

      console.log(selectedLabel);
      const selectedData = Object.keys(formattedData[0])?.includes("Value")
        ? "Value"
        : jsonData?.attributes[1];

      setJsonData(jsonData);
      setSelectedLabel(selectedLabel);
      setSelectedData(selectedData);
    } catch (error) {
      console.error("Error fetching dataset data:", error);
    }
  };

  const handleLabelChange = (event) => {
    setSelectedLabel(event.target.value);
  };

  const handleDataChange = (event) => {
    setSelectedData(event.target.value);
  };

  return (
    <div className="dataset-dashboard">
      {/* {console.log(jsonData)} */}

      <Link to={`/category/${currentPath}`} className="backLink">
        ../Back
      </Link>
      <h2>{code}</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <FormControl sx={{ m: 1, minWidth: 160 }}>
          <InputLabel htmlFor="label-select">X-axis</InputLabel>
          <Select
            value={selectedLabel}
            onChange={handleLabelChange}
            id="label-select"
            label="Label"
          >
            {jsonData?.attributes
              .filter((label) => label !== selectedData)
              .map((attribute, index) => (
                <MenuItem key={index} value={attribute}>
                  {attribute}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 160 }}>
          <InputLabel htmlFor="data-select">Y-axis</InputLabel>
          <Select
            value={selectedData}
            onChange={handleDataChange}
            id="data-select"
            label="Data"
          >
            {jsonData?.attributes
              .filter((data) => data !== selectedLabel)
              .map((attribute, index) => (
                <MenuItem key={index} value={attribute}>
                  {attribute}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <Button
          style={{ textTransform: "none" }}
          size="small"
          component="label"
          variant="contained"
          onClick={() => setSize(prevSize => prevSize - 10)}
          startIcon={<RemoveCircleIcon />}
        >
          Remove Data
        </Button>
        <Button
          style={{ textTransform: "none" }}
          size="small"
          className="ms-1"
          component="label"
          variant="contained"
          onClick={() => setSize(prevSize => prevSize + 10)}
          startIcon={<AddCircleIcon />}
        >
          Add Data
        </Button>
      </div>

      {jsonData?.data && jsonData.data.length > 0 && (
        <Box sx={{ mt: "26px" }}>
          <Grid
            container
            spacing={5}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xl={6} xs={12}>
              <LineChartImpl
                dataset={jsonData}
                labelKey={selectedLabel}
                valueKey={selectedData}
                size={size}
                colors={colors}
                datasetLabel="Line Chart"
              />
            </Grid>
            <Grid item xl={6} xs={12}>
              <PieChartImpl
                dataset={jsonData}
                labelKey={selectedLabel}
                valueKey={selectedData}
                size={size}
                colors={colors}
                datasetLabel="Pie Chart"
              />
            </Grid>
            <Grid item xl={6} xs={12}>
              <ScatterPlot
                dataset={jsonData}
                labelKey={selectedLabel}
                valueKey={selectedData}
                size={size}
                colors={colors}
                datasetLabel="Scatter Plot"
              />
            </Grid>

            <Grid item xl={6} xs={12}>
              <BarChartImpl
                dataset={jsonData}
                labelKey={selectedLabel}
                valueKey={selectedData}
                size={size}
                colors={colors}
                datasetLabel="Bar Chart"
              />
            </Grid>
            <Grid item xl={6} xs={12}>
              <DoughnutChartImpl
                dataset={jsonData}
                labelKey={selectedLabel}
                valueKey={selectedData}
                size={size}
                colors={colors}
                datasetLabel="Doughnut Chart"
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};
