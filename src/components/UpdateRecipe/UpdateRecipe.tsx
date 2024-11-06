/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateRecipeMutation } from "@/redux/api/features/recipe/recipe";
import { useAppSelector } from "@/lib/hooks";
import Swal from "sweetalert2";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface UpdateRecipeProps {
  recipeData: any; // Adjust the type based on the actual data structure
}

const UpdateRecipe: React.FC<UpdateRecipeProps> = ({ recipeData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateRecipe] = useUpdateRecipeMutation();
  const { _id } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      ingredients: [{ name: "" }],
      category: "",
      readyIn: "",
      isVegetarian: false,
      totalPeople: "",
      description: "",
      recipeImage: "", 
      content: "",
      name: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  // Set default values when the component mounts or recipeData changes
  useEffect(() => {
    if (recipeData) {
      setValue("name", recipeData.name);
      setValue("category", recipeData.category);
      setValue("readyIn", recipeData.readyIn);
      setValue("ingredients", recipeData.ingredients || [{ name: "" }]);
      setValue("content", recipeData.content);
    }
  }, [recipeData, setValue]);

  const onSubmit = async (data: any) => {
   
    const updateRecipeData= {
      ...data,
      description: data?.content
      
    }
  
    
    const updateData = Object.fromEntries(
      Object.entries(updateRecipeData).filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined
      )
    );

    // Call the updateRecipe mutation with the recipe ID
    const res: any = await updateRecipe({ updateData, _id: recipeData?._id });
console.log("recipe update info", res?.data);

    // Check if the update was successful
    if (res?.data?.success) {
      // Close the modal if the update is successful
      setIsDialogOpen(false);

      // Show success alert
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Recipe has been updated",
        showConfirmButton: false,
        timer: 1500,
      });

     
      reset();
    } else {
     
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to update recipe",
        showConfirmButton: true,
      });
    }
  };

  const handleContentChange = (val: string) => {
    setValue("content", val);
  };
// console.log(recipeData.content);

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-green-100 rounded-md">
            Update
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Update Recipe</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Recipe Title</Label>
                <Input
                  id="name"
                  placeholder="Enter recipe title"
                  {...register("name", { required: "Recipe title is required" })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                    <SelectItem value="Main Course">Main Course</SelectItem>
                    <SelectItem value="Dessert">Dessert</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="readyIn">Ready In (minutes)</Label>
                <Input
                  id="readyIn"
                  type="number"
                  placeholder="Enter time in minutes"
                  {...register("readyIn", { required: "Ready in time is required" })}
                />
                {errors.readyIn && (
                  <p className="text-red-500 text-sm">{errors.readyIn.message}</p>
                )}
              </div>

              <Label>Ingredients</Label>
              <div className="space-y-2 flex flex-wrap justify-start items-center">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex justify-start items-center space-x-2">
                    <div className="relative">
                      <Input
                        {...register(`ingredients.${index}.name`, {
                          required: "Ingredient name is required",
                        })}
                        placeholder="Enter ingredient"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => remove(index)}
                        className="text-red-500 absolute top-0 right-0"
                      >
                        Remove
                      </Button>
                    </div>
                    {errors.ingredients?.[index]?.name && (
                      <p className="text-red-500 text-sm">
                        {errors.ingredients[index].name.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={() => append({ name: "" })}>
                Add Ingredient
              </Button>

              <div className="space-y-2">
                <Label htmlFor="recipeImage">Upload Recipe Image</Label>
                <input
                  id="recipeImage"
                  type="file"
                  accept="image/*"
                  {...register("recipeImage")}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Description</Label>
                <ReactQuill value={watch("content")} onChange={handleContentChange} theme="snow" />
                {errors.content && (
                  <p className="text-red-500 text-sm">{errors.content.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-blue-600 text-white rounded-md mt-5">
                Submit Recipe
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateRecipe;