import Image from "next/image";
import pan from "../../../assets/pan.svg";
import "./banner.css";
import { Button } from "@/components/ui/button";
const Banner = () => {
  return (
    <div className="relative  h-[calc(82vh-64px)] overflow-hidden">
      <div className="flex justify-between items-start h-[100%] w-full ">
        <div className="flex justify-start items-center h-[100%] w-1/2">
          <div>
            <h5 className="text-6xl font-bold max-w-[40rem] text-[#1F1F38] leading-snug">
              Effortless Sweets Recipes to Satisfy Your Cravings!
            </h5>
            <p className="text-[#37375e] font-semibold mt-4">
              Satisfy your sweet tooth with simple, delicious recipes that
              anyone can make in minutes. Perfect for beginners and experts
              alike!
            </p>
            <Button className="bg-[#F54749] duration-300  mt-4">
              {" "}
              Start Now
            </Button>
            <div className="mt-8 flex justify-between items-center max-w-[40rem] text-5xl font-semibold">
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
        <div className=" w-1/2  h-[100%]">
          <div className="w-full h-full rounded-3xl bg-gradient-to-r from-[#FFF3DE] to-[#FFE0AB]  text-white flex justify-center items-center clip-triangle relative"></div>
          <div className="absolute top-[10%] h-[80%]">
            <Image
              src={pan}
              alt="User profile image"
              width={100}
              height={100}
              className=" w-full h-full object-cover "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
