function Textarea({
    label,
    placeholder,
}) {
    return (
        <div>

            {/* Label */}
            {label && (
                <label className="block mb-3 font-semibold">

                    {label}

                </label>
            )}

            {/* Textarea */}
            <textarea
                rows="5"
                placeholder={placeholder}
                className="
          w-full
          border
          border-zinc-200
          rounded-2xl
          px-6
          py-4
          outline-none
          resize-none
          focus:border-yellow-400
        "
            ></textarea>

        </div>
    );
}

export default Textarea;