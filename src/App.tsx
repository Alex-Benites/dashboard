import './App.css'
import Grid from '@mui/material/Grid2' 
import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import WeatherCard from './components/CardWeather';
import Item from './interface/Item';


{/* Hooks */ }
import { useEffect, useState } from 'react';

 interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}

function App() {
  {
    /* Variable de estado y función de actualización */
  }
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

  {
    /* Hook: useEffect */
  }

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
      {
        /* Referencia a las claves del LocalStorage: openWeatherMap y expiringTime */
      }
      let savedTextXML = localStorage.getItem("openWeatherMap") || "";
      let expiringTime = localStorage.getItem("expiringTime");

      {
        /* Obtenga la estampa de tiempo actual */
      }
      let nowTime = new Date().getTime();

      {
        /* Verifique si es que no existe la clave expiringTime o si la estampa de tiempo actual supera el tiempo de expiración */
      }
      if (expiringTime === null || nowTime > parseInt(expiringTime)) {
        {
          /* Request */
        }
        let API_KEY = "7b1c486c081e257c8e4038d058aaf936";
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`
        );
        let savedTextXML = await response.text();

        {
          /* Tiempo de expiración */
        }
        let hours = 0.5;
        let delay = hours * 3600000;
        let expiringTime = nowTime + delay;

        {
          /* En el LocalStorage, almacene el texto en la clave openWeatherMap, estampa actual y estampa de tiempo de expiración */
        }
        localStorage.setItem("openWeatherMap", savedTextXML);
        localStorage.setItem("expiringTime", expiringTime.toString());
        localStorage.setItem("nowTime", nowTime.toString());

        {
          /* DateTime */
        }
        localStorage.setItem(
          "expiringDateTime",
          new Date(expiringTime).toString()
        );
        localStorage.setItem("nowDateTime", new Date(nowTime).toString());

        {
          /* Modificación de la variable de estado mediante la función de actualización */
        }
        setOWM(savedTextXML);
      }

      {
        /* Valide el procesamiento con el valor de savedTextXML */
      }
      if (savedTextXML) {
        {
          /* XML Parser */
        }
        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");

        {
          /* Arreglo para agregar los resultados */
        }

        let dataToIndicators: Indicator[] = new Array<Indicator>();
        let dataToItems: Item[] = [];
        let humidityValues: number[] = [];
        let precipitationValues: number[] = [];
        let cloudsValues: number[] = [];
        let labels: string[] = [];
        let pressureValues: string[] = [];
        let pressureUnits: string[] = [];

        // Extraer la primera entrada de pronóstico
        const firstTimeEntry = xml.getElementsByTagName("time")[0];

        if (firstTimeEntry) {
          const temperatureK = parseFloat(
            firstTimeEntry
              .getElementsByTagName("temperature")[0]
              ?.getAttribute("value") || "0"
          );
          const condition =
            firstTimeEntry
              .getElementsByTagName("symbol")[0]
              ?.getAttribute("name") || "Desconocido";
          const windSpeed = parseFloat(
            firstTimeEntry
              .getElementsByTagName("windSpeed")[0]
              ?.getAttribute("mps") || "0"
          );
          const windDirection =
            firstTimeEntry
              .getElementsByTagName("windDirection")[0]
              ?.getAttribute("name") || "Desconocido";
          const visibility = parseFloat(
            firstTimeEntry
              .getElementsByTagName("visibility")[0]
              ?.getAttribute("value") || "0"
          );
          //const lastUpdated = new Date().toISOString();

          setWeatherData({
            temperatureK,
            condition,
            windSpeed,
            windDirection,
            visibility,
            lastUpdated: currentTime,
          });
        }

        const times = xml.getElementsByTagName("time");
        for (let i = 0; i < Math.min(6, times.length); i++) {
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
          if (pressure) {
            pressureValues.push(pressure);
          }
          if (pressureUnit) {
            pressureUnits.push(pressureUnit);
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
          title: "Location",
          subtitle: "City",
          value: name,
        });

        let location = xml.getElementsByTagName("location")[1];

        let latitude = location.getAttribute("latitude") || "";
        dataToIndicators.push({
          title: "Location",
          subtitle: "Latitude",
          value: latitude,
        });

        let longitude = location.getAttribute("longitude") || "";
        dataToIndicators.push({
          title: "Location",
          subtitle: "Longitude",
          value: longitude,
        });

        let altitude = location.getAttribute("altitude") || "";
        dataToIndicators.push({
          title: "Location",
          subtitle: "Altitude",
          value: altitude,
        });

        {
          /* Modificación de la variable de estado mediante la función de actualización */
        }
        setIndicators(dataToIndicators);
        setItems(dataToItems);
        setHumidityData(humidityValues);
        setPrecipitationData(precipitationValues);
        setCloudsData(cloudsValues);
        setTimeLabels(labels);
      }
    };

    request();
  }, [owm, currentTime]);

  let renderIndicators = () => {
    return indicators.map((indicator, idx) => (
      <Grid key={idx} size={{ xs: 12, md: 3 }}>
        <IndicatorWeather
          title={indicator["title"]}
          subtitle={indicator["subtitle"]}
          value={indicator["value"]}
        />
      </Grid>
    ));
  };

  return (
    <Grid container spacing={5}>

      {/* Card principal*/}
      {weatherData && (
        <Grid size={{ xs: 12, xl: 8 }}>
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
      {renderIndicators()}
      {/* Tabla */}
      <Grid size={{ xs: 12, xl: 8 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, xl: 3 }}>
            <ControlWeather
              selectedVariable={selectedVariable}
              onVariableChange={setSelectedVariable}
            />
          </Grid>
          <Grid size={{ xs: 12, xl: 9 }}>
            <TableWeather itemsIn={items} />
          </Grid>
        </Grid>
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 4 }}>
        <LineChartWeather
          selectedVariable={selectedVariable}
          humidityData={humidityData}
          precipitationData={precipitationData}
          cloudsData={cloudsData}
          timeLabels={timeLabels}
        />
      </Grid>
    </Grid>
  );
}

export default App