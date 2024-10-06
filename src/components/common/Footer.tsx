/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import logo from '../../assets/logo.svg'
import Image from "next/image";

const Footer = () => {
  return (
    <div className=" bg-[#FFF3DE] min-h-[20vh] shadow-xl mt-20 w-full">
      <div className=" px-4 sm:px-6 lg:px-20  w-full">
        <div className=" text-white flex justify-center items-center flex-col w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full  py-5 md:py-20">
            <div className="flex flex-col justify-between items-start">
              <Link href="/" className="flex justify-end flex-1 md:flex-none">
              
                <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className=" w-20 object-cover "
            />
              </Link>
              <div className="font-semibold text-[#37375e]">
                Providing reliable Service since 2010
              </div>
            </div>

            <div className="flex flex-col">
              <h5 className="text-xl font-semibold text-[#37375e]">Contact</h5>
              <div className="text-[#37375e]">
                <p className="text-sm text-[#37375e]">
                  {` 102,Cox's Bazar, Dhaka, Banglaesh.`}
                </p>
                <h5 className="text-2xl font-semibold mt-5 flex justify-start gap-2 items-center">
                  <span>+880-1721520848</span>{" "}
                </h5>
                <p className="flex justify-st items-center gap-2 border-b-2 border-[#F54749] w-full md:w-[75%]">
                  <span>recipe.boom.g@gmail.com </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-[#37375e]">
              <span className=" text-xl font-semibold">Legal</span>
              <a className="cursor-pointer hover:underline">Terms of use</a>
              <a className="cursor-pointer hover:underline">Privacy policy</a>
              <a className="cursor-pointer hover:underline">Cookie policy</a>
            </div>
            <div className="flex flex-col gap-3 text-[#37375e]">
              <span className=" text-xl font-semibold">Company</span>
              <a className="cursor-pointer hover:underline">About us</a>
              <a className="cursor-pointer hover:underline">Contact</a>
              <a className="cursor-pointer hover:underline">Jobs</a>
            </div>
          </div>
          <div className="text-[#37375e] flex justify-between items-center border-t-2 border-[#37375e73] w-full text-sm py-5 text-center sm:text-start">
            <div> 2024 - All right reserved by Asif Khan</div>
            <div className="flex gap-4">
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
