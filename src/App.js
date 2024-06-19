import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import './App.css';

const cities = [
  { name: 'Astana', coordinates: [51.127490, 71.375531] },
  { name: 'Almaty', coordinates: [43.2220, 76.8512] },
  { name: 'Shymkent', coordinates: [42.3417, 69.5901] },
  { name: 'Aktobe', coordinates: [50.2839, 57.1660] },
  { name: 'Atyrau', coordinates: [47.0945, 51.9234] },
  { name: 'Karaganda', coordinates: [49.8028, 73.0877] },
  { name: 'Kostanay', coordinates: [53.2198, 63.6354] },
  { name: 'Kyzylorda', coordinates: [44.8488, 65.4823] },
  { name: 'Pavlodar', coordinates: [52.2870, 76.9674] },
  { name: 'Petropavl', coordinates: [54.8667, 69.1500] },
  { name: 'Taldykorgan', coordinates: [45.0156, 78.3735] },
  { name: 'Taraz', coordinates: [42.9000, 71.3667] },
  { name: 'Oral', coordinates: [51.2333, 51.3667] },
  { name: 'Semey', coordinates: [50.4111, 80.2275] },
  { name: 'Zhezkazgan', coordinates: [47.8048, 67.7143] },
  { name: 'Aktau', coordinates: [43.65107, 51.16006] },
  { name: 'Ust-Kamenogorsk', coordinates: [49.9475, 82.6286] },
];

const kazakhstanCenter = [48.0196, 66.9237];
const kazakhstanZoom = 6; // Начальный масштаб

function App() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = 'a8dd1ef7392012e7083784026bac8e19'; // Ваш API ключ OpenWeatherMap
      const promises = cities.map(async (city) => {
        const [lat, lon] = city.coordinates;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
          );
          return {
            ...city,
            weatherData: response.data,
          };
        } catch (error) {
          console.error(`Error fetching weather data for ${city.name}:`, error);
          return {
            ...city,
            weatherData: null,
          };
        }
      });

      const results = await Promise.all(promises);
      setWeatherData(results);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <MapContainer center={kazakhstanCenter} zoom={kazakhstanZoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {weatherData.map((cityData) => (
          <Marker key={cityData.name} position={cityData.coordinates}>
            <Popup>
              <div>
                <h2>{cityData.name}</h2>
                {cityData.weatherData ? (
                  <>
                    <p>Temperature: {cityData.weatherData.main.temp}°C</p>
                    <p>Weather: {cityData.weatherData.weather[0].description}</p>
                  </>
                ) : (
                  <p>No weather data available</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
