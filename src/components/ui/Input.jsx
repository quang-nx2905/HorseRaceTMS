function Input({
    label,
    placeholder,
    type = "text",
    error,
    name,
    required = false,
    value,
    onChange,
}) {
    return (
        <div>

            {/* Label */}
            {label && (
                <label className="block mb-3 font-semibold">

                    {label}
                    {required && <span className="text-red-500">*</span>}

                </label>
            )}

            {/* Input */}
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                className={`
          w-full
          border
          rounded-2xl
          px-6
          py-4
          outline-none
          transition-all

          ${error
                    ? "border-red-300 focus:border-red-500"
                    : "border-zinc-200 focus:border-yellow-400"
                }
        `}
            />

            {/* Error */}
            {error && (
                <p className="text-red-500 mt-2 text-sm">

                    {error}

                </p>
            )}

        </div>
    );
}

export default Input;