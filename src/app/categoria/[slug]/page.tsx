"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Filter, SlidersHorizontal, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

// Datos de categorías
const categoriesData = {
    decoraciones: {
        name: "Para decoraciones",
        description: "Pinturas y productos especializados para decoración de interiores y exteriores",
        icon: "🏠",
        banner: "/matizado-decoraciones.jpg",
        subcategories: ["Interiores", "Exteriores", "Efectos decorativos", "Impermeabilizantes"],
        products: [
            {
                id: "dec-1",
                name: "Pintura Látex Premium Satinado Blanco",
                price: 24.99,
                originalPrice: 32.99,
                discount: 24,
                image: "/placeholder.svg?height=300&width=300&text=Látex+Premium",
                brand: "Saturno",
                category: "decoraciones",
            },
            {
                id: "dec-2",
                name: "Pintura Acrílica Interior Lavable",
                price: 22.99,
                originalPrice: 29.99,
                discount: 23,
                image: "/placeholder.svg?height=300&width=300&text=Acrílica+Interior",
                brand: "Saturno",
                category: "decoraciones",
            },
            {
                id: "dec-3",
                name: "Esmalte Sintético Brillante",
                price: 28.99,
                originalPrice: 36.99,
                discount: 22,
                image: "/placeholder.svg?height=300&width=300&text=Esmalte+Sintético",
                brand: "Proton",
                category: "decoraciones",
            },
            {
                id: "dec-4",
                name: "Pintura Antihumedad Blanca",
                price: 31.99,
                originalPrice: 39.99,
                discount: 20,
                image: "/placeholder.svg?height=300&width=300&text=Antihumedad",
                brand: "Saturno",
                category: "decoraciones",
            },
        ],
    },
    vehiculos: {
        name: "Para Vehículos",
        description: "Pinturas automotrices y productos especializados para el sector vehicular",
        icon: "🚗",
        banner: "/matizado-vehiculos.jpg",
        subcategories: ["Automotriz", "Motos", "Acabados especiales", "Anticorrosivos"],
        products: [
            {
                id: "veh-1",
                name: "Esmalte Automotriz Azul Metálico",
                price: 34.99,
                originalPrice: 44.99,
                discount: 22,
                image: "/placeholder.svg?height=300&width=300&text=Esmalte+Automotriz",
                brand: "ColorCar",
                category: "vehiculos",
            },
            {
                id: "veh-2",
                name: "Base Automotriz Gris Claro",
                price: 26.99,
                originalPrice: 34.99,
                discount: 23,
                image: "/placeholder.svg?height=300&width=300&text=Base+Automotriz",
                brand: "ColorCar",
                category: "vehiculos",
            },
            {
                id: "veh-3",
                name: "Barniz Automotriz UV",
                price: 29.99,
                originalPrice: 38.99,
                discount: 23,
                image: "/placeholder.svg?height=300&width=300&text=Barniz+UV",
                brand: "ColorCar",
                category: "vehiculos",
            },
            {
                id: "veh-4",
                name: "Imprimante Automotriz",
                price: 24.99,
                originalPrice: 31.99,
                discount: 22,
                image: "/placeholder.svg?height=300&width=300&text=Imprimante",
                brand: "ColorCar",
                category: "vehiculos",
            },
        ],
    },
    madera: {
        name: "Para madera",
        description: "Barnices, tintes y productos especializados para el tratamiento de madera",
        icon: "🪵",
        banner: "/matizado-madera.jpg",
        subcategories: ["Barnices", "Lacas", "Tintes", "Selladores"],
        products: [
            {
                id: "mad-1",
                name: "Barniz Marino Protector UV",
                price: 27.99,
                originalPrice: 36.99,
                discount: 24,
                image: "/placeholder.svg?height=300&width=300&text=Barniz+Marino",
                brand: "WoodProtect",
                category: "madera",
            },
            {
                id: "mad-2",
                name: "Tinte para Madera Caoba",
                price: 18.99,
                originalPrice: 24.99,
                discount: 24,
                image: "/placeholder.svg?height=300&width=300&text=Tinte+Madera",
                brand: "WoodProtect",
                category: "madera",
            },
            {
                id: "mad-3",
                name: "Laca Nitrocelulósica Brillante",
                price: 32.99,
                originalPrice: 42.99,
                discount: 23,
                image: "/placeholder.svg?height=300&width=300&text=Laca+Nitro",
                brand: "WoodProtect",
                category: "madera",
            },
            {
                id: "mad-4",
                name: "Sellador para Madera",
                price: 21.99,
                originalPrice: 28.99,
                discount: 24,
                image: "/placeholder.svg?height=300&width=300&text=Sellador",
                brand: "WoodProtect",
                category: "madera",
            },
        ],
    },
    industrial: {
        name: "Para industrial",
        description: "Pinturas y recubrimientos especializados para uso industrial",
        icon: "🏭",
        banner: "/matizado-industrial.jpg",
        subcategories: ["Epóxicos", "Anticorrosivos", "Alta temperatura", "Pisos industriales"],
        products: [
            {
                id: "ind-1",
                name: "Pintura Sintética Proton SyntoRust Negro",
                price: 29.99,
                originalPrice: 39.99,
                discount: 25,
                image: "/placeholder.svg?height=300&width=300&text=Proton+SyntoRust",
                brand: "Proton",
                category: "industrial",
            },
            {
                id: "ind-2",
                name: "Pintura Epóxica para Pisos Gris",
                price: 39.99,
                originalPrice: 49.99,
                discount: 20,
                image: "/placeholder.svg?height=300&width=300&text=Epóxica+Pisos",
                brand: "IndusPaint",
                category: "industrial",
            },
            {
                id: "ind-3",
                name: "Anticorrosivo Base Agua",
                price: 24.99,
                originalPrice: 34.99,
                discount: 28,
                image: "/placeholder.svg?height=300&width=300&text=Anticorrosivo",
                brand: "Proton",
                category: "industrial",
            },
            {
                id: "ind-4",
                name: "Esmalte Industrial Alta Temperatura",
                price: 32.99,
                originalPrice: 42.99,
                discount: 23,
                image: "/placeholder.svg?height=300&width=300&text=Esmalte+Industrial",
                brand: "IndusPaint",
                category: "industrial",
            },
        ],
    },
}

