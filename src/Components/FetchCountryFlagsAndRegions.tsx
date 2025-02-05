import BedtimeIcon from "@mui/icons-material/Bedtime";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CountryData {
  name: { common: string; official: string };
  population: number;
  region: string;
  capital: string;
  ccn3:string;
  flags: {
    svg: string;
    png: string;
  };
}

const baseUrl = "https://restcountries.com/v3.1";

const FetchCountryFlagsAndRegions = () => {
  const [themeColour, setThemeColour] = useState(false);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleToggleColour = () => {
    setThemeColour(!themeColour);
  };

  // Fetch countries from API
  const fetchCountries = async (baseUrl: string) => {
    try {
      setLoading(true);
      setError(null); // Reset error state
      const response = await axios.get<CountryData[]>(baseUrl);
      setCountries(response.data);
      console.log(response);
    } catch (err) {
      setError("Error fetching countries. Please try again.");
      setCountries([]); // Reset countries on error
    } finally {
      setLoading(false);
    }
  };
  

   // Debounced Search Functionality
   useEffect(() => {
    const debounce = setTimeout(() => {
      if(searchQuery) {
        fetchCountries(`${baseUrl}/name/${searchQuery}`);
      } else {
        fetchCountries(`${baseUrl}/all`);
      }
    }, 50);
    return() => clearTimeout(debounce);
   }, [searchQuery])
 

  // Search functionality
  const handleSearch = () => {
    setLoading(true);
    if (searchQuery) {
      fetchCountries(`${baseUrl}/name/${searchQuery}`);
    } else {
      fetchCountries(`${baseUrl}/all`);
    }
  };

  // Region filtering
  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    if (region !== "All") {
      fetchCountries(`${baseUrl}/region/${region}`);
    } else {
      fetchCountries(`${baseUrl}/all`);
    }
  };



  return (
    <div>
      <div
        className={`h-screen ${
          themeColour ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between shadow p-4 px-20">
          <h1 className="font-semibold text-3xl">Where in the world!</h1>
          <div
            onClick={handleToggleColour}
            className="flex flex-row gap-2 cursor-pointer mt-4"
          >
            <BedtimeIcon className="text-gray-200" />
            <p>{themeColour? "Dark" : "Light" } Mode</p>
          </div>
        </div>
        {/* SEARCH AND FILTER ICON: */}
        <div className="px-5 md:px-20">
          <div className="flex flex-col md:flex-row item-center justify-between gap-6">
            {/* SEARCHICON */}
            <div
              className=" flex items-center border border-gray-400 p-2 gap-3 rounded-lg mt-8"
            >
              <SearchIcon />
              <input
                type="search"
                placeholder="Searching for a country"
                className="w-96 p-2 bg-transparent text-sm outline-none" onClick={handleSearch}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* FILTERCOUNTRY */}
            <div className="flex items-center border border-gray-400 p-2 gap-3 rounded-lg mt-8 w-36">
              <select
                className="p-2 bg-transparent text-sm outline-none"
                value={selectedRegion}
                onChange={(e) => handleRegionChange(e.target.value)}
              >
                <option value="All">Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-2xl mt-10">Loading countries...</p>
          ) : error ? (
            <p className="text-center text-2xl mt-10 text-red-500">{error}</p>
          ) : (
            <div className="mt-20 gap-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {countries.length > 0 ? (
                countries.map((country, index) => (
                  <div
                    key={index}
                    className="shadow rounded-lg overflow-hidden"
                  >
                    <img
                    onClick={() => {navigate(`/country/${country?.ccn3}`)}}
                      src={country.flags.svg}
                      alt={`${country.name.common} flag`}
                      className="h-40 w-full object-cover cursor-pointer"
                    />
                    <div className="p-4">
                      <p className="text-xl font-semibold">
                        {country.name.common}
                      </p>
                      <p className="text-sm text-gray-400">
                        Population: {country.population}
                      </p>
                      <p className="text-sm text-gray-400">
                        Region: {country.region}
                      </p>
                      <p className="text-sm text-gray-400">
                        Capital: {country.capital}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-2xl col-span-4">
                  No countries found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FetchCountryFlagsAndRegions;
