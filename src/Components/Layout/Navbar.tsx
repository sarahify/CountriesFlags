import { useState } from "react";
import BedtimeIcon from "@mui/icons-material/Bedtime";


const Navbar = () => {
//   const [state, dispatch] = useReducer(reducer, { themeColour: false });
  const [themeColour, setThemeColour] = useState(false)

  const handleToggleColour = () => {
      setThemeColour(!themeColour)
  }

  return (
    <div>
      <nav>
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










// import { useReducer } from "react";
// import BedtimeIcon from "@mui/icons-material/Bedtime";

// // Reducer function
// const reducer = (state: { themeColour: boolean }, action: { type: string }) => {
//   switch (action.type) {
//     case "TOGGLE_THEME":
//       return { themeColour: !state.themeColour };
//     default:
//       return state;
//   }
// };

// const Navbar = () => {
//   const [state, dispatch] = useReducer(reducer, { themeColour: false });

//   return (
//     <div>
//       <nav>
//         <div
//           className={`${
//             state.themeColour ? "bg-gray-900 text-white" : "bg-white text-black"
//           }`}
//         >
//           <div className="flex flex-col md:flex-row items-center justify-between p-4 shadow overflow-hidden px-30">
//             <h1 className="font-semibold text-3xl">Where in the world!</h1>
//             <div
//               onClick={() => dispatch({ type: "TOGGLE_THEME" })}
//               className="flex flex-row gap-2 cursor-pointer mt-4"
//             >
//               <BedtimeIcon className="text-gray-200" />
//               <p>{state.themeColour ? "Dark" : "Light"} Mode</p>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;







