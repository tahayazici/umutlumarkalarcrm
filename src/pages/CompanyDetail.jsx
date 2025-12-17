import { useParams, useNavigate } from "react-router-dom";
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
    ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// Şirket verileri
const companiesData = {
    "abc-teknoloji": {
        id: "abc-teknoloji",
        name: "ABC Teknoloji A.Ş.",
        contact: "Mehmet Yılmaz",
        email: "mehmet@abctech.com",
        phone: "+90 532 111 22 33",
        address: "İstanbul, Maslak",
        status: "active",
        totalRevenue: 285000,
        deals: [
            { id: 1, title: "Web Sitesi Yenileme", value: 85000, stage: "new", date: "2024-12-10" },
            { id: 2, title: "SEO Optimizasyonu", value: 45000, stage: "won", date: "2024-10-15" },
            { id: 3, title: "Mobil Uygulama v2", value: 155000, stage: "proposal", date: "2024-12-01" },
        ],
        activities: [
            { type: "meeting", textKey: "activityMeetingHeld", date: "2024-12-15" },
            { type: "email", textKey: "activityProposalEmailSent", date: "2024-12-10" },
            { type: "call", textKey: "activityPhoneCall", date: "2024-12-05" },
        ],
    },
    "xyz-danismanlik": {
        id: "xyz-danismanlik",
        name: "XYZ Danışmanlık",
        contact: "Ayşe Kara",
        email: "ayse@xyz.com",
        phone: "+90 533 222 33 44",
        address: "Ankara, Çankaya",
        status: "active",
        totalRevenue: 125000,
        deals: [
            { id: 1, title: "CRM Entegrasyonu", value: 125000, stage: "negotiating", date: "2024-12-08" },
        ],
        activities: [
            { type: "meeting", textKey: "activityDemoPresented", date: "2024-12-12" },
            { type: "call", textKey: "activityPriceNegotiation", date: "2024-12-08" },
        ],
    },
    "metro-grup": {
        id: "metro-grup",
        name: "Metro Grup",
        contact: "Ali Demir",
        email: "ali@metrogrup.com",
        phone: "+90 534 333 44 55",
        address: "İzmir, Alsancak",
        status: "active",
        totalRevenue: 580000,
        deals: [
            { id: 1, title: "E-ticaret Platformu", value: 280000, stage: "proposal", date: "2024-12-05" },
            { id: 2, title: "ERP Entegrasyonu", value: 300000, stage: "won", date: "2024-09-20" },
        ],
        activities: [
            { type: "email", textKey: "activityContractSent", date: "2024-12-14" },
            { type: "meeting", textKey: "activityTechnicalMeeting", date: "2024-12-10" },
        ],
    },
    "def-holding": {
        id: "def-holding",
        name: "DEF Holding",
        contact: "Zeynep Öztürk",
        email: "zeynep@defholding.com",
        phone: "+90 535 444 55 66",
        address: "İstanbul, Levent",
        status: "active",
        totalRevenue: 195000,
        deals: [
            { id: 1, title: "Mobil Uygulama", value: 195000, stage: "negotiating", date: "2024-12-02" },
        ],
        activities: [
            { type: "call", textKey: "activityProjectDetails", date: "2024-12-13" },
        ],
    },
    "ghi-yazilim": {
        id: "ghi-yazilim",
        name: "GHI Yazılım",
        contact: "Can Aydın",
        email: "can@ghiyazilim.com",
        phone: "+90 536 555 66 77",
        address: "Bursa, Nilüfer",
        status: "active",
        totalRevenue: 150000,
        deals: [
            { id: 1, title: "Kurumsal Portal", value: 150000, stage: "won", date: "2024-11-15" },
        ],
        activities: [
            { type: "email", textKey: "activityProjectDelivered", date: "2024-12-10" },
        ],
    },
    "jkl-medya": {
        id: "jkl-medya",
        name: "JKL Medya",
        contact: "Selin Arslan",
        email: "selin@jklmedya.com",
        phone: "+90 537 666 77 88",
        address: "İstanbul, Beşiktaş",
        status: "active",
        totalRevenue: 65000,
        deals: [
            { id: 1, title: "API Geliştirme", value: 65000, stage: "new", date: "2024-12-16" },
        ],
        activities: [
            { type: "meeting", textKey: "activityFirstMeeting", date: "2024-12-16" },
        ],
    },
    "mno-lojistik": {
        id: "mno-lojistik",
        name: "MNO Lojistik",
        contact: "Emre Çelik",
        email: "emre@mnolojistik.com",
        phone: "+90 538 777 88 99",
        address: "Kocaeli, Gebze",
        status: "inactive",
        totalRevenue: 0,
        deals: [
            { id: 1, title: "Veri Analizi Platformu", value: 320000, stage: "lost", date: "2024-11-01" },
        ],
        activities: [
            { type: "email", textKey: "activityProjectCancelled", date: "2024-11-15" },
        ],
    },
    "pqr-finansal": {
        id: "pqr-finansal",
        name: "PQR Finansal",
        contact: "Gizem Şahin",
        email: "gizem@pqrfinansal.com",
        phone: "+90 539 888 99 00",
        address: "İstanbul, Şişli",
        status: "lead",
        totalRevenue: 175000,
        deals: [
            { id: 1, title: "Otomasyon Sistemi", value: 175000, stage: "proposal", date: "2024-12-12" },
        ],
        activities: [
            { type: "call", textKey: "activityProposalDetailsExplained", date: "2024-12-14" },
        ],
    },
    "stu-holding": {
        id: "stu-holding",
        name: "STU Holding",
        contact: "Burak Yıldız",
        email: "burak@stuholding.com",
        phone: "+90 530 999 00 11",
        address: "Ankara, Söğütözü",
        status: "active",
        totalRevenue: 420000,
        deals: [
            { id: 1, title: "Bulut Altyapısı", value: 420000, stage: "won", date: "2024-10-20" },
        ],
        activities: [
            { type: "meeting", textKey: "activityProjectKickoff", date: "2024-10-25" },
        ],
    },
};

