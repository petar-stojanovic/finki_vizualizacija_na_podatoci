import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { Line } from "react-chartjs-2";

import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import { DatasetService } from "../../repository/datasetRepository";

// import { enUS } from "date-fns/locale";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChartImpl = ({
  dataset,
  labelKey,
  valueKey,
  datasetLabel,
  size,
  colors,
  name,
}) => {
  const [chart, setChart] = useState([]);
  const [dataShown, setDataShown] = useState(labelKey);

  useEffect(() => {
    setChart(dataset.data);
  }, [dataset, labelKey, valueKey, datasetLabel]);

  const labels = chart?.map((row) => row[labelKey]).slice(0, size);
  const values = chart?.map((row) => row[valueKey]).slice(0, size);
  const items = chart?.map((row) => row["Item"]).slice(0, size);

  const elementsToShow = [
    ...new Set(chart?.map((row) => row[`${dataShown}`]).slice(0, size)),
  ];

  const datasets = elementsToShow.map((element, i) => {
    const datasetValues = values.filter((value, index) => {
      // Filter values based on the element and size
      const dataElement = chart[index][dataShown];
      return dataElement === element && index < size;
    });

    const dataset = {
      label: `(${element})`,
      data: datasetValues,
      backgroundColor: colors[i],
      borderColor: "rgba(247, 153, 166, 1)",
      borderWidth: 1.25,
    };

    return dataset;
  });

  const xScaleType =
    labelKey.toLowerCase().trim() === "year" ? "linear" : "category";

  const handleDataShown = (event) => {
    setDataShown(event.target.value);
  };

  var data = {
    //x-axis
    labels: labels,
    datasets: datasets,
  };

  var options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 235,
        },
        title: {
          display: true,
          text: labelKey,
        },
        type: xScaleType,
      },
      y: {
        title: {
          display: true,
          text: valueKey,
        },
      },
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
    tension: 1,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataIndex = context.dataIndex;
            const elementValue = dataset.data[dataIndex].Element;

            return [
              `${items[dataIndex]} (${context.label})`,
              `- ${context.formattedValue} ${elementValue} `,
              "",
            ];
          },
        },
      },
    },
    elements: {
      point: {
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    },
  };

  const downloadWholeDataset = async (name) => {
    try {
      const response = await DatasetService.downloadDataset(name);

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.csv`;
      document.body.appendChild(a);

      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading dataset:", error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <FormControl sx={{ m: 1, minWidth: 160 }}>
          <InputLabel htmlFor="label-select">Label</InputLabel>
          <Select
            value={dataShown}
            onChange={handleDataShown}
            id="label-select"
            label="Label"
          >
            {dataset?.attributes.map((attribute, index) => (
              <MenuItem key={index} value={attribute}>
                {attribute}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          style={{ textTransform: "none" }}
          color="error"
          component="label"
          variant="outlined"
          startIcon={<DownloadIcon />}
        >
          Filtered Data
        </Button>
        <Button
          style={{ textTransform: "none" }}
          color="error"
          component="label"
          variant="outlined"
          onClick={() => downloadWholeDataset(name)}
          startIcon={<DownloadIcon />}
        >
          Whole Dataset
        </Button>
      </div>
      <div>
        <Line data={data} height={400} options={options} />
      </div>
    </>
  );
};
