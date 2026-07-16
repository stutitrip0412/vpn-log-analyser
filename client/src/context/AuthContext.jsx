import { createContext, useState, useEffect } from "react";
import {
    loginUser,
    logoutUser,
    getCurrentUser,
} from "../services/auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (credentials) => {
        await loginUser(credentials);
        await checkAuth();
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    const checkAuth = async () => {
        try {
            const data = await getCurrentUser();
            setUser(data.user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};