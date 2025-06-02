"use client"
import { Filter, Search, Calendar, Star, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"

interface Product {
    ID_PRODUCTO: number
    NOMBRE_PRODUCTO: string
    NOMBRE_MARCA: string
    NOMBRE_CATEGORIA: string
    PRECIO_PRODUCTO: number
    LOGO_PRODUCTO: string
    ESTADO_PRODUCTO: string
    DESCRIPCION: string
}

const filters = {
    categories: [
        { id: "decoraciones", name: "Para decoraciones", match: ["Linea decorativa"] },
        { id: "vehiculos", name: "Para Vehículos", match: ["Linea vehiculos"] },
        { id: "madera", name: "Para madera", match: ["Linea madera"] },
        { id: "industrial", name: "Para industrial", match: ["Linea industrial"] },
    ],
    priceRanges: [
        { id: "0-20", name: "$0 - $20", min: 0, max: 20 },
        { id: "20-30", name: "$20 - $30", min: 20, max: 30 },
        { id: "30-40", name: "$30 - $40", min: 30, max: 40 },
        { id: "40+", name: "Más de $40", min: 40, max: Infinity },
    ],
}

const brandsData = {
    cpp: {
        name: "CPP",
        description: "Líder en pinturas industriales y anticorrosivas desde 1985",
        logo: "/CPP_LOGO.png",
        banner: "/CPP_BANER.png",
        founded: 1985,
        rating: 4.8,
        totalProducts: 156,
        specialties: ["Pinturas Industriales", "Anticorrosivos", "Alta Temperatura", "Marinas"],
        about: "CPP es una marca reconocida mundialmente por su innovación en pinturas industriales. Con más de 35 años de experiencia, ofrecemos soluciones de alta calidad para protección anticorrosiva y aplicaciones industriales exigentes.",
    },
    anypsa: {
        name: "ANYPSA",
        description: "Especialistas en pinturas decorativas y arquitectónicas de alta calidad",
        logo: "/ANYPSA_LOGO.png",
        banner: "/ANYPSA_BANNER.jpg",
        founded: 1992,
        rating: 4.7,
        totalProducts: 203,
        specialties: ["Pinturas Decorativas", "Látex", "Acrílicas", "Efectos Especiales"],
        about: "ANYPSA se especializa en crear ambientes únicos con sus pinturas decorativas. Nuestra gama de productos incluye desde látex tradicionales hasta efectos especiales que transforman cualquier espacio.",
    },
    "3t": {
        name: "3T",
        description: "La marca líder en pinturas automotrices y acabados vehiculares",
        logo: "/3T_LOGO.png",
        banner: "/3T_LOGO.png",
        founded: 1998,
        rating: 4.9,
        totalProducts: 89,
        specialties: ["Pinturas Automotrices", "Barnices", "Bases", "Acabados Metálicos"],
        about: "3T es la marca de confianza para profesionales del sector automotriz. Ofrecemos una gama completa de productos para pintura vehicular con tecnología de punta y colores de fábrica.",
    },
    losaro: {
        name: "Losaro",
        description: "Expertos en protección y embellecimiento de madera",
        logo: "/LOZARO_LOGO.png",
        banner: "/LOZARO_BANER.jpg",
        founded: 2001,
        rating: 4.6,
        totalProducts: 67,
        specialties: ["Barnices", "Tintes", "Lacas", "Protectores UV"],
        about: "Losaro se dedica exclusivamente al cuidado y protección de la madera. Nuestros productos están formulados para realzar la belleza natural de la madera mientras la protegen de los elementos.",
    }
}

export default function BrandPage() {
    const params = useParams()
    const slug = params?.slug as keyof typeof brandsData
    const [productos, setProductos] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])

    // Obtener datos de la marca
    const brand = brandsData[slug] || {
        name: slug.toUpperCase(),
        description: `Productos de la marca ${slug.toUpperCase()}`,
        logo: "/placeholder.svg",
        banner: "/placeholder.svg",
        founded: 2000,
        rating: 4.5,
        totalProducts: 0,
        specialties: [],
        about: ""
    }

    // Obtener productos de la marca
    useEffect(() => {
        const ObtenerProductosMarca = async () => {
            try {
                setLoading(true)
                setError(null)
                
                const brandIdMap: Record<string, number> = {
                    cpp: 1,
                    anypsa: 2,
                    "3t": 3,
                    losaro: 4
                }
                
                const brandId = brandIdMap[slug] || 1
                const response = await fetch(`http://localhost:3001/api/productos/listarProductosMarca/${brandId}`)
                
                if (!response.ok) {
                    throw new Error('Error al obtener los productos de la marca')
                }
                
                const data = await response.json()
                setProductos(data)
                setFilteredProducts(data)
            } catch (error) {
                console.error('Error fetching brand products:', error)
                setError('No se pudieron cargar los productos. Intente nuevamente más tarde.')
            } finally {
                setLoading(false)
            }
        }

        ObtenerProductosMarca()
    }, [slug])

    // Aplicar filtros
    useEffect(() => {
        let results = [...productos]

        // Filtro por búsqueda
        if (searchTerm) {
            results = results.filter(product =>
                product.NOMBRE_PRODUCTO.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.DESCRIPCION.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.NOMBRE_CATEGORIA.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Filtro por categorías
        if (selectedCategories.length > 0) {
            results = results.filter(product => {
                return selectedCategories.some(categoryId => {
                    const categoryFilter = filters.categories.find(c => c.id === categoryId)
                    if (!categoryFilter) return false
                    
                    return categoryFilter.match.some(matchTerm =>
                        product.NOMBRE_CATEGORIA.toLowerCase().includes(matchTerm.toLowerCase())
                    )
                })
            })
        }

        // Filtro por rango de precios
        if (selectedPriceRanges.length > 0) {
            results = results.filter(product => {
                return selectedPriceRanges.some(rangeId => {
                    const range = filters.priceRanges.find(r => r.id === rangeId)
                    if (!range) return false
                    return product.PRECIO_PRODUCTO >= range.min && product.PRECIO_PRODUCTO <= range.max
                })
            })
        }

        setFilteredProducts(results)
    }, [searchTerm, selectedCategories, selectedPriceRanges, productos])

    // Manejar cambio de categorías
    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        )
    }

    // Manejar cambio de rangos de precio
    const handlePriceRangeChange = (rangeId: string) => {
        setSelectedPriceRanges(prev =>
            prev.includes(rangeId)
                ? prev.filter(id => id !== rangeId)
                : [...prev, rangeId]
        )
    }

    // Resetear todos los filtros
    const resetFilters = () => {
        setSearchTerm("")
        setSelectedCategories([])
        setSelectedPriceRanges([])
    }

    return (
        <div className="flex flex-col px-4 py-6 md:px-6 md:py-8">
            {/* Banner de marca */}
            <div className="relative rounded-lg overflow-hidden mb-8 animate-fade-in h-64 md:h-80">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src={brand.banner} 
                        alt={brand.name} 
                        fill 
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
                </div>

                <div className="relative z-10 px-6 py-12 md:py-16">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <Image
                                src={brand.logo}
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
                                    <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
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
                                                    checked={selectedCategories.includes(category.id)}
                                                    onCheckedChange={() => handleCategoryChange(category.id)}
                                                />
                                                <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                                                    {category.name}
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
                                                    checked={selectedPriceRanges.includes(range.id)}
                                                    onCheckedChange={() => handlePriceRangeChange(range.id)}
                                                />
                                                <Label htmlFor={`price-${range.id}`} className="text-sm cursor-pointer">
                                                    {range.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button 
                                    className="w-full btn-ferreteria"
                                    onClick={resetFilters}
                                >
                                    Limpiar Filtros
                                </Button>
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
                            <p className="text-muted-foreground">
                                Mostrando {filteredProducts.length} de {productos.length} productos
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="relative w-full sm:w-64">
                                <Input
                                    type="search"
                                    placeholder={`Buscar en ${brand.name}...`}
                                    className="w-full pl-4 pr-10 focus-visible:ring-[#1d4ed8]"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                                    <Search className="h-4 w-4" />
                                    <span className="sr-only">Buscar</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <p>Cargando productos...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-red-500">{error}</p>
                            <Button 
                                onClick={() => window.location.reload()}
                                className="mt-4"
                            >
                                Reintentar
                            </Button>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up">
                            {filteredProducts.map((product) => (
                                <div key={product.ID_PRODUCTO} className="product-hover">
                                    <ProductCard
                                        ID_PRODUCTO={product.ID_PRODUCTO}
                                        NOMBRE_PRODUCTO={product.NOMBRE_PRODUCTO}
                                        PRECIO_PRODUCTO={product.PRECIO_PRODUCTO}
                                        LOGO_PRODUCTO={product.LOGO_PRODUCTO}
                                        NOMBRE_MARCA={product.NOMBRE_MARCA}
                                        NOMBRE_CATEGORIA={product.NOMBRE_CATEGORIA}
                                        ESTADO_PRODUCTO={product.ESTADO_PRODUCTO}
                                        DESCRIPCION={product.DESCRIPCION}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-lg text-muted-foreground">
                                No se encontraron productos con los filtros seleccionados
                            </p>
                            <Button
                                variant="link"
                                className="mt-4"
                                onClick={resetFilters}
                            >
                                Limpiar filtros
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}