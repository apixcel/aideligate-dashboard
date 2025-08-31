const SectionTitle = ({ title, description }: { title: string; description: string }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-lightest md:text-3xl">{title}</h2>
      <p className="text-[12px] text-lighter md:text-[14px]">{description}</p>
    </div>
  );
};

export default SectionTitle;
