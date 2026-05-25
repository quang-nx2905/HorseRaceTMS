import {
  Bell,
  BadgeHelp,
  Settings,
  Search,
} from "lucide-react";

function Topbar() {
  return (
    <div className="h-[90px] bg-[#f8f6f4] border-b border-zinc-200 flex items-center justify-between px-10">

      {/* Search */}
      <div className="w-[420px] h-[56px] bg-white rounded-2xl border border-zinc-200 flex items-center px-5 gap-3">

        <Search size={20} className="text-zinc-400" />

        <input
          type="text"
          placeholder="Search races or jockeys..."
          className="bg-transparent outline-none w-full"
        />

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <button className="bg-yellow-400 px-8 py-4 rounded-2xl font-semibold">
          + New Race
        </button>

        <Bell />

        <BadgeHelp />

        <Settings />

      </div>

    </div>
  );
}

export default Topbar;