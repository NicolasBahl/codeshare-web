import Skeleton from "@/components/skeleton";

export default function Home() {
  return (
    <>
      <main className="flex w-full flex-col items-center">
        {/* for twice */}
        {Array(3)
          .fill(0)
          .map((_, i) => (
            // eslint-disable-next-line react/jsx-key
            <div className="my-5 flex items-center space-x-4 rounded-xl bg-neutral-50 p-5">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
      </main>
    </>
  );
}
