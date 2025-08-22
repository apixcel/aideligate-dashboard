const SectionTitle = ({ title, description }: { title: string; description: string }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-lightest">{title}</h2>
      <p className="text-lighter">{description}</p>
    </div>
  );
};

export default SectionTitle;
