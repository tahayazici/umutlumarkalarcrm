import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MoreHorizontal, Building2, TrendingUp, Trophy, Target, Search, Check, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const initialColumns = [
    { id: "new", title: "Yeni Fırsat", color: "bg-slate-500" },
    { id: "negotiating", title: "Görüşülüyor", color: "bg-blue-500" },
    { id: "proposal", title: "Teklif Gönderildi", color: "bg-amber-500" },
    { id: "won", title: "Kazanıldı", color: "bg-emerald-500" },
    { id: "lost", title: "Kaybedildi", color: "bg-red-500" },
];

const companyOptions = [
    { name: "ABC Teknoloji", slug: "abc-teknoloji" },
    { name: "XYZ Danışmanlık", slug: "xyz-danismanlik" },
    { name: "Metro Grup", slug: "metro-grup" },
    { name: "DEF Holding", slug: "def-holding" },
    { name: "GHI Yazılım", slug: "ghi-yazilim" },
    { name: "JKL Medya", slug: "jkl-medya" },
    { name: "MNO Lojistik", slug: "mno-lojistik" },
    { name: "PQR Finansal", slug: "pqr-finansal" },
    { name: "STU Holding", slug: "stu-holding" },
];

const initialDeals = [
    { id: 1, title: "Web Sitesi Yenileme", company: "ABC Teknoloji", companySlug: "abc-teknoloji", value: 85000, stage: "new", priority: "high" },
    { id: 2, title: "CRM Entegrasyonu", company: "XYZ Danışmanlık", companySlug: "xyz-danismanlik", value: 125000, stage: "negotiating", priority: "medium" },
    { id: 3, title: "E-ticaret Platformu", company: "Metro Grup", companySlug: "metro-grup", value: 280000, stage: "proposal", priority: "high" },
    { id: 4, title: "Mobil Uygulama", company: "DEF Holding", companySlug: "def-holding", value: 195000, stage: "negotiating", priority: "low" },
    { id: 5, title: "Kurumsal Portal", company: "GHI Yazılım", companySlug: "ghi-yazilim", value: 150000, stage: "won", priority: "medium" },
    { id: 6, title: "API Geliştirme", company: "JKL Medya", companySlug: "jkl-medya", value: 65000, stage: "new", priority: "low" },
    { id: 7, title: "Veri Analizi Platformu", company: "MNO Lojistik", companySlug: "mno-lojistik", value: 320000, stage: "lost", priority: "high" },
    { id: 8, title: "Otomasyon Sistemi", company: "PQR Finansal", companySlug: "pqr-finansal", value: 175000, stage: "proposal", priority: "medium" },
    { id: 9, title: "Bulut Altyapısı", company: "STU Holding", companySlug: "stu-holding", value: 420000, stage: "won", priority: "high" },
];

const priorityLabels = {
    high: { labelKey: "high", variant: "destructive" },
    medium: { labelKey: "medium", variant: "warning" },
    low: { labelKey: "low", variant: "secondary" },
};

