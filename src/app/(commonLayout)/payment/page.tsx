/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loader from "@/app/loader/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useGetUsersStatusQuery } from "@/redux/api/features/auth/authApi";
import { setIsPremiumMembership } from "@/redux/api/features/usersSlice/usersSlice";
import { Check, CreditCard, Shield, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const PremiumMembershipPage = () => {
  const { data: userStatus } = useGetUsersStatusQuery(undefined);
  const { _id, email, isPremium } = useAppSelector((state) => state.user); 
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const user = userStatus?.data.find((item: any) => item?.email == email);

  const handlePremium = async () => {
    setLoading(true);
    if (isPremium) { // Checks Redux state directly
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
      if (result?.success) {
        const paymentUrl = result?.data?.payment_url;
        setLoading(false);

        if (paymentUrl) {
          dispatch(setIsPremiumMembership(true)); // Dispatch to update Redux state
          window.location.href = paymentUrl; // Redirects to payment URL
        } else {
          console.error("Payment link is not available.");
        }
      }
    } catch (error) {
      console.error("Error patching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Listen for changes in isPremium from Redux and log it to verify update
  useEffect(() => {
    console.log("Updated isPremium from Redux:", isPremium);
  }, [isPremium]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
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
          <Button
            className="w-full bg-[#b1cee0] text-[#000000] hover:bg-[#b1cee0a9]"
            size="lg"
            onClick={handlePremium}
            disabled={isLoading}
          >
            <CreditCard className="mr-2 h-5 w-5" /> {isPremium ? "Already Premium" : "Subscribe Now"}
          </Button>
        </CardFooter>
      </Card>
      {isLoading && <Loader />}
    </div>
  );
};

export default PremiumMembershipPage;
