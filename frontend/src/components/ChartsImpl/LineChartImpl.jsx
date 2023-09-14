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

import { Line } from "react-chartjs-2";

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
}) => {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    setChart(dataset.data);
  }, [dataset, labelKey, valueKey, datasetLabel]);

  const labels = chart?.map((row) => row[labelKey]).slice(0, size);
  const values = chart?.map((row) => row[valueKey]).slice(0, size);
  const items = chart?.map((row) => row["Item"]).slice(0, size);
  const elements = chart?.map((row) => row["Element"]).slice(0, size);

  const xScaleType =
    labelKey.toLowerCase().trim() === "year" ? "linear" : "category";
  const yScaleType =
    valueKey.toLowerCase().trim() === "year" ? "linear" : "category";

  console.log(xScaleType, yScaleType);
  console.log(elements);

  var data = {
    //x-axis
    // time or categories
    labels: labels,
    // labels: [...new Set(labels)],
    datasets: [
      {
        label: `${valueKey}`,
      //   labels: [
      //     'green',
      //     'yellow',
      //     'red',
      //     'purple',
      //     'blue',
      // ],
        //y-axis
        data: values,
        // data: [...new Set(values)],

        backgroundColor: colors,
        // borderColor: colors,
        borderColor: "rgba(247, 153, 166, 1)",
        borderWidth: 1.25,
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
        // type: yScaleType,
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

  return (
    <div>
      <Line data={data} height={400} options={options} />
    </div>
  );
};
