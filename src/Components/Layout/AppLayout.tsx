import { ReactNode } from "react";
import Navbar from "./Navbar";

type LayoutReferrence = {
  children: ReactNode;
};

const AppLayout = ({ children }: LayoutReferrence) => {
  return (
    <>
      <div>
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default AppLayout;
