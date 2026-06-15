function Input({
    label,
    type = "text",
    ...props
}) {
    return (
        <div>
            <label
                className="block text-sm font-semibold mb-3"
            >
                {label}
            </label>
            <input
                type={type}
                {...props}
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none border border-transparent focus:ring-2 focus:ring-yellow-400 transition-all"
            />
        </div>
    );
}

export default Input;