// Filtros disponibles
const filters = {
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

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const category = categoriesData[params.slug as keyof typeof categoriesData]

    if (!category) {
        return (
            <div className="container px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
                <p className="text-muted-foreground mb-6">La categoría que buscas no existe.</p>
                <Button asChild>
                    <Link href="/productos">Ver todos los productos</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container px-4 py-6 md:px-6 md:py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm mb-6">
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                    Inicio
                </Link>
                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
                <Link href="/productos" className="text-muted-foreground hover:text-foreground">
                    Productos
                </Link>
                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
                <span className="font-medium">{category.name}</span>
            </nav>

            {/* Category Banner */}
            <div className="relative rounded-lg overflow-hidden mb-8 animate-fade-in">
                <div className="absolute inset-0 z-0">
                    <Image src={category.banner || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
                </div>

                <div className="relative z-10 px-6 py-12 md:py-16 max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{category.icon}</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">{category.name}</h1>
                    </div>
                    <p className="text-lg text-gray-200 mb-6">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {category.subcategories.map((sub, index) => (
                            <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                                {sub}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters - Desktop */}
                <div className="hidden md:block w-64 flex-shrink-0">
                    <div className="sticky top-20">
                        <div className="border rounded-lg overflow-hidden card-ferreteria">
                            <div className="bg-gradient-to-r from-[#1d4ed8] to-[#ffedd5] dark:from-[#1d4ed8]/20 dark:to-[#ffedd5]/20 px-4 py-3 font-medium flex items-center">
                                <Filter className="h-4 w-4 mr-2" />
                                Filtros
                            </div>
                            <div className="p-4 space-y-6">
                                {/* Subcategorías */}
                                <div>
                                    <h3 className="font-medium mb-3 text-[#1d4ed8] dark:text-[#bfdbfe]">
                                        Subcategorías
                                    </h3>
                                    <div className="space-y-2">
                                        {category.subcategories.map((subcategory, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`subcategory-${index}`}
                                                    className="data-[state=checked]:bg-[#1d4ed8] data-[state=checked]:border-[#1d4ed8]"
                                                />
                                                <Label htmlFor={`subcategory-${index}`} className="text-sm cursor-pointer">
                                                    {subcategory}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Marcas */}
                                <div>
                                    <h3 className="font-medium mb-3 text-[#1d4ed8] dark:text-[#bfdbfe]">Marcas</h3>
                                    <div className="space-y-2">
                                        {filters.brands.map((brand) => (
                                            <div key={brand.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`brand-${brand.id}`}
                                                    className="data-[state=checked]:bg-[#ff5a00] data-[state=checked]:border-[#ff5a00]"
                                                />
                                                <Label htmlFor={`brand-${brand.id}`} className="text-sm cursor-pointer">
                                                    {brand.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Rango de Precios */}
                                <div>
                                    <h3 className="font-medium mb-3 text-[#1d4ed8] dark:text-[#bfdbfe]">Precio</h3>
                                    <div className="space-y-2">
                                        {filters.priceRanges.map((range) => (
                                            <div key={range.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`price-${range.id}`}
                                                    className="data-[state=checked]:bg-[#1d4ed8] data-[state=checked]:border-[#1d4ed8]"
                                                />
                                                <Label htmlFor={`price-${range.id}`} className="text-sm cursor-pointer">
                                                    {range.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button className="w-full btn-ferreteria">Aplicar Filtros</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header and Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold">Productos en {category.name}</h2>
                            <p className="text-muted-foreground">Mostrando {category.products.length} productos</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="relative w-full sm:w-64">
                                <Input
                                    type="search"
                                    placeholder="Buscar en esta categoría..."
                                    className="w-full pl-4 pr-10 focus-visible:ring-[#1d4ed8]"
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
                                        {/* Mobile filters content - same as desktop */}
                                        <div>
                                            <h3 className="font-medium mb-3">Subcategorías</h3>
                                            <div className="space-y-2">
                                                {category.subcategories.map((subcategory, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <Checkbox id={`mobile-subcategory-${index}`} />
                                                        <Label htmlFor={`mobile-subcategory-${index}`} className="text-sm">
                                                            {subcategory}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Add other mobile filters here */}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up">
                        {category.products.map((product) => (
                            <div key={product.id} className="product-hover">
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    discount={product.discount}
                                    image={product.image}
                                    brand={product.brand}
                                    category={product.category}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-12">
                        <Button variant="outline" size="lg" className="btn-ferreteria">
                            Cargar más productos
                        </Button>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
        </div>
    )
}
