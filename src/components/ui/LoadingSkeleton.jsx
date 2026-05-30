function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="
            h-20
            rounded-3xl
            bg-zinc-200
            dark:bg-zinc-800
            animate-pulse
          "
        />
      ))}
    </div>
  );
}

export default LoadingSkeleton;
