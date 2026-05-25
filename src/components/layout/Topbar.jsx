function Topbar() {
  return (
    <div className="h-[90px] bg-[#f8f6f4] border-b border-zinc-200 flex items-center justify-between px-10">

      <div className="w-[420px] h-[56px] bg-white rounded-2xl border border-zinc-200 flex items-center px-5">

        <input
          type="text"
          placeholder="Search races..."
          className="bg-transparent outline-none w-full"
        />

      </div>

      <button className="bg-yellow-400 px-8 py-4 rounded-2xl font-semibold">

        + New Race

      </button>

    </div>
  );
}

export default Topbar;