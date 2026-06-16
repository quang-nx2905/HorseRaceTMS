import { useState } from "react";
import { BellOff, CheckCheck, Trash2 } from "lucide-react";
import NotificationItem from "./NotificationItem";
import { useNotifications } from "../../context/NotificationContext";

function NotificationPanel() {
    const {
        notifications,
        unreadCount,
        markAsRead,
        deleteNotification,
        markAllRead,
        clearAll,
    } = useNotifications();

    const [activeTab, setActiveTab] = useState("all");

    // Filter notifications based on tab selection
    const filteredNotifications = notifications.filter((item) => {
        if (activeTab === "unread") return item.unread;
        return true;
    });

    return (
        <div
            className="absolute right-0 top-16 w-[400px] bg-white/95 backdrop-blur-xl border border-zinc-200/60 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-5 z-50 animate-in fade-in zoom-in-95 duration-200 flex flex-col gap-4"
        >
            {/* Inject custom scrollbar style */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e4e4e7;
                    border-radius: 9999px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #d4d4d8;
                }
            `}</style>

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-zinc-900 leading-tight">
                        Notifications
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">
                        Latest updates on races and predictions
                    </p>
                </div>
                {unreadCount > 0 && (
                    <div className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold shadow-sm shadow-amber-500/20">
                        {unreadCount} Unread
                    </div>
                )}
            </div>

            {/* FILTER TABS */}
            <div className="flex bg-zinc-100/80 p-1 rounded-xl gap-0.5">
                <button
                    onClick={() => setActiveTab("all")}
                    className={`
                        flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
                        ${activeTab === "all"
                            ? "bg-white text-zinc-900 shadow-sm"
                            : "text-zinc-500 hover:text-zinc-800"
                        }
                    `}
                >
                    All ({notifications.length})
                </button>
                <button
                    onClick={() => setActiveTab("unread")}
                    className={`
                        flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-1.5
                        ${activeTab === "unread"
                            ? "bg-white text-zinc-900 shadow-sm"
                            : "text-zinc-500 hover:text-zinc-800"
                        }
                    `}
                >
                    Unread
                    {unreadCount > 0 && (
                        <span className={`
                            text-[10px] px-1.5 py-0.2 rounded-full font-bold
                            ${activeTab === "unread" ? "bg-amber-500 text-white" : "bg-zinc-200 text-zinc-600"}
                        `}>
                            {unreadCount}
                        </span>
                    )}
                </button>
            </div>

            {/* ACTIONS */}
            {notifications.length > 0 && (
                <div className="flex gap-2">
                    <button
                        onClick={markAllRead}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-zinc-200 py-2.5 rounded-xl text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                        <CheckCheck size={13} className="text-zinc-500" />
                        Mark all read
                    </button>

                    <button
                        onClick={clearAll}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-red-50/60 border border-red-100 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 hover:border-red-200 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                        <Trash2 size={13} className="text-red-500" />
                        Clear all
                    </button>
                </div>
            )}

            {/* NOTIFICATION LIST OR EMPTY STATE */}
            {filteredNotifications.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center justify-center border border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-3 text-zinc-400 animate-pulse">
                        <BellOff size={20} />
                    </div>
                    <h3 className="text-sm font-semibold text-zinc-800">
                        {activeTab === "unread" ? "No unread notifications" : "No notifications"}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 max-w-[220px]">
                        {activeTab === "unread" 
                            ? "You have read all of your notifications." 
                            : "You are completely up to date with the latest activity."
                        }
                    </p>
                </div>
            ) : (
                <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
                    {filteredNotifications.map((item) => (
                        <NotificationItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            message={item.message}
                            time={item.time}
                            unread={item.unread}
                            type={item.type}
                            onMarkRead={markAsRead}
                            onDelete={deleteNotification}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default NotificationPanel;