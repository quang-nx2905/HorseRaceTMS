import UserDropdown from "./UserDropdown";

function Topbar({
    setIsOpen,
}) {

    return (
        <div
            className="
        h-[90px]
        bg-[#f8f6f4]
        border-b
        border-zinc-200
        flex
        items-center
        justify-between
        px-4
        lg:px-10
      "
        >

            {/* LEFT */}
            <div className="flex items-center gap-4">

                {/* Mobile Menu */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="
            lg:hidden
            text-3xl
          "
                >
                    ☰
                </button>

                {/* Search */}
                <div
                    className="
            w-[220px]
            lg:w-[420px]
            h-[56px]
            bg-white
            rounded-2xl
            border
            border-zinc-200
            flex
            items-center
            px-5
          "
                >

                    <input
                        type="text"
                        placeholder="Search races..."
                        className="
              bg-transparent
              outline-none
              w-full
            "
                    />

                </div>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

                {/* Notification */}
                <button
                    className="
            w-[56px]
            h-[56px]
            bg-white
            border
            border-zinc-200
            rounded-2xl
            text-2xl
          "
                >
                    🔔
                </button>

                {/* User */}
                <UserDropdown />

            </div>

        </div>
    );
}

export default Topbar;