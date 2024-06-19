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
  { name: 'Ust-Kamenogorsk', coordinates: [49.9475, 82.6286] },
];

const kazakhstanCenter = [48.0196, 66.9237];
const kazakhstanZoom = 6; // Начальный масштаб

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (event) => {
    const city = cities.find(city => city.name === event.target.value);
    setSelectedCity(city);
  };

  useEffect(() => {
    if (selectedCity) {
      const fetchWeatherData = async () => {
        const apiKey = 'a8dd1ef7392012e7083784026bac8e19'; 
        const { coordinates } = selectedCity;
        const [lat, lon] = coordinates;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
          );
          setWeatherData(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };
  
      fetchWeatherData();
    }
  }, [selectedCity]);
  






  return (
    <div className="App">
      <select onChange={handleCityChange}>
        <option value="">Select a city</option>
        {cities.map(city => (
          <option key={city.name} value={city.name}>{city.name}</option>
        ))}
      </select>


      <MapContainer center={kazakhstanCenter} zoom={kazakhstanZoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedCity && (
          <Marker position={selectedCity.coordinates}>

            <Popup>
              {selectedCity.name}
              {weatherData && (
                <div>
                  <p>Temperature: {weatherData.main.temp}°C</p>
                  <p>Weather: {weatherData.weather[0].description}</p>
                </div>
              )}
            </Popup>

          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default App;
