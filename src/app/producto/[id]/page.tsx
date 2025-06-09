"use client"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, Star, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useDataProductos } from "@/Provider/Provider.Carrito"

// Dentro del componente

interface Product {
  ID_PRODUCTO: number
  NOMBRE_PRODUCTO: string
  PRECIO_PRODUCTO: number
  LOGO_PRODUCTO: string
  DESCRIPCION: string
  ID_MARCA: number
  NOMBRE_MARCA: string
  LOGO_MARCA: string
  ID_CATEGORIA: number
  NOMBRE_CATEGORIA: string
  ID_ESTADO_PRODUCTO: number
  NOMBRE_ESTADO: string
}

interface Color {
  ID_COLOR: number
  NOMBRE_COLOR: string
  CODIGO_COLOR: string
  STOCK: number
}

export default function ProductPage() {
  const {productos,setProductos} = useDataProductos()
  const [product, setProduct] = useState<Product>()
  const [colores, setColores] = useState<Color[]>([])
  const [colorSeleccionado, setColorSeleccionado] = useState<Color | null>(null)
  const [cantidad, setCantidad] = useState<number>(1)
  const [mostrarTodosLosColores, setMostrarTodosLosColores] = useState(false)
  const router = useRouter();
  const coloresVisibles = mostrarTodosLosColores ? colores : colores.slice(0, 15)
  const params = useParams()
  const { id } = params

  useEffect(() => {
    const ObtenerProductoID = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/productos/listarProducto/${id}`)
        if (!response.ok) throw new Error('Error al obtener el producto')
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    const ObtenerColoresProducto = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/productos/listarProductoColor/${id}`)
        if (!response.ok) throw new Error('Error al obtener los colores del producto')
        const data = await response.json()
        setColores(data)
      } catch (error) {
        console.error('Error fetching product colors:', error)
      }
    }

    ObtenerProductoID()
    ObtenerColoresProducto()
  }, [id])

const agregarAlCarrito = () => {
  if (!product || !colorSeleccionado) {
    alert("Selecciona un color antes de continuar.")
    return
  }
  
  const itemCarrito = {
    id: product.ID_PRODUCTO,
    nombre: product.NOMBRE_PRODUCTO,
    precio: product.PRECIO_PRODUCTO,
    color: colorSeleccionado,
    cantidad: cantidad,
  }
  
  // Corrección: spread correcto de los productos existentes
  setProductos([...(productos ?? []), itemCarrito])
  
  // Usa router.push en lugar de redirect si quieres navegar después
  router.push("/productos")
}
  return (
    <div className="flex flex-col px-4 py-6 md:px-6 md:py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-square relative border rounded-lg overflow-hidden bg-background">
            <Image
              src={"/logo.png"}
              alt={product?.NOMBRE_PRODUCTO || "Producto"}
              fill
              className="object-contain p-4"
            />
            <div className="absolute top-4 left-4">
              <div className="bg-red-600 text-white px-2 py-1 rounded-md text-sm font-medium">-{10}%</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs font-normal">
                {product?.NOMBRE_CATEGORIA}
              </Badge>
              <Badge variant="secondary" className="text-xs font-normal">
                {product?.NOMBRE_MARCA}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold">{product?.NOMBRE_PRODUCTO}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < 5 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {10} ({50} reseñas)
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-muted-foreground">{100} disponibles</span>
            </div>
          </div>

          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">${product?.PRECIO_PRODUCTO}</span>
            {product?.PRECIO_PRODUCTO && (
              <span className="text-lg line-through text-muted-foreground">${product?.PRECIO_PRODUCTO}</span>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {coloresVisibles.map((color) => (
                  <Button
                    key={color.ID_COLOR}
                    variant={colorSeleccionado?.ID_COLOR === color.ID_COLOR ? "default" : "outline"}
                    className={`rounded-md cursor-pointer`}
                    onClick={() => setColorSeleccionado(color)}
                  >
                    {color.NOMBRE_COLOR} <span className="block w-4 h-4 rounded-full" style={{ backgroundColor: color.CODIGO_COLOR }}></span>
                  </Button>
                ))}
              </div>

              {colores.length > 4 && (
                <Button
                  variant="link"
                  className="px-0 text-sm"
                  onClick={() => setMostrarTodosLosColores(prev => !prev)}
                >
                  {mostrarTodosLosColores ? "Ver menos" : "Ver más"}
                </Button>
              )}
            </div>

            <div>
              <h3 className="font-medium mb-2">Cantidad</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-r-none"
                    onClick={() => setCantidad(c => Math.max(1, c - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="h-10 w-12 flex items-center justify-center border-y">{cantidad}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-l-none"
                    onClick={() => setCantidad(c => c + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <Button size="lg" className="cursor-pointer w-full h-11 text-base font-medium bg-gradient-to-r from-[#3b82f6] to-[#f97316] hover:from-[#2563eb] hover:to-[#ea580c] text-white" onClick={agregarAlCarrito}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Añadir al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
