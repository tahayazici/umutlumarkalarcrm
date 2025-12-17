import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

// --- INITIAL MOCK DATA ---

const MOCK_CUSTOMERS = [
    { id: "c1", name: "Mehmet Yılmaz", company: "ABC Teknoloji A.Ş.", email: "mehmet@abctech.com", status: "active", phone: "+90 532 111 22 33" },
    { id: "c2", name: "Ayşe Kara", company: "XYZ Danışmanlık", email: "ayse@xyz.com", status: "active", phone: "+90 533 222 33 44" },
    { id: "c3", name: "Ali Demir", company: "Metro Grup", email: "ali@metrogrup.com", status: "inactive", phone: "+90 534 333 44 55" },
    { id: "c4", name: "Zeynep Öztürk", company: "DEF Holding", email: "zeynep@defholding.com", status: "lead", phone: "+90 535 444 55 66" },
];

const MOCK_TASKS = [
    { id: "t1", title: "Web sitesi tasarımı", description: "Ana sayfa mockup çizimi yapılacak", assignee: "u1", dueDate: "2024-12-25", priority: "high", status: "todo", customerId: "c1" },
    { id: "t2", title: "Müşteri toplantısı", description: "Proje detayları görüşülecek", assignee: "u1", dueDate: "2024-12-20", priority: "medium", status: "in_progress", customerId: "c2" },
    { id: "t3", title: "Fatura kesimi", description: "Aralık ayı faturası", assignee: "u2", dueDate: "2024-12-18", priority: "low", status: "done", customerId: "c1" },
    { id: "t4", title: "Teklif hazırlığı", description: "Yeni proje için teklif taslağı", assignee: "u1", dueDate: "2024-12-22", priority: "high", status: "todo", customerId: "c4" },
];

const MOCK_ACTIVITIES = [
    { id: "a1", type: "call", customerId: "c1", note: "Proje revizyonları konuşuldu", date: "2024-12-15T10:00:00" },
    { id: "a2", type: "email", customerId: "c1", note: "Sözleşme taslağı gönderildi", date: "2024-12-14T14:30:00" },
    { id: "a3", type: "meeting", customerId: "c2", note: "Ofis ziyareti yapıldı", date: "2024-12-13T11:00:00" },
];

export function DataProvider({ children }) {
    const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
    const [tasks, setTasks] = useState(MOCK_TASKS);
    const [activities, setActivities] = useState(MOCK_ACTIVITIES);

    // --- TASK ACTIONS ---
    const addTask = (task) => {
        const newTask = { ...task, id: Math.random().toString(36).substr(2, 9), status: 'todo' };
        setTasks([...tasks, newTask]);
    };

    const updateTask = (id, updates) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    // --- ACTIVITY ACTIONS ---
    const addActivity = (activity) => {
        const newActivity = { ...activity, id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString() };
        setActivities([newActivity, ...activities]);
    };

    // --- CUSTOMER ACTIONS ---
    const addCustomer = (customer) => {
        const newCustomer = { ...customer, id: Math.random().toString(36).substr(2, 9), status: 'lead' };
        setCustomers([...customers, newCustomer]);
    };

    const value = {
        customers,
        tasks,
        activities,
        addTask,
        updateTask,
        deleteTask,
        addActivity,
        addCustomer,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
