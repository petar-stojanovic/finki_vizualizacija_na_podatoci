import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChartImpl = ({
  dataset,
  labelKey,
  valueKey,
  size,
  colors,
  datasetLabel,
}) => {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    setChart(dataset.data);
  }, [dataset, labelKey, valueKey, datasetLabel]);

  const labels = chart?.map((row) => row[labelKey]).slice(0, size);
  const values = chart?.map((row) => row[valueKey]).slice(0, size);
  const items = chart?.map((row) => row["Item"]).slice(0, size);

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
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
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
  };

  return (
    <div>
      <Pie data={data} height={400} options={options} />
    </div>
  );
};
