function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
}) {

    if (!isOpen) return null;

    return (

        <div
            className="
        fixed
        inset-0

        bg-black/40

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

          w-full
          max-w-md

          border
          border-zinc-200
          dark:border-zinc-800
        "
            >

                <h2
                    className="
            text-3xl
            font-black

            dark:text-white
          "
                >
                    {title}
                </h2>

                <p
                    className="
            text-zinc-500
            dark:text-zinc-400

            mt-4
            leading-7
          "
                >
                    {description}
                </p>

                <div
                    className="
            flex
            justify-end
            gap-4

            mt-8
          "
                >

                    <button
                        onClick={onClose}

                        className="
              px-5
              py-3

              rounded-2xl

              bg-zinc-100
              dark:bg-zinc-800

              dark:text-white
            "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}

                        className="
              px-5
              py-3

              rounded-2xl

              bg-red-500
              hover:bg-red-600

              text-white
            "
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );
}

export default ConfirmModal;