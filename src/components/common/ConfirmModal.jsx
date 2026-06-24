import Modal from "./Modal";

function ConfirmModal({
    open,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure?",
    confirmLabel = "Delete",
    confirmVariant = "danger", // "danger" | "success"
}) {

    const confirmClass =
        confirmVariant === "success"
            ? "flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-2xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
            : "flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition-colors duration-200";

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
        >
            <div className="space-y-6">

                <p className="text-zinc-500">
                    {message}
                </p>

                <div className="flex gap-4">

                    <button
                        onClick={onClose}
                        className="flex-1 border border-zinc-300 py-3 rounded-2xl font-semibold hover:bg-zinc-50 transition-colors duration-200"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className={confirmClass}
                    >
                        {confirmVariant === "success" && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                            </svg>
                        )}
                        {confirmLabel}
                    </button>

                </div>

            </div>
        </Modal>
    );
}

export default ConfirmModal;