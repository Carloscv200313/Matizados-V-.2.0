"use client"

import Link from "next/link"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ColorPalette() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState("decoraciones")

  const colorCategories = {
    decoraciones: [
      { name: "Blanco Nube", hex: "#F5F5F5" },
      { name: "Beige Arena", hex: "#E8DCCA" },
      { name: "Gris Perla", hex: "#CECECE" },
      { name: "Azul Cielo", hex: "#A5D8FF" },
      { name: "Verde Menta", hex: "#A5E1AD" },
      { name: "Amarillo Pastel", hex: "#FFF3B0" },
      { name: "Rosa Pálido", hex: "#FFD1DC" },
      { name: "Lavanda", hex: "#E6E6FA" },
    ],
    vehiculos: [
      { name: "Negro Onix", hex: "#0A0A0A" },
      { name: "Blanco Perlado", hex: "#F8F8FF" },
      { name: "Rojo Fuego", hex: "#CC0000" },
      { name: "Azul Metálico", hex: "#0047AB" },
      { name: "Plata Brillante", hex: "#C0C0C0" },
      { name: "Verde Racing", hex: "#004225" },
      { name: "Naranja Deportivo", hex: "#FF5F1F" },
      { name: "Gris Titanio", hex: "#6A6A6A" },
    ],
    madera: [
      { name: "Caoba", hex: "#8B4513" },
      { name: "Nogal", hex: "#654321" },
      { name: "Roble Claro", hex: "#D2B48C" },
      { name: "Cerezo", hex: "#9A3324" },
      { name: "Pino", hex: "#DEB887" },
      { name: "Ébano", hex: "#3D2B1F" },
      { name: "Teca", hex: "#C19A6B" },
      { name: "Arce", hex: "#E8D0A9" },
    ],
    industrial: [
      { name: "Gris Industrial", hex: "#71797E" },
      { name: "Amarillo Seguridad", hex: "#FFCC00" },
      { name: "Rojo Señalización", hex: "#FF0000" },
      { name: "Azul Maquinaria", hex: "#0074D9" },
      { name: "Verde Equipo", hex: "#2ECC40" },
      { name: "Negro Mate", hex: "#1E1E1E" },
      { name: "Blanco Equipamiento", hex: "#F8F8F8" },
      { name: "Naranja Advertencia", hex: "#FF851B" },
    ],
  }

  return (
    <section className=" py-12 bg-gradient-to-b from-background to-muted/50">
      <div className="flex flex-col px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Explora Nuestra Paleta de Colores</h2>
          <p className="text-muted-foreground">Encuentra la tonalidad perfecta para tu proyecto</p>
        </div>

        <Tabs defaultValue="decoraciones" className="w-full" onValueChange={setSelectedCategory}>
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="decoraciones">Decoraciones</TabsTrigger>
              <TabsTrigger value="vehiculos">Vehículos</TabsTrigger>
              <TabsTrigger value="madera">Madera</TabsTrigger>
              <TabsTrigger value="industrial">Industrial</TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(colorCategories).map(([category, colors]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                {colors.map((color, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-full aspect-square rounded-lg shadow-md border border-gray-200 mb-2"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm font-medium">{color.name}</span>
                    <span className="text-xs text-muted-foreground">{color.hex}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button asChild>
                  <Link href={`/colores/${category}`}>Ver todos los colores</Link>
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
