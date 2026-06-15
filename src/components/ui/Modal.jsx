function Modal({

    isOpen,

    onClose,

    title,

    children,

}) {

    if (!isOpen) return null;

    return (

        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        >

            {/* BACKDROP */}
            <div
                onClick={onClose}

                className="absolute inset-0"
            ></div>

            {/* MODAL */}
            <div
                className="relative bg-white rounded-[32px] w-full max-w-2xl p-8 shadow-2xl"
            >

                {/* HEADER */}
                <div
                    className="flex items-center justify-between mb-8"
                >

                    <h2
                        className="text-4xl font-black"
                    >
                        {title}
                    </h2>

                    <button
                        onClick={onClose}

                        className="w-12 h-12 rounded-2xl bg-zinc-100 text-xl"
                    >
                        ✕
                    </button>

                </div>

                {/* CONTENT */}
                {children}

            </div>

        </div>

    );
}

export default Modal;