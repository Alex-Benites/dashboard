import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Wind Speed Over Time",
  hAxis: {
    title: "Time of Day",
    titleTextStyle: { color: "#333" },
  },
  vAxis: {
    title: "Wind Speed (mps)",
    minValue: 0,
  },
  chartArea: { width: "60%", height: "70%" },
  colors: ["#1E88E5"],
};

interface WindSpeedChartProps {
  windSpeedData: Array<[string, number]>;
}

export default function WindSpeedChart({ windSpeedData }: WindSpeedChartProps) {
  const data = [["Time", "Wind Speed (mps)"], ...windSpeedData];

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
