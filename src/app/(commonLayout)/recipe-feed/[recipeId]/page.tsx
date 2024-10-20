/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { Star, Clock, ThumbsUp, Send, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import DOMPurify from "dompurify";
import {
  useCommentsMutation,
  useGetCommentsQuery,
  useGetSingleRecipeQuery,
} from "@/redux/api/features/recipe/recipe";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  comment: string;
};

function DetailRecipe({ params }: { params: { recipeId: string } }) {
  const router = useRouter();
  const { data, isLoading } = useGetSingleRecipeQuery(params?.recipeId);
  const [giveComment, { isLoading: commenting }] = useCommentsMutation();
  const { data: allComment } = useGetCommentsQuery(params?.recipeId, {
    pollingInterval: 1000,
  });
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { _id, name } = useAppSelector((state) => state.user);

  
// const isPremium = data?.data?.isPremium
// console.log(isPremium);


  const recipe = {
    title: "Delicious Homemade Pizza",
    author: "Jane Doe",
    image: "/placeholder.svg?height=400&width=800",
    description:
      "A mouthwatering homemade pizza with a crispy crust and your favorite toppings.",
    category: "Italian",
    readyIn: "45 minutes",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 tsp salt",
      "1 tsp sugar",
      "1 packet instant yeast",
      "2 tbsp olive oil",
      "3/4 cup warm water",
      "1/4 cup tomato sauce",
      "1 cup mozzarella cheese",
      "Toppings of your choice",
    ],
    rating: 4.5,
    likes: 127,
    comments: [
      {
        author: "John Smith",
        text: "This recipe is amazing! My family loved it.",
      },
      {
        author: "Emily Brown",
        text: "I added some extra garlic and it was perfect!",
      },
    ],
  };

  const onSubmit = async (data: FormData) => {
    const comment = {
      userId: _id,
      recipeId: params?.recipeId,
      title: name,
      comment: data?.comment,
    };
    await giveComment(comment);
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 pt-24">
      <div className="space-y-4">
        {isLoading ? (
          <div className="w-[800px] h-[400px] bg-gray-300 animate-pulse rounded-md"></div>
        ) : (
          <Image
            src={data?.data?.recipeImage}
            alt={recipe.title}
            width={800}
            height={400}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        )}

        <h1 className="text-3xl font-bold">{recipe.title}</h1>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>By {data?.data?.user?.name}</span>
          <span>•</span>
          <span>{data?.data?.foodCategory}</span>
          <span>•</span>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {data?.data?.readyIn} min
          </div>
        </div>
        <div>
          <span className="font-semibold mb-2"> Ingredients</span>
          <div className="flex flex-wrap justify-start items-center gap-2">
            {recipe.ingredients.map((ingredient, index) => (
              <span key={index} className="px-3 py-1 border-2">
                {ingredient}
              </span>
            ))}
          </div>
        </div>
        <p className="text-muted-foreground">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.data?.description),
            }}
          ></div>
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="ml-1 font-medium">{recipe.rating.toFixed(1)}</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="flex items-center">
            <ThumbsUp className="w-5 h-5 text-blue-500" />
            <span className="ml-1 font-medium">{recipe.likes} likes</span>
          </div>
          <div className="flex items-center">
            <ThumbsDown className="w-5 h-5 text-blue-500" />
            <span className="ml-1 font-medium">{recipe.likes} likes</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Comments</h2>
        {allComment?.data.map((comment: any) => (
          <Card key={comment?._id} className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Image
                  src={comment?.userId?.image}
                  alt={comment?.userId?.name}
                  width={50}
                  height={50}
                  className="rounded-md mb-4"
                />
                <div className="space-y-1">
                  <p className="font-medium">{comment?.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {comment?.comment}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardContent className="p-4">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                placeholder="Add a comment..."
                {...register("comment")}
              />
              {commenting ? (
                <Button
                  type="button"
                  className="bg-[#b1cee0] text-gray-700 ..."
                  disabled
                >
                  <svg
                    className="animate-spin h-5 w-5 mr-3 ..."
                    viewBox="0 0 24 24"
                  ></svg>
                  commenting...
                </Button>
              ) : (
                <Button type="submit" className="bg-[#b1cee0] text-gray-700">
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DetailRecipe;
