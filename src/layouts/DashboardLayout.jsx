import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex bg-[#f5f5f4] min-h-screen">

      <Sidebar />

      <div className="ml-[280px] flex-1">

        <Topbar />

        <div className="p-10">
          {children}
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;