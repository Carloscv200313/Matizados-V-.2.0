"use client"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useDataProductos } from "@/Provider/Provider.Carrito"
import { useDataUser } from "@/Provider/Provider.User"
import { useState } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
export default function CartPage() {
  const { productos, setProductos } = useDataProductos()
  const { user } = useDataUser()

  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState<string>("1")
  const [tipoEntregaSeleccionado, setTipoEntregaSeleccionado] = useState<string>("1")
  const [tipoReciboSeleccionado, setTipoReciboSeleccionado] = useState<string>("1")

  // Calcular totales
  const subtotal = productos?.reduce((sum, item) => sum + (item.precio * item.cantidad), 0) || 0
  const shipping = subtotal > 100 ? 0 : 15 // Envío gratis para compras mayores a $100
  const total = subtotal + shipping

  const removeItem = (id: number) => {
    if (!productos) return
    const updatedItems = productos.filter(item => item.id !== id)
    setProductos(updatedItems.length > 0 ? updatedItems : null)
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (!productos || newQuantity < 1) return

    const updatedItems = productos.map(item =>
      item.id === id ? { ...item, cantidad: newQuantity } : item
    )
    setProductos(updatedItems)
  }

  const openModal = () => {
    if (!productos || productos.length === 0) {
      toast.warning("Tu carrito está vacío")
      return
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const handleCheckout = async () => {
    if (!metodoPagoSeleccionado || !tipoEntregaSeleccionado) {
      toast.warning("Por favor selecciona método de pago y tipo de entrega")
      return
    }

    try {
      // Preparar los datos del carrito para el procedimiento
      const ventaData = {
        ID_USUARIO: user?.ID_USUARIO,
        ID_METODO_PAGO: metodoPagoSeleccionado,
        ID_RECIBO: tipoReciboSeleccionado,
        ID_ENTREGA: tipoEntregaSeleccionado,
        PRODUCTOS: productos?.map(item => ({
          ID_PRODUCTO: item.id,
          CANTIDAD: item.cantidad,
          PRECIO_UNID: item.precio,
          DESCUENTO_UNITARIO: 0
        }))
      };
      console.log('Datos de venta:', ventaData);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/user/registrarVenta/${user?.ID_USUARIO}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ventaData)
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Error al procesar la venta');
      }
      setProductos(null);
      localStorage.removeItem("carrito");
      toast.success('Compra realizada con éxito');
      closeModal();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al procesar el pago');
    }
  };

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <h1 className="text-2xl font-bold mb-6">Carrito de compra</h1>

      {productos && productos.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-4 py-3 flex justify-between">
                <span className="font-medium">Producto</span>
                <span className="font-medium">Total</span>
              </div>
              <div className="divide-y">
                {productos.map((item) => (
                  <div key={`${item.id}-${item.color?.ID_COLOR}`} className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 relative rounded border overflow-hidden flex-shrink-0">
                        <Image
                          src="/logo.png"
                          alt={item.nombre}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <Link href={`/producto/${item.id}`} className="font-medium hover:text-primary">
                            {item.nombre}
                          </Link>
                          <div className="font-medium">${(item.precio * item.cantidad).toFixed(2)}</div>
                        </div>
                        {item.color && (
                          <div className=" flex items-center gap-2 text-sm text-muted-foreground">
                            Color: {item.color.NOMBRE_COLOR} <span className="block w-4 h-4 rounded-full" style={{ backgroundColor: item.color.CODIGO_COLOR }}></span>
                          </div>
                        )}
                        <div className="text-sm text-muted-foreground mt-1">${item.precio.toFixed(2)} / unidad</div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                              disabled={item.cantidad <= 1}
                            >
                              -
                            </Button>
                            <div className="h-8 w-10 flex items-center justify-center border-y">
                              {item.cantidad}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                            >
                              +
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
                <Link href="/productos" className="flex items-center">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Continuar comprando
                </Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setProductos(null)
                  localStorage.removeItem("carrito")
                  toast.success("Carrito vaciado")
                }}
              >
                Vaciar carrito
              </Button>
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
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full" onClick={openModal}>Proceder al pago</Button>
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
            <Link href="/productos">Empezar a comprar</Link>
          </Button>
        </div>
      )}

      {/* Modal de Confirmación */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Confirmar Pedido</DialogTitle>
          </DialogHeader>

          {/* Resumen de Productos */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Productos en tu carrito:</h3>
            <div className="border rounded-lg divide-y">
              {productos?.map((item) => (
                <div key={item.id} className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.cantidad} x ${item.precio.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Métodos de Pago */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Método de Pago:</h3>
            <RadioGroup
              value={metodoPagoSeleccionado}
              onValueChange={setMetodoPagoSeleccionado}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem value="1" id="bcp" className="peer sr-only" />
                <Label
                  htmlFor="bcp"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>BCP</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="2" id="yape" className="peer sr-only" />
                <Label
                  htmlFor="yape"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Yape</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="3" id="paypal" className="peer sr-only" />
                <Label
                  htmlFor="paypal"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>PayPal</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Tipo de Entrega */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Tipo de Entrega:</h3>
            <RadioGroup
              value={tipoEntregaSeleccionado}
              onValueChange={setTipoEntregaSeleccionado}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="1" id="delivery" className="peer sr-only" />
                <Label
                  htmlFor="delivery"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Delivery</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="2" id="tienda" className="peer sr-only" />
                <Label
                  htmlFor="tienda"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Despacho en Tienda</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Tipo de Recibo */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Tipo de Recibo:</h3>
            <RadioGroup
              value={tipoReciboSeleccionado}
              onValueChange={setTipoReciboSeleccionado}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="1" id="boleta" className="peer sr-only" />
                <Label
                  htmlFor="boleta"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Boleta</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="2" id="factura" className="peer sr-only" />
                <Label
                  htmlFor="factura"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Factura</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Resumen Total */}
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Envío:</span>
              <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Cancelar
            </Button>
            <Button onClick={handleCheckout}>
              Confirmar Compra
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
