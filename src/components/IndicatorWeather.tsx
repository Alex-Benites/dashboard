import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface Indicator {
    title?: String;
    subtitle?: String;
    value?: String;
}

export default function IndicatorWeather(config: Indicator) {
    return (
        <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              background: 'transparent',
              border: '2px',
              borderRadius: '8px',
              boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.3), -4px -4px 10px rgba(255, 255, 255, 0.2)',
            }}
          >
            {/*
            <Typography component="h2" variant="h6" color="white" gutterBottom sx={{fontWeight: 'bold', fontSize: '25px'}}>
                {config.title} 
            </Typography>*/}
            <Typography color="white" sx={{ flex: 1,fontWeight: 'regular', fontSize: '25px'}}>
                {config.subtitle}
            </Typography>
            <Typography component="p" variant="h4" color= "white" sx={{fontWeight: 'bold', fontSize: '45px'}}>
                {config.value}
            </Typography>
        </Paper> 
    )
}