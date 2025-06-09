"use client"
import { DataUser } from "@/Context/Context.User";
import { useContext, useState, useEffect } from "react";

interface User {
    ID_USUARIO: number;
    NOMBRE_USUARIO: string;
    CORREO_USUARIO: string;
    DNI_USUARIO: string;
    TELEFONO_USUARIO: string;
    DEPARTAMENTO: string;
    DIRECCION_DETALLE: string;
    DISTRITO: string;
    CODIGO_POSTAL: string;
}

export const useDataUser = () => {
    const context = useContext(DataUser);
    if (!context) {
        throw new Error("useDataUser debe ser usado con un DataProvider");
    }
    return context;
};

export const DataUserProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Esto solo se ejecuta en el cliente después de la hidratación
        const savedUser = localStorage.getItem("user");
        setUser(savedUser ? JSON.parse(savedUser) : null);
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized && user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user, isInitialized]);

    return (
        <DataUser.Provider
            value={{
                user,
                setUser,
                isInitialized // Opcional: puedes exponer esto si otros componentes lo necesitan
            }}
        >
            {children}
        </DataUser.Provider>
    );
};