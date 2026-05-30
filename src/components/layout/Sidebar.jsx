import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Trophy,
  Users,
  BrainCircuit,
  BarChart3,
  Shield,
  Eye,
  Settings,
  LogOut,
  GanttChartSquare,
} from "lucide-react";

import { useLayout } from "../../context/LayoutContext";

function Sidebar() {
  const { sidebarOpen } = useLayout();

  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Tournaments",
      path: "/tournaments",
      icon: <Trophy size={20} />,
    },
    {
      name: "Horses",
      path: "/horses",
      icon: <GanttChartSquare size={20} />,
    },
    {
      name: "Jockeys",
      path: "/jockeys",
      icon: <Users size={20} />,
    },
    {
      name: "Predictions",
      path: "/predictions",
      icon: <BrainCircuit size={20} />,
    },
    {
      name: "Leaderboard",
      path: "/leaderboard",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Referee",
      path: "/referee",
      icon: <Shield size={20} />,
    },
    {
      name: "Spectator",
      path: "/spectator",
      icon: <Eye size={20} />,
    },
  ];

  return (
    <div
      className={`
      bg-white dark:bg-zinc-900
      border-r border-zinc-200 dark:border-zinc-800
      min-h-screen
      flex flex-col justify-between
      transition-all duration-300
      ${sidebarOpen ? "w-[260px] p-6" : "w-[95px] p-4"}
    `}
    >
      <div>
        <div className="mb-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center font-black text-black text-xl">
            H
          </div>

          {sidebarOpen && (
            <div>
              <h1 className="text-2xl font-black dark:text-white">
                Horse Race
              </h1>

              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Premium Horse Racing Platform
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `
                flex items-center gap-4
                px-4 py-4 rounded-2xl
                transition-all duration-200
                font-medium
                ${isActive
                  ? "bg-yellow-400 text-black"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }
              `
              }
            >
              {menu.icon}

              {sidebarOpen && <span>{menu.name}</span>}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
          <Settings size={20} />

          {sidebarOpen && <span>Settings</span>}
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-all">
          <LogOut size={20} />

          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;