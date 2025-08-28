import { getReviews } from "@/actions/reviews.action";
import HomeCardSkeleton from "@/components/ui/HomeCardSkeleton";
import { IReview } from "@/interface/review.interface";
import { IFeedCard } from "@/types";
import { format } from "date-fns";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HomeFeedTabCard from "./HomeFeedTabCard";

const ReviewsTabs = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await getReviews({
        page: 1,
        limit: 5,
      });
      setIsLoading(false);
      if (res.data) {
        setReviews(res.data);
      }
    };
    fetch();
  }, []);
  return (
    <div className="flex flex-col gap-4 divide-y divide-darker">
      {isLoading ? (
        <HomeCardSkeleton />
      ) : (
        reviews.map((item) => {
          const data: IFeedCard = {
            action: "review",
            icon: Star,
            id: item.id,
            time: format(new Date(item.created_at), "MMM dd, h:mm a"),
            title: `${item.rating} ${t("reviews.placeholder")} ${item.user_name}`,
          };
          return <HomeFeedTabCard key={item.id} item={data} />;
        })
      )}
    </div>
  );
};

export default ReviewsTabs;