// Searchable Company Select Component
function CompanySearch({ value, onChange, companies }) {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef(null);

    const selectedCompany = companies.find(c => c.slug === value);

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (slug) => {
        onChange(slug);
        setIsOpen(false);
        setSearchQuery("");
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            >
                <span className={selectedCompany ? "text-foreground" : "text-muted-foreground"}>
                    {selectedCompany ? selectedCompany.name : t("selectCompany")}
                </span>
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 rounded-lg border bg-card shadow-lg animate-fade-in">
                    {/* Search Input */}
                    <div className="p-2 border-b">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Şirket ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 h-9"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Company List */}
                    <div className="max-h-48 overflow-y-auto p-1">
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map((company) => (
                                <button
                                    key={company.slug}
                                    type="button"
                                    onClick={() => handleSelect(company.slug)}
                                    className={cn(
                                        "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors cursor-pointer",
                                        value === company.slug
                                            ? "bg-primary/10 text-primary"
                                            : "hover:bg-muted"
                                    )}
                                >
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                    <span className="flex-1 text-left">{company.name}</span>
                                    {value === company.slug && (
                                        <Check className="h-4 w-4 text-primary" />
                                    )}
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                                <Search className="h-6 w-6 mx-auto mb-2 opacity-50" />
                                <p>{t("companyNotFound")}</p>
                                <p className="text-xs mt-1">"{searchQuery}" {t("noMatchFor")}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function DealCard({ deal, onMoveToStage, columns, onCardClick }) {
    const [showMoveMenu, setShowMoveMenu] = useState(false);
    const { t } = useLanguage();
    return (
        <Card
            className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group cursor-pointer border-l-4"
            style={{ borderLeftColor: deal.priority === 'high' ? '#ef4444' : deal.priority === 'medium' ? '#f59e0b' : '#6b7280' }}
            onClick={() => onCardClick(deal.companySlug)}
        >
            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm leading-tight truncate">{deal.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Building2 className="h-3 w-3 shrink-0" />
                            <span className="truncate">{deal.company}</span>
                        </p>
                    </div>
                    <div className="relative shrink-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowMoveMenu(!showMoveMenu);
                            }}
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        {showMoveMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowMoveMenu(false);
                                    }}
                                />
                                <div className="absolute right-0 top-8 z-50 min-w-[160px] rounded-lg border bg-card p-1 shadow-lg">
                                    <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{t("moveTo")}</p>
                                    {columns
                                        .filter((col) => col.id !== deal.stage)
                                        .map((col) => (
                                            <button
                                                key={col.id}
                                                className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted transition-colors cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onMoveToStage(deal.id, col.id);
                                                    setShowMoveMenu(false);
                                                }}
                                            >
                                                {col.title}
                                            </button>
                                        ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <Badge variant={priorityLabels[deal.priority].variant} className="text-xs">
                        {t(priorityLabels[deal.priority].labelKey)}
                    </Badge>
                    <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {formatCurrency(deal.value)}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

function PipelineColumn({ column, deals, onMoveToStage, columns, onCardClick }) {
    const { t, language } = useLanguage();
    const columnDeals = deals.filter((deal) => deal.stage === column.id);
    const totalValue = columnDeals.reduce((sum, deal) => sum + deal.value, 0);

    return (
        <div className="flex flex-col min-w-[300px] w-[300px]">
            <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-muted/30">
                <div className={cn("w-3 h-3 rounded-full", column.color)} />
                <h3 className="font-semibold flex-1">{column.title}</h3>
                <Badge variant="secondary">{columnDeals.length}</Badge>
            </div>
            <div className="flex-1 space-y-3 min-h-[400px]">
                {columnDeals.map((deal) => (
                    <DealCard
                        key={deal.id}
                        deal={deal}
                        onMoveToStage={onMoveToStage}
                        columns={columns}
                        onCardClick={onCardClick}
                    />
                ))}
                {columnDeals.length === 0 && (
                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">{t("noDeals")}</p>
                    </div>
                )}
            </div>
            <div className="mt-3 p-2 rounded-lg bg-muted/30 text-center">
                <span className="text-sm text-muted-foreground">{t("total")}: </span>
                <span className="text-sm font-semibold">{formatCurrency(totalValue, language)}</span>
            </div>
        </div>
    );
}

export function Pipeline() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [deals, setDeals] = useState(initialDeals);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newDeal, setNewDeal] = useState({
        title: "",
        companySlug: "",
        value: "",
        priority: "medium",
    });

    const columns = [
        { id: "new", title: t("newDeal"), color: "bg-slate-500" },
        { id: "negotiating", title: t("negotiating"), color: "bg-blue-500" },
        { id: "proposal", title: t("proposalSent"), color: "bg-amber-500" },
        { id: "won", title: t("won"), color: "bg-emerald-500" },
        { id: "lost", title: t("lost"), color: "bg-red-500" },
    ];

    const handleMoveToStage = (dealId, newStage) => {
        setDeals(
            deals.map((deal) =>
                deal.id === dealId ? { ...deal, stage: newStage } : deal
            )
        );
    };

    const handleCardClick = (companySlug) => {
        navigate(`/sirket/${companySlug}`);
    };

    const handleAddDeal = () => {
        if (newDeal.title && newDeal.companySlug && newDeal.value) {
            const selectedCompany = companyOptions.find(c => c.slug === newDeal.companySlug);
            const newDealObj = {
                id: deals.length + 1,
                title: newDeal.title,
                company: selectedCompany?.name || "",
                companySlug: newDeal.companySlug,
                value: parseInt(newDeal.value),
                stage: "new",
                priority: newDeal.priority,
            };
            setDeals([...deals, newDealObj]);
            setNewDeal({ title: "", companySlug: "", value: "", priority: "medium" });
            setIsDialogOpen(false);
        }
    };

    const totalPipeline = deals
        .filter((d) => !["won", "lost"].includes(d.stage))
        .reduce((sum, deal) => sum + deal.value, 0);

    const wonValue = deals
        .filter((d) => d.stage === "won")
        .reduce((sum, deal) => sum + deal.value, 0);

    const conversionRate = Math.round((deals.filter(d => d.stage === "won").length / deals.length) * 100);

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-text">
                        {t("pipelineTitle")}
                    </h1>
                    <p className="text-muted-foreground">
                        {t("pipelineSubtitle")}
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto">
                            <Plus className="h-4 w-4" />
                            {t("newOpportunity")}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>{t("addNewOpportunity")}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="deal-title">{t("opportunityName")}</Label>
                                <Input
                                    id="deal-title"
                                    placeholder={t("opportunityName")}
                                    value={newDeal.title}
                                    onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>{t("company")}</Label>
                                <CompanySearch
                                    value={newDeal.companySlug}
                                    onChange={(slug) => setNewDeal({ ...newDeal, companySlug: slug })}
                                    companies={companyOptions}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="deal-value">{t("value")}</Label>
                                <Input
                                    id="deal-value"
                                    type="number"
                                    placeholder="150000"
                                    value={newDeal.value}
                                    onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="deal-priority">{t("priority")}</Label>
                                <select
                                    id="deal-priority"
                                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    value={newDeal.priority}
                                    onChange={(e) => setNewDeal({ ...newDeal, priority: e.target.value })}
                                >
                                    <option value="low">{t("low")}</option>
                                    <option value="medium">{t("medium")}</option>
                                    <option value="high">{t("high")}</option>
                                </select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                {t("cancel")}
                            </Button>
                            <Button onClick={handleAddDeal}>{t("add")}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                <Card className="animate-fade-in overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
                    <CardContent className="p-5 relative">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg animate-gradient">
                                <Target className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{t("activePipeline")}</p>
                                <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    {formatCurrency(totalPipeline)}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="animate-fade-in overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
                    <CardContent className="p-5 relative">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
                                <Trophy className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{t("wonDeals")}</p>
                                <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    {formatCurrency(wonValue)}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="animate-fade-in overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
                    <CardContent className="p-5 relative">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{t("conversionRate")}</p>
                                <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                    %{conversionRate}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Kanban Board */}
            <Card className="overflow-hidden">
                <CardHeader className="border-b bg-muted/30">
                    <CardTitle className="text-lg">{t("kanbanView")}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="overflow-x-auto pb-4">
                        <div className="flex gap-4 min-w-max">
                            {columns.map((column) => (
                                <PipelineColumn
                                    key={column.id}
                                    column={column}
                                    deals={deals}
                                    onMoveToStage={handleMoveToStage}
                                    columns={columns}
                                    onCardClick={handleCardClick}
                                />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
