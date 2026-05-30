jsx
function EmptyState({
  title,
  description,
}) {

  return (

    <div
      className="
        bg-white
        dark:bg-zinc-900

        border
        border-zinc-200
        dark:border-zinc-800

        rounded-3xl

        p-20

        text-center
      "
    >

      <div className="text-7xl mb-6">
        🐎
      </div>

      <h2
        className="
          text-4xl
          font-black

          dark:text-white
        "
      >
        {title}
      </h2>

      <p
        className="
          text-zinc-500
          dark:text-zinc-400

          mt-5

          text-lg
        "
      >
        {description}
      </p>

    </div>

  );
}

export default EmptyState;
