import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';

interface WeatherCardProps {
  temperatureK: number;
  condition: string;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  lastUpdated: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperatureK,
  condition,
  windSpeed,
  windDirection,
  visibility,
  lastUpdated,
}) => {
  // Convertir la temperatura de Kelvin a Celsius
  const temperatureC = (temperatureK - 273.15).toFixed(1);
  // Formatear la fecha y hora de la última actualización
  const formattedDate = format(new Date(lastUpdated), 'dd MMM, HH:mm:ss');

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 200 }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Guayaquil - Ecuador
      </Typography>
      <Typography component="p" color="text.secondary">
        {formattedDate}
      </Typography>
      <Typography component="p" variant="h4" gutterBottom>
        {temperatureC}°C
      </Typography>
      <Typography component="p" variant="h6" gutterBottom>
        {condition}
      </Typography>
      <Typography component="p" color="text.secondary">
        Viento: {windSpeed} m/s
      </Typography>
      <Typography component="p" color="text.secondary">
        Direccion del viento: {windDirection}
      </Typography>
      <Typography component="p" color="text.secondary">
        Visibilidad: {visibility} m
      </Typography>
      
      
    </Paper>
  );
};

export default WeatherCard;
