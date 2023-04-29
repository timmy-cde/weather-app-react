import {
  UilArrowUp,
  UilArrowDown,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime } from "../lib/Weather";
import WeatherCard from "./WeatherCard";

const CurrentWeather = ({
  weatherData: {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    pressure,
    name,
    country,
    sunrise,
    sunset,
    description,
    icon,
    speed,
    timezone,
  },
  unit,
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center my-3">
        <p className="text-white text-2xl mt-5 font-medium">{`${name}, ${country}`}</p>
      </div>

      <WeatherCard
        description={description}
        temp={temp}
        feels_like={feels_like}
        humidity={humidity}
        pressure={pressure}
        icon={icon}
        speed={speed}
        unit={unit}
      />

      <div className="flex flex-row items-center justify-between text-white py-3">
        <UilSun />
        <p className="font-light md:text-base text-xs">
          Rise:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone)}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilSunset />
        <p className="font-light md:text-base text-xs">
          Sunset:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone)}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilArrowUp />
        <p className="font-light md:text-base text-xs">
          High:{" "}
          <span className="font-medium ml-1">
            {temp_min.toFixed()}°{unit === "metric" ? "C" : "F"}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilArrowDown />
        <p className="font-light md:text-base text-xs">
          Low:{" "}
          <span className="font-medium ml-1">
            {temp_max.toFixed()}°{unit === "metric" ? "C" : "F"}
          </span>
        </p>
      </div>
    </>
  );
};

export default CurrentWeather;
