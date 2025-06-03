"use client"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"

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
    brands: [
        { id: "CPP", name: "CPP" },
        { id: "ANYPSA", name: "ANYPSA" },
        { id: "3T", name: "3T" },
        { id: "LOZARO", name: "LOZARO" },
        { id: "SHERWIN WILIANS", name: "SHERWIN WILIANS" },
        { id: "MAJESTAD", name: "MAJESTAD" },
        { id: "INTERPAINTS", name: "INTERPAINTS" },
        { id: "TITAN", name: "TITAN" },
        { id: "PARACAS", name: "PARACAS" },
        { id: "VENCEDOR", name: "VENCEDOR" },
        { id: "AMERICAN COLORS", name: "AMERICAN COLORS" },
        { id: "TUMI", name: "TUMI" },
        { id: "CYNTHIA", name: "CYNTHIA" },
        { id: "TORO", name: "TORO" },
        { id: "FAST", name: "FAST" },
        { id: "CORAL", name: "CORAL" },
        { id: "GLUCOM", name: "GLUCOM" },
        { id: "TEKNO", name: "TEKNO" },
        { id: "3M", name: "3M" },
        { id: "SUAREZ", name: "SUAREZ" },
        { id: "ZIKA", name: "ZIKA" },
        { id: "TRUPER", name: "TRUPER" }
    ],
    priceRanges: [
        { id: "0-20", name: "$0 - $20", min: 0, max: 20 },
        { id: "20-30", name: "$20 - $30", min: 20, max: 30 },
        { id: "30-40", name: "$30 - $40", min: 30, max: 40 },
        { id: "40+", name: "Más de $40", min: 40, max: Infinity },
    ],
}

const categoriesData = {
    decoraciones: {
        name: "Para decoraciones",
        description: "Pinturas y productos especializados para decoración de interiores y exteriores",
        icon: "🏠",
        banner: "/matizado-decoraciones.jpg",
        subcategories: ["Interiores", "Exteriores", "Efectos decorativos", "Impermeabilizantes"]
    },
    vehiculos: {
        name: "Para Vehículos",
        description: "Pinturas automotrices y productos especializados para el sector vehicular",
        icon: "🚗",
        banner: "/matizado-vehiculos.jpg",
        subcategories: ["Automotriz", "Motos", "Acabados especiales", "Anticorrosivos"],
    },
    madera: {
        name: "Para madera",
        description: "Barnices, tintes y productos especializados para el tratamiento de madera",
        icon: "🪵",
        banner: "/matizado-madera.jpg",
        subcategories: ["Barnices", "Lacas", "Tintes", "Selladores"],
    },
    industrial: {
        name: "Para industrial",
        description: "Pinturas y recubrimientos especializados para uso industrial",
        icon: "🏭",
        banner: "/matizado-industrial.jpg",
        subcategories: ["Epóxicos", "Anticorrosivos", "Alta temperatura", "Pisos industriales"],
    },
}

export default function CategoryPage() {
    const params = useParams()
    const slug = params?.slug as keyof typeof categoriesData
    const [productos, setProductos] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
    const [showAllBrands, setShowAllBrands] = useState(false)

    // Obtener la categoría actual
    const category = categoriesData[slug] || {
        name: "Categoría",
        description: "Productos de esta categoría",
        icon: "📦",
        banner: "/placeholder.svg",
        subcategories: []
    }

    // Obtener productos de la categoría
    useEffect(() => {
        const ObtenerProductosCategoria = async () => {
            try {
                setLoading(true)
                setError(null)

                const categoriaIdMap: Record<string, number> = {
                    decoraciones: 1,
                    vehiculos: 3,
                    madera: 4,
                    industrial: 2
                }

                const categoriaId = categoriaIdMap[slug] || 1
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/productos/listarProductos/${categoriaId}`)

                if (!response.ok) {
                    throw new Error('Error al obtener los productos de la categoría')
                }

                const data = await response.json()
                setProductos(data)
                setFilteredProducts(data)
            } catch (error) {
                console.error('Error fetching category products:', error)
                setError('No se pudieron cargar los productos. Intente nuevamente más tarde.')
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            ObtenerProductosCategoria()
        }
    }, [slug])

    // Aplicar filtros
    useEffect(() => {
        let results = [...productos]

        // Filtro por búsqueda
        if (searchTerm) {
            results = results.filter(product =>
                product.NOMBRE_PRODUCTO.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.DESCRIPCION.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.NOMBRE_MARCA.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Filtro por marcas
        if (selectedBrands.length > 0) {
            results = results.filter(product =>
                selectedBrands.includes(product.NOMBRE_MARCA)
            )
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
    }, [searchTerm, selectedBrands, selectedPriceRanges, productos])

    // Manejar cambio de marcas
    const handleBrandChange = (brandId: string) => {
        setSelectedBrands(prev =>
            prev.includes(brandId)
                ? prev.filter(id => id !== brandId)
                : [...prev, brandId]
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
        setSelectedBrands([])
        setSelectedPriceRanges([])
    }

    return (
        <div className="flex flex-col py-6 px-6">
            {/* Banner de categoría */}
            <div className="relative rounded-lg overflow-hidden mb-8 animate-fade-in h-64 md:h-80">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={category.banner}
                        alt={category.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
                </div>

                <div className="relative z-10 px-6 py-12 md:py-16 max-w-2xl h-full flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{category.icon}</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">{category.name}</h1>
                    </div>
                    <p className="text-lg text-gray-200 mb-6">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {category.subcategories.map((sub, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                            >
                                {sub}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters - Desktop */}
                <div className="hidden md:block w-64 flex-shrink-0  ">
                    <div className="sticky top-20">
                        <div className="border rounded-lg overflow-hidden card-ferreteria">
                            <div className="bg-gradient-to-r from-[#1d4ed8] to-[#ffedd5] dark:from-[#1d4ed8]/20 dark:to-[#ffedd5]/20 px-4 py-3 font-medium flex items-center">
                                <Filter className="h-4 w-4 mr-2" />
                                Filtros
                            </div>
                            <div className="p-4 space-y-6">
                                {/* Marcas */}
                                <div>
                                    <h3 className="font-medium mb-3 text-[#1d4ed8] dark:text-[#bfdbfe]">Marcas</h3>
                                    <div className="space-y-2">
                                        {(showAllBrands ? filters.brands : filters.brands.slice(0, 4)).map(brand => (
                                            <div key={brand.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={brand.id}
                                                    checked={selectedBrands.includes(brand.id)}
                                                    onCheckedChange={() => handleBrandChange(brand.id)}
                                                />
                                                <Label htmlFor={brand.id}>{brand.name}</Label>
                                            </div>
                                        ))}

                                        {filters.brands.length > 4 && (
                                            <Button
                                                variant="link"
                                                className="text-blue-600 px-0 text-sm"
                                                onClick={() => setShowAllBrands(!showAllBrands)}
                                            >
                                                {showAllBrands ? "Ver menos" : "Ver más"}
                                            </Button>
                                        )}


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
                            <h2 className="text-2xl font-bold">Productos {category.name.toLowerCase()}</h2>
                            <p className="text-muted-foreground">
                                Mostrando {filteredProducts.length} de {productos.length} productos
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="relative w-full sm:w-64">
                                <Input
                                    type="search"
                                    placeholder="Buscar en esta categoría..."
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
                        <div className="text-center py-12">
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