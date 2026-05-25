function Select({
    label,
    options = [],
}) {
    return (
        <div>

            {/* Label */}
            {label && (
                <label className="block mb-3 font-semibold">

                    {label}

                </label>
            )}

            {/* Select */}
            <select
                className="
          w-full
          border
          border-zinc-200
          rounded-2xl
          px-6
          py-4
          outline-none
          focus:border-yellow-400
        "
            >

                {options.map((option, index) => (

                    <option
                        key={index}
                        value={option}
                    >

                        {option}

                    </option>

                ))}

            </select>

        </div>
    );
}

export default Select;