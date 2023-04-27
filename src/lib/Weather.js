import axios from "axios";

const Weather = {
  getLocationInfo: async (url) => {
    try {
      const res = await axios.get(url);
      const data = JSON.parse(JSON.stringify(res.data[0]));
      return {
        name: data.name,
        country: data.country,
        lon: data.lon,
        lat: data.lat,
      };
    } catch (error) {
      return error;
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
