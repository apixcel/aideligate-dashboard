import { cn } from "@/utils";

const SectionSubTitle = ({
  title,
  titleClassName,
  description,
  descriptionClassName,
  icon: Icon,
}: {
  title: string;
  titleClassName?: string;
  description: string;
  descriptionClassName?: string;
  icon?: React.ElementType;
}) => {
  return (
    <div>
      <h6 className={cn("mb-2 flex items-center gap-2 leading-none font-semibold", titleClassName)}>
        {Icon && <Icon className="h-4 w-4" />} {title}
      </h6>
      <p className={cn("text-sm text-lighter", descriptionClassName)}>{description}</p>
    </div>
  );
};

export default SectionSubTitle;
