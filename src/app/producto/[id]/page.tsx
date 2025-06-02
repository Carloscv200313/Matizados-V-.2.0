import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
//import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"

// Simulación de datos de producto
const getProductById = (id: string) => {
  return {
    id,
    name: "Pintura Sintética Proton SyntoRust Negro",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    rating: 4.5,
    reviews: 128,
    stock: 50,
    description:
      "Pintura sintética anticorrosiva de alta calidad para superficies metálicas. Ideal para proteger estructuras, maquinaria y equipos industriales contra la corrosión y el óxido. Acabado mate duradero.",
    features: [
      "Protección anticorrosiva",
      "Secado rápido",
      "Alta resistencia a la intemperie",
      "Excelente adherencia",
      "Acabado uniforme",
      "Fácil aplicación",
    ],
    images: [
      "/placeholder.svg?height=500&width=500&text=SyntoRust",
      "/placeholder.svg?height=500&width=500&text=SyntoRust+2",
      "/placeholder.svg?height=500&width=500&text=SyntoRust+3",
      "/placeholder.svg?height=500&width=500&text=SyntoRust+4",
    ],
    colors: ["Negro", "Gris", "Rojo Óxido"],
    sizes: ["1/4 Galón", "1 Galón", "5 Galones"],
    brand: {
      name: "Proton",
      logo: "/placeholder.svg?height=60&width=120&text=Proton",
      rating: 4.8,
      products: 156,
      foundedYear: 1985,
    },
    category: "industrial",
  }
}

