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
import { useAppSelector } from "@/lib/hooks";
import { useGetUserFeedRecipesQuery } from "@/redux/api/features/recipe/recipe";
import { StarsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Swal from "sweetalert2";

export default function RecipeFeed() {
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  // Fetching data using your query hook (RTK Query)
  const { data } = useGetUserFeedRecipesQuery({
    page,
  });
  const router = useRouter();
  const { isPremium: isPremiumUser } = useAppSelector((state) => state.user);
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

  // Trigger fetchItems when 'data' changes
  useEffect(() => {
    if (data?.data) {
      fetchItems(data?.data);
    }
  }, [data]);

  const handelPrivate = (isPremium:boolean, event:any) => {
    if (isPremium && !isPremiumUser) {
      event.preventDefault();
      Swal.fire({
        title: "You are not Premium User",
        text: "Want premium membership?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want!",
        confirmButtonColor:"#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/payment");
        }
      });;
      console.log("Navigation prevented for non-premium user.");
    } else {
      console.log("Premium user, navigation allowed.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-2 justify-between relative gap-20">
      <main className=" me-auto  w-full  pt-20  border">
        <div className="sticky top-[4rem] z-50">
          <AddProduct />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="w-[750px] h-[600px] bg-gray-300 animate-pulse rounded-md"></div>
            }
            endMessage={<p>No more items</p>}
          >
            <div className="grid grid-cols-1 gap-4">
              {items.map((post) => (
                <Card className="drop-shadow-lg" key={post._id}>
                  <Link
                    href={`/recipe-feed/${post?._id}`}
                    key={post._id}
                    onClick={(event) => handelPrivate(post?.isPremium, event)}
                    scroll={false}
                  >
                    <CardHeader className="">
                    <div className="flex justify-between items-center">
                    <div className="flex items-center  space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={post?.user?.image}
                            alt={post.author}
                          />
                          <AvatarFallback>{}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">{post.name}</h3>
                          <p className="text-sm text-gray-500">
                            by {post?.user?.name}
                          </p>
                        </div>
                      </div>
                  <div className="">
                    {
                      post?.isPremium ? <div className="flex justify-center items-center bg-[#b1cee0] px-3 py-2 rounded-full font-semibold text-xs"><StarsIcon className="mr-2 h-5 w-5" /> <span>Premium</span> </div> : ""
                    }
                  </div>
                    </div>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={post?.recipeImage}
                        alt={post.name}
                        width={400}
                        height={400}
                        className="w-full h-56 sm:h-64 object-cover rounded-md mb-4"
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
                    <Vote recipeId={post?._id} initialLikes={post?.likes} initialDislikes={post?.disLikes}/>
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
