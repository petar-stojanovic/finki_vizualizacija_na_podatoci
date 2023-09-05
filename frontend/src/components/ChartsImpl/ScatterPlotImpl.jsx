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

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ScatterPlot = ({
  dataset,
  labelKey,
  valueKey,
  datasetLabel,
  size,
  colors,
}) => {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    setChart(dataset.data);
  }, [dataset, labelKey, valueKey, datasetLabel]);

  const labels = chart?.map((row) => row[labelKey]).slice(0, size);
  const values = chart?.map((row) => row[valueKey]).slice(0, size);
  const items = chart?.map((row) => row["Item"]).slice(0, size);

  var data = {
    labels: labels,
    datasets: [
      {
        label: `${valueKey}:`,
        data: values.map((value, index) => ({
          x: labels[index],
          y: value,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.35)",
        borderColor: "rgba(75, 192, 192, 0.5)",
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
            console.log(context);
            const dataIndex = context.dataIndex;
            const elementValue = dataset.data[dataIndex].Element;

            const formattedValue = context.formattedValue
              .replace(/[,()]/g, "")
              .split(" ");

            return [
              `${items[dataIndex]} (${context.label})`,
              `- ${formattedValue[1]} ${elementValue} `,
              "",
            ];
          },
        },
      },
    },
    elements: {
      point: {
        pointRadius: 10,
        pointHoverRadius: 12,
      },
    },
  };

  return (
    <div>
      <Scatter data={data} height={400} options={options} />
    </div>
  );
};
