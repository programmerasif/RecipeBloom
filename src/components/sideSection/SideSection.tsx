import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { useAppSelector } from '@/lib/hooks'
import premiumLogo from "../../assets/premium.png";

const SideSection = () => {
    const [users, setusers] = useState([]);
    const [premium, setIsPremium] = useState();
    const {_id} = useAppSelector((state) => state.user);
    


    const fetchUsers= async () => {
        const response = await fetch(
          `https://recipe-bloom-backend.vercel.app/api/v1/users`
        );
        const allusers = await response.json();
        setusers(allusers);
      };
      useEffect(() => {
        fetchUsers()
      }, []);

      const handelPremium = async() =>{
        const url = `https://recipe-bloom-backend.vercel.app/api/v1/users/promote-premium/${_id}`;
        try {
          const response = await fetch(url, {
            method: 'PATCH', // Specify the request method
            headers: {
              'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify({status:"update"}), // Convert data to JSON string
          });
      
          // Check if the response is ok (status in the range 200-299)
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
      
          const result = await response.json(); // Parse the JSON response
          console.log('Data patched successfully:', result);
          if (result?.success) {
            setIsPremium(true)
          }
        } catch (error) {
          console.error('Error patching data:', error);
        }
      }
  return (
    <div className="sticky top-20 h-[calc(100vh-5rem)] ">
    <Card className=" bg-[#ebf5fb]  drop-shadow-xl ">
      <div className="flex justify-between ">
        <div>
          <CardHeader>
            <CardTitle>Plan Details</CardTitle>
            <CardDescription>
              Features included in your selected plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                "Access to basic recipes",
                "Weekly newsletter",
                "Community forum access",
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </div>
        <div className="flex justify-center items-center px-10">
          <Image
            src={premiumLogo}
            alt="premium logo"
            width={200}
            height={200}
            className=" rounded-md"
          />
        </div>
      </div>
      <div className="w-full p-8" onClick={handelPremium}>
        <button className="w-full bg-[#b1cee0] drop-shadow-xl text-center rounded-md text-black font-semibold py-3">
           {
            premium ? "Already-Premium " : "Get-Premium "
          }
        </button>
      </div>
    </Card>
    <div className="bg-[#ebf5fb]  drop-shadow-xl min-h-[52vh] mt-5">
      <div className="flex flex-col gap-2 p-6">
        {users?.data?.slice(0,6).map((item, index) => (
          <div
            key={index}
            className="drop-shadow-xl bg-gray-50 p-2 rounded-md flex justify-start items-center"
          >
            <div className="flex justify-between w-full items-center">
              <div className="flex justify-start items-center gap-2">
                {" "}
                <Image
                  src={"https://i.ibb.co.com/zSxsmvV/Untitled-design.png"}
                  alt="User profile image"
                  width={50}
                  height={50}
                  className=" rounded-md"
                />
                <span className="flex flex-col ">
                  {" "}
                  <span className="font-semibold">Asif</span>{" "}
                  <small className="text-xs">asifkham@gmail.com</small>
                </span>
              </div>
              <div className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-2 py-1 rounded-full">
                Premium
              </div>
              <div className="xl:flex justify-center items-center gap-1 hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-share-2 text-[#b1cee0]"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                  <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                </svg>
                <span>Flowed by 379</span>
              </div>
              <div className="flex justify-center items-center gap-1 bg-[#b1cee0] px-2 py-2 rounded-full font-semibold ring-2">
                <span className="text-sm">Follow</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default SideSection