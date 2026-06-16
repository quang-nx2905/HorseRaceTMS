import { Trophy, Sparkles, Calendar, Bell, Check, Trash2 } from "lucide-react";

function NotificationItem({
    id,
    title,
    message,
    time,
    unread,
    type,
    onMarkRead,
    onDelete,
}) {
    // Determine icon and color scheme based on notification type
    const getIconDetails = () => {
        switch (type) {
            case "race":
                return {
                    icon: <Trophy size={16} className="text-emerald-600" />,
                    bgClass: "bg-emerald-50 border border-emerald-100",
                };
            case "prediction":
                return {
                    icon: <Sparkles size={16} className="text-indigo-600" />,
                    bgClass: "bg-indigo-50 border border-indigo-100",
                };
            case "tournament":
                return {
                    icon: <Calendar size={16} className="text-amber-600" />,
                    bgClass: "bg-amber-50 border border-amber-100",
                };
            default:
                return {
                    icon: <Bell size={16} className="text-zinc-600" />,
                    bgClass: "bg-zinc-50 border border-zinc-100",
                };
        }
    };

    const { icon, bgClass } = getIconDetails();

    return (
        <div
            className={`
                group relative p-4 rounded-2xl transition-all duration-200 border border-zinc-100/50
                flex gap-3.5 items-start cursor-pointer
                ${unread
                    ? "bg-amber-50/40 border-l-4 border-l-amber-500 hover:bg-amber-50/70"
                    : "bg-white border-l-4 border-l-transparent hover:bg-zinc-50/80 hover:border-zinc-200"
                }
            `}
        >
            {/* Left: Type Icon Badge */}
            <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${bgClass}`}>
                {icon}
            </div>

            {/* Center: Content */}
            <div className="flex-1 min-w-0 pr-12">
                <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm font-semibold truncate ${unread ? "text-zinc-900" : "text-zinc-700"}`}>
                        {title}
                    </h4>
                </div>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed break-words">
                    {message}
                </p>
                <span className="text-[10px] font-medium text-zinc-400 mt-2 block">
                    {time}
                </span>
            </div>

            {/* Right: Hover Action Buttons & Unread Indicator */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {/* Standard unread dot - hidden when hovering if action is available */}
                {unread && (
                    <div className="w-2 h-2 rounded-full bg-amber-500 transition-all duration-200 group-hover:scale-0 group-hover:opacity-0" />
                )}

                {/* Actions container - slides/fades in on hover */}
                <div className="opacity-0 scale-90 translate-x-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 flex items-center gap-1 transition-all duration-200">
                    {unread && (
                        <button
                            title="Mark as read"
                            onClick={(e) => {
                                e.stopPropagation();
                                onMarkRead(id);
                            }}
                            className="w-7 h-7 rounded-lg bg-white border border-zinc-200 hover:border-amber-500 hover:bg-amber-50/50 flex items-center justify-center text-zinc-500 hover:text-amber-600 transition-colors shadow-sm"
                        >
                            <Check size={14} />
                        </button>
                    )}
                    <button
                        title="Dismiss"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(id);
                        }}
                        className="w-7 h-7 rounded-lg bg-white border border-zinc-200 hover:border-red-200 hover:bg-red-50 flex items-center justify-center text-zinc-500 hover:text-red-600 transition-colors shadow-sm"
                    >
                        <Trash2 size={13} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationItem;