import { useState } from "react";
import { useData } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function CalendarPage() {
    const { tasks, activities } = useData();
    const { t, language } = useLanguage();
    const [currentDate, setCurrentDate] = useState(new Date());

    // Helper to get days in month
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
        // Adjust for Monday start (Turkey standard)
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
        return { days, firstDay: adjustedFirstDay };
    };

    const monthNames = [
        t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun'),
        t('jul'), t('aug'), t('sep'), t('oct'), t('nov'), t('dec')
    ];

    const dayNames = [
        t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat'), t('sun')
    ];

    const { days, firstDay } = getDaysInMonth(currentDate);

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    // Get events for a specific day
    const getEventsForDay = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const dayTasks = tasks.filter(t => t.dueDate === dateStr);
        // Assuming activities have ISO strings, just checking date part for demo
        const dayActivities = activities.filter(a => a.date.startsWith(dateStr) && a.type === 'meeting');

        return [...dayTasks.map(t => ({ ...t, type: 'task' })), ...dayActivities.map(a => ({ ...a, type: 'meeting', title: t('meeting') }))];
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent">
                        {t("calendarTitle")}
                    </h1>
                    <p className="text-muted-foreground">
                        {t("calendarSubtitle")}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-card border rounded-lg shadow-sm">
                        <Button variant="ghost" size="icon" onClick={prevMonth}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="w-32 text-center font-medium">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </span>
                        <Button variant="ghost" size="icon" onClick={nextMonth}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 border-b bg-muted/30">
                    {dayNames.map(day => (
                        <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                    {/* Empty cells for previous month */}
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="border-b border-r p-2 bg-muted/5 opacity-30" />
                    ))}

                    {/* Days */}
                    {Array.from({ length: days }).map((_, i) => {
                        const day = i + 1;
                        const events = getEventsForDay(day);
                        return (
                            <div
                                key={day}
                                className={cn(
                                    "border-b border-r p-2 relative group min-h-[100px] transition-colors hover:bg-muted/10",
                                    isToday(day) && "bg-blue-50/50"
                                )}
                            >
                                <span className={cn(
                                    "inline-flex w-7 h-7 items-center justify-center rounded-full text-sm font-medium",
                                    isToday(day) ? "bg-blue-600 text-white" : "text-muted-foreground"
                                )}>
                                    {day}
                                </span>

                                <div className="mt-2 space-y-1">
                                    {events.map((event, idx) => (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "text-xs px-1.5 py-1 rounded truncate cursor-pointer",
                                                event.type === 'task'
                                                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                    : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                            )}
                                        >
                                            {event.title || event.note}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}
