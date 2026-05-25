import {
    useState,
} from "react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

import PageWrapper from "../components/layout/PageWrapper";

function DashboardLayout({
    children,
}) {

    const [isOpen, setIsOpen] =
        useState(false);

    return (
        <div
            className="
        flex
        bg-[#f5f5f4]
        min-h-screen
      "
        >

            {/* Sidebar */}
            <Sidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            {/* Main */}
            <div
                className="
          flex-1
          lg:ml-[280px]
        "
            >

                {/* Topbar */}
                <Topbar
                    setIsOpen={setIsOpen}
                />

                {/* Content */}
                <div
                    className="
            p-4
            lg:p-10
          "
                >

                    <PageWrapper>

                        {children}

                    </PageWrapper>

                </div>

            </div>

        </div>
    );
}

export default DashboardLayout;