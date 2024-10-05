/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";

import { cn } from "@/lib/utils";

import Link from "next/link";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TextField from "@/components/form/textField";
import ImageUpload from "@/components/ui/file-upload";
import { useSignUpMutation } from "@/redux/api/features/auth/authApi";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { TResError } from "@/types/global.types";
import GoogleLoginBtn from "@/components/common/utils/GoogleLoginBtn";
import Cookies from "js-cookie";

const userSignUpSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(6,{message:"Password should min 6 characters"}),
  image: z.string(),
});

export default function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      password: "",
    },
  });
  const [registerUser, { isLoading }] = useSignUpMutation();
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
   
    const accessToken = Cookies.get("accessToken");
  
    if (accessToken && pathname === "/signup") {
      router.replace("/"); // Redirect to home if logged in
    }
  }, [router, pathname]);


  async function onSubmit(data: any) {
    if (!data.image) {
      return toast("Image is required", {
        style: {
          backgroundColor: "red",
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
        },
      });
    }

    const res = await registerUser(data);

    if (res?.error) {
      const error = res.error as TResError;
      console.log(res?.error);
      toast((error.data?.message as string) || "Something went wrong");
    }

    if (res?.data?.success) {
      router.push("/login");
      toast("SignUp successful", { id: 1, duration: 500 });
      toast("Please Login", { id: 1, duration: 1000 });
    }
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:px-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to TastyHub
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        SignUp to TastyHub to discover amazing recipes and share your own.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-8">
          <LabelInputContainer className="mb-4">
            <TextField
              control={form.control}
              placeholder="Name"
              fieldName={"name"}
              type={"text"}
              label={"Name"}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <TextField
              control={form.control}
              placeholder="example@gmail.com"
              fieldName={"email"}
              type={"email"}
              label={"email"}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <TextField
              control={form.control}
              placeholder="••••••••"
              fieldName={"password"}
              type={"password"}
              label={"Password"}
            />
          </LabelInputContainer>

          <div className="w-fit pb-5 mx-auto">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      onChange={(imageUrls: any) => {
                        field.onChange(imageUrls[0]);
                      }}
                      value={[field.value as string]}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type={"submit"}
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          {/* Google login button */}
          <GoogleLoginBtn />
          <div className="flex   justify-center pt-3  gap-2">
            <p>Already have account </p>{" "}
            <Link href={"/login"}>
              <p className="text-blue-500 font-bold hover:underline">Login</p>{" "}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
