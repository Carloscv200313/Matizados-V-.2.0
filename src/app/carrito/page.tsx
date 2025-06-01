"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/product-card"

// Productos de ejemplo para el carrito
const initialCartItems = [
  {
    id: "1",
    name: "Auriculares Bluetooth Inalámbricos",
    price: 29.99,
    originalPrice: 49.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    name: "Smartwatch Deportivo Resistente al Agua",
    price: 59.99,
    originalPrice: 89.99,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
  },
]

// Productos recomendados
const recommendedProducts = [
  {
    id: "101",
    name: "Cargador Inalámbrico Rápido",
    price: 19.99,
    originalPrice: 29.99,
    discount: 33,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "102",
    name: "Funda Protectora Premium",
    price: 14.99,
    originalPrice: 24.99,
    discount: 40,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "103",
    name: "Cable USB-C Trenzado 2m",
    price: 9.99,
    originalPrice: 15.99,
    discount: 37,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "104",
    name: "Soporte para Smartphone",
    price: 12.99,
    originalPrice: 19.99,
    discount: 35,
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [couponCode, setCouponCode] = useState("")

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 4.99
  const total = subtotal + shipping

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <h1 className="text-2xl font-bold mb-6">Carrito de compra</h1>

      {cartItems.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-4 py-3 flex justify-between">
                <span className="font-medium">Producto</span>
                <span className="font-medium">Total</span>
              </div>
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 relative rounded border overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <Link href={`/producto/${item.id}`} className="font-medium hover:text-primary">
                            {item.name}
                          </Link>
                          <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">${item.price.toFixed(2)} / unidad</div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <div className="h-8 w-10 flex items-center justify-center border-y">{item.quantity}</div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Continuar comprando
                </Link>
              </Button>
              <Button onClick={() => setCartItems([])}>Vaciar carrito</Button>
            </div>
          </div>

          <div>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-4 py-3">
                <span className="font-medium">Resumen del pedido</span>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Código de descuento"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">Aplicar</Button>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full">Proceder al pago</Button>
                <div className="text-xs text-center text-muted-foreground">
                  Impuestos incluidos. El envío se calcula en el pago.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">Tu carrito está vacío</h2>
          <p className="text-muted-foreground mb-6">Parece que aún no has añadido ningún producto a tu carrito</p>
          <Button asChild>
            <Link href="/">Empezar a comprar</Link>
          </Button>
        </div>
      )}

      {/* Recommended Products */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Recomendados para ti</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              image={product.image}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
