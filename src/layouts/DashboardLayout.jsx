import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function DashboardLayout({
    children,
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex bg-[#f5f5f4] min-h-screen">

            <Sidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            <div className="flex-1 lg:ml-[280px]">

                <Topbar
                    setIsOpen={setIsOpen}
                />

                <div className="p-4 lg:p-10">

                    {children}

                </div>

            </div>

        </div>
    );
}

export default DashboardLayout;