import { NavLink } from "react-router-dom";

function Sidebar({
  isOpen,
  setIsOpen,
}) {
  return (
    <>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 z-50
        w-[280px] h-screen
        bg-[#f8f6f4]
        border-r border-zinc-200
        flex flex-col justify-between
        transition-transform duration-300

        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0
        `}
      >

        {/* Top */}
        <div>

          {/* Logo */}
          <div className="px-8 py-10 flex justify-between items-center">

            <div>

              <h1 className="text-4xl font-bold">
                EquineTrack
              </h1>

              <p className="text-zinc-500 mt-2">
                Elite Tournament Management
              </p>

            </div>

            {/* Mobile Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-2xl"
            >
              ✕
            </button>

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
              text="Predictions"
              to="/predictions"
            />

            <SidebarItem
              text="Leaderboard"
              to="/leaderboard"
            />

            <SidebarItem
              text="Live Tracking"
              to="/live-tracking"
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

        {/* Bottom */}
        <div className="p-6">

          <div className="bg-yellow-400 rounded-[28px] p-6 mb-6">

            <h2 className="font-bold text-2xl">
              Upgrade to Pro
            </h2>

            <p className="text-sm mt-3 leading-relaxed">
              Unlock advanced analytics
              and AI insights.
            </p>

            <button className="bg-black text-white w-full py-4 rounded-2xl mt-6 font-semibold">

              Upgrade Now

            </button>

          </div>

        </div>

      </div>

    </>
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