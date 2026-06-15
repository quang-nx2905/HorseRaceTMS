jsx
function EmptyState({
  title,
  description,
}) {

  return (

    <div
      className="bg-white border border-zinc-200 rounded-3xl p-20 text-center"
    >

      <div className="text-7xl mb-6">
        🐎
      </div>

      <h2
        className="text-4xl font-black"
      >
        {title}
      </h2>

      <p
        className="text-zinc-500 mt-5 text-lg"
      >
        {description}
      </p>

    </div>

  );
}

export default EmptyState;
