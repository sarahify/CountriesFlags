import { useContext, useReducer, useState } from "react";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import { ThemeContext } from "../../App";

type ThemeState = {
  theme: "light" | "dark";
};

interface ToggleAction {
  type: "TOGGLE_THEME";
}

function themeReducer(state: ThemeState, action: ToggleAction) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
}




const Navbar = () => {
  const [themeColour, setThemeColour] = useState("light");

  const [state, dispatch] = useReducer(themeReducer, { themeColour: "light" });

 


  const handleToggleColour = () => {
    setThemeColour(!themeColour);
  };
  

  const theme = useContext(ThemeContext);

  console.log({ theme });
  return (
    <div className="">
      <nav className="sticky top-[0px]">
        <div
          className={` ${
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
        </div>
      </nav>
    </div>
  );
};

export default Navbar;




