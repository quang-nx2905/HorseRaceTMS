import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-[280px] h-screen bg-[#f8f6f4] border-r border-zinc-200 fixed left-0 top-0 flex flex-col justify-between">

      <div>

        <div className="px-8 py-10">

          <h1 className="text-4xl font-bold">
            EquineTrack
          </h1>

          <p className="text-zinc-500 mt-2">
            Elite Tournament Management
          </p>

        </div>

        <div className="px-4 space-y-2">

          <SidebarItem text="Dashboard" active />

          <SidebarItem text="Tournaments" />

          <SidebarItem text="Horses" />

          <SidebarItem text="Jockeys" />

          <SidebarItem text="Live Tracking" />

          <SidebarItem text="Predictions" />

          <SidebarItem text="Leaderboard" />

          <SidebarItem text="Referee" />

          <SidebarItem text="Spectator" />

        </div>

      </div>

      <div className="p-6">

        <div className="bg-yellow-400 rounded-3xl p-6 mb-6">

          <h2 className="font-bold text-xl">
            Upgrade to Pro
          </h2>

          <button className="bg-black text-white w-full py-3 rounded-2xl mt-5">
            Upgrade
          </button>

        </div>

      </div>

    </div>
  );
}

function SidebarItem({
  text,
  active,
}) {
  return (
    <div
      className={`px-5 py-4 rounded-2xl cursor-pointer
      ${
        active
          ? "bg-white border border-zinc-200"
          : "hover:bg-white"
      }`}
    >

      <span className="font-medium">
        {text}
      </span>

    </div>
  );
}

export default Sidebar;