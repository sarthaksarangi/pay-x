export const Heading = ({ heading }: { heading: string }) => {
  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#6a51a6] pt-4 sm:pt-6 md:pt-8 mb-4 sm:mb-6 md:mb-8 font-bold break-words">
        {heading}
      </h1>
    </div>
  );
};
