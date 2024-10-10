"use clint";
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
import React from "react";

const AddProduct = () => {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center space-x-4 bg-gray-200 p-2 rounded-md">
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
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full bg-[#b1cee0] drop-shadow-xl text-center rounded-md text-black ">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Recipe
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Recipe</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Recipe Title</Label>
              <Input id="title" placeholder="Enter recipe title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Recipe Description</Label>
              <textarea id="content" placeholder="Enter recipe description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Main Course">Main Course</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>
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
