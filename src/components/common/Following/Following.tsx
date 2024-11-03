/* eslint-disable @typescript-eslint/no-explicit-any */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, Crown, Check, File } from "lucide-react";

import { useAppSelector } from "@/lib/hooks";
import { useGetFollowingQuery, useUnFollowUserMutation } from "@/redux/api/features/auth/authApi";
import { ScrollArea } from "@/components/ui/scroll-area";

type User = {
  id: number;
  name: string;
  image: string;
  isPremium: boolean;
  isFollowing: boolean;
};
const Following = () => {
  const { _id } = useAppSelector((state) => state.user);
  const { data: following } = useGetFollowingQuery(_id,{
    pollingInterval: 1000,
  });
  const [unFollowUser] = useUnFollowUserMutation()

  const handelUnFollow = async(targetUserId:string) =>{
    const res = await unFollowUser({ userId: _id, targetUserId})
    console.log(res);
    
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">following List</h1>
      <div className="border rounded-lg overflow-hidden">
        {following?.data?.length < 1 ? (
          <div className="flex flex-col justify-center items-center h-[60vh] w-full">
            <File />
            <span>you are not following anyone</span>{" "}
          </div>
        ) : (
          <ScrollArea className="h-[60vh] w-full rounded-md border">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
              <TableBody className="w-full">
                {following?.data.map((user:any) => (
                  <TableRow key={user?._id} className="w-full">
                    <TableCell className="">
                      <Avatar>
                        <AvatarImage src={user?.image} alt={user?.name} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{user?.name}</TableCell>
                    <TableCell>
                      {user?.isPremium ? (
                        <Badge
                          variant="default"
                          className="bg-yellow-500 hover:bg-yellow-600"
                        >
                          <Crown className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Standard</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-medium flex justify-start items-center">
                      {user?.followers?.length} person
                    </TableCell>
                    <TableCell className="text-center">{user?.email}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={user?.isFollowing ? "secondary" : "default"}
                        size="sm"
                      >
                        {user?.followers?.includes(_id) ? (
                          <span onClick={() =>handelUnFollow(user?._id)} className="flex justify-center items-center ">
                            <Check className="mr-1 h-4 w-4" />
                            Following
                          </span>
                        ) : (
                          "Follow"
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default Following;
