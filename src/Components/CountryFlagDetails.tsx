import React, { useEffect, useState } from "react";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      cat: {
        official: string;
        common: string;
      };
    };
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  languages: { [key: string]: string };
  currencies: { [key: string]: { name: string; symbol: string } };
  cca3: string;
  borders: string[];

  flags: {
    svg: string;
    alt?: string;
  };
}

// interface CountryDetailsProps {
//   CountryName: string;
// }

const baseUrl = "https://restcountries.com/v3.1";

const CountryFlagDetails = () => {
  const navigate = useNavigate();
  const [themeColour, setThemeColour] = useState(false);
  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountry, setBorderCountry] = useState<Country[] | null>(null);
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { code } = useParams();

  const handleToggleColour = () => {
    setThemeColour(!themeColour);
  };

  // const fetchCountryDetails = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const response = await axios.get(`${baseUrl}/alpha/${code}`);
  //     // console.log(response.data);
  //     setCountry(response.data[0]); // The API returns an array

  //   } catch (error) {
  //     console.error("Error fetching country:", error);
  //     setError("Error fetching countries. Please try again.");

  //   }  finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   if (code) {
  //     fetchCountryDetails();
  //   }

  // },[code])

  const fetchCountryDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${baseUrl}/alpha/${code}`);
      // console.log(response.data);
      setCountry(response.data[0]); // The API returns an array
    } catch (error) {
      console.error("Error fetching country:", error);
      setError("Error fetching countries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCountriesDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${baseUrl}/all`);
      // console.log(response.data);
      setCountries(response.data); // The API returns an array
    } catch (error) {
      console.error("Error fetching country:", error);
      setError("Error fetching countries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code) {
      fetchCountryDetails();
      fetchCountriesDetails();
    }
  }, []);

  function getBorderCountries(borders: string[]) {
    //Write a function that filter the countries by the borders arg and returns a list of country names
    const filtered = countries?.filter((country) =>
      borders.includes(country?.cca3)
    );

    if (filtered?.length) setBorderCountry(filtered);
  }

  useEffect(() => {
    if (country?.borders) {
      getBorderCountries(country.borders);
    }
  }, [country?.borders]);

  console.log({ borderCountry });

  //Run the border country code through the countries array

  return (
    <div>
      <div
        className={`h-screen ${
          themeColour ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between p-4 shadow overflow-hidden px-30">
          <h1 className="font-semibold text-3xl">Where in the world!</h1>
          <div
            onClick={handleToggleColour}
            className="flex flex-row gap-2 cursor-pointer mt-4"
          >
            <BedtimeIcon className="text-gray-200" />
            <p>{themeColour ? "Dark" : "Light"} Mode</p>
          </div>
        </div>
        <div className="px-30">
          <div
            className="border border-gray-400 p-2 rounded-lg mt-8 w-36 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <ArrowBackIcon />
            <button>Back</button>
          </div>

          {loading && (
            <p className="text-center mt-10">Loading country details...</p>
          )}
          {error && <p className="text-center text-red-500 mt-10">{error}</p>}

          {country && (
            <div className=" flex flex-row items-center justify-between mt-10">
              <div>
                <img
                  src={country.flags.svg}
                  alt={country.flags.alt || `Flag of ${country.name.common}`}
                  className="w-70 rounded-lg shadow-lg"
                />
              </div>
              <div className="">
                <h2 className="text-3xl font-semibold">
                  {country.name.common}
                </h2>
                <h2>
                  Native Name:{" "}
                  {Object.values(country?.name.nativeName || {})[0].common}
                </h2>

                <h2 className="text-sm">Population: {country.population}</h2>
                <h2 className="text-sm">Region: {country.region}</h2>
                <h2 className="text-sm">Sub Region: {country.subregion}</h2>
                <h2 className="text-sm">Capital: {country.capital}</h2>

                <div className="">
                  {borderCountry?.length && (
                    <div className="flex items-center justify-between mt-14 gap-3">
                      Border Countries:{" "}
                      {borderCountry?.map((country, index) => (
                        <p
                          key={index}
                          className="border border-gray-500 bg-white text-gray-400 shadow p-2 rounded-sm"
                        >
                          {country?.name?.official}
                        </p>
                      ))}{" "}
                    </div>
                  )}
                </div>

               
              </div>

              <div className="">
                <h2>Top Level Domain: .be</h2>
                <h2>
                  Currencies:{" "}
                  {Object.values(country?.currencies || {})
                    .map((item) => item.name)
                    .toString()}
                </h2>
                <h2>
                  Languages:{" "}
                  {Object.values(country?.languages || {}).toString()}
                </h2>
              </div>
            </div>
          )}

          {/* <div className="">
            {borderCountry?.length && (
              <div className="flex items-center justify-between">
                Border Countries:{" "}
                {borderCountry?.map((country, index) => (
                  <p key={index} className="border border-gray-500 bg-gray-600 p-2 rounded-sm">{country?.name?.official}</p>
                ))}{" "}
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CountryFlagDetails;
