"use clint";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import {
  useDeleteRecipeMutation,
  useGetUserRecipesQuery,
 
} from "@/redux/api/features/recipe/recipe";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UpdateRecipe from "../UpdateRecipe/UpdateRecipe";

const MyRecipes = () => {
  const { _id } = useAppSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const { handleSubmit, register, reset } = useForm(); // initialize useForm for searchtate
  const [category, setCategory] = useState("all"); // Category state
  const [sortBy, setSortBy] = useState("relevance"); // Sort by state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteFacility] = useDeleteRecipeMutation();

  const { data: recipe } = useGetUserRecipesQuery({
    query: {
      page,
      search: searchTerm,
    },
    id: _id,
  },{
    pollingInterval: 1000,
  });

  const handlePaginatePrev = () => {
    setPage(page - 1);
  };

  const handlePaginateNext = () => {
    if (recipe?.meta?.totalPage > recipe?.meta?.page) {
      setPage(page + 1);
      console.log("inside");
    }
    // console.log('out inside',recipe?.meta);
  };

  const handelDelete = async (id: string) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFacility(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // Function to handle search submission (only search triggered by button)
  const onSearchSubmit = (data: any) => {
    setSearchQuery(data.search); // Save the search query
    console.log("Search Data:", searchQuery);
    setPage(1);
    setSearchTerm(searchQuery);
    reset({ Search: "" });
    // Call the API with search data here
  };

  // Effect to handle instant filtering when price range or category changes
  useEffect(() => {
    // Perform the API request whenever filtering criteria change
    console.log("Instant Filter Update:", { category, priceRange });
    // You would call the API here for filtering
  }, [category, priceRange]);

  // Effect to handle sorting changes instantly
  useEffect(() => {
    // Perform the API request when sorting changes
    console.log("Instant Sort Update:", { sortBy });
    // You would call the API here for sorting
  }, [sortBy]);

  return (
    <div className="sm:px-6 lg:px-20 mt-20 md:mt-28 w-full">
      <div className="flex sm:flex-col md:flex-row justify-between items-center mb-10 border rounded-md p-2">
        <div className="lg:text-2xl font-semibold text-gray-700 flex justify-center items-center gap-2">
          <span className="text-[#12143D]">
            Facility <span className="text-[#F7A400] ps-2"> Management</span>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-[#F7A400]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </span>
        </div>
        <button className="p-2 bg-[#dbe8f0] rounded-md ">
          {/* <AddModal /> */}
        </button>
      </div>
      {/* search filtering sorting */}
      <div className="flex items-center space-x-2 mb-4">
        {/* Search Input */}
        <form
          onSubmit={handleSubmit(onSearchSubmit)}
          className="relative flex-grow"
        >
          <div className="flex justify-center items-center gap-2 w-full">
            <div className="w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8 w-full"
                {...register("search")} // Register search input with react-hook-form
              />
            </div>
            <Button type="submit" className="ml-2">
              Search
            </Button>
          </div>
        </form>

        {/* Filter Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Narrow down your product search
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Category</h3>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value)} // Set category on change
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Price Range</h3>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange} // Update price range state instantly
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Sort Dropdown (instant sorting) */}
        <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest Arrivals</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="bg-[#fbfcfd] shadow-sm min-h-[40vh]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-start">Category</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-start">Update</TableHead>
              <TableHead className="text-start">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipe?.data?.map((item: any) => (
              <TableRow key={item?._id}>
                <TableCell className="font-bold text-balance text-[#262626e5] w-[22%] bg-[#EBF5FB] rounded-br-full">
                  {item?.name}
                </TableCell>
                <TableCell>
                  <img
                    className="size-8 rounded-xl"
                    src={item?.recipeImage}
                    alt="product"
                  />
                </TableCell>
                <TableCell>
                  <span className="text-green-500 font-semibold"></span>{" "}
                  Ready In  {item?.readyIn} (minutes)
                </TableCell>
                <TableCell>
                  <div className="flex flex-row justify-start items-start gap-2">
                    {item?.foodCategory}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-row justify-center items-center gap-2 cursor-pointer">
                    {!item?.isPublished ? (
                      <span className="text-red-500 font-semibold bg-red-100 px-2 rounded-md">
                        {" "}
                        Removed
                      </span>
                    ) : (
                      <span className="text-green-500 font-semibold bg-green-100 px-2 rounded-md">
                        Active
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <button className=" bg-green-100 rounded-md">
                    {/* <UpdateModal singleItem={item}/> */}
                    <UpdateRecipe recipeData={item} />
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className={` font-semibold  px-3 py-1 rounded-md ${
                      item?.isDeleted
                        ? "disabled bg-gray-200"
                        : "bg-red-100 text-red-500"
                    }`}
                    onClick={() => handelDelete(item?._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                      <path
                        fillRule="evenodd"
                        d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="pt-8 ">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <button
                className={`${
                  page === 1
                    ? "bg-gray-300 md:px-6 md:py-3 sm:py-2 px-3 text-sm rounded-full text-gray-100"
                    : "bg-white md:px-6 md:py-3 sm:py-2 px-3 text-sm text-black font-semibold rounded-full"
                } `}
                onClick={handlePaginatePrev}
                disabled={page === 1}
              >
                Previous
              </button>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <button
                className={`${
                  !recipe?.meta?.totalPage > recipe?.meta?.page
                    ? "bg-gray-300 md:px-6 md:py-3 sm:py-2 px-3 text-sm rounded-full text-gray-100"
                    : "bg-white md:px-6 md:py-3 sm:py-2 px-3 text-sm text-black font-semibold rounded-full"
                } `}
                onClick={handlePaginateNext}
                disabled={!recipe?.meta?.totalPage > recipe?.meta?.page}
              >
                Next
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default MyRecipes;
