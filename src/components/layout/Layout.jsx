import { Outlet } from "react-router-dom";
import { Sidebar, MobileNav } from "./Sidebar";
import { Header } from "./Header";

export function Layout() {
    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="md:ml-16">
                <Header />
                <main className="p-4 md:p-6 pb-20 md:pb-6">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <MobileNav />
        </div>
    );
}
