import { useState } from "react";
import { useData } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    LayoutGrid,
    List,
    Plus,
    Search,
    Filter,
    Calendar,
    User,
    ArrowUpCircle,
    ArrowDownCircle,
    MinusCircle,
    MoreHorizontal
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TaskModal } from "@/components/TaskModal";

// --- COMPONENTS ---

// 1. Task Card (Kanban Item)
function TaskCard({ task, users, customers }) {
    const { t } = useLanguage();
    const assignee = users?.find(u => u.id === task.assignee);
    const customer = customers.find(c => c.id === task.customerId);

    const priorityColors = {
        high: "bg-red-500",
        medium: "bg-amber-500",
        low: "bg-blue-500",
    };

    return (
        <div className="bg-card border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer group" onClick={() => alert(t(task.title) + " - " + t("actions"))}>
            <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className={cn("text-xs font-normal border-0 text-white", priorityColors[task.priority])}>
                    {t(task.priority)}
                </Badge>
                <div className="flex items-center gap-1">
                    {assignee && (
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs overflow-hidden" title={assignee.name}>
                            {assignee.avatar ? <img src={assignee.avatar} alt={assignee.name} /> : assignee.name[0]}
                        </div>
                    )}
                </div>
            </div>
            <h4 className="font-medium text-sm mb-1">{t(task.title) || task.title}</h4>
            <div className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {t(task.description) || task.description}
            </div>

            <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{task.dueDate}</span>
                </div>
                {customer && (
                    <div className="font-medium text-primary">
                        {customer.company}
                    </div>
                )}
            </div>
        </div>
    );
}

// 2. Kanban Column
function KanbanColumn({ status, title, tasks, users, customers }) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col min-w-[300px] w-full md:w-[320px]">
            <div className="flex items-center justify-between mb-3 p-2 rounded-lg bg-muted">
                <span className="font-semibold text-sm">{title ? t(title) : status}</span>
                <Badge variant="secondary" className="bg-background">{tasks.length}</Badge>
            </div>
            <div className="flex-1 space-y-3 min-h-[200px]">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} users={users} customers={customers} />
                ))}
            </div>
        </div>
    );
}

// 3. Task Table View
function TaskTable({ tasks, users, customers }) {
    const { t } = useLanguage();

    const priorityIcons = {
        high: <ArrowUpCircle className="w-4 h-4 text-red-500" />,
        medium: <MinusCircle className="w-4 h-4 text-amber-500" />,
        low: <ArrowDownCircle className="w-4 h-4 text-blue-500" />,
    };

    return (
        <div className="border rounded-lg overflow-hidden bg-card">
            <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                        <th className="p-3">{t("title")}</th>
                        <th className="p-3">{t("assignee")}</th>
                        <th className="p-3">{t("priority")}</th>
                        <th className="p-3">{t("status")}</th>
                        <th className="p-3">{t("dueDate")}</th>
                        <th className="p-3">{t("customer")}</th>
                        <th className="p-3 text-right">{t("actions")}</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {tasks.map(task => {
                        const assignee = users?.find(u => u.id === task.assignee);
                        const customer = customers.find(c => c.id === task.customerId);
                        return (
                            <tr key={task.id} className="hover:bg-muted/30 transition-colors">
                                <td className="p-3 font-medium">{t(task.title) || task.title}</td>
                                <td className="p-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs overflow-hidden">
                                            {assignee?.name[0] || "?"}
                                        </div>
                                        <span>{assignee?.name || t("unassigned")}</span>
                                    </div>
                                </td>
                                <td className="p-3">
                                    <div className="flex items-center gap-1">
                                        {priorityIcons[task.priority]}
                                        {t(task.priority)}
                                    </div>
                                </td>
                                <td className="p-3">
                                    <Badge variant="outline">{t(task.status)}</Badge>
                                </td>
                                <td className="p-3">{task.dueDate}</td>
                                <td className="p-3 text-muted-foreground">{customer?.company || "-"}</td>
                                <td className="p-3 text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => alert(t('actions'))}>
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                    {/* Edit/Delete actions would go here */}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export function Tasks() {
    const { tasks, addTask, customers } = useData();
    const { t } = useLanguage();
    const [viewMode, setViewMode] = useState("kanban"); // kanban | list
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock Users
    const users = [
        { id: "u1", name: "Demo Admin", avatar: "" },
        { id: "u2", name: "Ali Veli", avatar: "" },
    ];

    const handleSaveTask = (taskData) => {
        addTask(taskData);
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || task.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const tasksByStatus = {
        todo: filteredTasks.filter(t => t.status === "todo"),
        in_progress: filteredTasks.filter(t => t.status === "in_progress"),
        done: filteredTasks.filter(t => t.status === "done"),
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                customers={customers}
                users={users}
            />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent">
                        {t("tasks")}
                    </h1>
                    <p className="text-muted-foreground">
                        {t("tasksSubtitle")}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-muted rounded-lg p-1 border">
                        <Button
                            variant={viewMode === "kanban" ? "secondary" : "ghost"}
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => setViewMode("kanban")}
                        >
                            <LayoutGrid className="w-4 h-4 mr-1" />
                            {t("kanban")}
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "secondary" : "ghost"}
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => setViewMode("list")}
                        >
                            <List className="w-4 h-4 mr-1" />
                            {t("list")}
                        </Button>
                    </div>
                    <Button size="sm" className="hidden sm:flex" onClick={() => setIsModalOpen(true)}>
                        <Plus className="w-4 h-4 mr-1" />
                        {t("newTask")}
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-3 rounded-lg border shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder={t("searchTasks")}
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    <Button
                        variant={statusFilter === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter("all")}
                    >
                        {t("all")}
                    </Button>
                    <Button
                        variant={statusFilter === "todo" ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter("todo")}
                    >
                        {t("todo")}
                    </Button>
                    <Button
                        variant={statusFilter === "in_progress" ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter("in_progress")}
                    >
                        {t("in_progress")}
                    </Button>
                    <Button
                        variant={statusFilter === "done" ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter("done")}
                    >
                        {t("done")}
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-x-auto">
                {viewMode === "kanban" ? (
                    <div className="flex gap-6 pb-4 min-w-max h-full">
                        <KanbanColumn
                            title="todo"
                            tasks={tasksByStatus.todo}
                            users={users}
                            customers={customers}
                        />
                        <KanbanColumn
                            title="in_progress"
                            tasks={tasksByStatus.in_progress}
                            users={users}
                            customers={customers}
                        />
                        <KanbanColumn
                            title="done"
                            tasks={tasksByStatus.done}
                            users={users}
                            customers={customers}
                        />
                    </div>
                ) : (
                    <TaskTable tasks={filteredTasks} users={users} customers={customers} />
                )}
            </div>
        </div>
    );
}
