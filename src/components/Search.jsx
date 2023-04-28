import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import Weather from "../lib/Weather";

export const Search = ({ handleSearch }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (city) => {
      const locationInfo = await Weather.getLocationInfo(city);
      
      return {
        options: !city
          ? []
          : locationInfo.data.map((city) => {
              return {
                value: `${city.lat} ${city.lon}`,
                label: `${city.name}, ${city.state ? `${city.state},` : ""} ${
                  city.country
                }`,
              };
            }),
      };
  }

  const handleOnChange = (searchResult) => {
    setSearch(searchResult);
    handleSearch(searchResult);
  };

  return (
    <AsyncPaginate
      placeholder="Search for City"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};
