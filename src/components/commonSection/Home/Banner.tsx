import Image from "next/image";
import pan from "../../../assets/foodPan.svg";
import "./banner.css";
import { Button } from "@/components/ui/button";

const Banner = () => {
  return (
    <div className="relative lg:h-[calc(82vh-64px)] md:h-[calc(55vh-64px)] h-[calc(82vh-64px)]  overflow-hidden ">
      <div className="absolute bottom-0 left-0 w-[20%] h-1/2 border-double border-l border-b border-[#b1cee0]"></div>
      <div className="flex flex-col md:flex-row justify-between items-start h-[100%] w-full ">
        <div className="flex justify-start items-center h-[100%] w-full md:w-1/2">
          <div className="px-10">
            <h5 className="text-2xl md:text-6xl font-bold w-full md:max-w-[40rem] text-[#1F1F38] leading-snug">
              Effortless Sweets Recipes to Satisfy Your Cravings!
            </h5>
            <p className="text-[#37375e] font-semibold mt-4">
              Satisfy your sweet tooth with simple, delicious recipes that
              anyone can make in minutes. Perfect for beginners and experts
              alike!
            </p>
            <Button className="bg-[#b1cee0] duration-300 text-black  mt-4">
              {" "}
              Start Now
            </Button>
            <div className="mt-8 flex justify-between items-center w-full md:max-w-[40rem] text-5xl font-semibold">
              <div className="flex justify-center items-center gap-5">
                <div>
                  449k <span className="text-sm">Active User</span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-5">
                <div>
                  4.8 <span className="text-sm">Average rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2  h-[100%] hidden md:block">
          <div className="w-full h-full rounded-3xl bg-[#b1cee0] text-white flex justify-center items-center clip-triangle relative"></div>
          <div className="absolute top-[10%] h-[80%]">
            <Image
              src={pan}
              alt="User profile image"
              width={100}
              height={100}
              className=" w-full md:max-w-[800px] h-full  "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
