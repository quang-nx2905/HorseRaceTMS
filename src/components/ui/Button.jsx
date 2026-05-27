function Button({

    children,

    variant = "primary",

    fullWidth = false,

    onClick,

}) {

    const variants = {

        primary:
            "bg-yellow-400 hover:bg-yellow-500 text-black",

        dark:
            "bg-zinc-900 hover:bg-black text-white",

        danger:
            "bg-red-500 hover:bg-red-600 text-white",

        outline:
            "border border-zinc-300 hover:bg-zinc-100 text-black",

    };

    return (

        <button
            onClick={onClick}

            className={`
        px-6
        py-4

        rounded-2xl

        font-semibold

        transition-all
        duration-200

        ${variants[variant]}

        ${fullWidth ? "w-full" : ""}
      `}
        >

            {children}

        </button>

    );
}

export default Button;