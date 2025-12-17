import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, Settings, LogOut, X, Sun, Moon, Users, Kanban, Globe, CheckSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { formatRelativeTime } from "@/lib/utils";

// Static notifications for demo (could also be moved to DataContext)
const notificationsBase = [
    {
        id: 1,
        titleKey: "notifNewCustomer",
        messageKey: "notifNewCustomerMsg",
        company: "ABC Teknoloji",
        time: new Date(Date.now() - 1000 * 60 * 15),
        read: false,
    },
    {
        id: 2,
        titleKey: "notifProposalApproved",
        messageKey: "notifProposalApprovedMsg",
        company: "XYZ Danışmanlık",
        time: new Date(Date.now() - 1000 * 60 * 45),
        read: false,
    },
    {
        id: 3,
        titleKey: "notifDealWon",
        messageKey: "notifDealWonMsg",
        company: "Metro Grup",
        time: new Date(Date.now() - 1000 * 60 * 120),
        read: true,
    },
];

export function Header() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage, t } = useLanguage();
    const { customers, tasks } = useData(); // Use real data

    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchRef = useRef(null);

    const unreadCount = notificationsBase.filter((n) => !n.read).length;

    // Create translated notifications
    const notifications = notificationsBase.map(notif => ({
        ...notif,
        title: t(notif.titleKey),
        message: t(notif.messageKey).replace("{company}", notif.company)
    }));

    // Arama fonksiyonu
    useEffect(() => {
        if (searchQuery.trim().length < 2) {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        const query = searchQuery.toLowerCase();
        const results = [];

        // Müşterilerde ara
        customers.forEach((customer) => {
            if (
                customer.name.toLowerCase().includes(query) ||
                customer.company.toLowerCase().includes(query)
            ) {
                results.push({ ...customer, type: "customer" });
            }
        });

        // Görevlerde ara
        tasks.forEach((task) => {
            if (task.title.toLowerCase().includes(query)) {
                results.push({ ...task, type: "task", name: task.title, company: t("tasks") });
            }
        });

        setSearchResults(results);
        setShowSearchResults(true);
    }, [searchQuery, customers, tasks, t]);

    // Dışarı tıklanınca arama sonuçlarını kapat
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchResults(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchResults.length > 0) {
            handleResultClick(searchResults[0]);
        }
    };

    const handleResultClick = (result) => {
        if (result.type === "customer") {
            navigate(`/sirket/${result.id}`); // Go to detail page
        } else if (result.type === "task") {
            navigate("/gorevler");
        }
        setSearchQuery("");
        setShowSearchResults(false);
        setShowSearch(false);
    };

    const handleSettingsClick = () => {
        setShowUserMenu(false);
        navigate("/ayarlar");
    };

    return (
        <header className="sticky top-0 z-30 flex h-14 md:h-16 items-center justify-between border-b bg-card/80 backdrop-blur-sm px-4 md:px-6">
            {/* Left side - Logo for mobile */}
            <div className="flex items-center gap-3 md:hidden">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg">
                    U
                </div>
                <span className="text-base font-semibold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    UmutluMarkalar
                </span>
            </div>

            {/* Search - Desktop */}
            <div className="hidden md:block relative" ref={searchRef}>
                <form onSubmit={handleSearchSubmit}>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder={t("searchPlaceholder")}
                            className="pl-9 bg-muted/50 border-0 focus-visible:ring-1"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
                        />
                    </div>
                </form>

                {/* Search Results Dropdown */}
                {showSearchResults && (
                    <div className="absolute left-0 right-0 top-12 z-50 rounded-xl border bg-card shadow-lg animate-fade-in overflow-hidden">
                        {searchResults.length > 0 ? (
                            <div className="max-h-80 overflow-y-auto">
                                {searchResults.map((result, index) => (
                                    <button
                                        key={`${result.type}-${result.id}-${index}`}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer text-left"
                                        onClick={() => handleResultClick(result)}
                                    >
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${result.type === "customer"
                                            ? "bg-blue-500/10 text-blue-500"
                                            : "bg-purple-500/10 text-purple-500"
                                            }`}>
                                            {result.type === "customer" ? (
                                                <Users className="h-4 w-4" />
                                            ) : (
                                                <CheckSquare className="h-4 w-4" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm truncate">
                                                {result.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {result.company} • {result.type === "customer" ? t("customer") : t("tasks")}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 text-center">
                                <Search className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                <p className="text-sm font-medium">{t("noResults")}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    "{searchQuery}" {t("noMatchForQuery")}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1 md:gap-2">
                {/* Mobile Search Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden h-9 w-9"
                    onClick={() => setShowSearch(!showSearch)}
                >
                    <Search className="h-5 w-5" />
                </Button>

                {/* Language Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleLanguage}
                    className="h-9 w-9 md:h-10 md:w-10"
                    title={language === "tr" ? "English" : "Türkçe"}
                >
                    <Globe className="h-5 w-5" />
                </Button>

                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="h-9 w-9 md:h-10 md:w-10"
                    title={theme === "light" ? t("darkMode") : t("lightMode")}
                >
                    {theme === "light" ? (
                        <Moon className="h-5 w-5" />
                    ) : (
                        <Sun className="h-5 w-5" />
                    )}
                </Button>

                {/* Notifications */}
                <div className="relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative h-9 w-9 md:h-10 md:w-10"
                        onClick={() => {
                            setShowNotifications(!showNotifications);
                            setShowUserMenu(false);
                        }}
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
                                {unreadCount}
                            </span>
                        )}
                    </Button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setShowNotifications(false)}
                            />
                            <div className="absolute right-0 top-12 z-50 w-80 max-w-[calc(100vw-2rem)] rounded-xl border bg-card shadow-lg animate-fade-in">
                                <div className="flex items-center justify-between p-4 border-b">
                                    <h3 className="font-semibold">{t("notifications")}</h3>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => setShowNotifications(false)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors ${!notification.read ? "bg-blue-500/5" : ""
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? "bg-blue-500" : "bg-muted"
                                                        }`}
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm">
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {formatRelativeTime(notification.time, language)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 border-t">
                                    <Button
                                        variant="ghost"
                                        className="w-full text-sm"
                                        onClick={() => setShowNotifications(false)}
                                    >
                                        {t("viewAllNotifications")}
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* User Avatar - Desktop */}
                <div className="relative hidden md:block">
                    <div
                        className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-medium text-white cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => {
                            setShowUserMenu(!showUserMenu);
                            setShowNotifications(false);
                        }}
                    >
                        AK
                    </div>

                    {/* User Dropdown */}
                    {showUserMenu && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setShowUserMenu(false)}
                            />
                            <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border bg-card shadow-lg animate-fade-in">
                                <div className="p-4 border-b">
                                    <p className="font-medium">Ahmet Kaya</p>
                                    <p className="text-sm text-muted-foreground">
                                        ahmet@umutlumarkalar.com
                                    </p>
                                </div>
                                <div className="p-2">
                                    <button
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors cursor-pointer"
                                        onClick={handleSettingsClick}
                                    >
                                        <Settings className="h-4 w-4" />
                                        {t("settings")}
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-muted text-destructive transition-colors cursor-pointer">
                                        <LogOut className="h-4 w-4" />
                                        {t("logout")}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Search Bar */}
            {showSearch && (
                <div className="absolute left-0 right-0 top-14 p-4 bg-card border-b md:hidden animate-fade-in z-50">
                    <form onSubmit={handleSearchSubmit}>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder={t("searchPlaceholder")}
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </form>

                    {/* Mobile Search Results */}
                    {searchQuery.length >= 2 && (
                        <div className="mt-3 rounded-xl border bg-card overflow-hidden">
                            {searchResults.length > 0 ? (
                                <div className="max-h-60 overflow-y-auto">
                                    {searchResults.map((result) => (
                                        <button
                                            key={`${result.type}-${result.id}`}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer text-left border-b last:border-b-0"
                                            onClick={() => handleResultClick(result)}
                                        >
                                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${result.type === "customer"
                                                ? "bg-blue-500/10 text-blue-500"
                                                : "bg-purple-500/10 text-purple-500"
                                                }`}>
                                                {result.type === "customer" ? (
                                                    <Users className="h-4 w-4" />
                                                ) : (
                                                    <CheckSquare className="h-4 w-4" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">
                                                    {result.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {result.company} • {result.type === "customer" ? t("customer") : t("tasks")}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-6 text-center">
                                    <Search className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                    <p className="text-sm font-medium">{t("noResults")}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        "{searchQuery}" {t("noMatchForQuery")}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
