const SectionSubTitle = ({ title, description }: { title: string; description: string }) => {
  return (
    <div>
      <h6 className="mb-1 leading-none font-semibold">{title}</h6>
      <p className="text-sm text-lighter">{description}</p>
    </div>
  );
};

export default SectionSubTitle;
