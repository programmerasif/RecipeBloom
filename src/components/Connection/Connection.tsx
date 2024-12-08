import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Followers } from '../common/Followers/Follows'
import Following from '../common/Following/Following'
import { Rss, UserCheck } from 'lucide-react'

const Connection = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-10 h-[100vh] p-8 '>
        <h4 className='font-semibold text-2xl flex justify-start items-start w-full'>user-dashboard/connection</h4>
         <div className='w-full border-dashed border-2 p-10 min-h-[70vh] flex justify-center items-center'>
         <Tabs defaultValue="followers" className="w-full">
      <TabsList className="grid w-full grid-cols-2 border">
        <TabsTrigger value="followers" className='flex justify-center items-center gap-4 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:font-bold'>
            <span><UserCheck className='size-4'/></span>
            <span>Followers</span>
        </TabsTrigger>
        <TabsTrigger value="following" className='flex justify-center items-center gap-4 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:font-bold'>
            <span>Following</span>
            <span><Rss className='size-4'/></span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="followers">
      <Followers />
      </TabsContent>
      <TabsContent value="following">
      <Following />
      </TabsContent>
    </Tabs>
         </div>
    </div>
  )
}

export default Connection