import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Item from '../interface/Item';

// TableWeather.tsx
interface TableWeatherProps {
  itemsIn: Item[];
}

export default function TableWeather({ itemsIn }: TableWeatherProps) {
  const formatTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hora de inicio</TableCell>
            <TableCell>Hora de fin</TableCell>
            <TableCell align="right">Humedad</TableCell>
            <TableCell align="right">Precipitación</TableCell>
            <TableCell align="right">Nubosidad</TableCell>
            <TableCell align="right">Presión</TableCell> {/* Nueva columna */}
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsIn.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{formatTime(item.dateStart as string)}</TableCell>
              <TableCell>{formatTime(item.dateEnd as string)}</TableCell>
              <TableCell align="right">{item.humidity}</TableCell>
              <TableCell align="right">{item.precipitation}</TableCell>
              <TableCell align="right">{item.clouds}</TableCell>
              <TableCell align="right">
                {item.pressure} {item.pressureUnit}{" "}
                {/* Mostrar presión y unidad */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
