function FilterSelect({
    value,
    onChange,
    options,
}) {

    return (

        <select
            value={value}

            onChange={onChange}

            className="
        bg-white
        dark:bg-zinc-900

        border
        border-zinc-200
        dark:border-zinc-800

        rounded-2xl

        px-5
        py-4

        outline-none

        dark:text-white
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

    );
}

export default FilterSelect;