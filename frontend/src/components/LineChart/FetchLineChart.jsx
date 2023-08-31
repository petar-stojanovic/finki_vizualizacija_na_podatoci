import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DatasetService } from "../../repository/datasetRepository";
import { LineChart as LineChart2 } from "../LineChart/LineChart";

import { BarChart, DoughnutChart, LineChart, PieChart } from "../Charts/charts";

export const FetchLineChart = () => {
  const { dataset } = useParams();

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    fetchDataForDataset(dataset);
  }, [dataset]);

  const fetchDataForDataset = async (datasetName) => {
    DatasetService.getData(datasetName)
      .then((response) => {
        setJsonData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dataset data:", error);
      });
  };

  return (
    <div>
      {jsonData?.data && jsonData.data.length > 0 && (
        <Box sx={{ mt: "26px" }}>
          <Grid
            container
            spacing={5}
            alignItems="center"
            justifyContent="center"
          >
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
              />{" "}
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
