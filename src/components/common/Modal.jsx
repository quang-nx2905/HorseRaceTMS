function Modal({
    open,
    onClose,
    title,
    children,
}) {

    if (!open) return null;

    return (

        <div
            className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
        >

            <div
                className="
          bg-white
          dark:bg-zinc-900
          rounded-3xl
          p-8
          w-[600px]
          max-w-[95%]
        "
            >

                <div
                    className="
            flex
            items-center
            justify-between
            mb-6
          "
                >

                    <h2
                        className="
              text-2xl
              font-bold
              dark:text-white
            "
                    >
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="
              text-zinc-500
            "
                    >
                        ✕
                    </button>

                </div>

                {children}

            </div>

        </div>

    );
}

export default Modal;