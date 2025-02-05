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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { code } = useParams();

  const handleToggleColour = () => {
    setThemeColour(!themeColour);
  };

  useEffect(() => {
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

    if (code) {
      fetchCountryDetails();
    }
  }, [code]);

  console.log(
    { country },
  );

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
            <div className=" flex flex-row items-center justify-between">
              <div>
                <img
                  src={country.flags.svg}
                  alt={country.flags.alt || `Flag of ${country.name.common}`}
                  className="h-80 border rounded-lg shadow-lg"
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
                <h2 className="text-sm">
                  SubRegion: {country.subregion} henry
                </h2>
                <h2 className="text-sm">Capital: {country.capital}</h2>
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

              {/* <div className="flex items-center gap-8">Border Countries: {country.borders.map((border) => <span key={border} className="border border-amber-300">{border}</span>)}</div> */}


            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryFlagDetails;
