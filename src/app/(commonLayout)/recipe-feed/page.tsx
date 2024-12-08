/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddProduct from "@/components/common/AddProduct/AddProduct";
import SideSection from "@/components/sideSection/SideSection";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Vote from "@/components/Vote/Vote";
import { useAppSelector } from "@/lib/hooks";
import { useGetFollowersQuery } from "@/redux/api/features/auth/authApi";
import { useGetUserFeedRecipesQuery } from "@/redux/api/features/recipe/recipe";
import { Palmtree, Search, StarsIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";
import Swal from "sweetalert2";

export default function RecipeFeed() {
  const { _id, name,image:profileImage,following} = useAppSelector((state) => state.user);
  const { data: followers } = useGetFollowersQuery(_id, {
    pollingInterval: 1000,
  })
  const [items, setItems] = useState<any[]>([]);
  const { control, handleSubmit } = useForm();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { data } = useGetUserFeedRecipesQuery({
    page,
    search: searchTerm,
  });

  // Handle change for the search input field
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const onSubmit = (data: any) => {
    // Handle form submit logic (search term, filters, etc.)
    console.log("Submitted data:", data);
  };

  const router = useRouter();
  const { isPremium: isPremiumUser, email } = useAppSelector(
    (state) => state.user
  );
  const fetchItems = (recipe: any) => {
    if (!recipe) return;

    if (recipe?.length > 0) {
      setItems((prevItems) => [...prevItems, ...recipe]);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (data?.data) {
      fetchItems(data?.data);
    }
  }, [data]);
  console.log(followers);

  const handelPrivate = (isPremium: boolean, event: any) => {
    if (isPremium && !isPremiumUser) {
      event.preventDefault();
      Swal.fire({
        title: "You are not Premium User",
        text: "Want premium membership?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want!",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          if (!email) {
            return Swal.fire({
              position: "center",
              icon: "info",
              title: "you are not login , please login",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          router.push("/payment");
        }
      });
      console.log("Navigation prevented for non-premium user.");
    } else {
      console.log("Premium user, navigation allowed.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-7 justify-between relative gap-10">
      <div className="hidden md:block col-span-2">
        <SideSection />
      </div>
      <main className="col-span-3  pt-20 w-full mx-auto ">
        <div className=" z-50">
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center space-x-2"
            >
              <div className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-800" />
                  <Controller
                    name="search"
                    control={control}
                    defaultValue={searchTerm}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="search"
                        type="search"
                        placeholder="Search..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    )}
                  />
                </div>
              </div>

              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="mostLiked">Most Liked</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Main Course">Main Course</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>
            </form>
          </div>
          <AddProduct />
        </div>
        <div className="grid grid-cols-1 rounded-md  gap-4">
          <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className=" bg-gray-300 animate-pulse rounded-md"></div>
            }
            endMessage={<p>No more items</p>}
          >
            <div className="grid grid-cols-1 gap-4 rounded-md">
              {items.map((post) => {
                const description = post?.description.slice(0, 200);
                return (


                  <Link
                    href={`/recipe-feed/${post?._id}`}
                    key={post._id}
                    onClick={(event) => handelPrivate(post?.isPremium, event)}
                    scroll={false}
                    className="bg-[#d9eafa] shadow-md rounded-lg overflow-hidden p-4"
                    style={{ borderRadius: "10px" }}>
                    
                    
                    <div className="flex justify-between items-start mb-2">
                    <div className=" flex justify-start items-center gap-2">
                      <Image src={post?.recipeImage} alt={"recipe"} width={50} height={50} className="w-[50px] h-[50px] object-cover" 
                      style={{borderRadius:"100%"}}
                      />
                      <div><h2 className="text-xl font-semibold ">{post?.name}</h2>
                        <p className="text-gray-600 text-sm mb-4">Posted by {post?.user?.name}</p></div>
                    </div>
                    <div className="">
                            {post?.isPremium ? (
                              <div className="flex justify-center items-center bg-blue-500 text-white px-3 py-2 rounded-full font-semibold text-xs">
                                <StarsIcon className="mr-2 h-5 w-5" />{" "}
                                <span>Premium</span>{" "}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                    </div>
                    <Image src={post?.recipeImage} alt={"recipe"} width={300} height={500} className="w-full h-[500px] object-cover mb-4"
                      style={{ borderRadius: "10px" }}
                    />

                    <p className="text-gray-700 mb-4 ">

                      <div
                        className=""
                        dangerouslySetInnerHTML={{
                          __html: description,
                        }}
                      ></div>
                    </p>

                    <Vote
                      recipeId={post?._id}
                      initialLikes={post?.likes}
                      initialDislikes={post?.disLikes}
                      initialcomments={post?.comments}
                    />
                  </Link>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </main>
      <div className="hidden md:block col-span-2 mt-20  bg-[#d1e3ecc7] ">

        {
          _id && <div>
          <div className="min-h-[400px] flex items-center justify-center  p-4">
            <Card className="w-full max-w-sm relative overflow-hidden  bg-[#f6f9fa] "
              style={{ borderRadius: "10px" }}
            >
  
              <div className="absolute top-0 right-0 text-black opacity-20 transform rotate-90">
                <Palmtree className="w-32 h-32" />
              </div>
  
              {/* Profile Content */}
              <div className="relative z-10 p-6 flex flex-col items-center gap-4">
                {/* Profile Image */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-[#6687e0]">
                  <img
                    src={profileImage || ""}
                    alt="Profile picture"
                    
                    className=" w-20 h-20 object-cover"
                  />
                </div>
  
                {/* Profile Info */}
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-semibold text-black">{name}</h2>
                  <p className="text-gray-800">@notojoyoo</p>
                  <p className="text-sm text-gray-700 mt-2">
                    ✨ Penting gak Penting yang penting Posting ✨
                  </p>
                </div>
               
                <div className="flex justify-between w-full gap-8 mt-2 border-y-2 border-gray-200">
                  <div className="text-center border-r-2 min-w-[50%] p-5">
                    <p className="text-black font-medium">{following?.length}</p>
                    <p className="text-sm text-gray-800">Following</p>
                  </div>
                  <div className="text-center min-w-[50%] p-5">
                    <p className="text-black font-medium">{followers?.data.length}</p>
                    <p className="text-sm text-gray-800">Followers</p>
                  </div>
                </div>
  
                {/* Profile Button */}
                <button className="w-full font-semibold mt-2 py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-400 transition-colors"
                  style={{ borderRadius: "10px" }}
                >
                  My Profile
                </button>
              </div>
            </Card>
          </div>
  
          <div className="px-6 mt-2">
          <h5 className="font-bold mb-2 text-gray-700">Who is  to follow you</h5>
            <Table className="bg-[#f6f9fa]" style={{ borderRadius: "10px" }}>
              <TableHeader>
                <TableRow>
                  <TableHead className="">SL</TableHead>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {followers?.data.length == 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                      No user available
                    </TableCell>
                  </TableRow>
                ) : (
                  followers?.data.map((user: any, ind: number) => (
                    <TableRow key={user?.id}>
                      <TableCell className="font-semibold">{ind + 1}</TableCell>
                      <TableCell className="font-medium">{user?.name}</TableCell>
                      <TableCell className="bg-[#EBF5FB]">
                        <Avatar>
                          <AvatarImage src={user?.image} alt={user?.name} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="text-blue-500 font-bold1 ">Followers</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          </div>
        }
      </div>
    </div>
  );
}
