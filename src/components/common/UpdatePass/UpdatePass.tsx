import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import { useUpdatePasswordMutation } from '@/redux/api/features/auth/authApi';
import { RootState } from '@/redux/store';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
interface FormData {
    email: string;
    oldPassword: string;
    newPassword: string;
  }
const UpdatePass = () => {
    const {email} = useSelector((state: RootState) => state.user);
    const [updatePassword,{isLoading}] = useUpdatePasswordMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async(data: FormData) => {
    console.log("Form Data:", data);

    const res =await updatePassword(data)
    console.log(res);
    
    if (res?.data?.success) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "password update successful",
            showConfirmButton: false,
            timer: 1500
          });
        
    }
    // Make your API call here
  };
  return (
    <div className="w-full">
      <div className="flex justify-start items-start w-full border">
       <div className="lg:text-2xl font-semibold text-gray-700 flex justify-center items-center gap-2 px-10 py-2">
          <span className="text-[#12143D]">
          Update <span className="text-[#7aaccc] ps-2"> password</span>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-[#7aaccc]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </span>
        </div>
       </div>
      <div className="p-10 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start items-start gap-5 w-full">
          <div className="w-full">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="w-full">
            <Label>Old Password</Label>
            <Input
              type="password"
              placeholder="Enter Your Old Password"
              {...register("oldPassword", { required: "Old Password is required" })}
            />
            {errors.oldPassword && <p className="text-red-500">{errors.oldPassword.message}</p>}
          </div>

          <div className="w-full">
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="Enter Your New Password"
              {...register("newPassword", { required: "New Password is required" })}
            />
            {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
          </div>

          <div>
            <Button type="submit" className="rounded-md bg-[#b4dffa] text-black hover:text-white">
              {
                isLoading ? "Updating" : "Update password"
              }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export default UpdatePass