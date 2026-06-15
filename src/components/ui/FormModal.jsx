function FormModal({
    isOpen,
    onClose,
    title,
    children,
}) {

    if (!isOpen) return null;

    return (

        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >

            {/* BACKDROP */}
            <div
                onClick={onClose}
                className="absolute inset-0"
            ></div>

            {/* MODAL */}
            <div
                className="relative bg-white rounded-3xl w-full max-w-2xl p-8 border border-zinc-200"
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

                        className="w-12 h-12 rounded-2xl bg-zinc-100"
                    >
                        ✕
                    </button>

                </div>

                {children}

            </div>

        </div>

    );
}

export default FormModal;