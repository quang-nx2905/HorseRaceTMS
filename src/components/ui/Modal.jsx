function Modal({
    isOpen,
    onClose,
    title,
    children,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">

            {/* Overlay */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            ></div>

            {/* Modal */}
            <div className="relative bg-white w-full max-w-[700px] rounded-[36px] p-10 shadow-2xl animate-fadeIn">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">

                    <h2 className="text-4xl font-bold">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-3xl"
                    >
                        ✕
                    </button>

                </div>

                {/* Content */}
                {children}

            </div>

        </div>
    );
}

export default Modal;