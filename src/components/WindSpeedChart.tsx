import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Paper from '@mui/material/Paper';

interface WindSpeedChartProps {
  windSpeedData: number[];
  windSpeedLabels: string[];
}

const WindSpeedChart: React.FC<WindSpeedChartProps> = ({ windSpeedData, windSpeedLabels }) => {
  // Comprobación de datos
  if (windSpeedData.length === 0 || windSpeedLabels.length === 0) {
    return <div>No data available</div>; // Mensaje alternativo si no hay datos
  }

  // Formateo de etiquetas de tiempo
  const formattedLabels = windSpeedLabels.map(label => {
    // Verificar si la etiqueta es una fecha válida
    const date = new Date(label);
    return !isNaN(date.getTime())
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      : label;
  });

  console.log('Wind Speed Data:', windSpeedData); // Verificar los datos
  console.log('Formatted Wind Speed Labels:', formattedLabels); // Verificar etiquetas formateadas

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Verificar si los datos están llegando correctamente */}
      <div>Rendering WindSpeedChart with data: {windSpeedData.length} points</div>
      <LineChart
        width={500}
        height={300}
        xAxis={[{ data: formattedLabels, label: 'Time' }]} // Configuración de etiquetas de tiempo
        series={[
          {
            data: windSpeedData,
            label: 'Wind Speed (mps)',
            color: 'blue', // Color de la línea
            area: true, // Descomenta esto si quieres un gráfico de área
          },
        ]}
      />
    </Paper>
  );
};

export default WindSpeedChart;