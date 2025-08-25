import { SectionSubTitle, SectionTitle } from "@/components";
import Reviews from "@/components/review/Reviews";

const page = () => {
  return (
    <div>
      <SectionTitle
        title="Reviews"
        description="Manage customer reviews and feedback from all platforms"
      />

      <div className="mt-[20px] rounded-[10px] border-[1px] border-dark p-5">
        <SectionSubTitle
          title="Customer Reviews"
          description="View and respond to reviews from Google, Facebook, and TripAdvisor"
        />
        <Reviews />
      </div>
    </div>
  );
};

export default page;
