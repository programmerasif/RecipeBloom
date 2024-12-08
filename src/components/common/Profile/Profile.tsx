"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useUpdateUserInfoMutation } from "@/redux/api/features/auth/authApi";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { updateProfileInfo } from "@/redux/api/features/usersSlice/usersSlice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Award, ChefHat, ContactRound, UserRoundPen, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProfileFormInputs {
  name: string;
  bio: string;
}

export default function UserProfile() {
  const { register, handleSubmit } = useForm<ProfileFormInputs>();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { image, _id, name, bio } = useAppSelector((state) => state.user);
  const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();
  const dispatch = useAppDispatch();

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
      const updatedData = res?.data?.data;
      console.log(updatedData);

      if (res?.data?.success && updatedData) {
        dispatch(updateProfileInfo({
          name: updatedData.name,
          bio: updatedData.bio,
          image: updatedData.image,
        }))
      }
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
    <div className="p-4 w-full">
      <h4 className='font-semibold text-2xl flex justify-start items-start w-full mb-6'>user-dashboard/profile Info</h4>
      <Tabs defaultValue="account" className=" w-full p-8  border-2 border-dashed">
      <TabsList className="grid w-full grid-cols-2 mb-6 border border-gray-200">
        <TabsTrigger
          value="account"
          className="flex justify-center items-center gap-2  data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:font-bold"
        >
          <div className="flex justify-center items-center gap-2">
            <span><ContactRound className="size-4" /></span>
            <span>Profile</span>
          </div>
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="flex justify-center items-center gap-6 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:font-bold"
        >

          <div className="flex justify-center items-center gap-6">
            <span><UserRoundPen className="size-4" /></span>
            <span>Update Profile</span>
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="min-h-[70vh] ">

        <Card className="w-full bg-[#d9eafa91] min-h-[70vh] mx-auto">
          <CardHeader className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={image || undefined} alt={"person"} />

            </Avatar>
            <div className="text-center">
              <CardTitle className="text-2xl font-bold">{name}</CardTitle>
              <p className="text-muted-foreground">{"Passionate home cook and food blogger"}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold flex items-center mb-2">
                <Utensils className="mr-2" size={18} />
                Favorite Cuisines
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Italian", "Japanese", "Mexican", "Thai", "French"].map((cuisine) => (
                  <Badge key={cuisine} variant="secondary">{cuisine}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold flex items-center mb-2">
                <ChefHat className="mr-2" size={18} />
                Signature Dishes
              </h3>
              <ul className="list-disc list-inside">
                {[
                  "Homemade Pasta Carbonara",
                  "Miso-Glazed Salmon",
                  "Chocolate Lava Cake"
                ].map((dish) => (
                  <li key={dish}>{dish}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold flex items-center mb-2">
                <Award className="mr-2" size={18} />
                Bio
              </h3>
              <p className="text-muted-foreground">
               {bio}
               </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="password" className="w-full">
        <div className="w-full min-h-[100vh] ">


          <div className=" flex justify-center items-center">
            <Card className="w-full flex justify-center items-center bg-[#d9eafa91] ">
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
                            src={image || ""}
                            alt="Default Profile"
                            width={80}
                            height={80}
                            className="rounded-full w-20 h-20 ring-2"
                          />
                        )}
                        <button
                          type="button"
                          onClick={handleClick}
                          className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2"
                          style={{ borderRadius: "10px" }}
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
                        <label
                          htmlFor="name"
                          className="text-gray-700 font-bold"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          defaultValue={name ?? ""}
                          {...register("name")}
                          className="w-full px-3 py-2 border rounded bg-[#91ace723]"
                        />
                      </div>
                      <div className="space-y-2 mt-4">
                        <label
                          htmlFor="bio"
                          className="text-gray-700 font-bold"
                        >
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          {...register("bio")}
                          defaultValue={bio ? bio : "update Your Boi"}
                          className="w-full px-3 py-2 border rounded bg-[#91ace723]"
                        />
                      </div>
                      <div className="mt-4 ">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white font-semibold  rounded-md px-4 py-2"
                          style={{ borderRadius: "10px" }}
                        >
                          {isLoading ? "Changing..." : "Save Changes"}
                        </button>
                      </div>
                      <hr className="mt-20" />
                    </div>
                  </form>
                  <div className="flex flex-col justify-start items-start gap-2 w-1/2"></div>
                </div>
              </CardContent>

            </Card>
          </div>

        </div>
      </TabsContent>
    </Tabs>
    </div>
  );
}

