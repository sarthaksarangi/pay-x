export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-6 rounded-xl bg-[#ededed]">
      <h1 className="text-xl border-b pb-2">{title}</h1>
      <div className="pt-2">{children}</div>
    </div>
  );
}
