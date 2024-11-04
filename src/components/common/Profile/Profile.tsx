"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/lib/hooks";
import { useUpdateUserInfoMutation } from "@/redux/api/features/auth/authApi";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Following from "../Following/Following";
import { Followers } from "../Followers/Follows";

interface ProfileFormInputs {
  name: string;
  bio: string;
}

export default function UserProfile() {
  const { register, handleSubmit } = useForm<ProfileFormInputs>();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { image, _id,name, bio} = useAppSelector((state) => state.user);
  const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setSelectedFile(file);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const uploadToImgbb = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=27bd3f8b458a866a837ae2d474b63c50`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      return result.data.url;
    } catch (error) {
      console.error("Error uploading to imgbb:", error);
      return null;
    }
  };
  const onSubmit: SubmitHandler<ProfileFormInputs> = async (data) => {
    let imageUrl: string | null = null;

    if (selectedFile) {
      imageUrl = await uploadToImgbb(selectedFile);
    }

    const formData: { name?: string; bio?: string; image?: string } = {};

    if (data.name) {
      formData.name = data.name;
    }
    if (data.bio) {
      formData.bio = data.bio;
    }
    if (imageUrl) {
      formData.image = imageUrl;
    }

    if (Object.keys(formData).length > 0) {
      const res = await updateUserInfo({ formData, _id });
      if (res?.data?.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Info update successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(res);
    } else {
      console.log("No changes to update");
    }
  };
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full min-h-[100vh] ">
      <div className="text-3xl font-semibold text-[] py-10 ">user-dashboard/Profile Info</div>
      <Tabs defaultValue="connections" className="w-full min-h-[100vh] ">


        <TabsList className="grid w-full grid-cols-2 border">
          <TabsTrigger value="connections" className="data-[state=active]:bg-[#b4dffa] data-[state=active]:text-black">Connections</TabsTrigger>
          <TabsTrigger value="info" className="data-[state=active]:bg-[#b4dffa] data-[state=active]:text-black" >User info</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="">
          <Card className="w-full ">
            <CardContent className="space-y-2 w-full ">
              <div className=" w-full mx-auto space-y-6 p-20">
               
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full drop-shadow-md"
                >
                  <div className="w-full p-4 rounded-lg ">
                    <div className="flex items-center space-x-4">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Profile Picture"
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      ) : (
                        <img
                          src={image}
                          alt="Default Profile"
                          width={80}
                          height={80}
                          className="rounded-full w-20 h-20 ring-2"
                        />
                      )}
                      <button
                        type="button"
                        onClick={handleClick}
                        className="bg-[#b4dffa] font-semibold text-black rounded-md px-4 py-2"
                      >
                        Change Picture
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                    <div className="space-y-2 mt-4">
                      <label htmlFor="name" className="text-gray-700 font-bold">
                        Name
                      </label>
                      <input
                        id="name"
                        defaultValue={name}
                        {...register("name")}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div className="space-y-2 mt-4">
                      <label htmlFor="bio" className="text-gray-700 font-bold">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        {...register("bio")}
                        defaultValue={bio ? bio : "update Your Boi"}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="bg-[#b4dffa] font-semibold text-black rounded-md px-4 py-2"
                      >
                        {isLoading ? "Changing..." : "Save Changes"}
                      </button>
                    </div>
                    <hr  className="mt-20"/>
                  </div>
                </form>
                <div className="flex flex-col justify-start items-start gap-2 w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* second table  */}
        <TabsContent value="connections" className="w-full px-0">
          <Card className="w-full ">
            <CardContent className="px-0">
              <Tabs defaultValue="following" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="followers">Followers</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
                <TabsContent className="min-h-[70vh]" value="followers">
                
                  <Followers />
                </TabsContent>
                <TabsContent className="min-h-[70vh]" value="following">
                  <Following />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
