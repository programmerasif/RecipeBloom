import React from 'react'
import {CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Check, Crown, StarsIcon } from 'lucide-react'
import Image from 'next/image'
import premiumLogo from "../../assets/premium.png";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useAppSelector } from '@/lib/hooks';
const PremiumCart = ({isPremium}:{isPremium:boolean}) => {
    const router = useRouter();
    const {  email } = useAppSelector((state) => state.user);
   
    const handelPremium = async () => {
      if (!email) {
       return Swal.fire({
          title: "Login first?",
          text: "to access this feater you have to login ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Want to Loin?"
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
        
      }
        router.push("/payment");
      };
    const showPremium = async () => {
       return Swal.fire({
            position: "center",
            icon: "info",
            title: "You are already a premium user",
            showConfirmButton: false,
            timer: 1500
          });
    
      };
  return (
    <div className=" bg-[#ebf5fb]  drop-shadow-xl "
    style={{borderRadius:"10px"}}
    >
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
          <button className="w-full flex justify-center items-center bg-blue-600 drop-shadow-xl text-center rounded-md text-white font-semibold py-3 hover:bg-blue-400 duration-300"
          style={{borderRadius:"10px"}}
          >
         {isPremium ? <div className="flex justify-center items-center" onClick={showPremium}> <Crown className="h-5 w-5 mr-1 " /> <span>Premium user</span></div > : <div className="flex justify-center items-center" ><StarsIcon className="mr-2 h-5 w-5" /> <span>Subscribe Now</span></div>}
          </button>
        </div>
      </div>
  )
}

export default PremiumCart