"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categories = [
  {
    name: "Electrónica",
    subcategories: ["Smartphones", "Portátiles", "Audio", "Accesorios"],
  },
  {
    name: "Hogar",
    subcategories: ["Cocina", "Decoración", "Muebles", "Electrodomésticos"],
  },
  {
    name: "Moda",
    subcategories: ["Hombre", "Mujer", "Niños", "Accesorios"],
  },
  {
    name: "Belleza",
    subcategories: ["Maquillaje", "Cuidado personal", "Perfumes", "Cabello"],
  },
  {
    name: "Deportes",
    subcategories: ["Fitness", "Ropa deportiva", "Calzado", "Equipamiento"],
  },
  {
    name: "Juguetes",
    subcategories: ["Educativos", "Muñecas", "Vehículos", "Juegos de mesa"],
  },
]

export function CategoryBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b bg-muted/20">
      <div className="container flex items-center h-12 px-4 md:px-6 overflow-x-auto">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-full rounded-none px-4 flex items-center gap-2">
              <span className="sr-only md:not-sr-only md:inline-flex">Todas las categorías</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {categories.map((category, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link href={`/categoria/${category.name.toLowerCase()}`} className="flex items-center justify-between">
                  {category.name}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-4 overflow-x-auto px-2">
          <Link href="/ofertas" className="whitespace-nowrap text-sm font-medium">
            Packs de ofertas
          </Link>
          <Link href="/super-ofertas" className="whitespace-nowrap text-sm font-medium">
            SuperOfertas
          </Link>
          <Link href="/nuevos" className="whitespace-nowrap text-sm font-medium">
            Recién llegados
          </Link>
          <Link href="/tendencias" className="whitespace-nowrap text-sm font-medium">
            Tendencias
          </Link>
          <Link href="/marcas" className="whitespace-nowrap text-sm font-medium">
            Marcas populares
          </Link>
        </div>
      </div>
    </div>
  )
}
