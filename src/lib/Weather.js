import axios from "axios";

const Weather = {
  getLocationInfo: async (city) => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
      }`;
    if (city) {
      const res = await axios.get(url);
      return res;
    }
  },
  getWeather: async (url) => {
    try {
      const res = await axios.get(url);
      const data = JSON.parse(JSON.stringify(res));
      return data;
    } catch (error) {
      return error;
    }
  },
};

export default Weather;
