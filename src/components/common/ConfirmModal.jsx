import Modal from "./Modal";

function ConfirmModal({
    open,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure?",
}) {

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
                        className="
              flex-1
              border
              border-zinc-300
              py-3
              rounded-2xl
            "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="
              flex-1
              bg-red-500
              text-white
              py-3
              rounded-2xl
            "
                    >
                        Delete
                    </button>

                </div>

            </div>
        </Modal>
    );
}

export default ConfirmModal;