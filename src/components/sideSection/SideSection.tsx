/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import { Crown,  Star,} from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import {
  useFollowUserMutation,
  useGetSingleUserQuery,
  useGetUsersStatusQuery,
  useUnFollowUserMutation,
} from "@/redux/api/features/auth/authApi";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import PremiumCart from "./PremiumCart";
import Swal from "sweetalert2";

const SideSection = () => {
  const router = useRouter();
  const [followUser] = useFollowUserMutation();
  const [unFollowUser] = useUnFollowUserMutation();
  const { _id, email } = useAppSelector((state) => state.user);
  const { data: userStatus ,isLoading:userStatusLoading} = useGetUsersStatusQuery({
    pollingInterval: 1000,
  });
  const { data: singleUser } = useGetSingleUserQuery(_id,{
    pollingInterval: 1000,
  });
  const user = userStatus?.data.find((item: any) => item?.email == email);
  const isPremium = user?.isPremium;
 


 
  const handelFollow = async (id: string) => {
    if (!email) {
      return Swal.fire({
         title: "Login first?",
         text: "to access this feater you have to login ",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Want to Loin?"
       }).then((result: { isConfirmed: any; }) => {
         if (result.isConfirmed) {
           router.push("/login");
         }
       });
       
     }
    await followUser({ userId: _id, targetUserId: id });
  };
  const handelUnFollow = async (id: string) => {
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
    await unFollowUser({ userId: _id, targetUserId: id });
  };
  
  return (
    <div className="sticky top-20 h-[calc(100vh-5rem)] ">
     <PremiumCart isPremium={isPremium}/>
      
      
    </div>
  );
};

export default SideSection;
