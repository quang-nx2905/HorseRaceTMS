import { useState, useRef, useEffect } from "react";
import {
    Bell,
    Menu,
    Search,
    X,
    Command,
} from "lucide-react";
import UserDropdown from "./UserDropdown";
import NotificationPanel from "../notifications/NotificationPanel";
import { useLayout } from "../../context/LayoutContext";
import { useNotifications } from "../../context/NotificationContext";
import { useLocation } from "react-router-dom";

// Map route paths to page titles
const PAGE_TITLES = {
    "/": "Dashboard",
    "/tournaments": "Tournaments",
    "/horses": "Horses",
    "/jockeys": "Jockeys",
    "/predictions": "Predictions",
    "/leaderboard": "Leaderboard",
    "/referee": "Referee",
    "/spectator": "Spectator",
    "/settings": "Settings",
    "/profile": "Profile",
};

function Topbar() {
    const { toggleSidebar } = useLayout();
    const { unreadCount } = useNotifications();
    const [openNotifications, setOpenNotifications] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const notificationRef = useRef();
    const location = useLocation();

    const currentPage = PAGE_TITLES[location.pathname] || "HorseRace TMS";

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setOpenNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="h-[68px] bg-white/90 backdrop-blur-md border-b border-zinc-200/80 px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-sm shadow-zinc-100/80">

            {/* ── LEFT ── */}
            <div className="flex items-center gap-4">
                {/* Sidebar toggle */}
                <button
                    onClick={toggleSidebar}
                    id="sidebar-toggle-btn"
                    className="group w-9 h-9 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                >
                    <Menu size={17} className="text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                </button>

                {/* Page breadcrumb */}
                <div className="hidden sm:flex items-center gap-2">
                    <span className="text-zinc-400 text-sm font-medium">HorseRace TMS</span>
                    <span className="text-zinc-300 text-sm">/</span>
                    <span className="text-zinc-900 text-sm font-bold">{currentPage}</span>
                </div>
            </div>

            {/* ── SEARCH BAR ── */}
            <div className={`
                hidden md:flex items-center gap-2.5 flex-1 max-w-sm
                px-4 py-2.5
                bg-zinc-50 border rounded-2xl
                transition-all duration-200
                ${searchFocused
                    ? "border-amber-400 ring-2 ring-amber-400/15 bg-white shadow-sm"
                    : "border-zinc-200 hover:border-zinc-300"
                }
            `}>
                <Search size={15} className={`flex-shrink-0 transition-colors ${searchFocused ? "text-amber-500" : "text-zinc-400"}`} />
                <input
                    type="text"
                    placeholder="Search races, horses, jockeys..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="flex-1 bg-transparent text-sm text-zinc-800 placeholder-zinc-400 outline-none"
                />
                <kbd className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 bg-zinc-100 border border-zinc-200 rounded-md text-[10px] text-zinc-400 font-mono">
                    <Command size={9} />K
                </kbd>
            </div>

            {/* ── RIGHT ── */}
            <div className="flex items-center gap-2">

                {/* Live badge */}
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-100 rounded-xl">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                    <span className="text-red-600 text-xs font-bold">2 Live</span>
                </div>

                {/* Notification bell */}
                <div ref={notificationRef} className="relative">
                    <button
                        id="notification-btn"
                        onClick={() => setOpenNotifications(!openNotifications)}
                        className="relative w-9 h-9 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                    >
                        <Bell size={16} className="text-zinc-600" />
                        {unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center px-1 shadow-md shadow-red-500/30 border-2 border-white">
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </div>
                        )}
                    </button>
                    {openNotifications && <NotificationPanel />}
                </div>

                {/* Vertical divider */}
                <div className="w-px h-7 bg-zinc-200 mx-1" />

                {/* User avatar */}
                <UserDropdown />
            </div>
        </div>
    );
}

export default Topbar;
