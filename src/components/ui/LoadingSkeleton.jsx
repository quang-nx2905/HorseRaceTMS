jsx
function LoadingSkeleton() {

  return (

    <div className="space-y-4">

      {[1, 2, 3].map((item) => (

        <div
          key={item}

          className="h-20 rounded-3xl bg-zinc-200 animate-pulse"
        ></div>

      ))}

    </div>

  );
}

export default LoadingSkeleton;

