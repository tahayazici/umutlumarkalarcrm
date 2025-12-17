import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Plus,
    Filter,
    MoreHorizontal,
    Mail,
    Phone,
    Building2,
    ChevronRight,
    Eye,
    Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const initialCustomers = [
    {
        id: 1,
        name: "Mehmet Yılmaz",
        company: "ABC Teknoloji A.Ş.",
        slug: "abc-teknoloji",
        email: "mehmet@abctech.com",
        phone: "+90 532 111 22 33",
        status: "active",
        lastContact: "2024-12-15",
    },
    {
        id: 2,
        name: "Ayşe Kara",
        company: "XYZ Danışmanlık",
        slug: "xyz-danismanlik",
        email: "ayse@xyz.com",
        phone: "+90 533 222 33 44",
        status: "active",
        lastContact: "2024-12-12",
    },
    {
        id: 3,
        name: "Ali Demir",
        company: "Metro Grup",
        slug: "metro-grup",
        email: "ali@metrogrup.com",
        phone: "+90 534 333 44 55",
        status: "inactive",
        lastContact: "2024-11-28",
    },
    {
        id: 4,
        name: "Zeynep Öztürk",
        company: "DEF Holding",
        slug: "def-holding",
        email: "zeynep@defholding.com",
        phone: "+90 535 444 55 66",
        status: "active",
        lastContact: "2024-12-10",
    },
    {
        id: 5,
        name: "Can Aydın",
        company: "GHI Yazılım",
        slug: "ghi-yazilim",
        email: "can@ghiyazilim.com",
        phone: "+90 536 555 66 77",
        status: "lead",
        lastContact: "2024-12-08",
    },
    {
        id: 6,
        name: "Selin Arslan",
        company: "JKL Medya",
        slug: "jkl-medya",
        email: "selin@jklmedya.com",
        phone: "+90 537 666 77 88",
        status: "active",
        lastContact: "2024-12-14",
    },
    {
        id: 7,
        name: "Emre Çelik",
        company: "MNO Lojistik",
        slug: "mno-lojistik",
        email: "emre@mnolojistik.com",
        phone: "+90 538 777 88 99",
        status: "inactive",
        lastContact: "2024-10-20",
    },
    {
        id: 8,
        name: "Gizem Şahin",
        company: "PQR Finansal",
        slug: "pqr-finansal",
        email: "gizem@pqrfinansal.com",
        phone: "+90 539 888 99 00",
        status: "lead",
        lastContact: "2024-12-16",
    },
];

const statusLabels = {
    active: { label: "Aktif", variant: "success" },
    inactive: { label: "Pasif", variant: "secondary" },
    lead: { label: "Potansiyel", variant: "warning" },
};

