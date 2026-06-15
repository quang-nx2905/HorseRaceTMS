function Table({
    headers,
    children,
}) {
    return (
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden">

            {/* HEADER */}

            <div
                className="grid px-8 py-6 border-b border-zinc-200 text-sm uppercase tracking-wider text-zinc-500 font-semibold"
                style={{
                    gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))`,
                }}
            >

                {headers.map((header, index) => (
                    <p key={index}>
                        {header}
                    </p>
                ))}

            </div>

            {/* BODY */}

            <div>
                {children}
            </div>

        </div>
    );
}

export default Table;