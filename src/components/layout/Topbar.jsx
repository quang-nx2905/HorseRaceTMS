import UserDropdown from "./UserDropdown";

import { useTheme } from "../../context/ThemeContext";

function Topbar() {

    const { darkMode, toggleTheme } = useTheme();

    return (

        <div
            className="
        h-[90px]

        bg-white
        dark:bg-zinc-900

        border-b
        border-zinc-200
        dark:border-zinc-800

        px-8

        flex
        items-center
        justify-between

        transition-colors
      "
        >

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Search races..."

                className="
          w-[300px]

          bg-zinc-100
          dark:bg-zinc-800

          dark:text-white

          rounded-2xl

          px-5
          py-3

          outline-none

          border
          border-transparent

          dark:border-zinc-700
        "
            />

            {/* RIGHT */}
            <div className="flex items-center gap-5">

                {/* THEME TOGGLE */}
                <button
                    onClick={toggleTheme}

                    className="
            w-14
            h-14

            rounded-2xl

            bg-zinc-100
            dark:bg-zinc-800

            text-2xl

            flex
            items-center
            justify-center

            transition-all
          "
                >
                    {darkMode ? "🌙" : "☀️"}
                </button>

                {/* BUTTON */}
                <button
                    className="
            bg-yellow-400
            hover:bg-yellow-500

            transition-all

            px-6
            py-3

            rounded-2xl

            font-semibold
          "
                >
                    + New Race
                </button>

                {/* USER */}
                <UserDropdown />

            </div>

        </div>

    );
}

export default Topbar;