"use client"
import { createContext } from "react";

interface User {
    ID_USUARIO: number;
    NOMBRE_USUARIO: string;
    CORREO_USUARIO: string;
    DNI_USUARIO: string;
    TELEFONO_USUARIO: string;
}

interface DataUserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const DataUser = createContext<DataUserContextType>({
    user: null,
    setUser: () => { },
});
