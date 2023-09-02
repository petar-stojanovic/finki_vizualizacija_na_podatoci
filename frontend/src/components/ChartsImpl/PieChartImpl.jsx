import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChartImpl = ({ dataset, labelKey, valueKey, datasetLabel }) => {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    setChart(dataset.data);
  }, [dataset, labelKey, valueKey, datasetLabel]);

  const labels = chart?.map((row) => row[labelKey]).slice(0, 150);
  const values = chart?.map((row) => row[valueKey]).slice(0, 150);
  const xScaleType = labels.every((label) => !isNaN(label))
    ? "linear" // Numeric data (years)
    : "category"; // Categorical data

  var data = {
    //x-axis
    // time or categories
    // labels: labels,
    labels: [...new Set(labels)],
    datasets: [
      {
        label: `${valueKey}:`,
        //y-axis
        // data: values,
        data: [...new Set(values)],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(176, 43, 84, 0.53)",
          "rgba(63, 97, 45, 0.18)",
          "rgba(112, 200, 16, 0.76)",
          "rgba(240, 62, 190, 0.87)",
          "rgba(92, 188, 247, 0.65)",
          "rgba(31, 142, 38, 0.45)",
          "rgba(205, 176, 29, 0.91)",
          "rgba(56, 88, 232, 0.36)",
          "rgba(20, 185, 167, 0.07)",
          "rgba(187, 73, 140, 0.29)",
          "rgba(19, 66, 195, 0.82)",
          "rgba(105, 224, 243, 0.5)",
          "rgba(32, 55, 118, 0.96)",
          "rgba(217, 163, 168, 0.09)",
          "rgba(14, 120, 34, 0.68)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(176, 43, 84, 0.53)",
          "rgba(63, 97, 45, 0.18)",
          "rgba(112, 200, 16, 0.76)",
          "rgba(240, 62, 190, 0.87)",
          "rgba(92, 188, 247, 0.65)",
          "rgba(31, 142, 38, 0.45)",
          "rgba(205, 176, 29, 0.91)",
          "rgba(56, 88, 232, 0.36)",
          "rgba(20, 185, 167, 0.07)",
          "rgba(187, 73, 140, 0.29)",
          "rgba(19, 66, 195, 0.82)",
          "rgba(105, 224, 243, 0.5)",
          "rgba(32, 55, 118, 0.96)",
          "rgba(217, 163, 168, 0.09)",
          "rgba(14, 120, 34, 0.68)",
        ],
        borderWidth: 1,
      },
    ],
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
  };

  return (
    <div>
      <Pie data={data} height={400} options={options} />
    </div>
  );
};
