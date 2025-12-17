import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TaskModal({ isOpen, onClose, onSave, task = null, customers, users }) {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignee: "",
        customerId: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
    });

    useEffect(() => {
        if (task) {
            setFormData(task);
        } else {
            setFormData({
                title: "",
                description: "",
                assignee: users[0]?.id || "", // Default first user
                customerId: "",
                priority: "medium",
                status: "todo",
                dueDate: new Date().toISOString().split("T")[0],
            });
        }
    }, [task, isOpen, users]);

    const handleSubmit = () => {
        if (!formData.title) return;
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{task ? t("editTask") : t("newTask")}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">{t("title")}</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder={t("title")}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">{t("description")}</Label>
                        <Input
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder={t("description")}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="assignee">{t("assignee")}</Label>
                            <select
                                id="assignee"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.assignee}
                                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                            >
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="priority">{t("priority")}</Label>
                            <select
                                id="priority"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            >
                                <option value="low">{t("low")}</option>
                                <option value="medium">{t("medium")}</option>
                                <option value="high">{t("high")}</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="date">{t("dueDate")}</Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="customer">{t("customer")}</Label>
                            <select
                                id="customer"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.customerId}
                                onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                            >
                                <option value="">{t("selectCompany") || "Seçiniz..."}</option>
                                {customers.map(c => (
                                    <option key={c.id} value={c.id}>{c.company}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>{t("cancel")}</Button>
                    <Button onClick={handleSubmit}>{task ? t("save") : t("add")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
