"use client"
import type React from "react"
import { useState } from "react"
import { Mail, MapPin, Phone, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams } from "next/navigation"

export default function ContactPage() {
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get("servicio")
  const categoryParam = searchParams.get("categoria")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: serviceParam || categoryParam || "",
    message: "",
    service: serviceParam || "",
    category: categoryParam || "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      console.log("Datos del formulario:", formData)
    }, 1500)
  }

  return (
    <div className="flex flex-col px-4 py-6 md:px-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Contáctanos</h1>
            <p className="text-muted-foreground">
              Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo lo antes posible.
            </p>
          </div>

          {isSubmitted ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <div className="mx-auto bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Send className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">¡Mensaje Enviado!</h3>
                  <p className="mb-6">
                    Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes
                    posible.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>Enviar otro mensaje</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Tu nombre"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+51 999 999 999"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service">Servicio</Label>
                  <Select value={formData.service} onValueChange={(value) => handleSelectChange("service", value)}>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matizado">Matizado Personalizado</SelectItem>
                      <SelectItem value="asesoria">Asesoría Profesional</SelectItem>
                      <SelectItem value="entrega">Entrega a Domicilio</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="decoraciones">Para decoraciones</SelectItem>
                      <SelectItem value="vehiculos">Para Vehículos</SelectItem>
                      <SelectItem value="madera">Para madera</SelectItem>
                      <SelectItem value="industrial">Para industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Asunto *</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Asunto de tu mensaje"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Escribe tu mensaje aquí..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          )}
        </div>

        {/* Contact Info & Map */}
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Información de Contacto</h2>
            <p className="text-muted-foreground">
              Puedes contactarnos directamente o visitarnos en nuestra tienda principal.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Dirección</h3>
                <p className="text-muted-foreground">Av. Principal 123, Lima, Perú</p>
                <p className="text-muted-foreground">Referencia: Frente al Parque Central</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Teléfono</h3>
                <p className="text-muted-foreground">(01) 123-4567</p>
                <p className="text-muted-foreground">+51 999 999 999 (WhatsApp)</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Correo Electrónico</h3>
                <p className="text-muted-foreground">info@matizadossaturno.com</p>
                <p className="text-muted-foreground">ventas@matizadossaturno.com</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Horario de Atención</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Lunes - Viernes</span>
                <span>8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sábados</span>
                <span>9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Domingos y Feriados</span>
                <span>Cerrado</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border h-[300px] relative">
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              {/* Contenedor del mapa */}
              <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://maps.google.com/maps?q=TÚ_DIRECCIÓN&z=15&output=embed"
                >
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sucursales */}
      <section className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Nuestras Sucursales</h2>
          <p className="text-muted-foreground">Visítanos en cualquiera de nuestras tiendas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Tienda Principal</h3>
              <p className="text-muted-foreground mb-4">Av. Principal 123, Lima</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>(01) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>principal@matizadossaturno.com</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Sucursal Norte</h3>
              <p className="text-muted-foreground mb-4">Jr. Los Pinos 456, Los Olivos</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>(01) 234-5678</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>norte@matizadossaturno.com</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Sucursal Sur</h3>
              <p className="text-muted-foreground mb-4">Av. Los Héroes 789, San Juan</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>(01) 345-6789</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>sur@matizadossaturno.com</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
