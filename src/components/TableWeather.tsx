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
    <div>
      {/* Título con un borde ancho y texto centrado */}
      <div
        style={{
          border: "3px solid #1976d2", 
          borderRadius: "16px", 
          padding: "16px", 
          marginBottom: "16px", 
          textAlign: "center",
          backgroundColor: "#f3f4f6", 
          color: "#1976d2",
          fontWeight: "bold",
          fontSize: "1.5rem", 
        }}
      >
        Historial Climático
      </div>

      {/* Tabla */}
      <TableContainer component={Paper} sx={{
      borderRadius: "16px", 
      overflow: "hidden", 
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Hora de inicio</TableCell>
              <TableCell>Hora de fin</TableCell>
              <TableCell align="right">Humedad</TableCell>
              <TableCell align="right">Precipitación</TableCell>
              <TableCell align="right">Nubosidad</TableCell>
              <TableCell align="right">Presión</TableCell>
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
                  {item.pressure} {item.pressureUnit}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
