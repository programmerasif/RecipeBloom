/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import TextField from "@/components/form/textField";
import { useLoginMutation } from "@/redux/api/features/auth/authApi";
import Cookies from "js-cookie";
import { TResError } from "@/types/global.types";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUserInfo } from "@/redux/api/features/usersSlice/usersSlice";
import Loader from "@/app/loader/loader";

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password should be minimum 6 characters." }),
});

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const [loginStatus, setLoginStatus] = useState(false)


  const form = useForm({
    resolver: zodResolver(userLoginSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if the user is already logged in
    const accessToken = Cookies.get("accessToken");
    if (accessToken && pathname === "/login") {
      router.replace("/");
    }
  }, [router, pathname]);
  const onSubmit = async (data: any) => {
    try {
      const res = await login(data);
      const user = res?.data?.data?.user;
      const token = res?.data?.data?.accessToken;

      // Map the response to match the structure of UserState
      const newObj = {
        bio: user?.bio || "",
        email: user?.email || null,
        followers: user?.followers || [],
        following: user?.following || [],
        image: user?.image || null,
        isBlocked: user?.isBlocked || false,
        isPremium: user?.isPremium || false,
        name: user?.name || null,
        password: user?.password || "",
        recipePublished: user?.recipePublished || [],
        role: user?.role || null,
        socialLinks: user?.socialLinks || [],
        _id: user?._id || null,
        token: token || null, // Include the token here
      };

      dispatch(setUserInfo(newObj));
      localStorage.setItem('activeUser', JSON.stringify(res?.data?.data?.user));

      if (res?.data?.data?.accessToken) {
        Cookies.set("accessToken", res.data.data.accessToken);
      }
      if (res?.data?.data?.refreshToken) {
        Cookies.set("refreshToken", res.data.data.refreshToken);
      }
      if (res?.error) {
        const error = res.error as TResError;
        console.log(res?.error);
        toast((error.data?.message as string) || "Something went wrong");
        if (error.data?.message == "Password Incorrect!") {
          setLoginStatus(true)

        }
      }

      if (res?.data?.success) {
        router.push("/");
        toast("Login successful");
      }
    } catch (err) {
      console.log(err, '96');
    }
  };
  const check = async () => {

  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div>
        {
          isLoading && <div className="">
            <Loader />
          </div>
        }
      </div>
      <h2
        onClick={check}
        className="font-bold text-xl text-neutral-800 dark:text-neutral-200"
      >
        Welcome to Recipe Bloom
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        we are committed to provide e testy food
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-8">
          <LabelInputContainer className="mb-4">
            <TextField
              control={form.control}
              placeholder="example@gmail.com"
              fieldName={"email"}
              type={"email"}
              label={"Email"}
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

          <button
            className="bg-blue-600 hover:bg-[#86aec7] duration-300 text-black relative group/btn  block  w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>
        </form>
      </Form>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      <div className="flex   justify-center pt-3  gap-2">
        <p>Don&apos;t have account </p>{" "}
        <Link href={"/sign-up"}>
          <p className="text-blue-500 font-bold hover:underline">SignUp</p>{" "}
        </Link>
      </div>
      {
        true && <div className="flex   justify-center pt-3  gap-2">
          <p>Don&apos;t remember password </p>{" "}
          <Link href={"/forget-password"}>
            <p className="text-blue-500 font-bold hover:underline">Forget Password</p>{" "}
          </Link>
        </div>
      }

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
