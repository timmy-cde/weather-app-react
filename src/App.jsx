import { useState, useEffect } from "react";
import { getWeather } from "./lib/Weather";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState(null);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const handleSearch = async (search) => {
      if (search) {
        const [lat, lon, cityId] = search.value.split(" ");
        try {
          const data = await getWeather(lat, lon, cityId, unit);
          setWeatherData(data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    handleSearch(search);
  }, [search, unit]);

  const formatBackground = () => {
    if (!weatherData) return "from-cyan-700 to-blue-700";
    const threshold = unit === "metric" ? 20 : 60;
    if (weatherData.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-cyan-700 to-orange-700";
  };

  return (
    <div
      className={`h-screen w-screen py-20 sm:py-25 px-10 md:px-20 bg-gradient-to-br ${formatBackground()}`}
    >
      <div className="mx-auto max-w-screen-md ">
        <Search
          search={search}
          setSearch={setSearch}
          unit={unit}
          setUnit={setUnit}
        />
        {weatherData && (
          <CurrentWeather weatherData={weatherData} unit={unit} />
        )}
      </div>
    </div>
  );
}

export default App;
