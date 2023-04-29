import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrl } from "../lib/Weather";

const CurrentWeather = ({
  weatherData: {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
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
        <div className="flex items-center justify-center pt-6 text-xl capitalize text-cyan-300">
          {description}
        </div>
      </div>

      {/* temperature and details */}

      <div className="flex flex-row items-center justify-between text-white py-3">
        <img className="w-20 md:w-24" src={iconUrl(icon)} alt="weather-icon" />

        <p className="text-5xl">{temp.toFixed()}°</p>

        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Real feel:{" "}
            <span className="font-medium ml-1">{feels_like.toFixed()}°</span>
          </div>

          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:{" "}
            <span className="font-medium ml-1">{humidity.toFixed()}%</span>
          </div>

          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:{" "}
            <span className="font-medium ml-1">
              {speed.toFixed()} {unit === "metric" ? "m/s" : "mi/hr"}
            </span>
          </div>
        </div>
      </div>

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
          High: <span className="font-medium ml-1">{temp_min.toFixed()}°</span>
        </p>
        <p className="font-light">|</p>

        <UilArrowDown />
        <p className="font-light md:text-base text-xs">
          Low: <span className="font-medium ml-1">{temp_max.toFixed()}°</span>
        </p>
        <p className="font-light">|</p>
      </div>
    </>
  );
};

export default CurrentWeather;
