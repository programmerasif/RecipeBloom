/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddProduct from "@/components/common/AddProduct/AddProduct";
import SideSection from "@/components/sideSection/SideSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";



export default function RecipeFeed() {
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [recipe, setRecipe] = useState([]);
  

  
  


  const fetchItems = async () => {
    const response = await fetch(
      `https://recipe-bloom-backend.vercel.app/api/v1/recipe/?limit=2&page=${page}`
    );
    const newItems = await response.json();
    setRecipe(newItems?.data)
    
    
    // Check if there's new data
    if (newItems?.data.length > 0) {
      setItems((prevItems: any) => [...prevItems, ...newItems.data]);
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
    <div className="min-h-screen grid grid-cols-2 justify-between relative gap-20">
      <main className=" me-auto py-6 w-full  pt-20  border">
        <div className="sticky top-20 z-50">
          <AddProduct />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more items</p>}
          >
            <div className="grid grid-cols-1 gap-4">
              {recipe.map((post) => (
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
                      src={post?.recipeImage}
                      alt={post.title}
                      width={400}
                      height={300}
                      className="w-full h-48 sm:h-64 object-cover rounded-md mb-4"
                    />
                    <p>{post.content}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Category: {post?.category}
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
      <SideSection />
    </div>
  );
}
