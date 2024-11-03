import Navbar from "@/components/common/Navbar";
import { ReactNode, Suspense } from "react";
import Loading from "../loading";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
<div className="container mx-auto min-h-screen dark:text-white text-black dark:bg-black">
      <Navbar />
      {children}
    </div>
    </Suspense>
    
  );
};

export default CommonLayout;
