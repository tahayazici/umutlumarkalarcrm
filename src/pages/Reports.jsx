import { useData } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";

export function Reports() {
    const { t } = useLanguage();

    // Mock Chart Data
    const revenueData = [
        { name: t('jan'), revenue: 4000, profit: 2400 },
        { name: t('feb'), revenue: 3000, profit: 1398 },
        { name: t('mar'), revenue: 2000, profit: 9800 },
        { name: t('apr'), revenue: 2780, profit: 3908 },
        { name: t('may'), revenue: 1890, profit: 4800 },
        { name: t('jun'), revenue: 2390, profit: 3800 },
        { name: t('jul'), revenue: 3490, profit: 4300 },
    ];

    const customerGrowthData = [
        { name: `${t('week')} 1`, newCustomers: 4 },
        { name: `${t('week')} 2`, newCustomers: 7 },
        { name: `${t('week')} 3`, newCustomers: 2 },
        { name: `${t('week')} 4`, newCustomers: 9 },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent">
                    {t("reportsTitle")}
                </h1>
                <p className="text-muted-foreground">
                    {t("reportsSubtitle")}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* REVENUE CHART */}
                <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                        <CardTitle>{t("monthlyRevenue")}</CardTitle>
                        <CardDescription>{t("revenueDesc")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₺${value}`} />
                                    <Tooltip formatter={(value, name) => [value, t(name)]} />
                                    <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* CUSTOMER GROWTH */}
                <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                        <CardTitle>{t("customerGrowth")}</CardTitle>
                        <CardDescription>{t("growthDesc")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={customerGrowthData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip formatter={(value, name) => [value, t(name)]} />
                                    <Area type="monotone" dataKey="newCustomers" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* PROJECT EFFICIENCY (Line Chart) */}
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>{t("projectVelocity")}</CardTitle>
                        <CardDescription>{t("velocityDesc")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip formatter={(value, name) => [value, t(name)]} />
                                    <Line type="monotone" dataKey="profit" stroke="#8b5cf6" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
