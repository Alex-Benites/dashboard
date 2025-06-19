import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useRef } from 'react';


// ControlWeather.tsx
interface ControlWeatherProps {
    selectedVariable: string;
    onVariableChange: (variable: string) => void;
}
export default function ControlWeather({ selectedVariable, onVariableChange }: ControlWeatherProps) {


    {/* Variable de estado y función de actualización */}
    //let [selected, setSelected] = useState(-1)

    {/* Constante de referencia a un elemento HTML */ }
    const descriptionRef = useRef<HTMLDivElement>(null);

     {/* Arreglo de objetos */}
     const items = [
        { name: 'Precipitación', value: 'precipitation', description: '' },
        { name: 'Humedad', value: 'humidity', description: '' },
        { name: 'Nubosidad', value: 'clouds', description: '' },
    ];

     {/* Arreglo de elementos JSX */}
     const options = items.map((item, key) => (
        <MenuItem key={key} value={item.value}>
          {item.name}
        </MenuItem>
     ));
     /*
     const handleChange = (event: SelectChangeEvent) => {
        const variable = event.target.value;
        onVariableChange(variable);
			
        const idx = items.findIndex((item) => item.value === variable);
        if (descriptionRef.current !== null) {
            descriptionRef.current.innerHTML = idx >= 0 ? items[idx]['description'] : '';
        }

    };*/

    const handleChange = (event: SelectChangeEvent) => {
      onVariableChange(event.target.value);
    };


        
     {/* JSX */}
     return (
       <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: "16px", 
        overflow: "hidden", 
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        background: '#f3f3f3'
      }}
    >
      <Typography mb={2} component="h3" variant="h6" color="primary">
        Variables Meteorológicas
      </Typography>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">Variables</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            label="Variables"
            value={selectedVariable}
            onChange={handleChange}
          >
            {options}
          </Select>
        </FormControl>
      </Box>

      <Typography ref={descriptionRef} mt={2} component="p" color="text.secondary">
        {(() => {
          const idx = items.findIndex((item) => item.value === selectedVariable);
          return idx >= 0 ? items[idx]['description'] : '';
        })()}
      </Typography>
    </Paper>
     );
 }