import { Search } from "lucide-react";

function SearchInput({
    value,
    onChange,
    placeholder,
}) {
    return (
        <div className="relative">

            <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
          w-[320px]

          bg-white dark:bg-zinc-900

          border border-zinc-200 dark:border-zinc-800

          rounded-2xl

          pl-12
          pr-5
          py-4

          outline-none

          dark:text-white
        "
            />

        </div>
    );
}

export default SearchInput;