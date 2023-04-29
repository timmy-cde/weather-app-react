import { DateTime } from "luxon";
import axios from "axios";

const OPEN_WEATHER_API = "12f39b1ac82cde866d3ed8650efdec5a";
const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const GEO_DB_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";

export const getLocationInfo = async (city) => {
  const options = {
    method: "GET",
    url: `${GEO_DB_BASE_URL}`,
    params: {
      minPopulation: "100000",
      namePrefix: city,
    },
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "e9ca034f2amsh2997a3b011e6684p1c448ejsnbea54ad8b5b2",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  if (city) {
    try {
      const response = await axios.request(options);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export const getWeather = async (lat, lon, cityId, unit) => {
  const options = {
    method: "GET",
    url: `${GEO_DB_BASE_URL}/${cityId}`,
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "e9ca034f2amsh2997a3b011e6684p1c448ejsnbea54ad8b5b2",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };
  const cityDetails = axios.request(options);

  const weatherUrl = `${OPEN_WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API}&units=${unit}`;
  const weatherData = axios.get(weatherUrl);

  try {
    const [weatherResponse, cityResponse] = await Promise.all([
      weatherData,
      cityDetails,
    ]);
    const weatherResult = weatherResponse.data;
    const cityDetailsResult = cityResponse.data.data;

    return weatherDetails(weatherResult, cityDetailsResult);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export const formatToLocalTime = (sec, zone, format = "hh:mm a") => {
  const timezone = `${zone}`.replace("__", "/");
  return DateTime.fromSeconds(sec).setZone(timezone).toFormat(format);
};

export const iconUrl = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

const weatherDetails = (weatherData, cityDetailsData) => {
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    name,
    sys: { country, sunrise, sunset },
  } = weatherData;

  const { description, icon } = weather[0];

  const { timezone } = cityDetailsData;

  return {
    name,
    description,
    icon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    sunrise,
    sunset,
    timezone,
  };
};
