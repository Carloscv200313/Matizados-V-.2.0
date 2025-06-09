"use client"
import { createContext } from "react";

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

interface DataUserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isInitialized?: boolean; // Opcional, si necesitas saber si el estado ha sido inicializado
}

export const DataUser = createContext<DataUserContextType>({
    user: null,
    setUser: () => { },
    isInitialized: false,
});
