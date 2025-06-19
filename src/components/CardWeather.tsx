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
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 200, background: 'transparent', border: '2px',
      borderRadius: '8px',
      boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.3), -4px -4px 10px rgba(255, 255, 255, 0.2)',}}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{fontWeight: 'regular', fontSize: '15px', color: "White"}}>
        Guayaquil - Ecuador
      </Typography>
      <Typography component="p" color="text.secondary" sx={{fontWeight: 'bold', fontSize: '25px', color: "White", fontFamily: 'Roboto'}}>
        {formattedDate}
      </Typography>
      <Typography component="p" variant="h4" gutterBottom sx={{fontWeight: 'bold', fontSize: '75px', color: "White", fontFamily: 'Roboto'}}>
        {temperatureC}°C
      </Typography>
      <Typography component="p" variant="h6" gutterBottom sx={{fontWeight: 'bold', fontSize: '15px', color: "White"}}>
        Clima: {condition}
      </Typography>
      <Typography component="p" color="white" sx={{fontWeight: 'regular'}}>
        Viento: {windSpeed} m/s
      </Typography>
      <Typography component="p" color="white" sx={{fontWeight: 'regular'}}>
        Direccion del viento: {windDirection}
      </Typography>
      <Typography component="p" color="white" sx={{fontWeight: 'regular'}}>
        Visibilidad: {visibility} m
      </Typography>
      
      
    </Paper>
  );
};

export default WeatherCard;
