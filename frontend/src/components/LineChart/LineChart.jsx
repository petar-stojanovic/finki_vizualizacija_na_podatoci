import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data.data.length > 0) {
      console.log(data.data.map((row) => row["Year"]));
      // Extract labels and chart data from the JSON data
      const labels = data.data.map((row) => row["Year"]);
      const chartData = data.data.map((row) => parseFloat(row["Value"]));

      // Destroy the previous chart instance if it exists to prevent memory leaks
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Create a new Line Chart using Chart.js
      const ctx = chartRef.current.getContext("2d");
      chartRef.current.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Line Chart",
              data: chartData,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
