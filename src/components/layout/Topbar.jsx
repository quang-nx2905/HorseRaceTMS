import UserDropdown from "./UserDropdown";

function Topbar() {
    return (
        <div className="h-[90px] bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-8 flex items-center justify-between transition-colors">

            <input
                type="text"
                placeholder="Search races..."
                className="w-[300px] bg-zinc-100 dark:bg-zinc-800 dark:text-white rounded-2xl px-5 py-3 outline-none border border-transparent dark:border-zinc-700"
            />

            <div className="flex items-center gap-5">

                <button className="bg-yellow-400 hover:bg-yellow-500 transition-all px-6 py-3 rounded-2xl font-semibold">
                    + New Race
                </button>

                {/* User Avatar with Dropdown */}
                <UserDropdown />

            </div>

        </div>
    );
}

export default Topbar;