const stageLabels = {
    new: { labelKey: "newDeal", color: "bg-slate-500" },
    negotiating: { labelKey: "negotiating", color: "bg-blue-500" },
    proposal: { labelKey: "proposal", color: "bg-amber-500" },
    won: { labelKey: "won", color: "bg-emerald-500" },
    lost: { labelKey: "lost", color: "bg-red-500" },
};

const statusLabels = {
    active: { labelKey: "active", variant: "success" },
    inactive: { labelKey: "inactive", variant: "secondary" },
    lead: { labelKey: "potential", variant: "warning" },
};

export function CompanyDetail() {
    const { companyId } = useParams();
    const navigate = useNavigate();
    const { t, language } = useLanguage();

    const company = companiesData[companyId];

    if (!company) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <Building2 className="h-16 w-16 text-muted-foreground" />
                <h2 className="text-xl font-semibold">{t("companyNotFound")}</h2>
                <p className="text-muted-foreground">{t("companyNotFoundDesc")}</p>
                <Button onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                    {t("goBack")}
                </Button>
            </div>
        );
    }

    const activeDeals = company.deals.filter((d) => !["won", "lost"].includes(d.stage));
    const wonDeals = company.deals.filter((d) => d.stage === "won");

    return (
        <div className="space-y-6">
            {/* Back Button & Title */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-text truncate">
                        {company.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <Badge variant={statusLabels[company.status].variant}>
                            {t(statusLabels[company.status].labelKey)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                            {t("contactPerson")}: {company.contact}
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
                <Card className="animate-fade-in">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                                <TrendingUp className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">{t("totalIncome")}</p>
                                <p className="text-lg font-bold">{formatCurrency(company.totalRevenue, language)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="animate-fade-in">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                                <FileText className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">{t("activeOpportunities")}</p>
                                <p className="text-lg font-bold">{activeDeals.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="animate-fade-in">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                                <Users className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">{t("wonCount")}</p>
                                <p className="text-lg font-bold">{wonDeals.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="animate-fade-in">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">{t("activity")}</p>
                                <p className="text-lg font-bold">{company.activities.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Contact Info */}
                <Card className="animate-fade-in">
                    <CardHeader>
                        <CardTitle className="text-lg">{t("contactInfo")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${company.email}`} className="text-sm hover:text-primary transition-colors">
                                {company.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${company.phone}`} className="text-sm hover:text-primary transition-colors">
                                {company.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{company.address}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Deals */}
                <Card className="animate-fade-in lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg">{t("opportunities")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {company.deals.map((deal) => (
                                <div
                                    key={deal.id}
                                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${stageLabels[deal.stage].color}`} />
                                        <div>
                                            <p className="font-medium text-sm">{deal.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {t(stageLabels[deal.stage].labelKey)} • {formatDate(deal.date, language)}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-semibold text-sm bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                        {formatCurrency(deal.value, language)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Activities */}
            <Card className="animate-fade-in">
                <CardHeader>
                    <CardTitle className="text-lg">{t("recentActivitiesTitle")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {company.activities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{t(activity.textKey)}</p>
                                    <p className="text-xs text-muted-foreground">{formatDate(activity.date, language)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