export function Customers() {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [customers, setCustomers] = useState(initialCustomers);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        status: "lead",
    });

    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            filterStatus === "all" || customer.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleAddCustomer = () => {
        if (newCustomer.name && newCustomer.company && newCustomer.email) {
            setCustomers([
                ...customers,
                {
                    ...newCustomer,
                    id: customers.length + 1,
                    lastContact: new Date().toISOString().split("T")[0],
                },
            ]);
            setNewCustomer({
                name: "",
                company: "",
                email: "",
                phone: "",
                status: "lead",
            });
            setIsDialogOpen(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-text">{t("customersTitle")}</h1>
                    <p className="text-muted-foreground">
                        {t("customersSubtitle")}
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto">
                            <Plus className="h-4 w-4" />
                            {t("addCustomer")}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t("addNewCustomer")}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">{t("fullName")}</Label>
                                <Input
                                    id="name"
                                    placeholder={t("fullName")}
                                    value={newCustomer.name}
                                    onChange={(e) =>
                                        setNewCustomer({ ...newCustomer, name: e.target.value })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="company">{t("company")}</Label>
                                <Input
                                    id="company"
                                    placeholder={t("companyName")}
                                    value={newCustomer.company}
                                    onChange={(e) =>
                                        setNewCustomer({ ...newCustomer, company: e.target.value })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">{t("email")}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="ornek@sirket.com"
                                    value={newCustomer.email}
                                    onChange={(e) =>
                                        setNewCustomer({ ...newCustomer, email: e.target.value })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">{t("phone")}</Label>
                                <Input
                                    id="phone"
                                    placeholder="+90 5XX XXX XX XX"
                                    value={newCustomer.phone}
                                    onChange={(e) =>
                                        setNewCustomer({ ...newCustomer, phone: e.target.value })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status">{t("status")}</Label>
                                <select
                                    id="status"
                                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={newCustomer.status}
                                    onChange={(e) =>
                                        setNewCustomer({ ...newCustomer, status: e.target.value })
                                    }
                                >
                                    <option value="lead">{t("potential")}</option>
                                    <option value="active">{t("active")}</option>
                                    <option value="inactive">{t("inactive")}</option>
                                </select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                {t("cancel")}
                            </Button>
                            <Button onClick={handleAddCustomer}>{t("add")}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <Card className="animate-fade-in">
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="İsim, şirket veya e-posta ile ara..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                            <Button
                                variant={filterStatus === "all" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterStatus("all")}
                            >
                                {t("all")}
                            </Button>
                            <Button
                                variant={filterStatus === "active" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterStatus("active")}
                            >
                                {t("active")}
                            </Button>
                            <Button
                                variant={filterStatus === "lead" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterStatus("lead")}
                            >
                                {t("potential")}
                            </Button>
                            <Button
                                variant={filterStatus === "inactive" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterStatus("inactive")}
                            >
                                {t("inactive")}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Customer Table */}
            <Card className="animate-fade-in">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="text-left p-4 font-medium text-muted-foreground">
                                        {t("customerName")}
                                    </th>
                                    <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">
                                        {t("email")}
                                    </th>
                                    <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">
                                        {t("phone")}
                                    </th>
                                    <th className="text-left p-4 font-medium text-muted-foreground">
                                        {t("status")}
                                    </th>
                                    <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">
                                        {t("lastContact")}
                                    </th>
                                    <th className="text-right p-4 font-medium text-muted-foreground">
                                        {t("actions")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="border-b hover:bg-muted/30 transition-colors duration-200 cursor-pointer group"
                                        onClick={() => navigate(`/sirket/${customer.slug}`)}
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-medium">
                                                    {customer.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{customer.name}</p>
                                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                        <Building2 className="h-3 w-3" />
                                                        {customer.company}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 hidden md:table-cell">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                {customer.email}
                                            </div>
                                        </td>
                                        <td className="p-4 hidden lg:table-cell">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                {customer.phone}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant={statusLabels[customer.status].variant}>
                                                {statusLabels[customer.status].label}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">
                                            {formatDate(customer.lastContact, language)}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="relative inline-block">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveMenu(activeMenu === customer.id ? null : customer.id);
                                                    }}
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                                {activeMenu === customer.id && (
                                                    <>
                                                        <div
                                                            className="fixed inset-0 z-40"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveMenu(null);
                                                            }}
                                                        />
                                                        <div className="absolute right-0 top-10 z-50 min-w-[160px] rounded-lg border bg-card p-1 shadow-lg animate-fade-in">
                                                            <button
                                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-muted transition-colors cursor-pointer"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    navigate(`/sirket/${customer.slug}`);
                                                                    setActiveMenu(null);
                                                                }}
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                {t("viewProfile")}
                                                            </button>
                                                            <button
                                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-muted transition-colors cursor-pointer"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    window.location.href = `mailto:${customer.email}`;
                                                                    setActiveMenu(null);
                                                                }}
                                                            >
                                                                <Mail className="h-4 w-4" />
                                                                {t("sendEmail")}
                                                            </button>
                                                            <button
                                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-muted transition-colors cursor-pointer"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    window.location.href = `tel:${customer.phone}`;
                                                                    setActiveMenu(null);
                                                                }}
                                                            >
                                                                <Phone className="h-4 w-4" />
                                                                {t("call")}
                                                            </button>
                                                            <div className="my-1 border-t" />
                                                            <button
                                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-muted text-destructive transition-colors cursor-pointer"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setCustomers(customers.filter(c => c.id !== customer.id));
                                                                    setActiveMenu(null);
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                {t("delete")}
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredCustomers.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">
                            {t("noCustomersFound")}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
