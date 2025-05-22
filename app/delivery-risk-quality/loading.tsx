import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-14 border-b px-4 flex items-center">
        <Skeleton className="h-6 w-64" />
      </div>
      <div className="flex-1 overflow-auto p-6">
        <Skeleton className="h-10 w-full mb-6" />
        <Skeleton className="h-[500px] rounded-lg mb-6" />
        <Skeleton className="h-[300px] rounded-lg" />
      </div>
    </div>
  )
}
