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
            <CardDescription>Features included in your selected plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {['Access to basic recipes','Weekly newsletter','Community forum access'].map((feature, index) => (
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
          <CardTitle className="text-center rounded-md">Add-ons</CardTitle>
          <CardDescription>Enhance your experience with these add-ons</CardDescription>
          </div>
          </Card>
          </div>
          </div>
          <div className="w-full p-8">
            <button className="w-full bg-[#b1cee0] drop-shadow-xl text-center rounded-md text-black font-semibold py-3">Get-Premium</button>
          </div>
        </Card>
              <div className="bg-[#ebf5fb]  drop-shadow-xl min-h-[52vh] mt-5">
              <div  className="flex flex-col gap-2 p-10">
              {
                [1,2,3,4,5,6,].map((item,index) => ( <div key={index} className="drop-shadow-xl bg-gray-50 p-2 rounded-md">
                  <div className="flex justify-start items-center "> <img src="" alt="" /><span className="flex flex-col gap-1"> <span>Asif</span> <small className="text-xs">asifkham@gmail.com</small></span></div>
                </div> ))
              }
              </div>
              </div>
      </div>
    </div>
  );
}
