"use client";
import { useState } from "react";
import { SidebarItem } from "./SidebarItem";
import {
  HomeIcon,
  P2PTransferIcon,
  TransactionsIcon,
  TransferIcon,
} from "./Icons";
import { AppbarClient } from "./AppbarClient";

export function ResponsiveSidebar({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-white border-r border-slate-200/60 shadow-sm
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/60">
          <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
            Dashboard
          </h2>
          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <svg
              className="w-5 h-5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 mt-2">
          <SidebarItem href="/dashboard" icon={<HomeIcon />} title="Home" />
          <SidebarItem
            href="/transactions"
            icon={<TransactionsIcon />}
            title="Transactions"
          />
          <SidebarItem
            href="/transfer"
            icon={<TransferIcon />}
            title="Transfer"
          />
          <SidebarItem
            href="/p2p"
            icon={<P2PTransferIcon />}
            title="P2P Transfer"
          />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Appbar on top WITH hamburger */}
        <div className="lg:hidden">
          <AppbarClient
            showMenuButton
            onMenuClick={() => setIsMobileMenuOpen(true)}
          />
        </div>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
