import "./App.css";
import FetchCountryFlagsAndRegions from "./Components/FetchCountryFlagsAndRegions";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FetchCountryFlagsAndRegions />} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
