// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// import { DatasetService } from "../../repository/datasetRepository";

// export const DatasetPage = () => {
//   const navigate = useNavigate();
//   const { code } = useParams();
//   const [datasetData, setDatasetData] = useState(null);

//   useEffect(() => {
//     fetchDatasetData();
//   }, [code]);

  
//   const fetchDatasetData = async () => {
//     try {
//       const response = await DatasetService.getData(code);
//       console.log(response);
//       if (response.data) {
//         setDatasetData(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleClick = async (code) => {
//     // navigate(`/dataset/${code}`, { state: { categoryData: code } });
//   };

//   if (datasetData === null) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="main-dashboard">
//       <h3>Dataset:</h3>
//     </div>
//   );

// };

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { DatasetService } from "../../repository/datasetRepository";

import { BarChart, DoughnutChart, LineChart, PieChart } from "../Charts/charts";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { PieChartImpl, LineChartImpl } from "../ChartsImpl/chartsImpl";


import { ScatterPlot } from "../ChartsImpl/ScatterPlotImpl";

export const DatasetPage = () => {
  const { code } = useParams();

  const [jsonData, setJsonData] = useState(null);

  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedData, setSelectedData] = useState("");
  const [size, setSize] = useState(100);

  const location = useLocation();
  const currentPath = decodeURIComponent(location.pathname);
  const parts = currentPath.split('/');

  let category = '/category/';
  (parts.length > 2) ? category += parts[2] : category += "";

  console.log(category);

  useEffect(() => {
    fetchDataForDataset(code);
  }, [code]);

  const fetchDataForDataset = async (datasetName) => {
    DatasetService.getData(datasetName)
      .then((response) => {
        const formattedData = response.data.data.map((item) => ({
          ...item,
          Value: parseFloat(item.Value).toFixed(2),
        }));

        setJsonData({
          ...response.data,
          data: formattedData,
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
        !x.toString().toLowerCase().includes("source") &&
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
        !x.toString().toLowerCase().includes("source") &&
        !x.toString().toLowerCase().includes("note")
    )
    .filter((attribute) =>
      isAttributeSuitableForLabels(jsonData.data, attribute)
    );

  return (
    <div class="dataset-dashboard">
      <a href={category} className="backLink">../Back</a>
      <h2>{code}</h2>
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
        <button onClick={() => setSize(size - 10)}>-</button>
        <button onClick={() => setSize(size + 10)}>+</button>
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
                datasetLabel="Line Chart"
              />
            </Grid>
            <Grid item xl={6} xs={12}>
              <PieChartImpl
                dataset={jsonData}
                labelKey={selectedLabel}
                valueKey={selectedData}
                size={size}
                datasetLabel="Pie Chart"
              />
            </Grid>
            <Grid item xl={6} xs={12}>
              <ScatterPlot
                dataset={jsonData}
                labelKey={selectedLabel}
                valueKey={selectedData}
                size={size}
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
          </Grid>
        </Box>
      )}
    </div>
  );
};

