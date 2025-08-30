interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
  showMenuButton?: boolean;
  onMenuClick?: () => void;
}

export const Appbar = ({
  user,
  onSignin,
  onSignout,
  showMenuButton,
  onMenuClick,
}: AppbarProps) => {
  return (
    <div className="w-full">
      <div className="backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm shadow-slate-200/50">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Left side */}
          <div className="flex items-center gap-3">
            {showMenuButton && (
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                ☰
              </button>
            )}
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Pay-X
            </h1>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {user?.name && (
              <span className="text-sm text-slate-600 font-medium hidden sm:block">
                Welcome, {user.name}
              </span>
            )}
            <button
              onClick={user ? onSignout : onSignin}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all duration-200 shadow-sm"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
