function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {

    return (

        <div
            className="flex items-center justify-between mt-8"
        >

            <p className="text-zinc-500">
                Page {currentPage} of {totalPages}
            </p>

            <div className="flex gap-3">

                {/* PREV */}
                <button
                    onClick={() =>
                        onPageChange(currentPage - 1)
                    }

                    disabled={currentPage === 1}

                    className="px-5 py-3 rounded-2xl bg-zinc-100 disabled:opacity-50"
                >
                    Previous
                </button>

                {/* NEXT */}
                <button
                    onClick={() =>
                        onPageChange(currentPage + 1)
                    }

                    disabled={
                        currentPage === totalPages
                    }

                    className="px-5 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50"
                >
                    Next
                </button>

            </div>

        </div>

    );
}

export default Pagination;