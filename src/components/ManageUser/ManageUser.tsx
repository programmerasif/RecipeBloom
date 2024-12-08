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


import { useState } from "react";
import Swal from "sweetalert2";
import {
  useChangeUserStatusMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  usePromotedToAdminMutation,
} from "@/redux/api/features/auth/authApi";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

const ManageUser = () => {
  const [page, setPage] = useState(1);
  const [changeUserStatus] = useChangeUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [promotedToAdmin] = usePromotedToAdminMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const { handleSubmit, register, reset } = useForm();

  const { data: users } = useGetUsersQuery({
    page,
    search: searchTerm
  });
  console.log(users);

  const handlePaginatePrev = () => {
    setPage(page - 1);
  };

  const handlePaginateNext = () => {
    if (users?.meta?.totalPage > users?.meta?.page) {
      setPage(page + 1);

    }
  };


  const onSearchSubmit = (data: any) => {


    setPage(1);
    setSearchTerm(data.search);
    reset({ Search: "" });
  };

  const handelBlock = async (id: string, status: boolean) => {


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await changeUserStatus(id);
        Swal.fire({
          title: `${status ? "Unblock" : "Blocked"}`,
          text: `${status ? "User Unblocked successful" : "User Blocked successful"
            }`,
          icon: "success",
        });
      }
    });
  };

  const handelDeleteUser = async (id: string) => {


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
        await deleteUser(id);


        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handelPromotedToAdmin = async (id: string) => {


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
        await promotedToAdmin(id);


        Swal.fire({
          title: "Promoted!",
          text: "User has been Promoted Admin",
          icon: "success",
        });
      }
    });
  };

  return (


    <div className="w-full flex flex-col justify-center gap-10 items-center p-8">
      <h4 className='font-semibold text-2xl flex justify-start items-start w-full'>user-dashboard/manage-user</h4>
      <div className="w-full  p-5 border-2 border-dashed">
        <div className="py-5 w-full">
          <div className="flex sm:flex-col md:flex-row justify-between items-center mb-10 border rounded-md p-2">
            <div className="lg:text-2xl font-semibold text-gray-700 flex justify-center items-center gap-2">
              <span className="text-[#12143D]">
                User <span className="text-blue-500 ps-2"> Management</span>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
            </div>
            <form
              onSubmit={handleSubmit(onSearchSubmit)}
              className="relative flex-grow"
            >
              <div className="flex justify-center items-center gap-2 w-[60%] ms-auto">
                <div className="w-full relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-8 w-full bg-[#d9eafa91] "
                    {...register("search")}
                    
                  />
                </div>
                <Button type="submit" className="ml-2 bg-blue-500 text-white hover:text-white "
                style={{borderRadius: "10px"}}
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
          {/* search filtering sorting */}

          <div className="bg-[#fbfcfd93] shadow-sm min-h-[40vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead >Status</TableHead>
                  <TableHead >Update</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-start">Update</TableHead>
                  <TableHead className="text-start">Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.data?.map((item: any) => (
                  <TableRow key={item?._id}>
                    <TableCell className="font-bold text-balance text-[#262626e5] w-[22%] bg-[#EBF5FB] rounded-br-full">
                      {item?.name}
                    </TableCell>

                    <TableCell>
                      <img
                        className="size-8 rounded-xl"
                        src={item?.image}
                        alt="product"
                      />
                    </TableCell>


                    <TableCell>
                      <div className="flex flex-row justify-center items-center gap-2 cursor-pointer">
                        {item?.role != "admin" ? (
                          <span className="text-orange-500 font-semibold bg-red-100 px-2 rounded-md">
                            {" "}
                            User
                          </span>
                        ) : (
                          <span className="text-green-500 font-semibold bg-green-100 px-2 rounded-md">
                            Admin
                          </span>
                        )}
                      </div>
                    </TableCell>


                    <div onClick={() => handelPromotedToAdmin(item._id)}>
                      <TableCell>
                        <div className="flex flex-row justify-center items-center gap-2 cursor-pointer">
                          {item?.role != "admin" ? (
                            <span className="text-orange-500 font-semibold bg-red-100 px-2 rounded-md">
                              {" "}
                              Make Admin
                            </span>
                          ) : (
                            <span className="text-green-500 font-semibold bg-green-100 px-2 rounded-md">
                              Already Admin
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </div>
                    <TableCell>
                      <div className="flex flex-row justify-center items-center gap-2 cursor-pointer">
                        {item?.isBlocked ? (
                          <span className="text-red-500 font-semibold bg-red-100 px-2 rounded-md">
                            {" "}
                            Block
                          </span>
                        ) : (
                          <span className="text-green-500 font-semibold bg-green-100 px-2 rounded-md">
                            Active
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <div onClick={() => handelBlock(item._id, item?.isBlocked)}>
                      <TableCell>
                        <button className=" bg-green-100 rounded-md">
                          {/* <UpdateModal singleItem={item}/> */}
                          {!item?.isBlocked ? (
                            <span className="text-red-500 font-semibold bg-red-100 px-2 rounded-md">
                              {" "}
                              Block user
                            </span>
                          ) : (
                            <span className="text-green-500 font-semibold bg-green-100 px-2 rounded-md">
                              Allow User
                            </span>
                          )}
                        </button>
                      </TableCell>
                    </div>
                    <TableCell>
                      <button
                        className={` font-semibold  px-3 py-1 rounded-md ${item?.isDeleted
                          ? "disabled bg-gray-200"
                          : "bg-red-100 text-red-500"
                          }`}
                        onClick={() => handelDeleteUser(item?._id)}
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
                    className={`${page === 1
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
                  <PaginationLink href="#">{ }</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">{ }</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <button
                    className={`${users?.meta?.totalPage == users?.meta?.page
                      ? "bg-gray-300 md:px-6 md:py-3 sm:py-2 px-3 text-sm rounded-full text-gray-100"
                      : "bg-white md:px-6 md:py-3 sm:py-2 px-3 text-sm text-black font-semibold rounded-full"
                      } `}
                    onClick={handlePaginateNext}
                    disabled={users?.meta?.totalPage == users?.meta?.page}
                  >
                    Next
                  </button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>












  );
};

export default ManageUser;
