function StatusBadge({ status }) {

  const variants = {

    Excellent:
      "bg-green-100 text-green-600",

    Good:
      "bg-yellow-100 text-yellow-700",

    Poor:
      "bg-red-100 text-red-500",

    Live:
      "bg-red-100 text-red-500",

    Upcoming:
      "bg-yellow-100 text-yellow-700",

    Completed:
      "bg-green-100 text-green-600",

  };

  return (
    <span
      className={`
        px-4
        py-2

        rounded-full

        text-sm
        font-semibold

        ${variants[status]}
      `}
    >
      {status}
    </span>
  );
}

export default StatusBadge;