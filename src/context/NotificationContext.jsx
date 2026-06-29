import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import { jockeyApi } from "../api/jockeyApi";

const NotificationContext = createContext();

// ── Helpers ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = "hrtms_notifications";

const loadFromStorage = (userId) => {
    try {
        const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

const saveToStorage = (userId, data) => {
    try {
        localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(data));
    } catch {
        // ignore quota errors
    }
};

const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? "s" : ""} ago`;
    return new Date(date).toLocaleDateString("vi-VN");
};

// ── Provider ──────────────────────────────────────────────────────────────────
export function NotificationProvider({ children, user }) {
    const userId = user?.id ?? "guest";
    const userRole = user?.role ?? "";

    const [notifications, setNotifications] = useState(() =>
        loadFromStorage(userId)
    );

    // Persist whenever notifications change
    useEffect(() => {
        saveToStorage(userId, notifications);
    }, [notifications, userId]);

    // Re-load when user switches (login/logout)
    useEffect(() => {
        setNotifications(loadFromStorage(userId));
    }, [userId]);

    // ── ADD NOTIFICATION ─────────────────────────────────────────────────────
    const addNotification = useCallback((notif) => {
        const newItem = {
            id: Date.now() + Math.random(),
            unread: true,
            time: formatTime(new Date()),
            createdAt: new Date().toISOString(),
            ...notif,
        };
        setNotifications((prev) => [newItem, ...prev]);
    }, []);

    // Polling is removed as Admin doesn't need to see notifications when a jockey submits a profile update.


    // ── CRUD ACTIONS ─────────────────────────────────────────────────────────
    const unreadCount = notifications.filter((item) => item.unread).length;

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, unread: false } : item
            )
        );
    };

    const deleteNotification = (id) => {
        setNotifications((prev) => prev.filter((item) => item.id !== id));
    };

    const markAllRead = () => {
        setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
    };

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
                addNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    return useContext(NotificationContext);
}