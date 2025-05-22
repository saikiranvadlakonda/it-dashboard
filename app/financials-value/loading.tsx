import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-14 border-b px-4 flex items-center">
        <Skeleton className="h-6 w-64" />
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
        </div>
        <Skeleton className="h-[400px] rounded-lg mb-6" />
        <Skeleton className="h-[400px] rounded-lg" />
      </div>
    </div>
  )
}
