"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Filter, SlidersHorizontal, Search, Star, Calendar, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

// Datos de marcas
const brandsData = {
    proton: {
        name: "Proton",
        description: "Líder en pinturas industriales y anticorrosivas desde 1985",
        logo: "/placeholder.svg?height=120&width=240&text=Proton+Logo",
        banner: "/placeholder.svg?height=300&width=1200&text=Proton+Banner",
        founded: 1985,
        rating: 4.8,
        totalProducts: 156,
        specialties: ["Pinturas Industriales", "Anticorrosivos", "Alta Temperatura", "Marinas"],
        about:
            "Proton es una marca reconocida mundialmente por su innovación en pinturas industriales. Con más de 35 años de experiencia, ofrecemos soluciones de alta calidad para protección anticorrosiva y aplicaciones industriales exigentes.",
        products: [
            {
                id: "proton-1",
                name: "Pintura Sintética Proton SyntoRust Negro",
                price: 29.99,
                originalPrice: 39.99,
                discount: 25,
                image: "/placeholder.svg?height=300&width=300&text=Proton+SyntoRust",
                brand: "Proton",
                category: "industrial",
            },
            {
                id: "proton-2",
                name: "Anticorrosivo Base Agua",
                price: 24.99,
                originalPrice: 34.99,
                discount: 28,
                image: "/placeholder.svg?height=300&width=300&text=Anticorrosivo",
                brand: "Proton",
                category: "industrial",
            },
            {
                id: "proton-3",
                name: "Esmalte Sintético Brillante",
                price: 28.99,
                originalPrice: 36.99,
                discount: 22,
                image: "/placeholder.svg?height=300&width=300&text=Esmalte+Sintético",
                brand: "Proton",
                category: "decoraciones",
            },
            {
                id: "proton-4",
                name: "Imprimante para Metal",
                price: 19.99,
                originalPrice: 26.99,
                discount: 26,
                image: "/placeholder.svg?height=300&width=300&text=Imprimante+Metal",
                brand: "Proton",
                category: "industrial",
            },
        ],
    },
    saturno: {
        name: "Saturno",
        description: "Especialistas en pinturas decorativas y arquitectónicas de alta calidad",
        logo: "/placeholder.svg?height=120&width=240&text=Saturno+Logo",
        banner: "/placeholder.svg?height=300&width=1200&text=Saturno+Banner",
        founded: 1992,
        rating: 4.7,
        totalProducts: 203,
        specialties: ["Pinturas Decorativas", "Látex", "Acrílicas", "Efectos Especiales"],
        about:
            "Saturno se especializa en crear ambientes únicos con sus pinturas decorativas. Nuestra gama de productos incluye desde látex tradicionales hasta efectos especiales que transforman cualquier espacio.",
        products: [
            {
                id: "saturno-1",
                name: "Pintura Látex Premium Satinado Blanco",
                price: 24.99,
                originalPrice: 32.99,
                discount: 24,
                image: "/placeholder.svg?height=300&width=300&text=Látex+Premium",
                brand: "Saturno",
                category: "decoraciones",
            },
            {
                id: "saturno-2",
                name: "Pintura Acrílica Interior Lavable",
                price: 22.99,
                originalPrice: 29.99,
                discount: 23,
                image: "/placeholder.svg?height=300&width=300&text=Acrílica+Interior",
                brand: "Saturno",
                category: "decoraciones",
            },
            {
                id: "saturno-3",
                name: "Pintura Antihumedad Blanca",
                price: 31.99,
                originalPrice: 39.99,
                discount: 20,
                image: "/placeholder.svg?height=300&width=300&text=Antihumedad",
                brand: "Saturno",
                category: "decoraciones",
            },
            {
                id: "saturno-4",
                name: "Pintura Efecto Texturizado",
                price: 35.99,
                originalPrice: 45.99,
                discount: 22,
                image: "/placeholder.svg?height=300&width=300&text=Texturizado",
                brand: "Saturno",
                category: "decoraciones",
            },
        ],
    },
    colorcar: {
        name: "ColorCar",
        description: "La marca líder en pinturas automotrices y acabados vehiculares",
        logo: "/placeholder.svg?height=120&width=240&text=ColorCar+Logo",
        banner: "/placeholder.svg?height=300&width=1200&text=ColorCar+Banner",
        founded: 1998,
        rating: 4.9,
        totalProducts: 89,
        specialties: ["Pinturas Automotrices", "Barnices", "Bases", "Acabados Metálicos"],
        about:
            "ColorCar es la marca de confianza para profesionales del sector automotriz. Ofrecemos una gama completa de productos para pintura vehicular con tecnología de punta y colores de fábrica.",
        products: [
            {
                id: "colorcar-1",
                name: "Esmalte Automotriz Azul Metálico",
                price: 34.99,
                originalPrice: 44.99,
                discount: 22,
                image: "/placeholder.svg?height=300&width=300&text=Esmalte+Automotriz",
                brand: "ColorCar",
                category: "vehiculos",
            },
            {
                id: "colorcar-2",
                name: "Base Automotriz Gris Claro",
                price: 26.99,
                originalPrice: 34.99,
                discount: 23,
                image: "/placeholder.svg?height=300&width=300&text=Base+Automotriz",
                brand: "ColorCar",
                category: "vehiculos",
            },
            {
                id: "colorcar-3",
                name: "Barniz Automotriz UV",
                price: 29.99,
                originalPrice: 38.99,
                discount: 23,
                image: "/placeholder.svg?height=300&width=300&text=Barniz+UV",
                brand: "ColorCar",
                category: "vehiculos",
            },
            {
                id: "colorcar-4",
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
    woodprotect: {
        name: "WoodProtect",
        description: "Expertos en protección y embellecimiento de madera",
        logo: "/placeholder.svg?height=120&width=240&text=WoodProtect+Logo",
        banner: "/placeholder.svg?height=300&width=1200&text=WoodProtect+Banner",
        founded: 2001,
        rating: 4.6,
        totalProducts: 67,
        specialties: ["Barnices", "Tintes", "Lacas", "Protectores UV"],
        about:
            "WoodProtect se dedica exclusivamente al cuidado y protección de la madera. Nuestros productos están formulados para realzar la belleza natural de la madera mientras la protegen de los elementos.",
        products: [
            {
                id: "woodprotect-1",
                name: "Barniz Marino Protector UV",
                price: 27.99,
                originalPrice: 36.99,
                discount: 24,
                image: "/placeholder.svg?height=300&width=300&text=Barniz+Marino",
                brand: "WoodProtect",
                category: "madera",
            },
            {
                id: "woodprotect-2",
                name: "Tinte para Madera Caoba",
                price: 18.99,
                originalPrice: 24.99,
                discount: 24,
                image: "/placeholder.svg?height=300&width=300&text=Tinte+Madera",
                brand: "WoodProtect",
                category: "madera",
            },
            {
                id: "woodprotect-3",
                name: "Laca Nitrocelulósica Brillante",
                price: 32.99,
                originalPrice: 42.99,
                discount: 23,
                image: "/placeholder.svg?height=300&width=300&text=Laca+Nitro",
                brand: "WoodProtect",
                category: "madera",
            },
            {
                id: "woodprotect-4",
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
    induspaint: {
        name: "IndusPaint",
        description: "Soluciones avanzadas para la industria moderna",
        logo: "/placeholder.svg?height=120&width=240&text=IndusPaint+Logo",
        banner: "/placeholder.svg?height=300&width=1200&text=IndusPaint+Banner",
        founded: 2005,
        rating: 4.7,
        totalProducts: 94,
        specialties: ["Epóxicos", "Pisos Industriales", "Recubrimientos", "Señalización"],
        about:
            "IndusPaint desarrolla recubrimientos especializados para aplicaciones industriales exigentes. Nuestros productos están diseñados para ofrecer máxima durabilidad y resistencia en entornos industriales.",
        products: [
            {
                id: "induspaint-1",
                name: "Pintura Epóxica para Pisos Gris",
                price: 39.99,
                originalPrice: 49.99,
                discount: 20,
                image: "/placeholder.svg?height=300&width=300&text=Epóxica+Pisos",
                brand: "IndusPaint",
                category: "industrial",
            },
            {
                id: "induspaint-2",
                name: "Esmalte Industrial Alta Temperatura",
                price: 32.99,
                originalPrice: 42.99,
                discount: 23,
                image: "/placeholder.svg?height=300&width=300&text=Esmalte+Industrial",
                brand: "IndusPaint",
                category: "industrial",
            },
            {
                id: "induspaint-3",
                name: "Recubrimiento Epóxico Transparente",
                price: 45.99,
                originalPrice: 59.99,
                discount: 23,
                image: "/placeholder.svg?height=300&width=300&text=Epóxico+Transparente",
                brand: "IndusPaint",
                category: "industrial",
            },
            {
                id: "induspaint-4",
                name: "Pintura de Señalización Amarilla",
                price: 28.99,
                originalPrice: 36.99,
                discount: 22,
                image: "/placeholder.svg?height=300&width=300&text=Señalización",
                brand: "IndusPaint",
                category: "industrial",
            },
        ],
    },
}

// Filtros disponibles
const filters = {
    categories: [
        { id: "decoraciones", name: "Para decoraciones" },
        { id: "vehiculos", name: "Para Vehículos" },
        { id: "madera", name: "Para madera" },
        { id: "industrial", name: "Para industrial" },
    ],
    priceRanges: [
        { id: "0-20", name: "$0 - $20" },
        { id: "20-30", name: "$20 - $30" },
        { id: "30-40", name: "$30 - $40" },
        { id: "40+", name: "Más de $40" },
    ],
}

export default function BrandPage({ params }: { params: { slug: string } }) {
    const brand = brandsData[params.slug as keyof typeof brandsData]

    if (!brand) {
        return (
            <div className="container px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Marca no encontrada</h1>
                <p className="text-muted-foreground mb-6">La marca que buscas no existe.</p>
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
                <span className="font-medium">{brand.name}</span>
            </nav>

            {/* Brand Banner */}
            <div className="relative rounded-lg overflow-hidden mb-8 animate-fade-in">
                <div className="absolute inset-0 z-0">
                    <Image src={brand.banner || "/placeholder.svg"} alt={brand.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
                </div>

                <div className="relative z-10 px-6 py-12 md:py-16">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <Image
                                src={brand.logo || "/placeholder.svg"}
                                alt={brand.name}
                                width={240}
                                height={120}
                                className="h-16 w-auto"
                            />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{brand.name}</h1>
                            <p className="text-lg text-gray-200 mb-4">{brand.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {brand.specialties.map((specialty, index) => (
                                    <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                                        {specialty}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex items-center gap-6 text-white">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm">Desde {brand.founded}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span className="text-sm">{brand.rating}/5</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Package className="h-4 w-4" />
                                    <span className="text-sm">{brand.totalProducts} productos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Brand Info */}
            <div className="mb-8">
                <Card className="card-ferreteria">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-bold mb-4 text-[#1d4ed8] dark:text-[#bfdbfe]">
                            Acerca de {brand.name}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">{brand.about}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters - Desktop */}
                <div className="hidden md:block w-64 flex-shrink-0">
                    <div className="sticky top-20">
                        <div className="border rounded-lg overflow-hidden card-ferreteria">
                            <div className="bg-gradient-to-r from-[#eff6ff] to-[#fff7ed] dark:from-[#1e3a8a]/20 dark:to-[#7c2d12]/20 px-4 py-3 font-medium flex items-center">
                                <Filter className="h-4 w-4 mr-2" />
                                Filtros
                            </div>
                            <div className="p-4 space-y-6">
                                {/* Categorías */}
                                <div>
                                    <h3 className="font-medium mb-3 text-[#1d4ed8] dark:text-[#bfdbfe]">
                                        Categorías
                                    </h3>
                                    <div className="space-y-2">
                                        {filters.categories.map((category) => (
                                            <div key={category.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`category-${category.id}`}
                                                    className="data-[state=checked]:bg-[#1d4ed8] data-[state=checked]:border-[#1d4ed8]"
                                                />
                                                <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                                                    {category.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Especialidades */}
                                <div>
                                    <h3 className="font-medium mb-3 text-[#1d4ed8] dark:text-[#bfdbfe]">
                                        Especialidades
                                    </h3>
                                    <div className="space-y-2">
                                        {brand.specialties.map((specialty, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`specialty-${index}`}
                                                    className="data-[state=checked]:bg-ferreteria-orange-500 data-[state=checked]:border-ferreteria-orange-500"
                                                />
                                                <Label htmlFor={`specialty-${index}`} className="text-sm cursor-pointer">
                                                    {specialty}
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
                            <h2 className="text-2xl font-bold">Productos de {brand.name}</h2>
                            <p className="text-muted-foreground">Mostrando {brand.products.length} productos</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="relative w-full sm:w-64">
                                <Input
                                    type="search"
                                    placeholder={`Buscar en ${brand.name}...`}
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
                                        {/* Mobile filters content */}
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
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up">
                        {brand.products.map((product) => (
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
                            Ver todos los productos de {brand.name}
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
