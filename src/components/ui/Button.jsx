function Button({
    children,
    variant = "primary",
    onClick,
}) {

    const styles = {

        primary:
            "bg-yellow-400 text-black",

        secondary:
            "bg-white border border-zinc-200",

        danger:
            "bg-red-100 text-red-500",

    };

    return (
        <button
            onClick={onClick}
            className={`
        px-6
        py-3
        rounded-2xl
        font-semibold
        transition-all
        hover:scale-[1.02]
        active:scale-[0.98]

        ${styles[variant]}
      `}
        >

            {children}

        </button>
    );
}

export default Button;