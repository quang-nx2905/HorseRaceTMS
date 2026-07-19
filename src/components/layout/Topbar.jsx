import {
    Menu,
} from "lucide-react";
import UserDropdown from "./UserDropdown";
import { useLayout } from "../../context/LayoutContext";
import { useLocation } from "react-router-dom";

// Map route paths to page titles
const PAGE_TITLES = {
    "/": "Dashboard",
    "/tournaments": "Tournaments",
    "/horses": "Horses",
    "/jockeys": "Jockeys",
    "/predictions": "Predictions",
    "/leaderboard": "Leaderboard",
    "/race-duties": "Race Duties",
    "/spectator": "Race Broadcasts",
    "/settings": "Settings",
    "/profile": "Profile",
};

function Topbar() {
    const { toggleSidebar } = useLayout();
    const location = useLocation();

    const currentPage = PAGE_TITLES[location.pathname] || "HorseRace TMS";

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

                {/* Vertical divider */}
                <div className="w-px h-7 bg-zinc-200 mx-1" />

                {/* User avatar */}
                <UserDropdown />
            </div>
        </div>
    );
}

export default Topbar;
