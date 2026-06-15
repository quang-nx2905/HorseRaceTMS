import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {

    const pages =
        Array.from(
            { length: totalPages },
            (_, index) => index + 1
        );

    return (

        <div className="flex items-center justify-center gap-3 mt-8">

            <button
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
                className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center disabled:opacity-40"
            >

                <ChevronLeft size={18} />

            </button>

            {pages.map((page) => (

                <button
                    key={page}
                    onClick={() =>
                        onPageChange(page)
                    }
                    className={`
  w-10
  h-10
  rounded-xl
  font-semibold
              ${currentPage === page
  ? "bg-yellow-400 text-black"
  : "bg-zinc-100 "
  }
`} 
                >

                    {page}

                </button>

            ))}

            <button
                disabled={
                    currentPage === totalPages
                }
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
                className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center disabled:opacity-40"
            >

                <ChevronRight size={18} />

            </button>

        </div>

    );
}

export default Pagination;