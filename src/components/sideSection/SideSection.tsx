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
      {
      userStatusLoading ? <div className="w-[785px] h-[350px] bg-gray-300 animate-pulse rounded-md mt-5"></div> :<>
      <div className="bg-[#ebf5fb]  drop-shadow-xl min-h-[52vh] mt-5">
        <div className="flex flex-col gap-2 p-6">
          {userStatus?.data
            ?.slice(0, 6)
            .map((item: any, index: React.Key | null | undefined) => (
              <div
                key={index}
                className="drop-shadow-xl bg-gray-50 p-2 rounded-md flex justify-start items-center"
              >
                <div className="flex justify-between w-full items-center">
                  <div className="flex justify-start items-center gap-2">
                    {" "}
                    <Image
                      src={item?.image}
                      alt="User profile image"
                      width={50}
                      height={50}
                      className=" rounded-md"
                    />
                    <span className="flex flex-col min-w-40">
                      {" "}
                      <span className="font-semibold">{item?.name}</span>{" "}
                      <small className="text-xs">{item?.email}</small>
                    </span>
                  </div>
                
                  {
                    item?.isPremium? (<Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>) : <Badge variant="default" className="bg-[#b1cee0] hover:bg-yellow-600">
                      <Star className="h-3 w-3 mr-1" />
                      Regular
                    </Badge>
                  }
                   
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
                    <span>Flowed by {item?.followers.length}</span>
                  </div>
                  {
                     (singleUser?.data?.following.find(
                      (following: any) => following == item?._id
                    )
                      ? <>
                      <div
                  className="flex justify-center items-center cursor-pointer gap-1 bg-[#b1cee0] px-2 py-2 rounded-full font-semibold ring-2 contain-paint"
                  onClick={() => handelUnFollow(item._id)}
                >
                 {
                   <span className="text-sm cursor-pointer">
                  Following
                </span>
                 }
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
                      </>
                      : 
                      <>
                      <div
                  className="flex justify-center items-center gap-1 cursor-pointer bg-[#b1cee0] px-2 py-2 rounded-full font-semibold ring-2 contain-paint"
                  onClick={() => handelFollow(item._id)}
                >
                  {
                   <span className="text-sm cursor-pointer">
                  Follow
                </span>
                 }
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
                      </>)
                  }
                  
                </div>
              </div>
            ))}
        </div>
      </div></>
      }
      
    </div>
  );
};

export default SideSection;
