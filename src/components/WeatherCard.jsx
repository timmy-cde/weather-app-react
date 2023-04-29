import { iconUrl } from "../lib/Weather";

import {
  UilCompass,
  UilTemperature,
  UilTear,
  UilWind,
} from "@iconscout/react-unicons";

const WeatherCard = ({
  description,
  temp,
  icon,
  feels_like,
  humidity,
  pressure,
  speed,
  unit,
}) => {
  return (
    <div className="flex justify-center m-3">
      <div className="border-solid border-2 rounded-lg border-gray-300 bg-zinc-700/25 flex flex-row items-center justify-center p-3 px-10 gap-10">
        <div className="text-5xl font-bold text-white">
          <p>
            {temp.toFixed()}°{unit === "metric" ? "C" : "F"}
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <img className="w-25 -mt-7" src={iconUrl(icon)} alt="weather-icon" />

          <div className="text-lg -mt-3 mb-3 capitalize text-center text-cyan-300">
            {description}
          </div>

          <div className="flex flex-col space-y-2 text-white">
            <div className="flex font-light text-sm items-center justify-center">
              <UilTemperature size={18} className="mr-1" />
              Real feel:{" "}
              <span className="font-medium ml-1">
                {feels_like.toFixed()}°{unit === "metric" ? "C" : "F"}
              </span>
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

            <div className="flex font-light text-sm items-center justify-center">
              <UilCompass size={18} className="mr-1" />
              Pressure: <span className="font-medium ml-1">{pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
