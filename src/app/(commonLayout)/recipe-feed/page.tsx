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
import Vote from "@/components/Vote/Vote";
import { useGetUserFeedRecipesQuery } from "@/redux/api/features/recipe/recipe";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function RecipeFeed() {
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  // Fetching data using your query hook (RTK Query)
  const { data } = useGetUserFeedRecipesQuery({
    page,
  });

  const fetchItems = (recipe: any) => {
    if (!recipe) return; // Check if recipe data is undefined
    console.log(recipe);

    // Check if there's new data
    if (recipe?.length > 0) {
      setItems((prevItems) => [...prevItems, ...recipe]); // Cache previous items and add new ones
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Trigger fetchItems when 'data' changes
  useEffect(() => {
    if (data?.data) {
      fetchItems(data?.data);
    }
  }, [data]);

  console.log(items);
  
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
              {items.map((post) => (
              
                  <Card className="drop-shadow-xl" key={post._id}>
                  <Link href={`/recipe-feed/${post?._id}`} key={post._id}>
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage
                              src={post?.user?.image}
                              alt={post.author}
                            />
                            <AvatarFallback>{}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">
                              {post.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              by {post?.user?.name}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Image
                          src={post?.recipeImage}
                          alt={post.name}
                          width={400}
                          height={300}
                          className="w-full h-48 sm:h-64 object-cover rounded-md mb-4"
                        />
                        <p>{post.content}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Category: {post?.foodCategory}
                        </p>
                        {/* Render the description as HTML */}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post?.description,
                          }}
                        ></div>
                      </CardContent>
                    </Link>
                    <CardFooter className="flex justify-between w-full">
                      {/* up vote and down vote */}
                      <Vote id={post?._id}/>
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
