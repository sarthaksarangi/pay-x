export const Heading = ({ heading }: { heading: string }) => {
  return (
    <div>
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        {heading}
      </div>
    </div>
  );
};
