function DataTable({
    columns,
    data,
}) {

    return (

        <div className="overflow-hidden rounded-3xl border border-zinc-200">

            <table className="w-full">

                <thead className="bg-zinc-100">

                    <tr>

                        {columns.map((column) => (

                            <th
                                key={column.key}
                                className="px-6 py-4 text-left font-semibold"
                            >
                                {column.title}
                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {data.map((item) => (

                        <tr
                            key={item.id}
                            className="border-t border-zinc-200"
                        >

                            {columns.map((column) => (

                                <td
                                    key={column.key}
                                    className="px-6 py-4"
                                >

                                    {column.render
                                        ? column.render(item)
                                        : item[column.key]}

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