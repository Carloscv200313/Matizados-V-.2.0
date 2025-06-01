"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categories = [
  {
    name: "Para decoraciones",
    subcategories: ["Interiores", "Exteriores", "Efectos decorativos", "Impermeabilizantes"],
    href: "/categoria/decoraciones",
  },
  {
    name: "Para Vehículos",
    subcategories: ["Automotriz", "Motos", "Acabados especiales", "Anticorrosivos"],
    href: "/categoria/vehiculos",
  },
  {
    name: "Para madera",
    subcategories: ["Barnices", "Lacas", "Tintes", "Selladores"],
    href: "/categoria/madera",
  },
  {
    name: "Para industrial",
    subcategories: ["Epóxicos", "Anticorrosivos", "Alta temperatura", "Pisos industriales"],
    href: "/categoria/industrial",
  },
]

export function CategoryMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-[#161a1e] border-b border-gray-800">
      <div className="container flex items-center h-12 px-4 md:px-6 overflow-x-auto">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-full rounded-none px-4 flex items-center gap-2 text-white hover:bg-gray-800"
            >
              <span className="sr-only md:not-sr-only md:inline-flex">Todas las categorías</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-[#0f1114] text-white border-gray-800">
            {categories.map((category, index) => (
              <DropdownMenuItem key={index} asChild className="hover:bg-gray-800 focus:bg-gray-800">
                <Link href={category.href} className="flex items-center justify-between">
                  {category.name}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-4 overflow-x-auto px-2">
          <Link href="/ofertas" className="whitespace-nowrap text-sm font-medium text-white hover:text-gray-300">
            Ofertas
          </Link>
          <Link href="/nuevos" className="whitespace-nowrap text-sm font-medium text-white hover:text-gray-300">
            Nuevos Productos
          </Link>
          <Link href="/servicios" className="whitespace-nowrap text-sm font-medium text-white hover:text-gray-300">
            Servicios de Matizado
          </Link>
          <Link href="/marcas" className="whitespace-nowrap text-sm font-medium text-white hover:text-gray-300">
            Marcas
          </Link>
        </div>
      </div>
    </div>
  )
}
