import Skeleton from "../ui/Skeleton";

function HorsesLoading() {

    return (
        <div className="space-y-6">

            {[1, 2, 3, 4].map((item) => (

                <div
                    key={item}
                    className="
            bg-white
            border
            border-zinc-200
            rounded-[32px]
            p-8
          "
                >

                    <div className="flex justify-between items-center">

                        <div className="space-y-4">

                            <Skeleton className="w-[220px] h-8" />

                            <Skeleton className="w-[180px] h-5" />

                        </div>

                        <Skeleton className="w-[120px] h-12" />

                    </div>

                </div>

            ))}

        </div>
    );
}

export default HorsesLoading;