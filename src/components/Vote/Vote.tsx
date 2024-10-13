/* eslint-disable @typescript-eslint/no-explicit-any */
"use clint";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";
// import { useState } from "react";

const Vote = (_id:any) => {
  // const [togoleUp, setTogoleUp] = useState(false);
  // const [togoledown, setTogoledown] = useState(false);

  // const handelUpVot = () => {
  //   setTogoleUp(!togoleUp);
  // };

  return (
    <div className="flex items-center justify-between p-4 bg-background border-t w-full">
      <div className="flex justify-between items-center space-x-2 w-full">
        <Button variant="outline" size="icon" aria-label="Upvote">
          <ThumbsUp className="h-4 w-4" />
        </Button>
        <Link href={`/recipe-feed/${_id?.id}`}>
          <Button variant="outline" size="icon" aria-label="Downvote">
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
          </Button>
        </Link>

        <Button
          variant="outline"
          size="icon"
          aria-label="Downvote"
          onCanPlay={handelUpVot}
        >
          <ThumbsDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Vote;
