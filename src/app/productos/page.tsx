"use client"
import { Filter, SlidersHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/product-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
  categories: [
    { id: "decoraciones", name: "Para decoraciones", match: ["decorativa", "decoraciones"] },
    { id: "vehiculos", name: "Para Vehículos", match: ["automotriz", "vehículos", "vehicular"] },
    { id: "madera", name: "Para madera", match: ["madera", "maderera", "maderable"] },
    { id: "industrial", name: "Para industrial", match: ["industrial", "industria"] },
  ],
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

export default function ProductsPage() {
  const [productos, setProductos] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [showAllBrands, setShowAllBrands] = useState(false)

  useEffect(() => {
    const ObtenerProductos = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/productos/listarProductos')
        if (!response.ok) {
          throw new Error('Error al obtener los productos')
        }
        const data = await response.json()
        setProductos(data)
        setFilteredProducts(data)

        // Debug: Ver las categorías que vienen de la API
        console.log("Categorías en productos:", [...new Set(data.map((p: Product) => p.NOMBRE_CATEGORIA))])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    ObtenerProductos()
  }, [])

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

    // Filtro por categorías (corregido)
    if (selectedCategories.length > 0) {
      results = results.filter(product => {
        // Obtener todas las categorías seleccionadas con sus términos de coincidencia
        const selectedCategoryFilters = filters.categories
          .filter(category => selectedCategories.includes(category.id))
          .flatMap(category => category.match)

        // Verificar si la categoría del producto coincide con alguno de los términos
        return selectedCategoryFilters.some(term =>
          product.NOMBRE_CATEGORIA.toLowerCase().includes(term.toLowerCase())
        )
      })
    }

    // Filtro por marcas
    if (selectedBrands.length > 0) {
      results = results.filter(product =>
        selectedBrands.includes(product.NOMBRE_MARCA)
      )
    }

    // Filtro por precio
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
  }, [searchTerm, selectedCategories, selectedBrands, selectedPriceRanges, productos])

  // Manejar cambios en filtros
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleBrandChange = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    )
  }

  const handlePriceRangeChange = (rangeId: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(rangeId)
        ? prev.filter(id => id !== rangeId)
        : [...prev, rangeId]
    )
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedPriceRanges([])
  }

  // Componente de filtros reutilizable
  const FilterSection = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-6  md:max-h-[73vh] max-h-[100vh] overflow-y-auto">
      {/* Categorías */}
      <div>
        <h3 className="font-medium mb-3 text-primary">Categorías</h3>
        <div className="space-y-2">
          {filters.categories.map((category) => (
            <div key={`${isMobile ? 'mobile-' : ''}category-${category.id}`} className="flex items-center space-x-2">
              <Checkbox
                id={`${isMobile ? 'mobile-' : ''}category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor={`${isMobile ? 'mobile-' : ''}category-${category.id}`} className="text-sm cursor-pointer hover:text-primary transition-colors">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-primary/20" />

      {/* Marcas */}
      <div>
        <h3 className="font-medium mb-3 text-primary">Marcas</h3>
        <div className="space-y-2 ">
          {(showAllBrands ? filters.brands : filters.brands.slice(0, 4)).map(brand => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`${isMobile ? 'mobile-' : ''}brand-${brand.id}`}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={() => handleBrandChange(brand.id)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor={`${isMobile ? 'mobile-' : ''}brand-${brand.id}`} className="text-sm cursor-pointer hover:text-primary transition-colors">
                {brand.name}
              </Label>
            </div>
          ))}

          {filters.brands.length > 4 && (
            <Button
              variant="link"
              className="text-primary px-0 text-sm"
              onClick={() => setShowAllBrands(!showAllBrands)}
            >
              {showAllBrands ? "Ver menos" : "Ver más"}
            </Button>
          )}
        </div>
      </div>

      <Separator className="bg-primary/20" />

      {/* Rango de Precios */}
      <div>
        <h3 className="font-medium mb-3 text-primary">Precio</h3>
        <div className="space-y-2">
          {filters.priceRanges.map((range) => (
            <div key={`${isMobile ? 'mobile-' : ''}price-${range.id}`} className="flex items-center space-x-2">
              <Checkbox
                id={`${isMobile ? 'mobile-' : ''}price-${range.id}`}
                checked={selectedPriceRanges.includes(range.id)}
                onCheckedChange={() => handlePriceRangeChange(range.id)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor={`${isMobile ? 'mobile-' : ''}price-${range.id}`} className="text-sm cursor-pointer hover:text-primary transition-colors">
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
  )

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20">
            <div className="border rounded-lg overflow-hidden card-ferreteria">
              <div className="bg-gradient-to-r from-[#eff6ff] to-[#fff7ed] dark:from-[#1e3a8a]/20 dark:to-[#7c2d12]/20 px-4 py-3 font-medium flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </div>
              <div className="p-4">
                <FilterSection />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header and Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">Listado de Productos</h1>
              <p className="text-muted-foreground">Mostrando {filteredProducts.length} de {productos.length} productos</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  className="w-full pl-4 pr-10 focus-visible:ring-primary border-primary/30 hover:border-primary/50 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full text-primary hover:bg-primary/10">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Buscar</span>
                </Button>
              </div>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden w-full border-primary text-primary hover:bg-primary hover:text-primary">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="h-full w-[300px] sm:w-[400px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-y-scroll">
                  <div className="p-4 flex flex-col  h-full">
                    <FilterSection isMobile />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-primary animate-pulse">Cargando productos...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.ID_PRODUCTO}
                  ID_PRODUCTO={product.ID_PRODUCTO}
                  NOMBRE_PRODUCTO={product.NOMBRE_PRODUCTO}
                  PRECIO_PRODUCTO={product.PRECIO_PRODUCTO}
                  LOGO_PRODUCTO={product.LOGO_PRODUCTO}
                  NOMBRE_MARCA={product.NOMBRE_MARCA}
                  NOMBRE_CATEGORIA={product.NOMBRE_CATEGORIA}
                  ESTADO_PRODUCTO={product.ESTADO_PRODUCTO}
                  DESCRIPCION={product.DESCRIPCION}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No se encontraron productos con los filtros seleccionados
              </p>
              <Button
                variant="link"
                className="mt-4 text-primary"
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