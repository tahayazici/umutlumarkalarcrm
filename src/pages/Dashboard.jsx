import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
    Users,
    CreditCard,
    Activity,
    ArrowUpRight,
    TrendingUp,
    Briefcase,
    CheckCircle2,
    CalendarDays,
    MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export function Dashboard() {
    const { t } = useLanguage();
    const { customers, tasks, activities } = useData();

    // CALCULATE KPIS
    const totalRevenue = 45231.89; // Mock for now, or sum from deals
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const pendingTasks = tasks.filter(t => t.status === 'todo').length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;

    // Recent Tasks Widget Data
    const recentTasks = tasks
        .filter(t => t.status !== 'done')
        .slice(0, 5);

    // Recent Activities
    const recentActivities = activities.slice(0, 4);

    // Chart Data
    const taskStatusData = [
        { name: t('todo'), value: pendingTasks, color: '#3b82f6' },
        { name: t('in_progress'), value: tasks.filter(t => t.status === 'in_progress').length, color: '#f59e0b' },
        { name: t('done'), value: completedTasks, color: '#10b981' },
    ];

    return (
        <div className="space-y-6">
            {/* KPI GRID */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('totalRevenue')}</CardTitle>
                        <CreditCard className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                        <p className="text-xs text-muted-foreground flex items-center text-emerald-600 mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +20.1% {t('fromLastMonth')}
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('activeCustomers')}</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{activeCustomers}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {t('totalCustomers')}: {customers.length}
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('pendingTasks')}</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingTasks}</div>
                        <p className="text-xs text-muted-foreground flex items-center text-amber-600 mt-1">
                            {tasks.filter(t => t.priority === 'high' && t.status !== 'done').length} {t('highPriority')}
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('activeProjects')}</CardTitle>
                        <Activity className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {t('newThisWeek')}: +2
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* MID SECTION: CHARTS AND TASKS */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                {/* RECENT TASKS WIDGET (4 cols) */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>{t('todaysTasks')}</CardTitle>
                        <CardDescription>{pendingTasks} {t('tasks').toLowerCase()} {t('pendingTasks').toLowerCase()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentTasks.map((task, i) => (
                                <div key={task.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'}`} />
                                        <div>
                                            <p className="text-sm font-medium leading-none">{task.title}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{task.dueDate}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline">{t(task.status)}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* TASK STATUS PIE CHART (3 cols) */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>{t('taskStatus')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={taskStatusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {taskStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-4 text-xs text-muted-foreground mt-2">
                            {taskStatusData.map((d, i) => (
                                <div key={i} className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                                    {d.name} ({d.value})
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* BOTTOM SECTION: ACTIVITIES */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 ">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>{t('recentActivities')}</CardTitle>
                        <CardDescription>Müşterilerle yapılan son etkileşimler.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {recentActivities.map((activity, i) => (
                                <div key={activity.id} className="flex items-start gap-4 text-sm">
                                    <div className="mt-0.5 bg-muted p-2 rounded-full">
                                        {activity.type === 'meeting' ? <Briefcase className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                                    </div>
                                    <div className="grid gap-1">
                                        <p className="font-medium">{activity.note}</p>
                                        <div className="text-xs text-muted-foreground flex gap-2">
                                            <span>{new Date(activity.date).toLocaleDateString("tr-TR")}</span>
                                            <span>•</span>
                                            <span>{t('customer')} ID: {activity.customerId}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
