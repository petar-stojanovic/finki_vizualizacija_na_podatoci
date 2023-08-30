import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { DatasetService } from "../../repository/datasetRepository";
import { LineChart } from "../LineChart/LineChart";

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
        <LineChart
          data={jsonData}
          labelKey="Year"
          valueKey="Value"
          datasetLabel="Line Chart"
        />
      )}
    </div>
  );
};
