import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Trophy,
  Users,
  BrainCircuit,
  BarChart3,
  Shield,
  Eye,
  GanttChartSquare,
  Zap,
  ChevronRight,
  UserCog,
} from "lucide-react";
import { useLayout } from "../../context/LayoutContext";
import { useAuth } from "../../context/AuthContext";

const getNavGroups = (userRole) => {
  const role = userRole || "Spectator";

  const allGroups = [
    {
      label: "Main",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, roles: ["Admin", "Referee", "HorseOwner", "Jockey", "Spectator"] },
        { name: "Tournaments", path: "/tournaments", icon: Trophy, roles: ["Admin", "Referee", "HorseOwner", "Jockey", "Spectator"] },
        { name: "Horses", path: "/horses", icon: GanttChartSquare, roles: ["Admin", "Referee", "HorseOwner", "Jockey", "Spectator"] },
        { name: "My Horse", path: "/my-horses", icon: GanttChartSquare, roles: ["Admin", "HorseOwner"] },
        { name: "Jockeys", path: "/jockeys", icon: Users, roles: ["Admin", "Referee", "HorseOwner", "Jockey", "Spectator"] },
      ],
    },
    {
      label: "Analytics",
      items: [
        { name: "Predictions", path: "/predictions", icon: BrainCircuit, roles: ["Admin", "Spectator"] },
        { name: "Leaderboard", path: "/leaderboard", icon: BarChart3, roles: ["Admin", "Referee", "HorseOwner", "Jockey", "Spectator"] },
      ],
    },
    {
      label: "Management",
      items: [
        { name: "Referee", path: "/referee", icon: Shield, roles: ["Admin", "Referee"] },
        { name: "Spectator", path: "/spectator", icon: Eye, roles: ["Admin", "Spectator"] },
      ],
    },
    {
      label: "Admin Panel",
      items: [
        { name: "User Management", path: "/admin/users", icon: UserCog, roles: ["Admin"] },
      ]
    }
  ];

  return allGroups
    .map(group => ({
      ...group,
      items: group.items.filter(item => item.roles.includes(role))
    }))
    .filter(group => group.items.length > 0);
};

function Sidebar() {
  const { sidebarOpen } = useLayout();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const navGroups = getNavGroups(user?.role);

  return (
    <div
      className={`
        relative flex flex-col
        bg-zinc-950
        min-h-screen
        transition-all duration-300 ease-in-out
        border-r border-zinc-800/60
        ${sidebarOpen ? "w-[260px]" : "w-[76px]"}
      `}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-32 h-64 bg-violet-500/4 rounded-full blur-3xl" />
      </div>

      {/* ── LOGO / BRAND ── */}
      <div 
        onClick={() => navigate("/")}
        className={`
        relative z-10 flex items-center gap-3
        px-4 py-5 cursor-pointer hover:bg-zinc-900/50 transition-colors
        border-b border-zinc-800/60
        ${sidebarOpen ? "px-5" : "justify-center px-4"}
      `}>
        <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
          <Zap className="w-5 h-5 text-zinc-950" strokeWidth={2.5} />
        </div>
        {sidebarOpen && (
          <div className="truncate">
            <h1 className="text-white font-black text-[15px] leading-tight tracking-tight">
              HorseRace<span className="text-amber-400">TMS</span>
            </h1>
            <p className="text-zinc-500 text-[10px] font-semibold uppercase tracking-widest leading-none mt-0.5">
              Racing Platform
            </p>
          </div>
        )}
      </div>

      {/* ── NAVIGATION GROUPS ── */}
      <nav className="relative z-10 flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-2">
            {sidebarOpen && (
              <p className="px-2 py-2 text-[9px] font-black uppercase tracking-[0.15em] text-zinc-600">
                {group.label}
              </p>
            )}
            {!sidebarOpen && <div className="my-1 mx-2 h-px bg-zinc-800/60" />}

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    title={!sidebarOpen ? item.name : undefined}
                    className={`
                      group relative flex items-center gap-3
                      rounded-xl transition-all duration-200
                      ${sidebarOpen ? "px-3 py-2.5" : "justify-center px-0 py-3"}
                      ${isActive
                        ? "bg-amber-500/15 text-amber-400"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
                      }
                    `}
                  >
                    {/* Active left indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-amber-400 rounded-r-full" />
                    )}

                    <div className={`
                      flex-shrink-0 flex items-center justify-center
                      w-8 h-8 rounded-lg transition-all
                      ${isActive
                        ? "bg-amber-400/20 text-amber-400"
                        : "text-zinc-500 group-hover:text-zinc-200 group-hover:bg-zinc-700/50"
                      }
                    `}>
                      <Icon size={17} strokeWidth={isActive ? 2.5 : 2} />
                    </div>

                    {sidebarOpen && (
                      <>
                        <span className={`
                          flex-1 text-sm font-semibold leading-none
                          ${isActive ? "text-amber-300" : ""}
                        `}>
                          {item.name}
                        </span>
                        {isActive && (
                          <ChevronRight className="w-3.5 h-3.5 text-amber-500/60" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── BOTTOM STATUS BADGE ── */}
      {sidebarOpen && (
        <div className="relative z-10 m-3 p-3.5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700/50">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-300 uppercase tracking-wider">System Online</p>
              <p className="text-[9px] text-zinc-600 font-medium">All services running</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;