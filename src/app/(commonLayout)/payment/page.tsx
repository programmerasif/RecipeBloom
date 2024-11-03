/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useGetUsersStatusQuery } from "@/redux/api/features/auth/authApi";
import { setIsPremiumMembership } from "@/redux/api/features/usersSlice/usersSlice";
import { Check, CreditCard, Loader, Shield, Zap } from "lucide-react"
import { useState } from "react";
import Swal from "sweetalert2";

const PremiumMembershipPage = () => {
  const { data: userStatus} = useGetUsersStatusQuery(undefined);
  const { _id, email } = useAppSelector((state) => state.user);
  const [premium, setIsPremium] = useState<boolean>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();


  const user = userStatus?.data.find((item: any) => item?.email == email);
  const isPremium = user?.isPremium;

  const handelPremium = async () => {
    setLoading(true);
    if (isPremium || premium) {
      setLoading(false);
      return Swal.fire({
        position: "center",
        icon: "info",
        title: "User is already premium",
        showConfirmButton: false,
        timer: 1800,
      });
    }
    const url = `https://recipe-bloom-backend.vercel.app/api/v1/users/promote-premium/${_id}`;
    try {
      const response = await fetch(url, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "update" }), 
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Data patched successfully:", result);
      if (result?.success) {
        const paymentUrl = result?.data?.payment_url;
        setLoading(false);
        if (paymentUrl) {
          console.log(paymentUrl);
          
          window.location.href = paymentUrl;
          setIsPremium(true);
          dispatch(setIsPremiumMembership(true));
        } else {
          console.error("Payment link is not available.");
        }

        setIsPremium(true);
      }
    } catch (error) {
      console.error("Error patching data:", error);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Premium Membership</CardTitle>
          <CardDescription>Unlock exclusive features and benefits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Benefits include:</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                Unlimited access to all premium content
              </li>
              <li className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                Priority customer support
              </li>
              <li className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-blue-500" />
                Ad-free experience across the platform
              </li>
            </ul>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">$9.99/month</p>
            <p className="text-sm text-muted-foreground">Cancel anytime</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#b1cee0] text-[#000000] hover:bg-[#b1cee0a9]" size="lg" onClick={handelPremium}>
            <CreditCard className="mr-2 h-5 w-5" /> Subscribe Now
          </Button>
        </CardFooter>
      </Card>
      {isLoading && <Loader />}
    </div>
  )
}
export default PremiumMembershipPage