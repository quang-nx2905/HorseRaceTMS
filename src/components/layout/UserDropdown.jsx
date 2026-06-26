import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { User, Settings, LogOut, ChevronDown, BadgeCheck } from "lucide-react";

function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();
  
  useEffect(() => {
    if (user && user.avatarUrl === undefined) {
      import("../../api/axiosClient").then(({ default: axiosClient }) => {
        axiosClient.get("/Profile/Me")
          .then(res => {
            setUser(prev => ({ ...prev, avatarUrl: res.data.avatarUrl || null, name: res.data.fullName || prev?.name }));
          })
          .catch(err => console.error("Failed to fetch user profile in dropdown:", err));
      });
    }
  }, [user?.id, user?.avatarUrl, setUser]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
    setOpen(false);
  };

  const initial = user?.name?.[0]?.toUpperCase() || "U";

  if (!user) {
    return (
      <div className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-2xl border bg-white border-zinc-200 shadow-sm opacity-50 cursor-not-allowed">
        <div className="w-8 h-8 rounded-xl bg-zinc-200 animate-pulse" />
        <div className="hidden sm:block text-left space-y-1">
          <div className="w-20 h-3 bg-zinc-200 animate-pulse rounded" />
          <div className="w-12 h-2 bg-zinc-200 animate-pulse rounded" />
        </div>
        <ChevronDown size={13} className="text-zinc-300" />
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        id="user-dropdown-btn"
        onClick={() => setOpen(!open)}
        className={`
                    flex items-center gap-2.5 pl-1 pr-3 py-1
                    rounded-2xl border transition-all duration-200
                    hover:shadow-sm active:scale-95
                    ${
                      open
                        ? "bg-zinc-100 border-zinc-300 shadow-sm"
                        : "bg-white border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300"
                    }
                `}
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-black text-zinc-950 text-sm shadow-inner overflow-hidden border border-amber-200">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          ) : (
            initial
          )}
        </div>

        {/* Name — hidden on small screens */}
        <div className="hidden sm:block text-left">
          <p className="text-xs font-bold text-zinc-800 leading-tight">
            {user.name || "Unknown"}
          </p>
          <p className="text-[10px] text-zinc-400 leading-none font-medium">
            {user.role || "Member"}
          </p>
        </div>

        <ChevronDown
          size={13}
          className={`text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] w-[240px] bg-white border border-zinc-200 rounded-2xl shadow-xl shadow-zinc-900/10 overflow-hidden z-50"
          style={{ animation: "dropdownFadeIn 0.15s ease-out" }}
        >
          <style>{`
                        @keyframes dropdownFadeIn {
                            from { opacity: 0; transform: translateY(-6px) scale(0.97); }
                            to   { opacity: 1; transform: translateY(0) scale(1); }
                        }
                    `}</style>

          {/* User info header */}
          <div className="px-4 py-4 bg-gradient-to-br from-zinc-50 to-white border-b border-zinc-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-black text-zinc-950 text-base shadow-sm overflow-hidden border border-amber-200">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                ) : (
                  initial
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-sm text-zinc-900 truncate">
                    {user.name || "Unknown"}
                  </p>
                  <BadgeCheck className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                </div>
                <p className="text-xs text-zinc-400 font-medium truncate">
                  {user.email || ""}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                {user.role || "Member"}
              </span>
            </div>
          </div>

          {/* Menu items */}
          <div className="p-1.5">
            <button
              id="goto-profile-btn"
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 transition-colors text-sm text-zinc-700 font-medium group"
            >
              <div className="w-7 h-7 rounded-lg bg-zinc-100 group-hover:bg-zinc-200 flex items-center justify-center transition-colors">
                <User className="w-3.5 h-3.5 text-zinc-500" />
              </div>
              My Profile
            </button>

            <button
              id="goto-settings-btn"
              onClick={() => {
                navigate("/settings");
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 transition-colors text-sm text-zinc-700 font-medium group"
            >
              <div className="w-7 h-7 rounded-lg bg-zinc-100 group-hover:bg-zinc-200 flex items-center justify-center transition-colors">
                <Settings className="w-3.5 h-3.5 text-zinc-500" />
              </div>
              Settings
            </button>
          </div>

          {/* Logout */}
          <div className="p-1.5 border-t border-zinc-100">
            <button
              id="logout-btn"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-sm text-red-500 font-bold group"
            >
              <div className="w-7 h-7 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                <LogOut className="w-3.5 h-3.5 text-red-500" />
              </div>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
