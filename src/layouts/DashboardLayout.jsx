import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import Footer from "../components/layout/Footer";

function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden bg-[#f4f4f5]">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Topbar />

                <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
                    <div className="p-7 lg:p-9 flex-1">
                        {children}
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;