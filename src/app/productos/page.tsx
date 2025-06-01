import Link from "next/link"
import { ChevronRight, Filter, SlidersHorizontal, ChevronLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Datos de ejemplo para productos
const products = [
  {
    id: "1",
    name: "Pintura Sintética Proton SyntoRust Negro",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    image: "/placeholder.svg?height=300&width=300&text=Proton+SyntoRust",
    brand: "Proton",
    category: "industrial",
  },
  {
    id: "2",
    name: "Pintura Látex Premium Satinado Blanco",
    price: 24.99,
    originalPrice: 32.99,
    discount: 24,
    image: "/placeholder.svg?height=300&width=300&text=Látex+Premium",
    brand: "Saturno",
    category: "decoraciones",
  },
  {
    id: "3",
    name: "Esmalte Automotriz Azul Metálico",
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    image: "/placeholder.svg?height=300&width=300&text=Esmalte+Automotriz",
    brand: "ColorCar",
    category: "vehiculos",
  },
  {
    id: "4",
    name: "Barniz Marino Protector UV",
    price: 27.99,
    originalPrice: 36.99,
    discount: 24,
    image: "/placeholder.svg?height=300&width=300&text=Barniz+Marino",
    brand: "WoodProtect",
    category: "madera",
  },
  {
    id: "5",
    name: "Pintura Epóxica para Pisos Gris",
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    image: "/placeholder.svg?height=300&width=300&text=Epóxica+Pisos",
    brand: "IndusPaint",
    category: "industrial",
  },
  {
    id: "6",
    name: "Pintura Acrílica Interior Lavable",
    price: 22.99,
    originalPrice: 29.99,
    discount: 23,
    image: "/placeholder.svg?height=300&width=300&text=Acrílica+Interior",
    brand: "Saturno",
    category: "decoraciones",
  },
  {
    id: "7",
    name: "Base Automotriz Gris Claro",
    price: 26.99,
    originalPrice: 34.99,
    discount: 23,
    image: "/placeholder.svg?height=300&width=300&text=Base+Automotriz",
    brand: "ColorCar",
    category: "vehiculos",
  },
  {
    id: "8",
    name: "Tinte para Madera Caoba",
    price: 18.99,
    originalPrice: 24.99,
    discount: 24,
    image: "/placeholder.svg?height=300&width=300&text=Tinte+Madera",
    brand: "WoodProtect",
    category: "madera",
  },
]

// Filtros de ejemplo
const filters = {
  categories: [
    { id: "decoraciones", name: "Para decoraciones" },
    { id: "vehiculos", name: "Para Vehículos" },
    { id: "madera", name: "Para madera" },
    { id: "industrial", name: "Para industrial" },
  ],
  brands: [
    { id: "proton", name: "Proton" },
    { id: "saturno", name: "Saturno" },
    { id: "colorcar", name: "ColorCar" },
    { id: "woodprotect", name: "WoodProtect" },
    { id: "induspaint", name: "IndusPaint" },
  ],
  priceRanges: [
    { id: "0-20", name: "$0 - $20" },
    { id: "20-30", name: "$20 - $30" },
    { id: "30-40", name: "$30 - $40" },
    { id: "40+", name: "Más de $40" },
  ],
}

export default function ProductsPage() {
  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span className="font-medium">Listado de los Productos</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-4 py-3 font-medium flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </div>
              <div className="p-4 space-y-6">
                {/* Categorías */}
                <div>
                  <h3 className="font-medium mb-3">Categorías</h3>
                  <div className="space-y-2">
                    {filters.categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox id={`category-${category.id}`} />
                        <Label htmlFor={`category-${category.id}`} className="text-sm">
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Marcas */}
                <div>
                  <h3 className="font-medium mb-3">Marcas</h3>
                  <div className="space-y-2">
                    {filters.brands.map((brand) => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox id={`brand-${brand.id}`} />
                        <Label htmlFor={`brand-${brand.id}`} className="text-sm">
                          {brand.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Rango de Precios */}
                <div>
                  <h3 className="font-medium mb-3">Precio</h3>
                  <div className="space-y-2">
                    {filters.priceRanges.map((range) => (
                      <div key={range.id} className="flex items-center space-x-2">
                        <Checkbox id={`price-${range.id}`} />
                        <Label htmlFor={`price-${range.id}`} className="text-sm">
                          {range.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Aplicar Filtros</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header and Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Listado de los Productos</h1>
              <p className="text-muted-foreground">Mostrando {products.length} productos</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  className="w-full pl-4 pr-10 focus-visible:ring-0"
                />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Buscar</span>
                </Button>
              </div>
              <Select defaultValue="featured">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="newest">Más recientes</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden w-full">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="py-4 space-y-6">
                    {/* Categorías */}
                    <div>
                      <h3 className="font-medium mb-3">Categorías</h3>
                      <div className="space-y-2">
                        {filters.categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox id={`mobile-category-${category.id}`} />
                            <Label htmlFor={`mobile-category-${category.id}`} className="text-sm">
                              {category.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Marcas */}
                    <div>
                      <h3 className="font-medium mb-3">Marcas</h3>
                      <div className="space-y-2">
                        {filters.brands.map((brand) => (
                          <div key={brand.id} className="flex items-center space-x-2">
                            <Checkbox id={`mobile-brand-${brand.id}`} />
                            <Label htmlFor={`mobile-brand-${brand.id}`} className="text-sm">
                              {brand.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Rango de Precios */}
                    <div>
                      <h3 className="font-medium mb-3">Precio</h3>
                      <div className="space-y-2">
                        {filters.priceRanges.map((range) => (
                          <div key={range.id} className="flex items-center space-x-2">
                            <Checkbox id={`mobile-price-${range.id}`} />
                            <Label htmlFor={`mobile-price-${range.id}`} className="text-sm">
                              {range.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full">Aplicar Filtros</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              Para decoraciones
              <button className="ml-1 hover:text-primary">×</button>
            </Badge>
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              Saturno
              <button className="ml-1 hover:text-primary">×</button>
            </Badge>
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              $20 - $30
              <button className="ml-1 hover:text-primary">×</button>
            </Badge>
            <Button variant="ghost" size="sm" className="h-7 px-3 text-xs">
              Limpiar filtros
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                image={product.image}
                brand={product.brand}
                category={product.category}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Página anterior</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                1
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                2
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                3
              </Button>
              <span className="mx-1">...</span>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                8
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Página siguiente</span>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
