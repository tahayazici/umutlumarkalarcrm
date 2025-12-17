import { useNavigate } from "react-router-dom";
import {
    TrendingUp,
    Users,
    Clock,
    CheckCircle2,
    ArrowUpRight,
    ArrowDownRight,
    ChevronRight,
} from "lucide-react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";

const kpiData = [
    {
        title: "Toplam Ciro",
        value: 2450000,
        change: 12.5,
        trend: "up",
        icon: TrendingUp,
        format: "currency",
        gradient: "from-blue-500 via-cyan-500 to-blue-600",
    },
    {
        title: "Aktif Müşteriler",
        value: 248,
        change: 8.2,
        trend: "up",
        icon: Users,
        format: "number",
        gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    },
    {
        title: "Bekleyen İşler",
        value: 23,
        change: -5.4,
        trend: "down",
        icon: Clock,
        format: "number",
        gradient: "from-amber-500 to-orange-500",
    },
    {
        title: "Tamamlanan Projeler",
        value: 156,
        change: 15.8,
        trend: "up",
        icon: CheckCircle2,
        format: "number",
        gradient: "from-emerald-500 to-teal-500",
    },
];

const chartDataBase = [
    { monthKey: "jan", sales: 185000 },
    { monthKey: "feb", sales: 220000 },
    { monthKey: "mar", sales: 195000 },
    { monthKey: "apr", sales: 280000 },
    { monthKey: "may", sales: 310000 },
    { monthKey: "jun", sales: 295000 },
    { monthKey: "jul", sales: 340000 },
    { monthKey: "aug", sales: 285000 },
    { monthKey: "sep", sales: 320000 },
    { monthKey: "oct", sales: 380000 },
    { monthKey: "nov", sales: 420000 },
    { monthKey: "dec", sales: 450000 },
];

const recentActivitiesBase = [
    {
        id: 1,
        type: "customer",
        messageKey: "activityNewCustomer",
        company: "ABC Teknoloji",
        time: new Date(Date.now() - 1000 * 60 * 15),
        link: "/sirket/abc-teknoloji",
    },
    {
        id: 2,
        type: "deal",
        messageKey: "activityProposalSent",
        company: "XYZ Danışmanlık",
        amount: "₺125.000",
        time: new Date(Date.now() - 1000 * 60 * 45),
        link: "/sirket/xyz-danismanlik",
    },
    {
        id: 3,
        type: "success",
        messageKey: "activityDealWon",
        company: "Metro Grup",
        amount: "₺280.000",
        time: new Date(Date.now() - 1000 * 60 * 120),
        link: "/sirket/metro-grup",
    },
    {
        id: 4,
        type: "meeting",
        messageKey: "activityMeetingScheduled",
        company: "DEF Holding",
        time: new Date(Date.now() - 1000 * 60 * 180),
        link: "/sirket/def-holding",
    },
    {
        id: 5,
        type: "customer",
        messageKey: "activityCustomerUpdated",
        company: "GHI Yazılım",
        time: new Date(Date.now() - 1000 * 60 * 60 * 5),
        link: "/sirket/ghi-yazilim",
    },
];

function KPICard({ title, value, change, trend, icon: Icon, format, gradient }) {
    const displayValue =
        format === "currency" ? formatCurrency(value) : value.toLocaleString("tr-TR");
    const isPositive = trend === "up";

    return (
        <Card className="animate-fade-in overflow-hidden relative group">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
            <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg animate-gradient`}>
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div
                        className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-emerald-500" : "text-red-500"
                            }`}
                    >
                        {isPositive ? (
                            <ArrowUpRight className="h-4 w-4" />
                        ) : (
                            <ArrowDownRight className="h-4 w-4" />
                        )}
                        {Math.abs(change)}%
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-2xl font-bold tracking-tight">{displayValue}</p>
                    <p className="text-sm text-muted-foreground mt-1">{title}</p>
                </div>
            </CardContent>
        </Card>
    );
}

