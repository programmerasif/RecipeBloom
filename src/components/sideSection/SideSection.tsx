/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Check,  StarsIcon } from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import premiumLogo from "../../assets/premium.png";
import {
  useFollowUserMutation,
  useGetSingleUserQuery,
  useGetUsersStatusQuery,
  useUnFollowUserMutation,
} from "@/redux/api/features/auth/authApi";

const SideSection = () => {

  const [followUser,{isLoading:isFollowLoding}] = useFollowUserMutation();
  const [unFollowUser,{isLoading:isUnfollowLoding}] = useUnFollowUserMutation();
  const { _id, email } = useAppSelector((state) => state.user);
  const { data: userStatus ,isLoading:userStatusLoading} = useGetUsersStatusQuery({
    pollingInterval: 1000,
  });
  const { data: singleUser } = useGetSingleUserQuery(_id);
  const user = userStatus?.data.find((item: any) => item?.email == email);
  const isPremium = user?.isPremium;



 
  const handelFollow = async (id: string) => {
    await followUser({ userId: _id, targetUserId: id });
  };
  const handelUnFollow = async (id: string) => {
    await unFollowUser({ userId: _id, targetUserId: id });
  };
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
        <div className="w-full p-8" >
          <button className="w-full flex justify-center items-center bg-[#b1cee0] drop-shadow-xl text-center rounded-md text-black font-semibold py-3 hover:bg-[#b1cee0a9] duration-300">
         {isPremium ? <div className="flex justify-center items-center"><StarsIcon className="mr-2 h-5 w-5" /> <span>Premium user</span></div> : <div><StarsIcon className="mr-2 h-5 w-5" /> <span>Subscribe Now</span></div>}
          </button>
        </div>
      </Card>
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
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-2 py-1 rounded-full">
                    {item?.isPremium ? "Premium" : "Regular"}
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
                  isUnfollowLoding ? "loading" :  <span className="text-sm cursor-pointer">
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
                  isFollowLoding ? "loading" :  <span className="text-sm cursor-pointer">
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
