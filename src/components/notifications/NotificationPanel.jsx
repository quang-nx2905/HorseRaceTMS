import NotificationItem from "./NotificationItem";

import { useNotifications } from "../../context/NotificationContext";

function NotificationPanel() {

    const {
        notifications,
        unreadCount,
        markAllRead,
        clearAll,
    } = useNotifications();

    return (

        <div
            className="
        absolute
        right-0
        top-16

        w-[380px]

        bg-white
        dark:bg-zinc-900

        border
        border-zinc-200
        dark:border-zinc-800

        rounded-3xl

        shadow-2xl

        p-5

        z-50

        animate-in
        fade-in
        zoom-in-95
        duration-200
      "
        >

            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">

                <div>

                    <h2 className="text-xl font-black dark:text-white">
                        Notifications
                    </h2>

                    <p className="text-sm text-zinc-500">
                        Latest platform updates
                    </p>

                </div>

                <div className="px-3 py-1 rounded-full bg-yellow-400 text-black text-sm font-bold">
                    {unreadCount} New
                </div>

            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mb-5">

                <button
                    onClick={markAllRead}
                    className="
            flex-1

            bg-zinc-100
            dark:bg-zinc-800

            dark:text-white

            py-3

            rounded-2xl

            text-sm
            font-semibold
          "
                >
                    Mark all read
                </button>

                <button
                    onClick={clearAll}
                    className="
            flex-1

            bg-red-100
            dark:bg-red-950

            text-red-500

            py-3

            rounded-2xl

            text-sm
            font-semibold
          "
                >
                    Clear all
                </button>

            </div>

            {/* EMPTY */}
            {notifications.length === 0 ? (

                <div className="text-center py-16">

                    <div className="text-6xl mb-4">
                        🔔
                    </div>

                    <h3 className="text-xl font-bold dark:text-white">
                        No Notifications
                    </h3>

                    <p className="text-zinc-500 mt-2">
                        You're all caught up.
                    </p>

                </div>

            ) : (

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">

                    {notifications.map((item) => (

                        <NotificationItem
                            key={item.id}
                            title={item.title}
                            message={item.message}
                            time={item.time}
                            unread={item.unread}
                        />

                    ))}

                </div>

            )}

        </div>

    );
}

export default NotificationPanel;