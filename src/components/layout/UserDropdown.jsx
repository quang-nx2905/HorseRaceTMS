import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function UserDropdown() {

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        toast.success("Logged out successfully");

        navigate("/login");
    };

    return (

        <div className="relative">

            {/* Avatar */}
            <button
                onClick={() => setOpen(!open)}
                className="
          flex
          items-center
          gap-3
          bg-white
          dark:bg-zinc-900
          border
          border-zinc-200
          dark:border-zinc-800
          px-4
          py-3
          rounded-2xl
        "
            >

                <div
                    className="
            w-10
            h-10
            rounded-full
            bg-yellow-400
            flex
            items-center
            justify-center
            font-bold
          "
                >
                    A
                </div>

                <div className="text-left">

                    <p className="font-semibold dark:text-white">
                        Admin
                    </p>

                    <p className="text-sm text-zinc-500">
                        Tournament Manager
                    </p>

                </div>

            </button>

            {/* Dropdown */}
            {open && (

                <div
                    className="
            absolute
            right-0
            top-[80px]
            w-[260px]
            bg-white
            dark:bg-zinc-900
            border
            border-zinc-200
            dark:border-zinc-800
            rounded-[28px]
            shadow-xl
            p-3
            z-50
          "
                >

                    <button
                        className="
              w-full
              text-left
              px-5
              py-4
              rounded-2xl
              hover:bg-zinc-100
              dark:hover:bg-zinc-800
              dark:text-white
            "
                    >
                        Profile
                    </button>

                    <button
                        className="
              w-full
              text-left
              px-5
              py-4
              rounded-2xl
              hover:bg-zinc-100
              dark:hover:bg-zinc-800
              dark:text-white
            "
                    >
                        Settings
                    </button>

                    <button
                        onClick={handleLogout}
                        className="
              w-full
              text-left
              px-5
              py-4
              rounded-2xl
              hover:bg-red-50
              text-red-500
            "
                    >
                        Logout
                    </button>

                </div>

            )}

        </div>

    );
}

export default UserDropdown;