import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-[250px]" />
      </div>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <Skeleton className="h-7 w-[300px] mb-2" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-[80px]" />
            <Skeleton className="h-8 w-[80px]" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Skeleton className="h-[120px] md:col-span-1" />
          <Skeleton className="h-[120px] md:col-span-3" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>

        <Skeleton className="h-[400px]" />
      </div>
    </div>
  )
}
