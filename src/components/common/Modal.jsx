import { X } from "lucide-react";

function Modal({
    open,
    onClose,
    title,
    children,
    width = "w-[600px]"
}) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`bg-white rounded-3xl p-8 ${width} max-w-[100%] shadow-2xl border border-white/20 animate-in fade-in zoom-in-95 duration-200`}>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-black text-zinc-900 tracking-tight">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-2xl bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;