import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-[280px] h-screen bg-[#f8f6f4] border-r border-zinc-200 fixed left-0 top-0 flex flex-col justify-between">

      {/* Top Section */}
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

          <SidebarItem
            text="Dashboard"
            to="/"
          />

          <SidebarItem
            text="Tournaments"
            to="/tournaments"
          />

          <SidebarItem
            text="Horses"
            to="/horses"
          />

          <SidebarItem
            text="Jockeys"
            to="/jockeys"
          />

          <SidebarItem
            text="Live Tracking"
            to="/live-tracking"
          />

          <SidebarItem
            text="Predictions"
            to="/predictions"
          />

          <SidebarItem
            text="Leaderboard"
            to="/leaderboard"
          />

          <SidebarItem
            text="Referee"
            to="/referee"
          />

          <SidebarItem
            text="Spectator"
            to="/spectator"
          />

        </div>

      </div>

      {/* Bottom Section */}
      <div className="p-6">

        {/* Upgrade Card */}
        <div className="bg-yellow-400 rounded-[28px] p-6 mb-6">

          <h2 className="font-bold text-2xl">
            Upgrade to Pro
          </h2>

          <p className="text-sm mt-3 leading-relaxed">
            Unlock advanced analytics,
            AI prediction metrics,
            and premium race insights.
          </p>

          <button className="bg-black text-white w-full py-4 rounded-2xl mt-6 font-semibold">

            Upgrade Now

          </button>

        </div>

        {/* Bottom Navigation */}
        <div className="space-y-2">

          <SidebarItem
            text="Settings"
            to="/settings"
          />

          <SidebarItem
            text="Logout"
            to="/logout"
          />

        </div>

      </div>

    </div>
  );
}

function SidebarItem({
  text,
  to,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-5 py-4 rounded-2xl transition-all duration-200
        ${
          isActive
            ? "bg-white border border-zinc-200 shadow-sm font-semibold"
            : "hover:bg-white text-zinc-600"
        }`
      }
    >

      {text}

    </NavLink>
  );
}

export default Sidebar;