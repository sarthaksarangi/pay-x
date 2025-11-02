export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="w-full mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="group relative rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 md:p-8 shadow-sm transition-all duration-200 hover:shadow-lg">
        <div className="relative w-full">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-4 sm:mb-5 md:mb-6 tracking-tight break-words">
            {title}
          </h2>

          <div className="space-y-3 sm:space-y-4 w-full overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
