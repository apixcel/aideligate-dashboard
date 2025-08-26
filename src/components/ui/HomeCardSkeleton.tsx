const HomeCardSkeleton = ({ number }: { number?: number }) => {
  return (
    <div className="flex flex-col gap-4">
      {[...Array(number || 5)].map((_, i) => (
        <div key={i} className="flex animate-pulse items-center gap-4 rounded-lg bg-darker p-4">
          {/* Circle for icon */}
          <div className="h-10 w-10 rounded-full bg-gray-700" />

          <div className="flex flex-1 flex-col gap-2">
            {/* Title */}
            <div className="h-4 w-48 rounded bg-gray-700" />

            <div className="flex items-center gap-2">
              <div className="h-4 w-20 rounded bg-gray-700" />
              <div className="h-4 w-32 rounded bg-gray-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeCardSkeleton;
