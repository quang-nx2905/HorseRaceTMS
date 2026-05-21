function Navbar() {
  return (
    <header className="h-20 border-b border-zinc-800 bg-zinc-900 px-8 flex items-center justify-between">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Horse Racing Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="bg-zinc-800 px-4 py-2 rounded-xl outline-none text-white"
        />

        {/* Notification */}
        <button className="bg-zinc-800 px-4 py-2 rounded-xl hover:bg-zinc-700 transition">
          🔔
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold">

          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
            A
          </div>

          <span>Admin</span>

        </div>

      </div>

    </header>
  );
}

export default Navbar;