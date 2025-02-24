import { createContext, useContext, useReducer } from "react";
import "./App.css";
import CountryFlagDetails from "./Components/CountryFlagDetails";
import FetchCountryFlagsAndRegions from "./Components/FetchCountryFlagsAndRegions";
import { BrowserRouter, Route, Routes } from "react-router-dom";



type ThemeState = {
  theme: "light" | "dark";
};


export const ThemeContext = createContext<ThemeState>({theme:"dark"});

interface ToggleAction {
  type: "TOGGLE_THEME";
}

export const themeReducer= (state:ThemeState , action:ToggleAction)=>{
  switch (action.type){
    case "TOGGLE_THEME": 
    debugger;
    const newState = state.theme === "light" ? "dark" : "light" 
      return state.theme = newState
    default:
      return state
  }
}

function App() {

    const [theme, dispatch] = useReducer(themeReducer, {theme:"dark"});

    console.log({theme})
  
  return (
    <>
    <ThemeContext.Provider value={{theme, dispatch}}>
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
