/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import {
  Star,
  Clock,
  ThumbsUp,
  Send,
  ThumbsDown,
  Edit,
  Delete,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import DOMPurify from "dompurify";
import {
  useCommentsMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useGetSingleRecipeQuery,
  useUpdateCommentMutation,
} from "@/redux/api/features/recipe/recipe";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import Swal from "sweetalert2";

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
  const [updateComment,{isLoading:commentLoading}]  = useUpdateCommentMutation()
  const [deleteComment]  = useDeleteCommentMutation()
  const [openUpdate, setOpenUpdate] = useState(false);

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
  const inputRef = useRef(null);

  const handleUpdate = async(commentId:string) => {
    const inputValue = inputRef?.current?.value;
   const res = await updateComment({commentId,updateText:inputValue})
   if (res?.data) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "comment update successful",
      showConfirmButton: false,
      timer: 1500
    });
   }
   
  };

  const handelDelete = async (commentId:string) =>{



  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async(result) => {
    if (result.isConfirmed) {
      await deleteComment({commentId})
      Swal.fire({
        position: "center",
        icon: "success",
        title: "comment updelete successful",
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
 

  }
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

        {allComment?.data.map((comment: any) => {
          console.log(comment);

          return comment?.userId?._id !== _id ? (
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
          ) : (
            <Card key={comment?._id} className="bg-gray-50">
              <CardContent className="p-4 flex justify-between items-start">
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

                <div
                  className={`max-w-xl flex justify-center items-center gap-2 `}
                >
                  <span onClick={() => setOpenUpdate(!openUpdate)}>

                  <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline"><Edit /></Button>
                  </DialogTrigger>
                  
                  <DialogContent className="sm:max-w-[425px] ">
                    <div className="font-semibold text-center mx-auto">Update Comment</div>
                    <form
                      className={`max-w-xl flex flex-col justify-center items-center gap-4 m-4`}
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <Input type="text" ref={inputRef} className=""/>
                      <Button
                        size="sm"
                        onClick={() => handleUpdate(comment?._id)}
                        className="text-sm"
                      >
                        {
                          commentLoading ? "Updating" : "Update"
                        }
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                    
                  </span>
                  <span onClick={() => handelDelete(comment?._id)}>
                    <Delete />
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
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
