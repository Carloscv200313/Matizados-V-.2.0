"use client"
import { createContext } from "react";

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

interface DataProductosContextType {
    productos: Carrito[] | null;
    setProductos: (productos: Carrito[] | null) => void;
}

export const DataProductos = createContext<DataProductosContextType>({
    productos: null,
    setProductos: () => {},
});
