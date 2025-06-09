"use client"
import { DataProductos } from "@/Context/Context.Carrito";
import { useContext, useState, useEffect } from "react";
interface Color{
    CODIGO_COLOR: string;
    NOMBRE_COLOR: string;
    ID_COLOR: number;
    STOCK: number;
}

interface Carrito {
    id:number;
    nombre: string;
    precio: number;
    cantidad: number;
    color : Color;

}
export const useDataProductos = () => {
    const context = useContext(DataProductos);
    if (!context) {
        throw new Error("useDataProductos debe ser usado con un DataProvider");
    }
    return context;
};

export const DataProductosProvider = ({ children }: React.PropsWithChildren) => {
    const [productos, setProductos] = useState<Carrito[] | null>(null);

    useEffect(() => {
        const savedProductos = localStorage.getItem("carrito");
        setProductos(savedProductos ? JSON.parse(savedProductos) : null);
    }, []);

    useEffect(() => {
        if (productos) {
            localStorage.setItem("carrito", JSON.stringify(productos));
        }
    }, [productos]);

    return (
        <DataProductos.Provider
            value={{
                productos,
                setProductos
            }}
        >
            {children}
        </DataProductos.Provider>
    );
};