import { createContext, useReducer } from "react";
import "./App.css";
import CountryFlagDetails from "./Components/CountryFlagDetails";
import FetchCountryFlagsAndRegions from "./Components/FetchCountryFlagsAndRegions";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const ThemeContext = createContext<"dark" | "light">("dark");



function App() {
  
  return (
    <>
    <ThemeContext.Provider value={"dark"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FetchCountryFlagsAndRegions />} />
          <Route path="/country/:code" element={<CountryFlagDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
    </>
  );
}

export default App;
