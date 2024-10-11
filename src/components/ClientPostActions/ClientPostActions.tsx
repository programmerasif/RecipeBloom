"use client";

import { Heart, MessageCircle } from "lucide-react";

import { useState } from "react";
import { Button } from "../ui/button";

export default function ClientPostActions({ likes, comments }:{ likes:string, comments:string }) {
  const [likeCount, setLikeCount] = useState(likes);

  return (
    <div className="flex justify-between">
      <Button variant="ghost" onClick={() => setLikeCount(likeCount + 1)}>
        <Heart className="mr-2 h-4 w-4" /> {likeCount}
      </Button>
      <Button variant="ghost">
        <MessageCircle className="mr-2 h-4 w-4" /> {comments}
      </Button>
    </div>
  );
}