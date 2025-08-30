import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        flex items-center p-3 mx-2 rounded-xl transition-all duration-200 group hover:bg-slate-50
        ${isActive ? "text-[#6a51a6]" : "text-slate-500 hover:text-slate-700"}
      `}
    >
      <div className="pr-3">{icon}</div>
      <div
        className={`font-bold text-sm ${isActive ? "text-[#6a51a6]" : "text-slate-500 group-hover:text-slate-700"}`}
      >
        {title}
      </div>
    </Link>
  );
};
