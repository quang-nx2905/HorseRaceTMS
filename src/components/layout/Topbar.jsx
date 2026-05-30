import {
    Bell,
    Menu,
} from "lucide-react";

import UserDropdown from "./UserDropdown";
import { useLayout } from "../../context/LayoutContext";

function Topbar() {
    const { toggleSidebar } = useLayout();

    return (
        <div className="h-[90px] bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-8 flex items-center justify-between transition-colors">

            <div className="flex items-center gap-4">

                <button
                    onClick={toggleSidebar}
                    className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center"
                >
                    <Menu size={20} />
                </button>

                <input
                    type="text"
                    placeholder="Search races..."
                    className="w-[320px] bg-zinc-100 dark:bg-zinc-800 dark:text-white rounded-2xl px-5 py-3 outline-none border border-transparent dark:border-zinc-700"
                />

            </div>

            <div className="flex items-center gap-5">

                <button className="bg-yellow-400 hover:bg-yellow-500 transition-all px-6 py-3 rounded-2xl font-semibold">
                    + New Race
                </button>

                <button className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <Bell size={20} />
                </button>

                <UserDropdown />

            </div>

        </div>
    );
}

export default Topbar;