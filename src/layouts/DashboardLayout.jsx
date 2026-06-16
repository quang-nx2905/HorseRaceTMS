import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#f4f4f5]">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Topbar />

                <main className="flex-1 overflow-y-auto overflow-x-hidden p-7 lg:p-9">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;