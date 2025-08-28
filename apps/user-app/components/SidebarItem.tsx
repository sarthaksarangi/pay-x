"use client";

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
      className={`flex items-center ${
        isActive ? "text-[#6a51a6]" : "text-slate-500"
      } cursor-pointer p-2 pl-8`}
    >
      <div className="pr-2">{icon}</div>
      <div
        className={`font-bold ${
          isActive ? "text-[#6a51a6]" : "text-slate-500"
        }`}
      >
        {title}
      </div>
    </Link>
  );
};
