
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//import { useEffect, useState } from 'react';
import Item from '../interface/Item';

// TableWeather.tsx
interface TableWeatherProps {
  itemsIn: Item[];
  selectedVariable: string;
}


export default function TableWeather({ itemsIn, selectedVariable }: TableWeatherProps) {
  //const [rows, setRows] = useState<Item[]>([]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hora de inicio</TableCell>
            <TableCell>Hora de fin</TableCell>
            <TableCell align="right">
              {selectedVariable.charAt(0).toUpperCase() +
                selectedVariable.slice(1)}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsIn.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.dateStart}</TableCell>
              <TableCell>{item.dateEnd}</TableCell>
              <TableCell align="right">
                {item[selectedVariable as keyof Item]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}