function Topbar({
    setIsOpen,
}) {
    return (
        <div className="h-[90px] bg-[#f8f6f4] border-b border-zinc-200 flex items-center justify-between px-4 lg:px-10">

            {/* Left */}
            <div className="flex items-center gap-4">

                {/* Mobile Menu */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="lg:hidden text-3xl"
                >
                    ☰
                </button>

                {/* Search */}
                <div className="w-[220px] lg:w-[420px] h-[56px] bg-white rounded-2xl border border-zinc-200 flex items-center px-5">

                    <input
                        type="text"
                        placeholder="Search races..."
                        className="bg-transparent outline-none w-full"
                    />

                </div>

            </div>

            {/* Right */}
            <button className="bg-yellow-400 px-4 lg:px-8 py-4 rounded-2xl font-semibold text-sm lg:text-base">

                + New Race

            </button>

        </div>
    );
}

export default Topbar;