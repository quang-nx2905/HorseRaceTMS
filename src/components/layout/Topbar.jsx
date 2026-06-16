import {
    useState,
    useRef,
    useEffect,
} from "react";

import {
    Bell,
    Menu,
} from "lucide-react";

import UserDropdown from "./UserDropdown";

import NotificationPanel from "../notifications/NotificationPanel";

import { useLayout } from "../../context/LayoutContext";

import { useNotifications } from "../../context/NotificationContext";

function Topbar() {

    const { toggleSidebar } = useLayout();

    const { unreadCount } =
        useNotifications();

    const [openNotifications, setOpenNotifications] =
        useState(false);

    const notificationRef = useRef();

    // CLICK OUTSIDE
    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setOpenNotifications(false);
            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    return (

        <div className="h-[90px] bg-white border-b border-zinc-200 px-8 flex items-center justify-between transition-colors">

            {/* LEFT */}
            <div className="flex items-center gap-4">

                {/* SIDEBAR BUTTON */}
                <button
                    onClick={toggleSidebar}
                    className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center"
                >
                    <Menu size={20} />
                </button>

                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Search races..."
                    className="w-[320px] bg-zinc-100 rounded-2xl px-5 py-3 outline-none border border-transparent"
                />

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-5">

                {/* NOTIFICATION */}
                <div
                    ref={notificationRef}
                    className="relative"
                >

                    <button
                        onClick={() =>
                            setOpenNotifications(
                                !openNotifications
                            )
                        }

                        className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center relative"
                    >

                        <Bell size={20} />

                        {/* BADGE */}
                        {unreadCount > 0 && (

                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">

                                {unreadCount}

                            </div>

                        )}

                    </button>

                    {openNotifications && (
                        <NotificationPanel />
                    )}

                </div>

                {/* USER */}
                <UserDropdown />

            </div>

        </div>

    );
}

export default Topbar;
