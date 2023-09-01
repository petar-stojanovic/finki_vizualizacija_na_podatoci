import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DatasetService } from "../../repository/datasetRepository";
import { LineChart as LineChart2 } from "../LineChart/LineChart";

import { BarChart, DoughnutChart, LineChart, PieChart } from "../Charts/charts";
import { TestLineChart } from "./TestLineChart";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { PieChartImpl } from "../ChartsImpl/chartsImpl";

export const FetchLineChart = () => {
  const { dataset } = useParams();

  const [jsonData, setJsonData] = useState(null);

  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedData, setSelectedData] = useState("");

  console.log(selectedLabel, selectedData);

  useEffect(() => {
    fetchDataForDataset(dataset);
  }, [dataset]);

  const fetchDataForDataset = async (datasetName) => {
    DatasetService.getData(datasetName)
      .then((response) => {
        setJsonData(response.data);
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
    // Extract all unique values for the given attribute
    const uniqueValues = [...new Set(data.map((row) => row[attribute]))];

    // Check if the number of unique values is significantly lower than the total number of data points
    return uniqueValues.length < data.length * 0.4;
  }

  const sortedAttributes = jsonData?.attributes
    .filter(
      (x) =>
        !x.toString().toLowerCase().includes("code") &&
        !x.toString().toLowerCase().includes("area") &&
        !x.toString().toLowerCase().includes("flag") &&
        !x.toString().toLowerCase().includes("note")
    )
    .sort((a, b) => {
      const aIsLabel = isAttributeSuitableForLabels(jsonData.data, a);
      const bIsLabel = isAttributeSuitableForLabels(jsonData.data, b);

      if (aIsLabel && !bIsLabel) return -1;
      if (!aIsLabel && bIsLabel) return 1;
      return 0;
    });

  const labelAttributes = jsonData?.attributes
    .filter(
      (x) =>
        !x.toString().toLowerCase().includes("code") &&
        !x.toString().toLowerCase().includes("area") &&
        !x.toString().toLowerCase().includes("flag") &&
        !x.toString().toLowerCase().includes("note")
    )
    .filter((attribute) =>
      isAttributeSuitableForLabels(jsonData.data, attribute)
    );

  return (
    <div>
      <h1>{dataset}</h1>
      {sortedAttributes?.map((x, index) => (
        <p key={index}>{x}</p>
      ))}
      <div>
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
              <TestLineChart
                dataset={jsonData}
                labelKey={selectedLabel}
                valueKey={selectedData}
                datasetLabel="Line Chart"
              />
            </Grid>
            <Grid item xl={6} xs={12}>
              <PieChartImpl
                dataset={jsonData}
                labelKey={selectedLabel}
                valueKey={selectedData}
                datasetLabel="Pie Chart"
              />
            </Grid>
            <Grid item xl={6} xs={12}>
              <BarChart />
            </Grid>
            <Grid item xs={6}>
              <LineChart />
            </Grid>
            <Grid item xs={6}>
              <PieChart />
            </Grid>
            <Grid item xs={6}>
              <DoughnutChart />
            </Grid>
            <Grid item xs={8}>
              <LineChart2
                data={jsonData}
                labelKey="Year"
                valueKey="Value"
                datasetLabel="Line Chart"
              />
            </Grid>
          </Grid>
          {/* <BarChart />
          <LineChart />
          <PieChart />
          <DoughnutChart /> */}
          <LineChart2
            data={jsonData}
            labelKey="Year"
            valueKey="Value"
            datasetLabel="Line Chart"
          />
        </Box>
      )}
    </div>
  );
};