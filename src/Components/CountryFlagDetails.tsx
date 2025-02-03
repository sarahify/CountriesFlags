import React, { useEffect, useState } from "react";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const baseUrl = "https://restcountries.com/v3.1"

interface Country {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  languages?: {
    [key: string]: string;
  };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
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
  const [country, setCountry] = useState<Country[]>([]);
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

  console.log({ country });

  return (
    <div>
      <div
        className={`h-screen ${
          themeColour ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between p-4 shadow overflow-hidden">
          <h1 className="font-semibold text-3xl">Where in the world!</h1>
          <div
            onClick={handleToggleColour}
            className="flex flex-row gap-2 cursor-pointer mt-4"
          >
            <BedtimeIcon className="text-gray-200" />
            <p>{themeColour ? "Dark" : "Light"} Mode</p>
          </div>
        </div>
        <div
          className="border border-gray-400 p-2 rounded-lg mt-8 w-36 cursor-pointer gap-16"
          onClick={() => navigate("/")}
        >
          <ArrowBackIcon />
          <button>Back</button>
        </div>
      </div>
    </div>
  );
};

export default CountryFlagDetails;
