function Button({
  children,
  variant = "primary",
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
      className={`px-6 py-3 rounded-2xl font-semibold transition-all
      ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;