import { IFeedCard } from "@/types";
import { cn } from "@/utils";

const HomeFeedTabCard = ({ item }: { item: IFeedCard }) => {
  return (
    <div className="flex items-center gap-4 pb-4 last:pb-0">
      <div className="flex gap-4">
        <div className="flex-center h-[36px] w-[36px] rounded-full bg-darker">
          <item.icon className="h-4 w-4" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-lighter">{item.title}</p>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-md bg-brand-blue-btn px-2 py-1 text-xs text-lighter",
                item.action === "review" && "border border-darker bg-dark"
              )}
            >
              {item.action}
            </span>
            <span className="text-xs text-light">{item.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFeedTabCard;
