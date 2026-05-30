import { createContext, useContext, useState, useEffect } from "react";

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebar, setMobileSidebar] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleMobileSidebar = () => {
        setMobileSidebar(!mobileSidebar);
    };

    return (
        <LayoutContext.Provider
            value={{
                sidebarOpen,
                toggleSidebar,
                mobileSidebar,
                toggleMobileSidebar,
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayout() {
    return useContext(LayoutContext);
}