import {
  LayoutDashboard,
  Trophy,
  Horse,
  Flag,
  Radar,
  BarChart3,
  Shield,
  Eye,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="w-[280px] h-screen bg-[#f8f6f4] border-r border-zinc-200 flex flex-col justify-between fixed left-0 top-0">

      {/* Top */}
      <div>

        {/* Logo */}
        <div className="px-8 py-10">

          <h1 className="text-4xl font-bold">
            EquineTrack
          </h1>

          <p className="text-zinc-500 mt-2">
            Elite Tournament Management
          </p>

        </div>

        {/* Navigation */}
        <div className="px-4 space-y-2">

          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />

          <SidebarItem icon={<Trophy size={20} />} text="Tournaments" />

          <SidebarItem icon={<Horse size={20} />} text="Horses" />

          <SidebarItem icon={<Flag size={20} />} text="Jockeys" />

          <SidebarItem icon={<Radar size={20} />} text="Live Tracking" />

          <SidebarItem icon={<BarChart3 size={20} />} text="Predictions" />

          <SidebarItem icon={<BarChart3 size={20} />} text="Leaderboard" />

          <SidebarItem icon={<Shield size={20} />} text="Referee" />

          <SidebarItem icon={<Eye size={20} />} text="Spectator" />

        </div>

      </div>

      {/* Bottom */}
      <div className="p-6">

        <div className="bg-yellow-400 rounded-3xl p-6 mb-6">

          <h2 className="font-bold text-xl">
            Upgrade to Pro
          </h2>

          <p className="text-sm mt-2">
            Unlock advanced analytics and AI metrics.
          </p>

          <button className="bg-black text-white w-full py-3 rounded-2xl mt-5 font-semibold">
            Upgrade
          </button>

        </div>

        <div className="space-y-3">

          <SidebarItem icon={<Settings size={20} />} text="Settings" />

          <SidebarItem icon={<LogOut size={20} />} text="Logout" />

        </div>

      </div>

    </div>
  );
}

function SidebarItem({ icon, text, active }) {
  return (
    <div
      className={`flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all
      ${
        active
          ? "bg-white shadow-sm border border-zinc-200"
          : "hover:bg-white"
      }`}
    >
      {icon}

      <span className="font-medium">
        {text}
      </span>
    </div>
  );
}

export default Sidebar;