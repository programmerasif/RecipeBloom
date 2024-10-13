/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAppSelector } from "@/lib/hooks";
import { useCreateRecipeMutation } from "@/redux/api/features/recipe/recipe";
import { PlusCircle, Search } from "lucide-react";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import dynamic from "next/dynamic"; // Import dynamic from Next.js

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const AddProduct = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isimgUpload, setImgUpload] = useState(false);
  const [addRecipe] = useCreateRecipeMutation();
  const { _id } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
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
      search: "",
      title: " ",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = async (data: any) => {
    const strippedContent = stripHtmlTags(data.content);
    if (strippedContent.length < 50) {
      setError("content", {
        type: "manual",
        message: "Content must be at least 50 characters long",
      });
      return;
    }

    try {
      if (data.recipeImage && data.recipeImage.length > 0) {
        const formData = new FormData();
        setImgUpload(true);
        formData.append("image", data.recipeImage[0]); // Assumes the image is in data.recipeImage[0]

        // Use fetch to upload the image to imgbb
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=27bd3f8b458a866a837ae2d474b63c50`, // Replace with your imgbb API key
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (result.success) {
          setImgUpload(false);
          // If upload is successful, get the URL of the image
          const imageUrl = result.data.url;

          // Now include the uploaded image URL in the data object
          const updatedData = {
            ...data,
            recipeImage: imageUrl,
            user: _id,
            foodCategory: data?.category,
            totalPeople: 10,
            name: data?.title,
            readyIn: Number(data?.readyIn),
            description: data?.content,
          };
          const res = await addRecipe(updatedData);
          console.log(res);
          console.log(updatedData);
          // Perform other actions such as saving data to your backend

          setIsDialogOpen(false); // Close dialog after successful submission
          reset(); // Automatically reset the form after submission
        } else {
          console.error("Image upload failed", result);
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleContentChange = (val: string) => {
    setValue("content", val);
    const strippedContent = stripHtmlTags(val);

    if (strippedContent.length >= 50) {
      clearErrors("content");
    } else if (strippedContent.length === 0) {
      setError("content", {
        type: "manual",
        message: "Content cannot be empty",
      });
    }
  };

  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center space-x-2">
        <div className="flex-grow">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="search"
              type="search"
              placeholder="Search..."
              className="pl-8"
              {...register("search")}
            />
          </div>
        </div>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="mostLiked">Most Liked</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Breakfast">Breakfast</SelectItem>
            <SelectItem value="Main Course">Main Course</SelectItem>
            <SelectItem value="Dessert">Dessert</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Add Recipe Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full bg-blue-600 text-white rounded-md py-2 flex justify-center items-center space-x-2">
            <PlusCircle className="h-5 w-5" />
            <span>Add New Recipe</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Add New Recipe</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Form Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Recipe Title</Label>
                <Input
                  id="title"
                  placeholder="Enter recipe title"
                  {...register("title", {
                    required: "Recipe title is required",
                  })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
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
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Ready In Field */}
              <div className="space-y-2">
                <Label htmlFor="readyIn">Ready In (minutes)</Label>
                <Input
                  id="readyIn"
                  type="number"
                  placeholder="Enter time in minutes"
                  {...register("readyIn", {
                    required: "Ready in time is required",
                  })}
                />
                {errors.readyIn && (
                  <p className="text-red-500 text-sm">
                    {errors.readyIn.message}
                  </p>
                )}
              </div>

              {/* Ingredients Field */}
              <Label>Ingredients</Label>
              <div className="space-y-2 flex flex-wrap justify-start items-center">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <Input
                      placeholder="Ingredient name"
                      {...register(`ingredients.${index}.name` as const)}
                    />
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="outline"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => append({ name: "" })}
                  variant="outline"
                >
                  Add Ingredient
                </Button>
              </div>

              {/* Recipe Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="recipeImage">Recipe Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  {...register("recipeImage")}
                />
                {isimgUpload && <p>Uploading image...</p>}
              </div>

              {/* ReactQuill for Content */}
              <div className="space-y-2">
                <Label>Content</Label>
                <ReactQuill
                  theme="snow"
                  value={watch("content")}
                  onChange={handleContentChange}
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline"],
                      ["link", "image"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["clean"],
                    ],
                  }}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm">{errors.content.message}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 text-white">
              Add Recipe
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;