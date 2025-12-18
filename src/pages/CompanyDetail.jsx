import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";
import {
    ArrowLeft,
    Building2,
    Mail,
    Phone,
    MapPin,
    Calendar,
    TrendingUp,
    Users,
    FileText,
    Clock,
    MoreHorizontal,
    Plus,
    Paperclip,
    Download,
    Trash
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock Files Data
const MOCK_FILES = [
    { id: 1, name: "Sözleşme Taslağı v2.pdf", size: "2.4 MB", date: "2024-12-10", type: "pdf" },
    { id: 2, name: "Proje Gereksinimleri.docx", size: "1.1 MB", date: "2024-12-05", type: "doc" },
    { id: 3, name: "Logo Paketi.zip", size: "15 MB", date: "2024-11-20", type: "zip" },
];

export function CompanyDetail() {
    const { companyId } = useParams();
    const navigate = useNavigate();
    const { customers, tasks, activities } = useData();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("overview");

    // Find data
    const company = customers.find(c => c.id === companyId || c.slug === companyId);
    const companyTasks = tasks.filter(t => t.customerId === company?.id);
    const companyActivities = activities.filter(a => a.customerId === company?.id);

    const handleAction = (actionName) => {
        console.log(`Action triggered: ${actionName}`);
        alert(`${t(actionName) || actionName} ${t("actionSuccessful") || "başarıyla tetiklendi."}`);
    };

    if (!company) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <Building2 className="h-16 w-16 text-muted-foreground" />
                <h2 className="text-xl font-semibold">{t("companyNotFound")}</h2>
                <Button onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {t("goBack")}
                </Button>
            </div>
        );
    }

    const statusColors = {
        active: "success",
        inactive: "secondary",
        lead: "warning",
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold tracking-tight">{company.name}</h1>
                            <Badge variant={statusColors[company.status]}>{t(company.status)}</Badge>
                        </div>
                        <p className="text-muted-foreground flex items-center gap-2 text-sm mt-1">
                            <Building2 className="h-4 w-4" />
                            {company.company}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleAction("email")}>
                        <Mail className="h-4 w-4 mr-2" />
                        {t("email")}
                    </Button>
                    <Button variant="outline" onClick={() => handleAction("call")}>
                        <Phone className="h-4 w-4 mr-2" />
                        {t("call")}
                    </Button>
                    <Button onClick={() => handleAction("add")}>
                        <Plus className="h-4 w-4 mr-2" />
                        {t("add")}
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
                    <TabsTrigger value="timeline">{t("timeline")}</TabsTrigger>
                    <TabsTrigger value="tasks">{t("tasks")} ({companyTasks.length})</TabsTrigger>
                    <TabsTrigger value="files">{t("files")} ({MOCK_FILES.length})</TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{t("totalRevenue")}</p>
                                    <h3 className="text-2xl font-bold">₺285.000</h3>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{t("openDeals")}</p>
                                    <h3 className="text-2xl font-bold">3</h3>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <Card className="md:col-span-1">
                            <CardHeader>
                                <CardTitle className="text-lg">{t("contactInfo")}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{company.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{company.phone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{t("istanbulTurkey")}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* TIMELINE TAB */}
                <TabsContent value="timeline">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("activityHistory")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                {companyActivities.map((activity, index) => (
                                    <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                            {activity.type === 'call' ? <Phone className="w-4 h-4" /> : activity.type === 'email' ? <Mail className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-4 rounded border shadow-sm">
                                            <div className="flex items-center justify-between space-x-2 mb-1">
                                                <div className="font-bold text-slate-900">{activity.type === 'call' ? t('phone') : t('meeting')}</div>
                                                <time className="font-caveat font-medium text-amber-500 text-xs">
                                                    {formatDate(activity.date)}
                                                </time>
                                            </div>
                                            <div className="text-slate-500 text-sm">{activity.note}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TASKS TAB */}
                <TabsContent value="tasks">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>{t("relatedTasks")}</CardTitle>
                            <Button size="sm" onClick={() => handleAction("newTask")}>
                                <Plus className="h-4 w-4 mr-2" />
                                {t("newTask")}
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {companyTasks.map((task, index) => (
                                    <div key={task.id || index} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <div className={cn("w-2 h-2 rounded-full", task.priority === 'high' ? 'bg-red-500' : 'bg-blue-500')} />
                                            </div>
                                            <div>
                                                <h4 className="font-medium">{task.title}</h4>
                                                <p className="text-sm text-muted-foreground">{task.description}</p>
                                                <div className="flex items-center gap-2 mt-2 text-xs">
                                                    <Badge variant="outline">{t(task.status)}</Badge>
                                                    <span className="text-muted-foreground">{t("dueDate")}: {task.dueDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => handleAction("more")}>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                {companyTasks.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">
                                        {t("noTasks")}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* FILES TAB */}
                <TabsContent value="files">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>{t("files")}</CardTitle>
                            <Button size="sm" variant="outline" onClick={() => handleAction("uploadFile")}>
                                <Paperclip className="h-4 w-4 mr-2" />
                                {t("uploadFile")}
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {MOCK_FILES.map(file => (
                                    <div key={file.id} className="group relative flex flex-col p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="p-2 bg-blue-100 text-blue-600 rounded">
                                                <FileText className="h-6 w-6" />
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleAction("delete")}>
                                                <Trash className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                        <h4 className="font-medium truncate mb-1">{file.name}</h4>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                                            <span>{file.size}</span>
                                            <span>{file.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
