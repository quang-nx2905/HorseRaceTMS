import { NavLink } from "react-router-dom";

function Sidebar() {

  const menus = [
    { name: "Dashboard", path: "/" },
    { name: "Tournaments", path: "/tournaments" },
    { name: "Horses", path: "/horses" },
    { name: "Jockeys", path: "/jockeys" },
    { name: "Predictions", path: "/predictions" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Referee", path: "/referee" },
    { name: "Spectator", path: "/spectator" },
  ];

  return (
    <div className="w-[260px] bg-white dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 min-h-screen flex flex-col justify-between p-6 transition-colors">

      <div>

        <div className="mb-12">
          <h1 className="text-4xl font-black dark:text-white">
            Horse Race
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            Premium Horse
            <br />
            Racing Platform
          </p>
        </div>

        <div className="space-y-3">

          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `block px-5 py-4 rounded-2xl transition-all font-medium ${isActive
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                }`
              }
            >
              {menu.name}
            </NavLink>
          ))}

        </div>

      </div>

      <div className="bg-yellow-50 dark:bg-yellow-950 rounded-3xl p-5 transition-colors">
        <h3 className="text-xl font-bold dark:text-white mb-3">
          Upgrade to Pro
        </h3>

        <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-5">
          Unlock advanced analytics and premium AI insights.
        </p>

        <button className="w-full bg-yellow-400 hover:bg-yellow-500 transition-all py-3 rounded-2xl font-semibold text-black">
          Upgrade Now
        </button>
      </div>

    </div>
  );
}

export default Sidebar;