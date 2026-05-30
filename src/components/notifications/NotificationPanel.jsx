import NotificationItem from "./NotificationItem";

function NotificationPanel() {

    const notifications = [

        {
            id: 1,
            title: "Race Completed",
            message: "Thunder Bolt won the Spring Championship.",
            time: "2 min ago",
            unread: true,
        },

        {
            id: 2,
            title: "AI Prediction Ready",
            message: "New AI race prediction has been generated.",
            time: "10 min ago",
            unread: true,
        },

        {
            id: 3,
            title: "Tournament Updated",
            message: "Summer Cup registration is now open.",
            time: "1 hour ago",
            unread: false,
        },

        {
            id: 4,
            title: "Referee Alert",
            message: "Track inspection required before next race.",
            time: "2 hours ago",
            unread: false,
        },

    ];

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
                    2 New
                </div>

            </div>

            {/* LIST */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto">

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

        </div>

    );
}

export default NotificationPanel;