"use client";

import AddProduct from "@/components/common/AddProduct/AddProduct";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function RecipeFeed() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchItems = async () => {
    const response = await fetch(
      `https://recipe-bloom-backend.vercel.app/api/v1/recipe/?limit=1&page=${page}`
    );
    const newItems = await response.json();

    // Check if there's new data
    if (newItems?.data.length > 0) {
      setItems((prevItems) => [...prevItems, ...newItems.data]);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  };

  const loadMore = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Initial fetch
  useEffect(() => {
    fetchItems();
  }, [page]);

  useEffect(() => {
    if (page > 1) {
      fetchItems();
    }
  }, [page]);

  return (
    <div className="min-h-screen grid grid-cols-2 justify-between relative">
      <main className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8 pt-20 ">
        <AddProduct />
        <div className="grid grid-cols-1 gap-4">
          <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more items</p>}
          >
            <div className="grid grid-cols-1 gap-4">
              {items.map((post) => (
                <Card key={post.id} className="drop-shadow-xl">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={post.avatar} alt={post.author} />
                        <AvatarFallback>{}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-500">
                          by {post.author}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={300}
                      className="w-full h-48 sm:h-64 object-cover rounded-md mb-4"
                    />
                    <p>{post.content}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Category: {post.category}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {/* Placeholder for actions */}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </main>
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
              <Card className="drop-shadow-xl">
                <div className="p-10 rounded-md drop-shadow-lg">
                  <CardTitle className="text-center rounded-md">
                    Add-ons
                  </CardTitle>
                  <CardDescription>
                    Enhance your experience with these add-ons
                  </CardDescription>
                </div>
              </Card>
            </div>
          </div>
          <div className="w-full p-8">
            <button className="w-full bg-[#b1cee0] drop-shadow-xl text-center rounded-md text-black font-semibold py-3">
              Get-Premium
            </button>
          </div>
        </Card>
        <div className="bg-[#ebf5fb]  drop-shadow-xl min-h-[52vh] mt-5">
          <div className="flex flex-col gap-2 p-6">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
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
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-2 py-1 rounded-full">Premium</div>
                  <div className="flex justify-center items-center gap-1">
                   
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
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
    </div>
  );
}
