import { Skeleton } from "../ui/skeleton"


const CommonSkeleton = () => {
  return (
   
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-[250px] bg-[#bcd8e9]" />
        <Skeleton className="h-4 w-[200px] bg-[#bcd8e9]" />
      </div>
  
  )
}

export default CommonSkeleton