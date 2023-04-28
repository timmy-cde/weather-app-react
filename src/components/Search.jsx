import { AsyncPaginate } from "react-select-async-paginate";
import { getLocationInfo } from "../lib/Weather";

const Search = ({ search, setSearch, unit, setUnit }) => {
  const loadOptions = async (city) => {
    const locationInfo = await getLocationInfo(city);
    return {
      options: !city
        ? []
        : locationInfo.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude} ${city.wikiDataId}`,
              label: `${city.name}, ${city.region}, ${city.countryCode}`,
            };
          }),
    };
  };

  const handleOnChange = (searchResult) => {
    setSearch(searchResult);
  };

  const handleUnitChange = (e) => {
    const currentUnit = e.currentTarget.name;
    if (unit !== currentUnit) {
      setUnit(currentUnit);
    }
  };

  return (
    <div className="grid grid-flow-row-dense grid-cols-6 gap-7 place-content-between">
      <div className="col-span-5">
        <AsyncPaginate
          placeholder="Search for City"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
      </div>
      <div className="flex flex-row items-center">
        <button
          name="metric"
          className="text-lg md:text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitChange}
        >
          °C
        </button>

        <p className="text-lg md:text-xl text-white mx-1">|</p>

        <button
          name="imperial"
          className="text-lg md:text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitChange}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Search;
