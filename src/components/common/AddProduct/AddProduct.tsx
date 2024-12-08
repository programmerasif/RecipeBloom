/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useAppSelector } from "@/lib/hooks";
import { PlusCircle} from "lucide-react";
import React, { useState } from "react";

import "react-quill/dist/quill.snow.css";
import AddNewRecipe from "../AddNewRecipe/AddNewRecipe";

const AddProduct = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { _id } = useAppSelector((state) => state.user);

  return (
    <div className="mb-8 space-y-4 bg-[#ebf5fb] py-5">
      {_id && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-blue-600 text-white rounded-md py-2 flex justify-center items-center space-x-2 hover:bg-blue-400 duration-300"
            style={{borderRadius:"10px"}}
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add New Recipe</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Add New Recipe</DialogTitle>
            </DialogHeader>
            <AddNewRecipe />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AddProduct;
