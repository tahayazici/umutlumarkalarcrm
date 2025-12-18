import { useState } from "react";
import { useData } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";
import {
    Search,
    Plus,
    MoreHorizontal,
    Building2,
    User,
    Mail,
    Phone,
    Filter,
    ArrowUpDown,
    Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const statusLabels = {
    active: { labelKey: "active", variant: "success" },
    inactive: { labelKey: "inactive", variant: "secondary" },
    lead: { labelKey: "lead", variant: "warning" },
};

export function Customers() {
    const navigate = useNavigate();
    const { customers } = useData();
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || customer.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleCustomerClick = (id) => {
        navigate(`/sirket/${id}`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {t("customersTitle")}
                    </h1>
                    <p className="text-muted-foreground">
                        {t("customersSubtitle")}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => alert(t("export") + " " + t("actionSuccessful"))}>
                        <Download className="w-4 h-4 mr-2" />
                        {t("export")}
                    </Button>
                    <Button size="sm" onClick={() => alert(t("newCustomer") + " " + t("actionSuccessful"))}>
                        <Plus className="w-4 h-4 mr-2" />
                        {t("newCustomer")}
                    </Button>
                </div>
            </div>

            {/* Filters & Actions */}
            <Card className="border shadow-sm">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder={t("searchPlaceholderCustomers")}
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                        <Button
                            variant={statusFilter === "all" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setStatusFilter("all")}
                        >
                            {t("all")}
                        </Button>
                        <Button
                            variant={statusFilter === "active" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setStatusFilter("active")}
                        >
                            {t("active")}
                        </Button>
                        <Button
                            variant={statusFilter === "lead" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setStatusFilter("lead")}
                        >
                            {t("lead")}
                        </Button>
                        <Button
                            variant={statusFilter === "inactive" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setStatusFilter("inactive")}
                        >
                            {t("inactive")}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Customers Table/Grid */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                        <Card
                            key={customer.id}
                            className="hover:shadow-md transition-all cursor-pointer group"
                            onClick={() => handleCustomerClick(customer.id)}
                        >
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <Badge variant={statusLabels[customer.status]?.variant || "outline"}>
                                        {t(statusLabels[customer.status]?.labelKey) || customer.status}
                                    </Badge>
                                </div>
                                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                                    {customer.company}
                                </h3>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>{customer.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        <span className="truncate">{customer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        <span>{customer.phone}</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t flex justify-end">
                                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                                        {t("viewDetails")}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl bg-muted/30">
                        <Search className="w-10 h-10 mx-auto mb-4 text-muted-foreground opacity-20" />
                        <h3 className="font-medium text-lg">{t("noCustomersFound")}</h3>
                        <p className="text-muted-foreground">{t("tryDifferentSearch")}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
