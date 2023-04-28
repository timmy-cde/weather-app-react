import { useState } from "react";
import Weather from "./lib/Weather";
import { Search } from "./components/Search";
// import { WeatherForm } from "./components/WeatherForm";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  // const [locationInfo, setLocationInfo] = useState({});

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${locationInfo.lat}&lon=${locationInfo.lon}&appid=${apiKey}&units=metric`;

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   console.log(city);
  //   const data = Weather.getWeather(apiUrl);
  //   Promise.all([data]).then(async (res) => {
  //     // const weatherResult = await res[0];
  //     const weatherResult = JSON.parse(JSON.stringify(await res[0]));
  //     console.log(weatherResult.data.name);
  //     console.log(weatherResult.data.main.temp);
  //     console.log(weatherResult.data.weather[0].main);
  //     console.log(weatherResult.data.weather[0].icon);
  //     setWeatherData(weatherResult.data);
  //   });
  // };

  const handleSearch = (searchDatas) => {
    console.log(searchDatas);
    const [lat, lon] = searchDatas.value.split(" ")
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border border-gray-400 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>

      <Search handleSearch={handleSearch} />

      {weatherData && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">{weatherData.name}</h2>
          <p className="text-lg mb-2">{Math.round(weatherData.main.temp)}°C</p>
          <p className="text-gray-500">{weatherData.weather[0].main}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          />
        </div>
      )}
    </div>
  );
}

export default App;
