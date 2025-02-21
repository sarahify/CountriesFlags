import "./App.css";
import CountryFlagDetails from "./Components/CountryFlagDetails";
import FetchCountryFlagsAndRegions from "./Components/FetchCountryFlagsAndRegions";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FetchCountryFlagsAndRegions />} />
          <Route path="/country/:code" element={<CountryFlagDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
