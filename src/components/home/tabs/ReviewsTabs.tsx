import { IFeedCard } from "@/types";
import { Star } from "lucide-react";
import HomeFeedTabCard from "./HomeFeedTabCard";

const reviewsTabsTableData: IFeedCard[] = [
  {
    id: "3",
    icon: Star,
    title: "New 5-star review from Maria: 'Great service!'",
    action: "review",
    time: "10 minutes ago",
  },
];

const ReviewsTabs = () => {
  return (
    <div className="flex flex-col gap-4 divide-y divide-darker">
      {reviewsTabsTableData.map((item) => (
        <HomeFeedTabCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ReviewsTabs;
