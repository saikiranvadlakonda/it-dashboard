import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-48 mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />

        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-96" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="rounded-md border p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-full" />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
