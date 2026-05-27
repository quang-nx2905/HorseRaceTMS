import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#f5f5f4] dark:bg-zinc-900 transition-colors">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Topbar />

                <main className="p-8 dark:bg-zinc-900 flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;