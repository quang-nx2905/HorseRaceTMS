import DashboardLayout from "../layouts/DashboardLayout";

import DataTable from "../components/ui/DataTable";

function Horses() {

    const columns = [

        {
            header: "Horse",
            accessor: "name",
        },

        {
            header: "Breed",
            accessor: "breed",
        },

        {
            header: "Age",
            accessor: "age",
        },

        {
            header: "Health",
            accessor: "health",
        },

        {
            header: "Win Rate",
            accessor: "winRate",
        },

    ];

    const data = [

        {
            name: "Thunder Bolt",
            breed: "Arabian",
            age: "4y",
            health: "Excellent",
            winRate: "82%",
        },

        {
            name: "Golden Sprint",
            breed: "Thoroughbred",
            age: "5y",
            health: "Good",
            winRate: "74%",
        },

        {
            name: "Silver Storm",
            breed: "Quarter Horse",
            age: "3y",
            health: "Excellent",
            winRate: "91%",
        },

    ];

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* Header */}
                <div>

                    <h1
                        className="
              text-5xl
              font-bold
              dark:text-white
              mb-3
            "
                    >
                        Horse Management
                    </h1>

                    <p className="text-zinc-500 text-lg">
                        Monitor horse health,
                        performance, and race stats.
                    </p>

                </div>

                {/* Table */}
                <DataTable
                    columns={columns}
                    data={data}
                />

            </div>

        </DashboardLayout>

    );
}

export default Horses;