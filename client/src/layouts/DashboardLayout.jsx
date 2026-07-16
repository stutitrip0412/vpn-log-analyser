import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import PageContainer from "../components/layout/PageContainer";

const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#050B14] text-white overflow-hidden">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-[280px] shrink-0">
                <Sidebar />
            </div>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setSidebarOpen(false)}
                    />

                    <div className="relative w-[280px] h-screen">
                        <Sidebar mobile onClose={() => setSidebarOpen(false)} />
                    </div>
                </div>
            )}

            {/* Main Area */}

            <div className="flex flex-col flex-1 min-w-0">

                <Header openSidebar={() => setSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto">

                    <PageContainer>

                        {children}

                    </PageContainer>

                </main>

            </div>

        </div>
    );
};

export default DashboardLayout;