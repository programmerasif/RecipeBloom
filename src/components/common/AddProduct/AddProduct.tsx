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
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddProduct = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { register, handleSubmit, setValue, watch, setError, clearErrors, formState: { errors } } = useForm();
  
  const onSubmit = (data: any) => {
    // Validate content length before submitting
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
  };

  const handleContentChange = (val: string) => {
    // Update form state with the editor content
    setValue("content", val);

    // Strip HTML tags to validate only the text content
    const strippedContent = stripHtmlTags(val);

    // Check if the content length is valid
    if (strippedContent.length >= 50) {
      clearErrors("content"); // Clear any errors if the length is valid
    } else if (strippedContent.length === 0) {
      setError("content", {
        type: "manual",
        message: "Content cannot be empty",
      });
    }
  };

  // Utility function to strip HTML tags and whitespace
  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const selectedCategory = watch("category", "");

  return (
    <div className="mb-8 space-y-4 bg-gray-200">
      <div className="flex items-center space-x-4 p-2 rounded-md">
        <div className="flex-grow">
          <Label htmlFor="search" className="sr-only">
            Search recipes
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="search"
              type="search"
              placeholder="Search recipes..."
              className="pl-10"
              {...register("search")}
            />
          </div>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="mostLiked">Most Liked</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-[#b1cee0] drop-shadow-xl text-center rounded-md text-black"
            onClick={() => setIsDialogOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Recipe
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Recipe</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Recipe Title</Label>
              <Input
                id="title"
                placeholder="Enter recipe title"
                {...register("title", { required: "Recipe title is required" })}
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            <div>
              <ReactQuill
                theme="snow"
                value={watch("content")}
                onChange={handleContentChange}
              />
              {errors.content && <p className="text-red-500">{errors.content.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => {
                  setValue("category", value, { shouldValidate: true });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Main Course">Main Course</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500">{errors.category.message}</p>}
            </div>

            <Button type="submit" className="w-full">
              Share Recipe
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;