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
    DatasetService.getData(datasetName)
      .then((response) => {
        console.log(response.data);
        const formattedData = response.data.fileData.map((item) => ({
          ...item,
          Value: parseFloat(item.Value).toFixed(2),
        }));

        console.log(Object.keys(formattedData[0]));

        setJsonData({
          ...response.data.fileData,
          data: formattedData,
          attributes: Object.keys(formattedData[0]),
        });

        setSelectedLabel(
          response.data.attributes.includes("Year")
            ? "Year"
            : response.data.attributes[0]
        );
        setSelectedData(
          response.data.attributes.includes("Value")
            ? "Value"
            : response.data.attributes[1]
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dataset data:", error);
      });
  };

  const handleLabelChange = (event) => {
    setSelectedLabel(event.target.value);
  };

  const handleDataChange = (event) => {
    setSelectedData(event.target.value);
  };

  function isAttributeSuitableForLabels(data, attribute) {
    const uniqueValues = [...new Set(data.map((row) => row[attribute]))];

    return uniqueValues.length < data.length * 0.25;
  }

  const labelAttributes = jsonData?.attributes
    .filter(
      (x) =>
        !x.toString().toLowerCase().includes("code") &&
        !x.toString().toLowerCase().includes("area") &&
        !x.toString().toLowerCase().includes("flag") &&
        !x.toString().toLowerCase().includes("source") &&
        !x.toString().toLowerCase().includes("note")
    )
    .filter((attribute) =>
      isAttributeSuitableForLabels(jsonData.data, attribute)
    );

  return (
    <div className="dataset-dashboard">
      <Link to={`/category/${currentPath}`} className="backLink">
        ../Back
      </Link>
      <h2>{code}</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <FormControl sx={{ m: 1, minWidth: 160 }}>
          <InputLabel htmlFor="label-select">Label</InputLabel>
          <Select
            value={selectedLabel}
            onChange={handleLabelChange}
            id="label-select"
            label="Label"
          >
            {labelAttributes?.map((attribute, index) => (
              <MenuItem key={index} value={attribute}>
                {attribute}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 160 }}>
          <InputLabel htmlFor="data-select">Data</InputLabel>
          <Select
            value={selectedData}
            onChange={handleDataChange}
            id="data-select"
            label="Data"
          >
            {jsonData?.attributes
              .filter(
                (x) =>
                  !x.toString().toLowerCase().includes("code") &&
                  !x.toString().toLowerCase().includes("area") &&
                  !x.toString().toLowerCase().includes("flag") &&
                  !x.toString().toLowerCase().includes("source") &&
                  !x.toString().toLowerCase().includes("note")
              )
              .filter((attribute) => !labelAttributes.includes(attribute))
              .map((attribute, index) => (
                <MenuItem key={index} value={attribute}>
                  {attribute}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <RemoveCircleIcon
          onClick={() => setSize(size - 10)}
          style={{ cursor: "pointer" }}
        ></RemoveCircleIcon>
        <AddCircleIcon
          onClick={() => setSize(size + 10)}
          style={{ cursor: "pointer" }}
        ></AddCircleIcon>
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
