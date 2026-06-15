function FilterSelect({
    value,
    onChange,
    options,
}) {

    return (

        <select
            value={value}

            onChange={onChange}

            className="bg-white border border-zinc-200 rounded-2xl px-5 py-4 outline-none"
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