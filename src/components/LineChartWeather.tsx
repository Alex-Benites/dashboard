import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';

interface LineChartWeatherProps {
  selectedVariable: string;
  humidityData: number[];
  precipitationData: number[];
  cloudsData: number[];
  timeLabels: string[];
}

export default function LineChartWeather({
  selectedVariable,
  humidityData,
  precipitationData,
  cloudsData,
  timeLabels,
}: LineChartWeatherProps) {
  let data;
  let label;

  switch (selectedVariable) {
    case 'precipitation':
      data = precipitationData;
      label = 'Precipitación';
      break;
    case 'clouds':
      data = cloudsData;
      label = 'Nubosidad';
      break;
    case 'humidity':
    default:
      data = humidityData;
      label = 'Humedad';
      break;
  }

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LineChart
        width={400}
        height={250}
        series={[{ data, label }]}
        xAxis={[{ scaleType: 'point', data: timeLabels }]}
      />
    </Paper>
  );
}
