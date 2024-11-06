import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Check, Crown, StarsIcon } from 'lucide-react'
import Image from 'next/image'
import premiumLogo from "../../assets/premium.png";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
const PremiumCart = ({isPremium}:{isPremium:boolean}) => {
    const router = useRouter();
   
   
    const handelPremium = async () => {
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
        <div className="w-full p-8" >
          <button className="w-full flex justify-center items-center bg-[#b1cee0] drop-shadow-xl text-center rounded-md text-black font-semibold py-3 hover:bg-[#b1cee0a9] duration-300">
         {isPremium ? <div className="flex justify-center items-center" onClick={showPremium}> <Crown className="h-5 w-5 mr-1 " /> <span>Premium user</span></div > : <div className="flex justify-center items-center" onClick={handelPremium}><StarsIcon className="mr-2 h-5 w-5" /> <span>Subscribe Now</span></div>}
          </button>
        </div>
      </Card>
  )
}

export default PremiumCart