function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border bg-card p-3 shadow-lg backdrop-blur-sm">
                <p className="font-medium text-foreground">{label}</p>
                <p className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                    {formatCurrency(payload[0].value)}
                </p>
            </div>
        );
    }
    return null;
}

export function Dashboard() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { t, language } = useLanguage();

    // Create translated chart data
    const chartData = chartDataBase.map(item => ({
        month: t(item.monthKey),
        sales: item.sales
    }));

    // Create translated activity messages
    const getActivityMessage = (activity) => {
        let msg = t(activity.messageKey);
        msg = msg.replace("{company}", activity.company);
        if (activity.amount) {
            msg = msg.replace("{amount}", activity.amount);
        }
        return msg;
    };

    const recentActivities = recentActivitiesBase.map(activity => ({
        ...activity,
        message: getActivityMessage(activity)
    }));

    // Theme-aware colors for Recharts
    const chartColors = {
        text: theme === "dark" ? "#a1a1aa" : "#71717a",
        grid: theme === "dark" ? "#3f3f46" : "#e4e4e7",
    };

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-text">
                    {t("dashboardTitle")}
                </h1>
                <p className="text-muted-foreground">
                    {t("dashboardSubtitle")}
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                <KPICard title={t("totalRevenue")} value={2450000} change={12.5} trend="up" icon={TrendingUp} format="currency" gradient="from-blue-500 via-cyan-500 to-blue-600" />
                <KPICard title={t("activeCustomers")} value={248} change={8.2} trend="up" icon={Users} format="number" gradient="from-cyan-500 via-blue-500 to-indigo-500" />
                <KPICard title={t("pendingTasks")} value={23} change={-5.4} trend="down" icon={Clock} format="number" gradient="from-amber-500 to-orange-500" />
                <KPICard title={t("completedProjects")} value={156} change={15.8} trend="up" icon={CheckCircle2} format="number" gradient="from-emerald-500 to-teal-500" />
            </div>

            {/* Chart and Activities */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Sales Chart */}
                <Card className="lg:col-span-2 animate-fade-in overflow-hidden">
                    <CardHeader>
                        <CardTitle>{t("monthlySalesPerformance")}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-6">
                        <div className="h-48 sm:h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="50%" stopColor="#06b6d4" />
                                            <stop offset="100%" stopColor="#3b82f6" />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke={chartColors.grid}
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fill: chartColors.text, fontSize: 12 }}
                                        axisLine={{ stroke: chartColors.grid }}
                                        tickLine={{ stroke: chartColors.grid }}
                                    />
                                    <YAxis
                                        tick={{ fill: chartColors.text, fontSize: 12 }}
                                        axisLine={{ stroke: chartColors.grid }}
                                        tickLine={{ stroke: chartColors.grid }}
                                        tickFormatter={(value) => `${value / 1000}K`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="url(#lineGradient)"
                                        strokeWidth={2.5}
                                        fill="url(#colorSales)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card className="animate-fade-in">
                    <CardHeader>
                        <CardTitle>{t("recentActivities")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {recentActivities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 cursor-pointer group"
                                    onClick={() => navigate(activity.link)}
                                >
                                    <div className="shrink-0">
                                        {activity.type === "success" ? (
                                            <Badge variant="success" className="px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 animate-gradient">
                                                {t("won")}
                                            </Badge>
                                        ) : activity.type === "deal" ? (
                                            <Badge variant="secondary" className="px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 animate-gradient">
                                                {t("proposal")}
                                            </Badge>
                                        ) : activity.type === "customer" ? (
                                            <Badge variant="outline" className="px-2 py-1">
                                                {t("customer")}
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 animate-gradient">
                                                {t("meeting")}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium leading-relaxed truncate">
                                            {activity.message}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {formatRelativeTime(activity.time, language)}
                                        </p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
