import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-[56px] h-[56px] bg-yellow-400 hover:bg-yellow-500 rounded-2xl font-bold text-lg transition-all flex items-center justify-center text-black"
      >
        {user?.name?.[0]?.toUpperCase() || "U"}
      </button>

      {open && (
        <div
          className="absolute right-0 top-16 w-[260px] bg-white border border-zinc-200 rounded-2xl shadow-lg overflow-hidden z-50 transition-colors"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-zinc-100 bg-zinc-50">
            <p className="font-bold text-sm">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-zinc-500">
              {user?.email || "email@example.com"}
            </p>
          </div>

          {/* Menu */}
          <div className="py-2">
            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="w-full text-left px-5 py-4 rounded-none hover:bg-zinc-100 transition-all text-sm"
            >
              👤 Profile
            </button>

            <button
              onClick={() => {
                navigate("/settings");
                setOpen(false);
              }}
              className="w-full text-left px-5 py-4 rounded-none hover:bg-zinc-100 transition-all text-sm"
            >
              ⚙️ Settings
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-zinc-100 py-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-5 py-4 text-red-500 hover:bg-red-50 transition-all font-semibold text-sm"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
