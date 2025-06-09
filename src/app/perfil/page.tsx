"use client"
import { useEffect, useState } from "react"
import { Edit, Eye, EyeOff, Package, Save, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useDataUser } from "@/Provider/Provider.User"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"

interface Producto {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface VentasUser {
  ID_PEDIDO: number;
  Pedido: string;
  FechaPedido: string;
  Estado: string;
  Total: number;
  DetalleProductos: string;
}

export default function ProfilePage() {
  const { user, setUser } = useDataUser()
  const [ventasUser, setVentasUser] = useState<VentasUser[]>([])
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null)

  useEffect(() => {
    if (user) {
      const fetchVentas = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/user/ventas/${user?.ID_USUARIO}`)
          const data = await response.json()
          setVentasUser(data)
        } catch (error) {
          console.error("Error al obtener ventas:", error)
          toast.error("No se pudieron cargar tus compras")
        }
      }
      fetchVentas()
    }
  }, [user])

  const [editingField, setEditingField] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [addressForm, setAddressForm] = useState({
    address: user?.DIRECCION_DETALLE || '',
    department: user?.DEPARTAMENTO || '',
    district: user?.DISTRITO || '',
    postalCode: user?.CODIGO_POSTAL || ''
  })

  const parseDetalleProductos = (detalleString: string): Producto[] => {
    if (!detalleString) return [];

    try {
      const productosArray = detalleString.split('\n\n').filter(item => item.trim() !== '');

      return productosArray.map(productoStr => {
        const lineas = productoStr.split('\n').filter(linea => linea.trim() !== '');

        if (lineas.length >= 2) {
          const nombreProducto = lineas[0].trim();
          const cantidadPrecioMatch = lineas[1].match(/Cantidad:\s*(\d+)\s*×\s*\$\s*([\d.]+)/);

          if (cantidadPrecioMatch) {
            return {
              id: Math.random().toString(36).substr(2, 9),
              name: nombreProducto,
              quantity: parseInt(cantidadPrecioMatch[1]),
              price: parseFloat(cantidadPrecioMatch[2])
            };
          }
        }
        return null;
      }).filter((producto): producto is Producto => producto !== null);
    } catch (error) {
      console.error('Error parsing product details:', error);
      return [];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAGADO": return "bg-yellow-100 text-yellow-800"
      case "EN PROCESO": return "bg-blue-100 text-blue-800"
      case "CANCELADO": return "bg-red-100 text-red-800"
      case "ENTREGADO": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "PAGADO": return "Pendiente"
      case "EN PROCESO": return "Procesando"
      case "CANCELADO": return "Cancelado"
      case "ENTREGADO": return "Entregado"
      default: return status
    }
  }

  const toggleOrderExpansion = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddressForm(prev => ({ ...prev, [name]: value }))
  }

  const updateUserField = async (field: string, value: string) => {
    if (!user) return;

    setIsUpdating(true)
    try {
      let endpoint = ''
      let body = {}

      switch (field) {
        case 'NombreCompleto':
          endpoint = 'cambiarNombre'
          body = { nuevo_nombre: value }
          break
        case 'phone':
          endpoint = 'cambiarTelefono'
          body = { nuevo_telefono: value }
          break
        default:
          throw new Error('Campo no válido')
      }

      const toastId = toast.loading("Actualizando información...")

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/user/${endpoint}/${user.ID_USUARIO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        throw new Error('Error al actualizar')
      }

      setUser({
        ...user,
        ...(field === 'NombreCompleto' && { NOMBRE_USUARIO: value }),
        ...(field === 'phone' && { TELEFONO_USUARIO: value })
      })

      toast.success("Información actualizada correctamente", { id: toastId })
    } catch (error) {
      console.error(`Error al actualizar ${field}:`, error)
      toast.error("No se pudo actualizar la información")
    } finally {
      setIsUpdating(false)
      setEditingField(null)
    }
  }

  const updateAddress = async () => {
    if (!user) return;

    setIsUpdating(true)
    try {
      const toastId = toast.loading("Actualizando dirección...")

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/user/cambiarDireccion/${user.ID_USUARIO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          direccion: addressForm.address,
          departamento: addressForm.department,
          distrito: addressForm.district,
          codigo_postal: addressForm.postalCode
        })
      })

      if (!response.ok) {
        throw new Error('Error al actualizar la dirección')
      }

      setUser({
        ...user,
        DIRECCION_DETALLE: addressForm.address,
        DEPARTAMENTO: addressForm.department,
        DISTRITO: addressForm.district,
        CODIGO_POSTAL: addressForm.postalCode
      })

      setModalOpen(false)
      toast.success("Dirección actualizada correctamente", { id: toastId })
    } catch (error) {
      console.error("Error al actualizar dirección:", error)
      toast.error("No se pudo actualizar la dirección")
    } finally {
      setIsUpdating(false)
    }
  }

  const changePassword = async () => {
    if (!user || newPassword !== confirmPassword) return;

    setIsUpdating(true)
    try {
      const toastId = toast.loading("Actualizando contraseña...")

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/user/cambiarContrasena/${user.ID_USUARIO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nueva_contrasena: newPassword
        })
      })

      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña')
      }

      setNewPassword("")
      setConfirmPassword("")
      toast.success("Contraseña actualizada correctamente", { id: toastId })
    } catch (error) {
      console.error("Error al cambiar contraseña:", error)
      toast.error("No se pudo cambiar la contraseña")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="flex flex-col px-4 py-6 md:px-6 md:py-8">
      <div className="w-2/3 mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold">
            {user?.NOMBRE_USUARIO && (() => {
              const partes = user.NOMBRE_USUARIO.trim().split(" ");
              const inicialNombre = partes[0]?.charAt(0).toUpperCase() || "";
              const inicialApellido = partes[2]?.charAt(0).toUpperCase() || "";
              return inicialNombre + inicialApellido;
            })()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user?.NOMBRE_USUARIO}</h1>
            <p className="text-muted-foreground">{user?.CORREO_USUARIO}</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Mis Compras
            </TabsTrigger>
          </TabsList>

          {/* Perfil Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                  Gestiona tu información personal. Los campos marcados con * no pueden ser modificados.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Nombre */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label>Nombre Completo</Label>
                    {editingField === "NombreCompleto" ? (
                      <div className="flex items-center gap-2 mt-1">
                        <Input defaultValue={user?.NOMBRE_USUARIO} />
                        <Button
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.parentElement?.querySelector("input")
                            if (input) updateUserField("NombreCompleto", input.value)
                          }}
                          disabled={isUpdating}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingField(null)}
                          disabled={isUpdating}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <p className="mt-1">{user?.NOMBRE_USUARIO}</p>
                    )}
                  </div>
                  {editingField !== "NombreCompleto" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingField("NombreCompleto")}
                      disabled={isUpdating}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Separator />

                {/* Email - No editable */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label>Correo electrónico *</Label>
                    <p className="mt-1 text-muted-foreground">{user?.CORREO_USUARIO}</p>
                    <p className="text-xs text-muted-foreground">Este campo no puede ser modificado</p>
                  </div>
                </div>

                <Separator />

                {/* DNI - No editable */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label>DNI *</Label>
                    <p className="mt-1 text-muted-foreground">{user?.DNI_USUARIO}</p>
                    <p className="text-xs text-muted-foreground">Este campo no puede ser modificado</p>
                  </div>
                </div>

                <Separator />

                {/* Teléfono */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label>Teléfono</Label>
                    {editingField === "phone" ? (
                      <div className="flex items-center gap-2 mt-1">
                        <Input defaultValue={user?.TELEFONO_USUARIO} />
                        <Button
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.parentElement?.querySelector("input")
                            if (input) updateUserField("phone", input.value)
                          }}
                          disabled={isUpdating}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingField(null)}
                          disabled={isUpdating}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <p className="mt-1">{user?.TELEFONO_USUARIO}</p>
                    )}
                  </div>
                  {editingField !== "phone" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingField("phone")}
                      disabled={isUpdating}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Dirección */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Dirección</CardTitle>
                    <CardDescription>Información de tu ubicación</CardDescription>
                  </div>
                  <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" disabled={isUpdating}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar toda la dirección
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Editar dirección completa</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Dirección</Label>
                          <Input
                            id="address"
                            name="address"
                            value={addressForm.address}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="department">Departamento</Label>
                            <Input
                              id="department"
                              name="department"
                              value={addressForm.department}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="district">Distrito</Label>
                            <Input
                              id="district"
                              name="district"
                              value={addressForm.district}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Código Postal</Label>
                          <Input
                            id="postalCode"
                            name="postalCode"
                            value={addressForm.postalCode}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setModalOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={updateAddress} disabled={isUpdating}>
                          {isUpdating ? "Guardando..." : "Guardar cambios"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label>Dirección</Label>
                    <p className="mt-1">{user?.DIRECCION_DETALLE}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label>Departamento</Label>
                    <p className="mt-1">{user?.DEPARTAMENTO}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label>Distrito</Label>
                    <p className="mt-1">{user?.DISTRITO}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label>Código Postal</Label>
                    <p className="mt-1">{user?.CODIGO_POSTAL}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cambiar Contraseña */}
            <Card>
              <CardHeader>
                <CardTitle>Seguridad</CardTitle>
                <CardDescription>Cambia tu contraseña para mantener tu cuenta segura</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-new-password">Confirmar Nueva Contraseña</Label>
                  <Input
                    id="confirm-new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {newPassword !== confirmPassword && confirmPassword && (
                    <p className="text-sm text-red-500">Las contraseñas no coinciden</p>
                  )}
                </div>
                <Button
                  disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword || isUpdating}
                  onClick={changePassword}
                >
                  {isUpdating ? "Procesando..." : "Cambiar Contraseña"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compras Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Mis Compras</h2>
              <p className="text-muted-foreground">Historial de tus pedidos y su estado actual</p>
            </div>
            {
              ventasUser.length === 0 && (
                <Card className="flex flex-col items-center justify-center">
                  <Package className="h-16 w-16 text-muted-foreground" />
                  <p className="text-lg font-medium text-muted-foreground">No tienes compras registradas</p>
                  <p className="text-sm text-muted-foreground text-center max-w-md">
                    Cuando realices tu primera compra, aparecerá aquí tu historial de pedidos.
                  </p>
                  <Button variant="outline" className="mt-4">
                    Ver catálogo de productos
                  </Button>
                </Card>
              )
            }
            <div className="space-y-4">
              {ventasUser.map((order) => (
                <Card key={order.ID_PEDIDO}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Pedido {order.Pedido}</CardTitle>
                        <CardDescription>
                          Realizado el{" "}
                          {new Date(order.FechaPedido).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.Estado)}>
                          {getStatusText(order.Estado)}
                        </Badge>
                        <p className="text-lg font-bold mt-1">${order.Total.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleOrderExpansion(order.ID_PEDIDO)}
                      >
                        {expandedOrder === order.ID_PEDIDO ? 'Ocultar Detalles' : 'Ver Detalles'}
                      </Button>
                    </div>
                    <Separator className="my-4" />
                    {expandedOrder === order.ID_PEDIDO && (
                      <div className="space-y-3">
                        {parseDetalleProductos(order.DetalleProductos).map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                              <Package className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Cantidad: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                ${(item.quantity * item.price).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}