// Productos relacionados
/*const relatedProducts = [
  {
    id: "101",
    name: "Pintura Epóxica para Pisos Gris",
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    image: "/placeholder.svg?height=300&width=300&text=Epóxica+Pisos",
    brand: "IndusPaint",
    category: "industrial",
  },
  {
    id: "102",
    name: "Anticorrosivo Base Agua",
    price: 24.99,
    originalPrice: 34.99,
    discount: 28,
    image: "/placeholder.svg?height=300&width=300&text=Anticorrosivo",
    brand: "Proton",
    category: "industrial",
  },
  {
    id: "103",
    name: "Esmalte Industrial Alta Temperatura",
    price: 32.99,
    originalPrice: 42.99,
    discount: 23,
    image: "/placeholder.svg?height=300&width=300&text=Esmalte+Industrial",
    brand: "IndusPaint",
    category: "industrial",
  },
  {
    id: "104",
    name: "Imprimante para Metal",
    price: 19.99,
    originalPrice: 26.99,
    discount: 26,
    image: "/placeholder.svg?height=300&width=300&text=Imprimante+Metal",
    brand: "Proton",
    category: "industrial",
  },
]*/

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <Link href="/categoria/industrial" className="text-muted-foreground hover:text-foreground">
          Para industrial
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <Link href="/marca/proton" className="text-muted-foreground hover:text-foreground">
          Proton
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span className="font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative border rounded-lg overflow-hidden bg-background">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
            <div className="absolute top-4 left-4">
              <div className="bg-red-600 text-white px-2 py-1 rounded-md text-sm font-medium">-{product.discount}%</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div key={index} className="aspect-square relative border rounded-lg overflow-hidden bg-background">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Vista ${index + 1}`}
                  fill
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs font-normal">
                {product.category}
              </Badge>
              <Badge variant="secondary" className="text-xs font-normal">
                {product.brand.name}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : i < product.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reseñas)
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-muted-foreground">{product.stock} disponibles</span>
            </div>
          </div>

          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg line-through text-muted-foreground">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <Button key={index} variant={index === 0 ? "default" : "outline"} className="rounded-md">
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Tamaño</h3>
              <div className="flex gap-2">
                {product.sizes.map((size, index) => (
                  <Button key={index} variant={index === 0 ? "default" : "outline"} className="rounded-md">
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Cantidad</h3>
              <div className="flex items-center">
                <Button variant="outline" size="icon" className="rounded-r-none">
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="h-10 w-12 flex items-center justify-center border-y">1</div>
                <Button variant="outline" size="icon" className="rounded-l-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Añadir al carrito
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <Heart className="mr-2 h-5 w-5" />
              Añadir a favoritos
            </Button>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Envío gratuito</p>
                <p className="text-xs text-muted-foreground">Para pedidos superiores a $50</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-4">
              <Image
                src={product.brand.logo || "/placeholder.svg"}
                alt={product.brand.name}
                width={120}
                height={60}
                className="h-10 w-auto"
              />
              <div>
                <p className="text-sm font-medium">Fabricado por: {product.brand.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.brand.rating) ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.brand.rating} | {product.brand.products} productos
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                Ver marca
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Compartir
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              Reportar
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              Descripción
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              Especificaciones
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              Reseñas ({product.reviews})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="space-y-4">
              <p>{product.description}</p>
              <h3 className="font-medium">Características principales:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted px-4 py-2 font-medium">Especificaciones técnicas</div>
                  <div className="p-4 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-sm text-muted-foreground">Tipo</span>
                      <span className="text-sm">Pintura sintética anticorrosiva</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-sm text-muted-foreground">Acabado</span>
                      <span className="text-sm">Mate</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-sm text-muted-foreground">Secado al tacto</span>
                      <span className="text-sm">30 minutos</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-sm text-muted-foreground">Secado total</span>
                      <span className="text-sm">24 horas</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-sm text-muted-foreground">Rendimiento</span>
                      <span className="text-sm">10-12 m²/litro</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted px-4 py-2 font-medium">Aplicación</div>
                  <div className="p-4 space-y-2">
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-sm">Aplicar con brocha, rodillo o pistola</li>
                      <li className="text-sm">Diluir con diluyente sintético (10-15%)</li>
                      <li className="text-sm">Aplicar 2-3 capas para mejor protección</li>
                      <li className="text-sm">Tiempo entre capas: 4-6 horas</li>
                      <li className="text-sm">Limpiar herramientas con diluyente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 bg-muted/30 p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{product.rating}</div>
                    <div className="flex justify-center my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-primary text-primary"
                              : i < product.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">Basado en {product.reviews} reseñas</div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="text-sm w-2">{rating}</div>
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${
                                rating === 5
                                  ? "70%"
                                  : rating === 4
                                    ? "20%"
                                    : rating === 3
                                      ? "5%"
                                      : rating === 2
                                        ? "3%"
                                        : "2%"
                              }`,
                            }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground w-8">
                          {rating === 5
                            ? "70%"
                            : rating === 4
                              ? "20%"
                              : rating === 3
                                ? "5%"
                                : rating === 2
                                  ? "3%"
                                  : "2%"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:w-2/3 space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">Cliente{index + 1}</div>
                          <div className="text-xs text-muted-foreground">
                            {index === 0 ? "Hace 2 días" : index === 1 ? "Hace 1 semana" : "Hace 2 semanas"}
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < 5 - index ? "fill-primary text-primary" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        {index === 0
                          ? "Excelente producto, la protección anticorrosiva es muy buena. Lo he usado en varias estructuras metálicas expuestas a la intemperie y ha funcionado perfectamente."
                          : index === 1
                            ? "Buena relación calidad-precio. El secado es rápido como indica y el acabado es uniforme. Recomendable para trabajos industriales."
                            : "Producto aceptable. La aplicación es sencilla y cubre bien, aunque el olor es bastante fuerte. Recomiendo usar en espacios bien ventilados."}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Ver todas las reseñas
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/*relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              ID_PRODUCTO={product.id}
              NOMBRE_PRODUCTO={product.name}
              PRECIO_PRODUCTO={product.price}
              LOGO_PRODUCTO={product.image}
              NOMBRE_MARCA={product.brand}
              NOMBRE_CATEGORIA={product.category}
              ESTADO_PRODUCTO="Disponible"
              DESCRIPCION="Descripción breve del producto relacionado."
            />
          ))*/}
        </div>
      </section>
    </div>
  )
}
