import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const translations = {
    tr: {
        // Navigation
        home: "Anasayfa",
        customers: "Müşteriler",
        opportunities: "Fırsatlar",
        settings: "Ayarlar",

        // Header
        searchPlaceholder: "Müşteri veya fırsat ara...",
        notifications: "Bildirimler",
        viewAllNotifications: "Tüm bildirimleri gör",
        logout: "Çıkış Yap",
        darkMode: "Koyu Mod",
        lightMode: "Açık Mod",

        // Dashboard
        dashboardTitle: "Anasayfa",
        dashboardSubtitle: "İşletmenizin genel durumuna göz atın",
        totalRevenue: "Toplam Ciro",
        activeCustomers: "Aktif Müşteriler",
        pendingTasks: "Bekleyen İşler",
        completedProjects: "Tamamlanan Projeler",
        monthlySalesPerformance: "Aylık Satış Performansı",
        recentActivities: "Son Hareketler",
        won: "Kazanıldı",
        proposal: "Teklif",
        customer: "Müşteri",
        meeting: "Toplantı",

        // Customers
        customersTitle: "Müşteriler",
        customersSubtitle: "Müşteri veritabanınızı yönetin",
        addCustomer: "Müşteri Ekle",
        searchCustomers: "Müşteri ara...",
        all: "Tümü",
        active: "Aktif",
        potential: "Potansiyel",
        inactive: "Pasif",
        customerName: "Müşteri",
        email: "E-posta",
        phone: "Telefon",
        status: "Durum",
        lastContact: "Son İletişim",
        actions: "İşlemler",
        noCustomersFound: "Arama kriterlerine uygun müşteri bulunamadı.",
        viewProfile: "Profili Gör",
        sendEmail: "E-posta Gönder",
        call: "Ara",
        delete: "Sil",
        addNewCustomer: "Yeni Müşteri Ekle",
        fullName: "Ad Soyad",
        companyName: "Şirket Adı",
        cancel: "İptal",
        add: "Ekle",

        // Pipeline
        pipelineTitle: "Satış Pipeline",
        pipelineSubtitle: "Fırsatları yönetin ve satış sürecinizi takip edin",
        newOpportunity: "Yeni Fırsat",
        activePipeline: "Aktif Pipeline",
        wonDeals: "Kazanılan",
        conversionRate: "Dönüşüm Oranı",
        kanbanView: "Kanban Görünümü",
        newDeal: "Yeni Fırsat",
        negotiating: "Görüşülüyor",
        proposalSent: "Teklif Gönderildi",
        lost: "Kaybedildi",
        noDeals: "Fırsat yok",
        total: "Toplam",
        moveTo: "Taşı:",
        addNewOpportunity: "Yeni Fırsat Ekle",
        opportunityName: "Fırsat Adı",
        company: "Şirket",
        selectCompany: "Şirket seçin...",
        searchCompany: "Şirket ara...",
        companyNotFound: "Şirket bulunamadı",
        noMatchFor: "için eşleşme yok",
        value: "Değer (₺)",
        priority: "Öncelik",
        low: "Düşük",
        medium: "Orta",
        high: "Yüksek",
        pieces: "Adet",

        // Settings
        settingsTitle: "Ayarlar",
        settingsSubtitle: "Hesap ve uygulama ayarlarınızı yönetin",
        profileInfo: "Profil Bilgileri",
        profileInfoDesc: "Kişisel bilgilerinizi güncelleyin",
        changePhoto: "Fotoğraf Değiştir",
        saveChanges: "Değişiklikleri Kaydet",
        role: "Rol",
        notificationSettings: "Bildirim Ayarları",
        notificationSettingsDesc: "Bildirim tercihlerinizi yönetin",
        emailNotifications: "E-posta Bildirimleri",
        emailNotificationsDesc: "Önemli güncellemeler için e-posta alın",
        pushNotifications: "Anlık Bildirimler",
        pushNotificationsDesc: "Tarayıcı bildirimleri alın",
        dealUpdates: "Fırsat Güncellemeleri",
        dealUpdatesDesc: "Fırsatlarınızdaki değişikliklerden haberdar olun",
        customerActivities: "Müşteri Aktiviteleri",
        customerActivitiesDesc: "Müşterilerinizin hareketlerini takip edin",
        weeklyReport: "Haftalık Rapor",
        weeklyReportDesc: "Haftalık özet raporu alın",
        monthlyDigest: "Aylık Özet",
        monthlyDigestDesc: "Aylık performans özetini alın",
        security: "Güvenlik",
        securityDesc: "Hesap güvenliği ayarlarınız",
        changePassword: "Şifre Değiştir",
        lastPasswordChange: "Son değişiklik: 3 ay önce",
        change: "Değiştir",
        twoFactorAuth: "İki Faktörlü Doğrulama",
        twoFactorAuthDesc: "Hesabınıza ekstra güvenlik katmanı ekleyin",
        enable: "Etkinleştir",

        // Company Detail
        companyNotFound: "Şirket bulunamadı",
        companyNotFoundDesc: "Bu şirket mevcut değil veya silinmiş olabilir.",
        goBack: "Geri Dön",
        edit: "Düzenle",
        contactPerson: "İletişim",
        totalIncome: "Toplam Gelir",
        activeOpportunities: "Aktif Fırsatlar",
        wonCount: "Kazanılan",
        activity: "Aktivite",
        contactInfo: "İletişim Bilgileri",
        opportunities: "Fırsatlar",
        recentActivitiesTitle: "Son Aktiviteler",

        // Search
        noResults: "Sonuç bulunamadı",
        noMatchForQuery: "için eşleşme yok",
        deal: "Fırsat",

        // Months
        jan: "Oca", feb: "Şub", mar: "Mar", apr: "Nis", may: "May", jun: "Haz",
        jul: "Tem", aug: "Ağu", sep: "Eyl", oct: "Eki", nov: "Kas", dec: "Ara",

        // Time
        minutesAgo: "dakika önce",
        hoursAgo: "saat önce",
        justNow: "Az önce",
        daysAgo: "gün önce",

        // Activity Messages
        activityNewCustomer: "Yeni müşteri eklendi: {company}",
        activityProposalSent: "Teklif gönderildi: {company} - {amount}",
        activityDealWon: "Fırsat kazanıldı: {company} - {amount}",
        activityMeetingScheduled: "Toplantı planlandı: {company} ile görüşme",
        activityCustomerUpdated: "Müşteri güncellendi: {company}",

        // Notifications
        notifNewCustomer: "Yeni müşteri eklendi",
        notifNewCustomerMsg: "{company} müşteri listesine eklendi",
        notifProposalApproved: "Teklif onaylandı",
        notifProposalApprovedMsg: "{company} teklifinizi onayladı",
        notifDealWon: "Fırsat kazanıldı",
        notifDealWonMsg: "{company} ile anlaşma sağlandı",

        // CompanyDetail Activities
        activityMeetingHeld: "Toplantı yapıldı",
        activityProposalEmailSent: "Teklif e-postası gönderildi",
        activityPhoneCall: "Telefon görüşmesi",
        activityDemoPresented: "Demo sunumu yapıldı",
        activityPriceNegotiation: "Fiyat görüşmesi",
        activityContractSent: "Sözleşme gönderildi",
        activityTechnicalMeeting: "Teknik analiz toplantısı",
        activityProjectDetails: "Proje detayları görüşüldü",
        activityProjectDelivered: "Proje teslim edildi",
        activityFirstMeeting: "İlk görüşme yapıldı",
        activityProjectCancelled: "Proje iptal edildi",
        activityProposalDetailsExplained: "Teklif detayları açıklandı",
        activityProjectKickoff: "Proje başlangıç toplantısı",
    },
    en: {
        // Navigation
        home: "Home",
        customers: "Customers",
        opportunities: "Opportunities",
        settings: "Settings",

        // Header
        searchPlaceholder: "Search customer or deal...",
        notifications: "Notifications",
        viewAllNotifications: "View all notifications",
        logout: "Log Out",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",

        // Dashboard
        dashboardTitle: "Dashboard",
        dashboardSubtitle: "Overview of your business performance",
        totalRevenue: "Total Revenue",
        activeCustomers: "Active Customers",
        pendingTasks: "Pending Tasks",
        completedProjects: "Completed Projects",
        monthlySalesPerformance: "Monthly Sales Performance",
        recentActivities: "Recent Activities",
        won: "Won",
        proposal: "Proposal",
        customer: "Customer",
        meeting: "Meeting",

        // Customers
        customersTitle: "Customers",
        customersSubtitle: "Manage your customer database",
        addCustomer: "Add Customer",
        searchCustomers: "Search customers...",
        all: "All",
        active: "Active",
        potential: "Lead",
        inactive: "Inactive",
        customerName: "Customer",
        email: "Email",
        phone: "Phone",
        status: "Status",
        lastContact: "Last Contact",
        actions: "Actions",
        noCustomersFound: "No customers found matching your criteria.",
        viewProfile: "View Profile",
        sendEmail: "Send Email",
        call: "Call",
        delete: "Delete",
        addNewCustomer: "Add New Customer",
        fullName: "Full Name",
        companyName: "Company Name",
        cancel: "Cancel",
        add: "Add",

        // Pipeline
        pipelineTitle: "Sales Pipeline",
        pipelineSubtitle: "Manage opportunities and track your sales process",
        newOpportunity: "New Opportunity",
        activePipeline: "Active Pipeline",
        wonDeals: "Won Deals",
        conversionRate: "Conversion Rate",
        kanbanView: "Kanban View",
        newDeal: "New Deal",
        negotiating: "Negotiating",
        proposalSent: "Proposal Sent",
        lost: "Lost",
        noDeals: "No deals",
        total: "Total",
        moveTo: "Move to:",
        addNewOpportunity: "Add New Opportunity",
        opportunityName: "Opportunity Name",
        company: "Company",
        selectCompany: "Select company...",
        searchCompany: "Search company...",
        companyNotFound: "Company not found",
        noMatchFor: "No match for",
        value: "Value ($)",
        priority: "Priority",
        low: "Low",
        medium: "Medium",
        high: "High",
        pieces: "items",

        // Settings
        settingsTitle: "Settings",
        settingsSubtitle: "Manage your account and app settings",
        profileInfo: "Profile Information",
        profileInfoDesc: "Update your personal information",
        changePhoto: "Change Photo",
        saveChanges: "Save Changes",
        role: "Role",
        notificationSettings: "Notification Settings",
        notificationSettingsDesc: "Manage your notification preferences",
        emailNotifications: "Email Notifications",
        emailNotificationsDesc: "Receive emails for important updates",
        pushNotifications: "Push Notifications",
        pushNotificationsDesc: "Receive browser notifications",
        dealUpdates: "Deal Updates",
        dealUpdatesDesc: "Stay informed about changes in your deals",
        customerActivities: "Customer Activities",
        customerActivitiesDesc: "Track your customers' actions",
        weeklyReport: "Weekly Report",
        weeklyReportDesc: "Receive weekly summary report",
        monthlyDigest: "Monthly Digest",
        monthlyDigestDesc: "Receive monthly performance summary",
        security: "Security",
        securityDesc: "Your account security settings",
        changePassword: "Change Password",
        lastPasswordChange: "Last changed: 3 months ago",
        change: "Change",
        twoFactorAuth: "Two-Factor Authentication",
        twoFactorAuthDesc: "Add an extra layer of security to your account",
        enable: "Enable",

        // Company Detail
        companyNotFound: "Company not found",
        companyNotFoundDesc: "This company does not exist or has been deleted.",
        goBack: "Go Back",
        edit: "Edit",
        contactPerson: "Contact",
        totalIncome: "Total Revenue",
        activeOpportunities: "Active Opportunities",
        wonCount: "Won",
        activity: "Activity",
        contactInfo: "Contact Information",
        opportunities: "Opportunities",
        recentActivitiesTitle: "Recent Activities",

        // Search
        noResults: "No results found",
        noMatchForQuery: "No match for",
        deal: "Deal",

        // Months
        jan: "Jan", feb: "Feb", mar: "Mar", apr: "Apr", may: "May", jun: "Jun",
        jul: "Jul", aug: "Aug", sep: "Sep", oct: "Oct", nov: "Nov", dec: "Dec",

        // Time
        minutesAgo: "minutes ago",
        hoursAgo: "hours ago",
        justNow: "Just now",
        daysAgo: "days ago",

        // Activity Messages
        activityNewCustomer: "New customer added: {company}",
        activityProposalSent: "Proposal sent: {company} - {amount}",
        activityDealWon: "Deal won: {company} - {amount}",
        activityMeetingScheduled: "Meeting scheduled: with {company}",
        activityCustomerUpdated: "Customer updated: {company}",

        // Notifications
        notifNewCustomer: "New customer added",
        notifNewCustomerMsg: "{company} added to customer list",
        notifProposalApproved: "Proposal approved",
        notifProposalApprovedMsg: "{company} approved your proposal",
        notifDealWon: "Deal won",
        notifDealWonMsg: "Agreement reached with {company}",

        // CompanyDetail Activities
        activityMeetingHeld: "Meeting held",
        activityProposalEmailSent: "Proposal email sent",
        activityPhoneCall: "Phone call",
        activityDemoPresented: "Demo presented",
        activityPriceNegotiation: "Price negotiation",
        activityContractSent: "Contract sent",
        activityTechnicalMeeting: "Technical analysis meeting",
        activityProjectDetails: "Project details discussed",
        activityProjectDelivered: "Project delivered",
        activityFirstMeeting: "First meeting held",
        activityProjectCancelled: "Project cancelled",
        activityProposalDetailsExplained: "Proposal details explained",
        activityProjectKickoff: "Project kickoff meeting",
    },
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem("language");
        return saved || "tr";
    });

    useEffect(() => {
        localStorage.setItem("language", language);
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "tr" ? "en" : "tr"));
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
