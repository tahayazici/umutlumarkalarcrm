import { NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Kanban,
    Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

function NavItem({ item, isActive, displayName }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipTimeout, setTooltipTimeout] = useState(null);

    const handleMouseEnter = () => {
        const timeout = setTimeout(() => {
            setShowTooltip(true);
        }, 1000); // 1 saniye bekle
        setTooltipTimeout(timeout);
    };

    const handleMouseLeave = () => {
        if (tooltipTimeout) {
            clearTimeout(tooltipTimeout);
        }
        setShowTooltip(false);
    };

    return (
        <div className="relative">
            <NavLink
                to={item.href}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
                    isActive
                        ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white shadow-md animate-gradient"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
            >
                <item.icon className="h-5 w-5" />
            </NavLink>

            {/* Tooltip */}
            {showTooltip && (
                <div className="absolute left-14 top-1/2 -translate-y-1/2 z-50 px-3 py-2 bg-card border rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
                    <span className="text-sm font-medium">{displayName}</span>
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-card border-l border-b rotate-45" />
                </div>
            )}
        </div>
    );
}

const navigation = [
    { key: "home", href: "/", icon: LayoutDashboard },
    { key: "customers", href: "/musteriler", icon: Users },
    { key: "opportunities", href: "/firsatlar", icon: Kanban },
    { key: "settings", href: "/ayarlar", icon: Settings },
];

export function Sidebar() {
    const location = useLocation();
    const { t } = useLanguage();

    return (
        <aside className="hidden md:flex fixed left-0 top-0 z-40 h-screen w-16 flex-col border-r bg-card">
            {/* Logo */}
            <div className="flex h-16 items-center justify-center border-b">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 text-white font-bold text-lg shadow-lg animate-gradient animate-glow">
                    U
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col items-center gap-2 py-4">
                {navigation.map((item) => (
                    <NavItem
                        key={item.key}
                        item={item}
                        isActive={location.pathname === item.href}
                        displayName={t(item.key)}
                    />
                ))}
            </nav>
        </aside>
    );
}

// Mobile Bottom Navigation
export function MobileNav() {
    const location = useLocation();
    const { t } = useLanguage();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t safe-area-inset-bottom">
            <div className="flex items-center justify-around h-16">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <NavLink
                            key={item.key}
                            to={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
                                isActive
                                    ? "text-blue-500"
                                    : "text-muted-foreground"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", isActive && "text-blue-500")} />
                            <span className="text-xs font-medium">{t(item.key)}</span>
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}
