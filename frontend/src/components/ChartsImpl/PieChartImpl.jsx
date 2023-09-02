import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";
import { getRandomColor } from "./randomColor";

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
        data: [...new Set(values)].slice(0, [...new Set(labels)].length),
        // backgroundColor: Object.values(Utils.CHART_COLORS),
        backgroundColor: getRandomColor([...new Set(labels)].length),

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
