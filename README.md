# Dashboard Meteorológico

Un dashboard interactivo en tiempo real para visualizar datos meteorológicos de Guayaquil, Ecuador. Desarrollado con React, TypeScript y Vite.

## Características

- **Información en tiempo real**: Muestra temperatura, condiciones climáticas, velocidad del viento y visibilidad actual
- **Visualización de datos históricos**: Tabla con historial de las últimas 12 horas
- **Gráficos interactivos**:
  - Gráfico de líneas para humedad, precipitación y nubosidad
  - Gráfico de velocidad del viento
- **Diseño responsivo**: Adaptado para diferentes tamaños de pantalla
- **Interfaz moderna**: Utiliza Material-UI con diseño personalizado

## Tecnologías Utilizadas

- React 18
- TypeScript
- Vite
- Material-UI (MUI)
- React Google Charts
- OpenWeatherMap API
- date-fns

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn
- API Key de OpenWeatherMap

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/alex-benites/dashboard.git
cd dashboard
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Configura tu API Key de OpenWeatherMap:
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega tu API Key:
   ```env
   VITE_OPENWEATHERMAP_API_KEY=tu_api_key_aqui
   ```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

5. Abre tu navegador y visita `http://localhost:5173`

## Uso

- Almacena tu ubicación preferida para el pronóstico del tiempo
- Consulta el clima actual y el pronóstico extendido
- Visualiza datos históricos y gráficos meteorológicos


## Contacto

- **Autor**: Alex Benites
- **Email**: benitesseguraa@gmail.com
- **GitHub**: [alex-benites](https://github.com/alex-benites)

