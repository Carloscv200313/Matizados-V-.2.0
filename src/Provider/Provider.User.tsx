"use client"
import { DataUser } from "@/Context/Context.User";
import { useContext, useState, useEffect } from "react";
interface User {
    ID_USUARIO: number;
    NOMBRE_USUARIO: string;
    CORREO_USUARIO: string;
    DNI_USUARIO: string;
    TELEFONO_USUARIO: string;
}
export const useDataUser = () => {
    const context = useContext(DataUser);
    if (!context) {
        throw new Error("useDataUser debe ser usado con un DataProvider");
    }
    return context;
};
export const DataUserProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window !== "undefined") {
            const savedUser = localStorage.getItem("user");
            return savedUser ? JSON.parse(savedUser) : null;
        }
        return null;
    });
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
        
    }, [user]);
    return (
        <DataUser.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </DataUser.Provider>
    );
};
