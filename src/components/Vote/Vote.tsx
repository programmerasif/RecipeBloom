/* eslint-disable @typescript-eslint/no-explicit-any */
"use clint";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hooks";
import {
  useGivedislikeMutation,
  useGiveLikeMutation,
} from "@/redux/api/features/recipe/recipe";
import { Heart, ThumbsDown,  } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface VoteProps {
  recipeId: string;
  initialLikes: string[];
  initialDislikes: string[];
  initialcomments: string[];
}
const Vote = ({ recipeId, initialLikes, initialDislikes, initialcomments }: VoteProps) => {
  const [dislikeToggle] = useGivedislikeMutation();
  const [likeToggle] = useGiveLikeMutation();
  const { _id } = useAppSelector((state) => state.user);
  const [like, setLike] = useState(initialLikes)
  const [disLike, setDislike] = useState(initialDislikes)



  const handelUpVot = async () => {
    const recipeData = {
      recipeId: recipeId,
      userId: _id,
    };
    const res = await likeToggle(recipeData);
    setLike(res?.data?.data?.likes)

  };
  const handelDownVot = async () => {
    const recipeData = {
      recipeId: recipeId,
      userId: _id,
    };
    const res = await dislikeToggle(recipeData);
    setDislike(res?.data?.data?.disLikes);

  };

  return (
    <div className="flex items-center justify-between p-4 bg-background border-t w-full">
      <div className="flex justify-between items-center space-x-2 w-full">
        <Button
          variant="outline"
          size="icon"
          aria-label="Upvote"
          className={`flex justify-center items-center gap-4 w-20 rounded-full ${(like.includes(_id || "") ? "border border-blue-400 text-blue-500 bg-blue-50" : "")}`}
          onClick={handelUpVot}
        >
          <Heart className="h-4 w-4" />
          <span>{like?.length}</span>
        </Button>

        <Link href={`/recipe-feed/${recipeId}`} >
          <Button variant="outline" size="icon" aria-label="Downvote" className="rounded-full p-1 ">
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
              className="lucide lucide-message-circle"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            {initialcomments.length}
          </Button>
        </Link>

        <Button
          variant="outline"
          size="icon"
          aria-label="Downvote"
          className={`flex justify-center items-center gap-4 w-20 rounded-full ${(disLike.includes(_id || "") ? "border border-blue-400 text-blue-500 bg-blue-50" : "")}`}
          onClick={handelDownVot}
        >
          <ThumbsDown className="h-4 w-4" />
          <span>{disLike?.length}</span>
        </Button>
      </div>
    </div>
  );
};

export default Vote;
