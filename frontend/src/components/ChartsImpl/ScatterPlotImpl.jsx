import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

import { Scatter } from "react-chartjs-2";

import { enUS } from "date-fns/locale";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const ScatterPlot = ({
  dataset,
  labelKey,
  valueKey,
  datasetLabel,
  size,
}) => {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    setChart(dataset.data);
  }, [dataset, labelKey, valueKey, datasetLabel]);

  const labels = chart?.map((row) => row[labelKey]).slice(0, size);
  const values = chart?.map((row) => row[valueKey]).slice(0, size);
  const xScaleType = labels.every((label) => !isNaN(label))
    ? "linear" // Numeric data (years)
    : "category"; // Categorical data

  var data = {
    labels: labels,
    datasets: [
      {
        label: `${valueKey}:`,
        data: values.map((value, index) => ({
          x: labels[index],
          y: value,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  var options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: labelKey,
        },
        type: xScaleType,
        distribution: "linear",
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
    tension: 0.5, // Adjust this for scatterplot appearance
  };

  return (
    <div>
      <Scatter data={data} height={400} options={options} />
    </div>
  );
};
