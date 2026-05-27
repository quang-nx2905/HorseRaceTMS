function Button({
    children,
    variant = "primary",
    onClick,
    type = "button",
    disabled = false,
}) {

    const styles = {

        primary:
            "bg-yellow-400 text-black hover:bg-yellow-500",

        secondary:
            "bg-white border border-zinc-200 hover:bg-zinc-50",

        danger:
            "bg-red-100 text-red-500 hover:bg-red-200",

    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        px-6
        py-3
        rounded-2xl
        font-semibold
        transition-all
        hover:scale-[1.02]
        active:scale-[0.98]
        disabled:opacity-50
        disabled:cursor-not-allowed

        ${styles[variant]}
      `}
        >

            {children}

        </button>
    );
}

export default Button;