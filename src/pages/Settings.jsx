import { useState } from "react";
import { User, Bell, Shield, Palette, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/context/LanguageContext";

export function Settings() {
    const { t } = useLanguage();
    const [profile, setProfile] = useState({
        name: "Ahmet Kaya",
        email: "ahmet@umutlumarkalar.com",
        phone: "+90 532 123 45 67",
        role: t('admin'),
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        pushNotifications: true,
        dealUpdates: true,
        customerActivity: false,
        weeklyReports: true,
    });

    const handleProfileChange = (field, value) => {
        setProfile({ ...profile, [field]: value });
    };

    const handleNotificationChange = (field) => {
        setNotifications({ ...notifications, [field]: !notifications[field] });
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Page Title */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-text">{t("settingsTitle")}</h1>
                <p className="text-muted-foreground">
                    {t("settingsSubtitle")}
                </p>
            </div>

            {/* Profile Settings */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        <div>
                            <CardTitle>{t("profileInfo")}</CardTitle>
                            <CardDescription>{t("profileInfoDesc")}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 text-white text-2xl font-bold shadow-lg animate-gradient animate-glow">
                            AK
                        </div>
                        <Button variant="outline">{t("changePhoto")}</Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">{t("fullName")}</Label>
                            <Input
                                id="name"
                                value={profile.name}
                                onChange={(e) => handleProfileChange("name", e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t("email")}</Label>
                            <Input
                                id="email"
                                type="email"
                                value={profile.email}
                                onChange={(e) => handleProfileChange("email", e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">{t("phone")}</Label>
                            <Input
                                id="phone"
                                value={profile.phone}
                                onChange={(e) => handleProfileChange("phone", e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role">{t("role")}</Label>
                            <Input id="role" value={profile.role} disabled className="bg-muted" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button>
                            <Save className="h-4 w-4" />
                            {t("saveChanges")}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" />
                        <div>
                            <CardTitle>{t("notificationSettings")}</CardTitle>
                            <CardDescription>{t("notificationSettingsDesc")}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                            <div>
                                <p className="font-medium">{t("emailNotifications")}</p>
                                <p className="text-sm text-muted-foreground">
                                    {t("emailNotificationsDesc")}
                                </p>
                            </div>
                            <Switch
                                checked={notifications.emailNotifications}
                                onCheckedChange={() => handleNotificationChange("emailNotifications")}
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                            <div>
                                <p className="font-medium">{t("pushNotifications")}</p>
                                <p className="text-sm text-muted-foreground">
                                    {t("pushNotificationsDesc")}
                                </p>
                            </div>
                            <Switch
                                checked={notifications.pushNotifications}
                                onCheckedChange={() => handleNotificationChange("pushNotifications")}
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                            <div>
                                <p className="font-medium">{t("dealUpdates")}</p>
                                <p className="text-sm text-muted-foreground">
                                    {t("dealUpdatesDesc")}
                                </p>
                            </div>
                            <Switch
                                checked={notifications.dealUpdates}
                                onCheckedChange={() => handleNotificationChange("dealUpdates")}
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                            <div>
                                <p className="font-medium">{t("customerActivities")}</p>
                                <p className="text-sm text-muted-foreground">
                                    {t("customerActivitiesDesc")}
                                </p>
                            </div>
                            <Switch
                                checked={notifications.customerActivity}
                                onCheckedChange={() => handleNotificationChange("customerActivity")}
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                            <div>
                                <p className="font-medium">{t("weeklyReport")}</p>
                                <p className="text-sm text-muted-foreground">
                                    {t("weeklyReportDesc")}
                                </p>
                            </div>
                            <Switch
                                checked={notifications.weeklyReports}
                                onCheckedChange={() => handleNotificationChange("weeklyReports")}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <div>
                            <CardTitle>{t("security")}</CardTitle>
                            <CardDescription>{t("securityDesc")}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                        <div>
                            <p className="font-medium">{t("changePassword")}</p>
                            <p className="text-sm text-muted-foreground">
                                {t("lastPasswordChange")}
                            </p>
                        </div>
                        <Button variant="outline">{t("change")}</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                        <div>
                            <p className="font-medium">{t("twoFactorAuth")}</p>
                            <p className="text-sm text-muted-foreground">
                                {t("twoFactorAuthDesc")}
                            </p>
                        </div>
                        <Button variant="outline">{t("enable")}</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
