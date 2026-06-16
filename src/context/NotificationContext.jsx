import {
    createContext,
    useContext,
    useState,
} from "react";

const NotificationContext =
    createContext();

export function NotificationProvider({
    children,
}) {

    const [notifications, setNotifications] =
        useState([

            {
                id: 1,
                title: "Race Completed",
                message:
                    "Thunder Bolt won the Spring Championship.",
                time: "2 min ago",
                unread: true,
                type: "race",
            },

            {
                id: 2,
                title: "AI Prediction Ready",
                message:
                    "New AI race prediction has been generated.",
                time: "10 min ago",
                unread: true,
                type: "prediction",
            },

            {
                id: 3,
                title: "Tournament Updated",
                message:
                    "Summer Cup registration is now open.",
                time: "1 hour ago",
                unread: false,
                type: "tournament",
            },

        ]);

    // UNREAD COUNT
    const unreadCount =
        notifications.filter(
            (item) => item.unread
        ).length;

    // MARK AS READ (SINGLE)
    const markAsRead = (id) => {
        const updated = notifications.map((item) =>
            item.id === id ? { ...item, unread: false } : item
        );
        setNotifications(updated);
    };

    // DELETE NOTIFICATION (SINGLE)
    const deleteNotification = (id) => {
        const updated = notifications.filter((item) => item.id !== id);
        setNotifications(updated);
    };

    // MARK ALL READ
    const markAllRead = () => {

        const updated =
            notifications.map((item) => ({
                ...item,
                unread: false,
            }));

        setNotifications(updated);
    };

    // CLEAR
    const clearAll = () => {
        setNotifications([]);
    };

    return (

        <NotificationContext.Provider
            value={{
                notifications,
                setNotifications,
                unreadCount,
                markAsRead,
                deleteNotification,
                markAllRead,
                clearAll,
            }}
        >

            {children}

        </NotificationContext.Provider>

    );
}

export function useNotifications() {
    return useContext(
        NotificationContext
    );
}