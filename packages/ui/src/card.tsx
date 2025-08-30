export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="group relative rounded-2xl bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-lg ">
      <div className="relative">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6 tracking-tight">
          {title}
        </h1>

        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
