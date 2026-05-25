function StatusBadge({
  status,
}) {
  const styles = {
    Active:
      "bg-green-100 text-green-600",

    Recovery:
      "bg-yellow-100 text-yellow-600",

    Training:
      "bg-blue-100 text-blue-600",

    Live:
      "bg-green-100 text-green-600",

    Upcoming:
      "bg-yellow-100 text-yellow-600",
  };

  return (
    <span
      className={`px-4 py-2 rounded-2xl text-sm font-semibold
      ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;