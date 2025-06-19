import './App.css'
import Grid from '@mui/material/Grid2'
import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import WeatherCard from './components/CardWeather';
import Item from './interface/Item';
import WindSpeedChart from './components/WindSpeedChart';
import ImageComponent from "./components/ImageComponent";

import muchasNubes from './images/muchasNubes.png';
import nubesDespejadas from './images/nubesDespejadas.png';
import LluviaLigera from './images/LluviaLigera.png';
import LluviaModerada from './images/LluviModerada.png';
import pocasNubes from './images/pocasNubes.png';
import scaredCloud from './images/scaredCloud.png';

import { useEffect, useState } from 'react';

interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
}

function App() {
  let [indicators, setIndicators] = useState<Indicator[]>([]);
  let [owm, setOWM] = useState(localStorage.getItem("openWeatherMap"));
  let [items, setItems] = useState<Item[]>([]);
  let [weatherData, setWeatherData] = useState<any>(null);
  let [currentTime, setCurrentTime] = useState<string>(new Date().toISOString());

  const [humidityData, setHumidityData] = useState<number[]>([]);
  const [precipitationData, setPrecipitationData] = useState<number[]>([]);
  const [cloudsData, setCloudsData] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);
  const [selectedVariable, setSelectedVariable] = useState("humidity"); // Valor por defecto
  const [windSpeedData, setWindSpeedData] = useState<Array<[string, number]>>([]);
  const [currentImage, setCurrentImage] = useState<string>(muchasNubes);

  // Mapeo de condiciones climáticas a imágenes
  const conditionToImageMap: { [key: string]: string } = {
    'broken clouds': nubesDespejadas,
    'overcast clouds': muchasNubes,
    'light rain': LluviaLigera,
    'moderate rain': LluviaModerada,
    'few clouds': pocasNubes,
    'scattered clouds': scaredCloud,
  };



  {/* Hooks: useEffect */}



  useEffect(() => {
    const fetchWindSpeedData = () => {
      let savedTextXML = localStorage.getItem("openWeatherMap") || "";
      if (savedTextXML) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");
        const times = xml.getElementsByTagName("time");
        const windSpeedValues: Array<[string, number]> = [];

        for (let i = 0; i < times.length; i++) {
          const time = times[i];
          const fromTime = time.getAttribute("from") || "";
          const windSpeed = parseFloat(
            time.getElementsByTagName("windSpeed")[0]?.getAttribute("mps") || "0"
          );

          if (fromTime) {
            const formattedTime = new Date(fromTime)
              .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            windSpeedValues.push([formattedTime, windSpeed]);
          }
        }

        setWindSpeedData(windSpeedValues);
      }
    };

    fetchWindSpeedData();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      let savedTextXML = localStorage.getItem("openWeatherMap") || "";
      if (savedTextXML) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");

        // Extraer la primera entrada de pronóstico
        const firstTimeEntry = xml.getElementsByTagName('time')[0];

        if (firstTimeEntry) {
          const temperatureK = parseFloat(firstTimeEntry.getElementsByTagName('temperature')[0]?.getAttribute('value') || '0');
          const condition = firstTimeEntry.getElementsByTagName('symbol')[0]?.getAttribute('name') || 'Desconocido';
          const windSpeed = parseFloat(firstTimeEntry.getElementsByTagName('windSpeed')[0]?.getAttribute('mps') || '0');
          const windDirection = firstTimeEntry.getElementsByTagName('windDirection')[0]?.getAttribute('name') || 'Desconocido';
          const visibility = parseFloat(firstTimeEntry.getElementsByTagName('visibility')[0]?.getAttribute('value') || '0');

          setWeatherData({
            temperatureK,
            condition,
            windSpeed,
            windDirection,
            visibility,
            lastUpdated: currentTime,
          });

          // Actualizar la imagen según la condición
          const imageUrl = conditionToImageMap[condition] || muchasNubes;
          setCurrentImage(imageUrl);
        }
      }
    };

    fetchWeatherData();
  }, [currentTime]);

  useEffect(() => {
    // Función para actualizar la hora en tiempo real
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let request = async () => {
      let savedTextXML = localStorage.getItem("openWeatherMap") || "";
      let expiringTime = localStorage.getItem("expiringTime");
      let nowTime = new Date().getTime();

      if (expiringTime === null || nowTime > parseInt(expiringTime)) {
        let API_KEY = "7b1c486c081e257c8e4038d058aaf936";
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`
        );
        let savedTextXML = await response.text();
        let hours = 0.5;
        let delay = hours * 3600000;
        let expiringTime = nowTime + delay;

        localStorage.setItem("openWeatherMap", savedTextXML);
        localStorage.setItem("expiringTime", expiringTime.toString());
        localStorage.setItem("nowTime", nowTime.toString());
        localStorage.setItem(
          "expiringDateTime",
          new Date(expiringTime).toString()
        );
        localStorage.setItem("nowDateTime", new Date(nowTime).toString());
        setOWM(savedTextXML);
      }
      if (savedTextXML) {

        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");
        let dataToIndicators: Indicator[] = new Array<Indicator>();
        let dataToItems: Item[] = [];
        let humidityValues: number[] = [];
        let precipitationValues: number[] = [];
        let cloudsValues: number[] = [];
        let labels: string[] = [];


        const times = xml.getElementsByTagName("time");
        for (let i = 0; i < Math.min(12, times.length); i++) {
          const time = times[i];
          const dateStart = time.getAttribute("from") || "";
          const dateEnd = time.getAttribute("to") || "";
          const precipitation =
            time
              .getElementsByTagName("precipitation")[0]
              ?.getAttribute("probability") || "";
          const humidity =
            time.getElementsByTagName("humidity")[0]?.getAttribute("value") ||
            "";
          const clouds =
            time.getElementsByTagName("clouds")[0]?.getAttribute("all") || "";
          const pressure =
            time.getElementsByTagName("pressure")[0]?.getAttribute("value") ||
            "";
          const pressureUnit =
            time.getElementsByTagName("pressure")[0]?.getAttribute("unit") ||
            "";

          dataToItems.push({
            dateStart,
            dateEnd,
            precipitation,
            humidity,
            clouds,
            pressure,
            pressureUnit,
          });

          if (humidity) {
            humidityValues.push(parseFloat(humidity));
          }
          if (precipitation) {
            precipitationValues.push(parseFloat(precipitation));
          }
          if (clouds) {
            cloudsValues.push(parseFloat(clouds));
          }

          labels.push(dateStart);
        }

        {
          /*
            Análisis, extracción y almacenamiento del contenido del XML
            en el arreglo de resultados
        */
        }

        let name = xml.getElementsByTagName("name")[0].innerHTML || "";
        dataToIndicators.push({
          title: "Indicator 1",
          subtitle: "City",
          value: name,
        });

        let location = xml.getElementsByTagName("location")[1];

        let latitude = location.getAttribute("latitude") || "";
        dataToIndicators.push({
          title: "Indicator 2",
          subtitle: "Latitude",
          value: latitude,
        });

        let longitude = location.getAttribute("longitude") || "";
        dataToIndicators.push({
          title: "Indicator 3",
          subtitle: "Longitude",
          value: longitude,
        });

        let altitude = location.getAttribute("altitude") || "";
        dataToIndicators.push({
          title: "Indicator 4",
          subtitle: "Altitude",
          value: altitude,
        });


        setIndicators(dataToIndicators);
        setItems(dataToItems);
        setHumidityData(humidityValues.slice(0, 6));
        setPrecipitationData(precipitationValues.slice(0, 6));
        setCloudsData(cloudsValues.slice(0, 6));
        setTimeLabels(labels.slice(0, 6));

      }
    };

    request();
  }, [owm]);

  let renderIndicators = () => {
    return indicators.map((indicator, idx) => (

      <Grid key={idx} size={{ xs:12, sm:6, md:3 }} sx={{ padding: '10px' }} >
      {/*<Grid key={idx} size={{ xs: 12, md: 3 }} >*/}
        <IndicatorWeather
          title={indicator["title"]}
          subtitle={indicator["subtitle"]}
          value={indicator["value"]}
         />
      </Grid>
    ));
  };

  return (
    <Grid container spacing={3} sx={{ padding: '16px' }}>
      {/* Card principal*/}
      {weatherData && (

        <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ textAlign: "left", marginBottom: '16px' }} >
        {/*<Grid size={{ xs: 3 }} sx={{ textAlign: "left", marginRight:"650px"}} >*/}
          <WeatherCard
            temperatureK={weatherData.temperatureK}
            condition={weatherData.condition}
            windSpeed={weatherData.windSpeed}
            windDirection={weatherData.windDirection}
            visibility={weatherData.visibility}
            lastUpdated={weatherData.lastUpdated}
          />
        </Grid>

      )}
      {/*Grid spacing={20}*/}

      <Grid size={{ xs:8, sm:8, md:9 }} sx={{ marginBottom: '16px' }} spacing={20}>
        <ImageComponent
          imageUrl={currentImage}
          altText="Ejemplo de imagen"
          width="50%"
          height="250px"

        />
      </Grid>
      <Grid size={{ xs:6 , sm: 15, md: 15 }} container spacing={5}>
      {/*<Grid container size={{ xs: 15 }} spacing={5} className= "indicator">*/}
        {renderIndicators()}
      </Grid>


      {/*<Grid size={{ xs: 12, xl: 4 }}>*/}
      <Grid size={{ xs:6 , sm: 15, md: 15 }} sx={{ marginTop: '16px' }}>
          <ControlWeather
            selectedVariable={selectedVariable}
            onVariableChange={setSelectedVariable}
          />
      </Grid>


      {/* Contenedor para los gráficos y la tabla */}
      {/*<Grid container spacing={2} >*/}
      <Grid container spacing={23} >
        <Grid container direction="column" spacing={5}>
          {/*<Grid size={{ xs: 12, xl: 5 }}>*/}
          <Grid size={{ xs: 7, md: 12, xl:5, sm:15}} sx={{ marginBottom: '16px' }}>
            <LineChartWeather
              selectedVariable={selectedVariable}
              humidityData={humidityData}
              precipitationData={precipitationData}
              cloudsData={cloudsData}
              timeLabels={timeLabels}
            />
          </Grid>

          {/* Segundo gráfico */}
          {/*<Grid size={{ xs: 12 }} sx={{borderRadius: "16px", overflow: "hidden", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",}}>*/}
          <Grid size={{xs:12, md:12, xl:5, sm:8}} sx={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",  }}>
            <WindSpeedChart windSpeedData={windSpeedData} />
          </Grid>
        </Grid>

        <Grid  container direction="column" spacing={5}>
          {/*<Grid sx={{ width: "123%", height: "200%", marginLeft: "30px" }} spacing={5}>*/}
          <Grid size={{xs:12}} sx={{ marginTop: '16px' }}>
            <TableWeather itemsIn={items} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App