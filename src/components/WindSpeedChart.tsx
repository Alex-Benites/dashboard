import { Chart } from "react-google-charts";

export const options = {
  title: "Velocidad del viento por dia",
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
  // Asegúrate de que los valores sean numéricos
  const cleanedData = windSpeedData.map(([time, speed]) => [time, Number(speed)]);
  
  const data = [["Time", "Wind Speed (mps)"], ...cleanedData];

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
