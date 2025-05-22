import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-64" />
      </div>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  )
}
