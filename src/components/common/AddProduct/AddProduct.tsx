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
import { PlusCircle, Search } from "lucide-react";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddProduct = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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
      recipeImage: "", // This will hold the image data
      content: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = (data: any) => {
    const strippedContent = stripHtmlTags(data.content);
    if (strippedContent.length < 50) {
      setError("content", {
        type: "manual",
        message: "Content must be at least 50 characters long",
      });
      return;
    }

    console.log(data); // Handle form submission
    setIsDialogOpen(false); // Close dialog after successful submission
    reset(); // Automatically reset the form after submission
    setUploadedImage(null); // Clear the uploaded image after form submission
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setValue("recipeImage", reader.result as string); // Set the image data in recipeImage field
      };
      reader.readAsDataURL(file);
    }
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
        <DialogContent className="max-w-2xl">
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
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}

                {errors.ingredients && (
                  <p className="text-red-500 text-sm">
                    {errors.ingredients.message}
                  </p>
                )}
              </div>
              <Button
                type="button"
                onClick={() => append({ name: "" })}
                className="w-full"
              >
                Add Ingredient
              </Button>
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="recipeImage">Recipe Image</Label>
                <Input
                  type="file"
                  id="recipeImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {uploadedImage && (
                  <div className="mt-2">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="h-40 w-full object-cover rounded-md"
                    />
                  </div>
                )}
                {errors.recipeImage && (
                  <p className="text-red-500 text-sm">
                    {errors.recipeImage.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Recipe Content</Label>
                <ReactQuill
                  theme="snow"
                  value={watch("content")}
                  onChange={handleContentChange}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm">
                    {errors.content.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md"
            >
              Submit Recipe
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;
