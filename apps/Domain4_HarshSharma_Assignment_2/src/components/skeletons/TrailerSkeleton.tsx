import { Skeleton } from "@/components/ui/skeleton";

export default function TrailerSkeleton() {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
   
      <Skeleton className="absolute inset-0" />

  
      <div className="absolute inset-0 flex items-center justify-center">
        <Skeleton className="h-14 w-14 rounded-full" />
      </div>
    </div>
  );
}
