function DataTable({
    columns,
    data,
}) {

    return (

        <div
            className="
        bg-white
        dark:bg-zinc-900

        border
        border-zinc-200
        dark:border-zinc-800

        rounded-[32px]
        overflow-hidden
      "
        >

            <table className="w-full">

                {/* HEAD */}
                <thead
                    className="
            border-b
            border-zinc-200
            dark:border-zinc-800
          "
                >

                    <tr>

                        {columns.map((column) => (

                            <th
                                key={column.accessor}
                                className="
                  text-left
                  px-8
                  py-5
                  text-sm
                  uppercase
                  tracking-wider
                  text-zinc-500
                "
                            >
                                {column.header}
                            </th>

                        ))}

                    </tr>

                </thead>

                {/* BODY */}
                <tbody>

                    {data.map((item, index) => (

                        <tr
                            key={index}
                            className="
                border-b
                border-zinc-100
                dark:border-zinc-800
                hover:bg-zinc-50
                dark:hover:bg-zinc-800/50
                transition-all
              "
                        >

                            {columns.map((column) => (

                                <td
                                    key={column.accessor}
                                    className="
                    px-8
                    py-6
                    dark:text-white
                  "
                                >

                                    {column.render
                                        ? column.render(item)
                                        : item[column.accessor]}

                                </td>

                            ))}

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default DataTable;