import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const ROLES = {
    ADMIN: "admin",
    USER: "user",
};

const initialUser = {
    id: "u1",
    name: "Demo Admin",
    email: "admin@antigravity.com",
    role: ROLES.ADMIN, // Can be toggled to ROLES.USER
    avatar: "https://ui-avatars.com/api/?name=Demo+Admin&background=0D8ABC&color=fff",
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking auth state
        const loadUser = async () => {
            await new Promise(resolve => setTimeout(resolve, 500)); // Fake latency
            const savedUser = localStorage.getItem("auth_user");
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            } else {
                // Auto-login for demo purposes
                setUser(initialUser);
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = (role = ROLES.ADMIN) => {
        const newUser = { ...initialUser, role };
        setUser(newUser);
        localStorage.setItem("auth_user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("auth_user");
    };

    const hasPermission = (permission) => {
        if (!user) return false;
        if (user.role === ROLES.ADMIN) return true;

        // Define standard user permissions here
        const userPermissions = ["view_tasks", "edit_own_tasks", "view_customers"];
        return userPermissions.includes(permission);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, hasPermission, ROLES }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
