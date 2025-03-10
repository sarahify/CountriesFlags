import { useContext} from "react";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import { ThemeContext } from "../../App";





const Navbar = () => {
  const useTheme =()=> useContext(ThemeContext)

  const {theme, dispatch} = useTheme();

 function handleToggleColour(){
    dispatch({type: "TOGGLE_THEME"})
 }

  console.log({ state: theme });

  return (
    <div className="">
      <nav className="sticky top-[0px]">
        <div
          className={` ${
            theme?.theme==="light"? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between p-4 shadow overflow-hidden px-30">
            <h1 className="font-semibold text-3xl">Where in the world!</h1>
            <div
              onClick={handleToggleColour}
              className="flex flex-row gap-2 cursor-pointer mt-4"
            >
              <BedtimeIcon className="text-gray-200" />
              <p>{theme?.theme==="light" ? "Dark" : "Light"} Mode</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;




