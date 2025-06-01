"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Edit, Eye, EyeOff, MapPin, Package, Plus, Save, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface UserData {
  firstName: string
  lastName: string
  email: string
  dni: string
  phone: string
  addresses: Address[]
}

interface Address {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

interface Order {
  id: string
  date: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
}

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData>({
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@email.com",
    dni: "12345678",
    phone: "+51 999 999 999",
    addresses: [
      {
        id: "1",
        name: "Casa",
        address: "Av. Principal 123",
        city: "Lima",
        state: "Lima",
        zipCode: "15001",
        isDefault: true,
      },
      {
        id: "2",
        name: "Trabajo",
        address: "Jr. Comercio 456",
        city: "Lima",
        state: "Lima",
        zipCode: "15002",
        isDefault: false,
      },
    ],
  })

  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 89.97,
      status: "delivered",
      items: [
        {
          id: "1",
          name: "Pintura Sintética Proton SyntoRust Negro",
          quantity: 2,
          price: 29.99,
          image: "/placeholder.svg?height=80&width=80&text=Proton",
        },
        {
          id: "2",
          name: "Pintura Látex Premium Satinado Blanco",
          quantity: 1,
          price: 29.99,
          image: "/placeholder.svg?height=80&width=80&text=Látex",
        },
      ],
    },
    {
      id: "ORD-002",
      date: "2024-01-20",
      total: 34.99,
      status: "shipped",
      items: [
        {
          id: "3",
          name: "Esmalte Automotriz Azul Metálico",
          quantity: 1,
          price: 34.99,
          image: "/placeholder.svg?height=80&width=80&text=Esmalte",
        },
      ],
    },
    {
      id: "ORD-003",
      date: "2024-01-25",
      total: 27.99,
      status: "processing",
      items: [
        {
          id: "4",
          name: "Barniz Marino Protector UV",
          quantity: 1,
          price: 27.99,
          image: "/placeholder.svg?height=80&width=80&text=Barniz",
        },
      ],
    },
  ])

  const [editingField, setEditingField] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [newAddress, setNewAddress] = useState<Omit<Address, "id">>({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  })

  const handleSaveField = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setEditingField(null)
  }

  const handleAddAddress = () => {
    const address: Address = {
      ...newAddress,
      id: Date.now().toString(),
    }
    setUserData((prev) => ({
      ...prev,
      addresses: [...prev.addresses, address],
    }))
    setNewAddress({
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      isDefault: false,
    })
    setIsAddingAddress(false)
  }

  const handleRemoveAddress = (addressId: string) => {
    setUserData((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((addr) => addr.id !== addressId),
    }))
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "processing":
        return "Procesando"
      case "shipped":
        return "Enviado"
      case "delivered":
        return "Entregado"
      case "cancelled":
        return "Cancelado"
      default:
        return "Desconocido"
    }
  }

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span className="font-medium">Mi Perfil</span>
      </nav>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold">
            {userData.firstName.charAt(0)}
            {userData.lastName.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-muted-foreground">{userData.email}</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Direcciones
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
                    <Label>Nombre</Label>
                    {editingField === "firstName" ? (
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          defaultValue={userData.firstName}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSaveField("firstName", e.currentTarget.value)
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.parentElement?.querySelector("input")
                            if (input) handleSaveField("firstName", input.value)
                          }}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingField(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <p className="mt-1">{userData.firstName}</p>
                    )}
                  </div>
                  {editingField !== "firstName" && (
                    <Button variant="ghost" size="sm" onClick={() => setEditingField("firstName")}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <Separator />

                {/* Apellido */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label>Apellido</Label>
                    {editingField === "lastName" ? (
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          defaultValue={userData.lastName}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSaveField("lastName", e.currentTarget.value)
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.parentElement?.querySelector("input")
                            if (input) handleSaveField("lastName", input.value)
                          }}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingField(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <p className="mt-1">{userData.lastName}</p>
                    )}
                  </div>
                  {editingField !== "lastName" && (
                    <Button variant="ghost" size="sm" onClick={() => setEditingField("lastName")}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <Separator />

                {/* Email - No editable */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label>Correo electrónico *</Label>
                    <p className="mt-1 text-muted-foreground">{userData.email}</p>
                    <p className="text-xs text-muted-foreground">Este campo no puede ser modificado</p>
                  </div>
                </div>

                <Separator />

                {/* DNI - No editable */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label>DNI *</Label>
                    <p className="mt-1 text-muted-foreground">{userData.dni}</p>
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
                        <Input
                          defaultValue={userData.phone}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSaveField("phone", e.currentTarget.value)
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.parentElement?.querySelector("input")
                            if (input) handleSaveField("phone", input.value)
                          }}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingField(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <p className="mt-1">{userData.phone}</p>
                    )}
                  </div>
                  {editingField !== "phone" && (
                    <Button variant="ghost" size="sm" onClick={() => setEditingField("phone")}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
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
                  disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
                  onClick={() => {
                    // Aquí iría la lógica para cambiar la contraseña
                    setNewPassword("")
                    setConfirmPassword("")
                  }}
                >
                  Cambiar Contraseña
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Direcciones Tab */}
          <TabsContent value="addresses" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Mis Direcciones</h2>
                <p className="text-muted-foreground">Gestiona tus direcciones de envío</p>
              </div>
              <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Dirección
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Añadir Nueva Dirección</DialogTitle>
                    <DialogDescription>Completa los datos de tu nueva dirección de envío</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address-name">Nombre de la dirección</Label>
                      <Input
                        id="address-name"
                        placeholder="Casa, Trabajo, etc."
                        value={newAddress.name}
                        onChange={(e) => setNewAddress((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-street">Dirección</Label>
                      <Input
                        id="address-street"
                        placeholder="Av. Principal 123"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress((prev) => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address-city">Ciudad</Label>
                        <Input
                          id="address-city"
                          placeholder="Lima"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress((prev) => ({ ...prev, city: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address-state">Departamento</Label>
                        <Input
                          id="address-state"
                          placeholder="Lima"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress((prev) => ({ ...prev, state: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-zip">Código Postal</Label>
                      <Input
                        id="address-zip"
                        placeholder="15001"
                        value={newAddress.zipCode}
                        onChange={(e) => setNewAddress((prev) => ({ ...prev, zipCode: e.target.value }))}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddingAddress(false)}>
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleAddAddress}
                        disabled={
                          !newAddress.name ||
                          !newAddress.address ||
                          !newAddress.city ||
                          !newAddress.state ||
                          !newAddress.zipCode
                        }
                      >
                        Añadir Dirección
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {userData.addresses.map((address) => (
                <Card key={address.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{address.name}</h3>
                          {address.isDefault && <Badge variant="secondary">Predeterminada</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{address.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAddress(address.id)}
                          disabled={address.isDefault}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Compras Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Mis Compras</h2>
              <p className="text-muted-foreground">Historial de tus pedidos y su estado actual</p>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Pedido {order.id}</CardTitle>
                        <CardDescription>
                          Realizado el{" "}
                          {new Date(order.date).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                        <p className="text-lg font-bold mt-1">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {order.items.map((item) => (
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
                            <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          Volver a Comprar
                        </Button>
                      )}
                    </div>
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
