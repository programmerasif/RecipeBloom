/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
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
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import dynamic from "next/dynamic"; 
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddNewRecipe = () => {
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
      title: "",
      ingredients: [{ name: "" }],
      category: "",
      readyIn: "",
      isVegetarian: false,
      totalPeople: "",
      description: "",
      recipeImage: "",
      content: "",
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
        formData.append("image", data.recipeImage[0]);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=27bd3f8b458a866a837ae2d474b63c50`, 
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (result.success) {
          setImgUpload(false);
          const imageUrl = result.data.url;
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
          await addRecipe(updatedData);
          

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Recipe has been saved",
            showConfirmButton: false,
            timer: 1500,
          });

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
    <div className="w-full h-screen overflow-y-scroll">
      <div className="m-6 bg-gray-50 p-10 rounded-md">
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
                <p className="text-red-500 text-sm">{errors.readyIn.message}</p>
              )}
            </div>

            {/* Ingredients Field */}
            <Label>Ingredients</Label>
            <div className="flex gap-4 justify-start items-center">
              <div className="space-y-2 flex flex-wrap justify-start items-center">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex justify-start items-center space-x-2"
                  >
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z"
                          />
                        </svg>
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
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ name: "" })}
                className="text-blue-600"
              >
                Add Ingredient
              </Button>
            </div>

            {/* Image Upload Field */}
            <div className="space-y-2 flex flex-col">
              <Label htmlFor="recipeImage">Upload Recipe Image</Label>
              <input
                id="recipeImage"
                type="file"
                accept="image/*"
                {...register("recipeImage")}
                className="border border-gray-300 rounded-md p-2"
              />
              {isimgUpload && <p>Image uploading</p>}
            </div>

            {/* Content Field */}
            <div className="space-y-2 min-h-32">
              <Label htmlFor="content">Content</Label>
              <ReactQuill
                value={watch("content")}
                onChange={handleContentChange}
                theme="snow"
                className="h-24"
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>
            <div className="flex items-center space-x-2 pt-10">
              <input
                type="checkbox"
                {...register("isPremium")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPremium" className="text-gray-700">
                Is Premium Recipe (optional)
              </label>
            </div>
            {/* Submit Button */}
            <div className="mt-52">
              <Button
                type="submit"
                className="w-full bg-[#b1cee0] text-white rounded-md mt-5"
              >
                Submit Recipe
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewRecipe;
