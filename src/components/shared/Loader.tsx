import { LoaderCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge("flex h-full w-full items-center justify-center", className)}>
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default Loader;
