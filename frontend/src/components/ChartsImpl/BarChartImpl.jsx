import { BarElement, Chart as ChartJS } from "chart.js";
import React, { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement);

export const BarChartImpl = ({
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
              `- ${context.formattedValue} ${elementValue} `,""
            ];
          },
        },
      },
    }
  };

  return (
    <div>
      <Bar data={data} height={400} options={options} />
    </div>
  );
};
