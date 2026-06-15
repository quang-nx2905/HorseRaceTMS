function NotificationItem({
    title,
    message,
    time,
    unread,
}) {

    return (

        <div
            className={`
  p-4
  rounded-2xl
  transition-all
  cursor-pointer
          ${unread
  ? "bg-yellow-50 "
  : "hover:bg-zinc-100 "
  }
`} 
        >

            <div className="flex items-start justify-between">

                <div>

                    <h3 className="font-semibold">
                        {title}
                    </h3>

                    <p className="text-sm text-zinc-500 mt-1">
                        {message}
                    </p>

                </div>

                {unread && (
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                )}

            </div>

            <p className="text-xs text-zinc-400 mt-3">
                {time}
            </p>

        </div>

    );
}

export default NotificationItem;