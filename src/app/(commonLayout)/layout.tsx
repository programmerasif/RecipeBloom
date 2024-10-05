import Navbar from "@/components/common/Navbar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto min-h-screen dark:text-white text-black dark:bg-black">
      <Navbar />

      {children}
    </div>
  );
};

export default CommonLayout;
