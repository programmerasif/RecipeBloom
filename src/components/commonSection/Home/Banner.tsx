import Image from "next/image";
import pan from '../../../assets/pan.png'
import "./banner.css";
const Banner = () => {
  return (
    <div className="relative  h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex justify-between items-start h-full w-full">
        <div>hello</div>
        <div className=" w-1/2  h-[80%]">
          <div className="w-full h-full rounded-3xl bg-gradient-to-r from-[#FFF3DE] to-[#FFE0AB]  text-white flex justify-center items-center clip-triangle relative">
         
          </div>
          <div className="absolute top-0 h-[60%]]">
          <Image
              src={pan}
              alt="User profile image"
              width={100}
              height={100}
              className=" w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
