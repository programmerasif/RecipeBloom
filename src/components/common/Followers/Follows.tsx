/* eslint-disable @typescript-eslint/no-explicit-any */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User, Crown, Check, File } from "lucide-react"
import { useFollowUserMutation, useGetFollowersQuery, useUnFollowUserMutation } from "@/redux/api/features/auth/authApi"
import { useAppSelector } from "@/lib/hooks"
import { ScrollArea } from "@/components/ui/scroll-area"

type User = {
  id: number
  name: string
  image: string
  isPremium: boolean
  isFollowing: boolean
}



export const Followers = () => {
  const { _id} = useAppSelector((state) => state.user);
  const {data:followers} = useGetFollowersQuery(_id,{
    pollingInterval: 1000,
  })

  const [unFollowUser] = useUnFollowUserMutation()
  const [followUser] = useFollowUserMutation()
 
const handelUnFollow = async(targetUserId:string) =>{
  const res = await unFollowUser({ userId: _id, targetUserId})
  console.log(res);
  
}
 
const handelFollow = async(targetUserId:string) =>{
const res =await followUser({ userId: _id, targetUserId})
console.log(res);

}

  return (
    <div className="container">
      <div className="border rounded-lg overflow-hidden bg-[#fbfcfd]">
      {
            followers?.data?.length < 1 ? (<div className="flex flex-col justify-center items-center h-[60vh] w-full"><File /><span>followers not available</span> </div>): (
              <ScrollArea className="min-h-[50vh] w-full rounded-md border">
            <Table className="">
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
                {followers?.data.map((user:any) => (
                  <TableRow key={user?._id} className="w-full">
                    <TableCell className="bg-[#EBF5FB]">
                      <Avatar>
                        <AvatarImage src={user?.image} alt={user?.name} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-bold text-balance text-[#262626e5] w-[18%] bg-[#EBF5FB] rounded-br-full">{user?.name}</TableCell>
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
                        className="bg-blue-500 px-2 py-1 round"
                        style={{borderRadius:"10px"}}
                      >
                        {user?.followers?.includes(_id) ? (
                          <span onClick={() =>handelUnFollow(user?._id)} className="flex justify-center items-center ">
                            <Check className="mr-1 h-4 w-4" />
                            Following
                          </span>
                        ) : (
                          <span onClick={() =>handelFollow(user?._id)}> Follow</span>
                          
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
  )
}