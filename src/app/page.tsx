import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { PromoBanner } from "@/components/promo-banner"
import { FeaturedBrands } from "@/components/featured-brands"
import { ColorPalette } from "@/components/color-palette"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <PromoBanner />
      {/* Categorías Destacadas */}
      <section className="flex flex-col px-4 py-12 md:px-8 section-gradient w-full">
        <h2 className="text-2xl font-bold mb-8 text-center">Nuestras Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Para decoraciones", icon: "🏠", href: "/categoria/decoraciones" },
            { name: "Para Vehículos", icon: "🚗", href: "/categoria/vehiculos" },
            { name: "Para madera", icon: "🪵", href: "/categoria/madera" },
            { name: "Para industrial", icon: "🏭", href: "/categoria/industrial" },
          ].map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="card-ferreteria group flex flex-col items-center p-6 border rounded-lg hover:shadow-lg transition-all bg-white dark:bg-gray-800"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="text-lg font-medium group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="flex flex-col px-4 py-12 md:px-6 bg-muted/20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Productos Destacados</h2>
          <Link
            href="/productos"
            className="text-[#2563eb] dark:text-[#60a5fa] hover:underline font-medium"
          >
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              id: "1",
              name: "Pintura Sintética Proton SyntoRust Negro",
              price: 29.99,
              originalPrice: 39.99,
              discount: 25,
              image: "/placeholder.svg?height=300&width=300&text=Proton+SyntoRust",
              brand: "Proton",
              category: "industrial",
            },
            {
              id: "2",
              name: "Pintura Látex Premium Satinado Blanco",
              price: 24.99,
              originalPrice: 32.99,
              discount: 24,
              image: "/placeholder.svg?height=300&width=300&text=Látex+Premium",
              brand: "Saturno",
              category: "decoraciones",
            },
            {
              id: "3",
              name: "Esmalte Automotriz Azul Metálico",
              price: 34.99,
              originalPrice: 44.99,
              discount: 22,
              image: "/placeholder.svg?height=300&width=300&text=Esmalte+Automotriz",
              brand: "ColorCar",
              category: "vehiculos",
            },
            {
              id: "4",
              name: "Barniz Marino Protector UV",
              price: 27.99,
              originalPrice: 36.99,
              discount: 24,
              image: "/placeholder.svg?height=300&width=300&text=Barniz+Marino",
              brand: "WoodProtect",
              category: "madera",
            },
          ].map((product) => (
            <div key={product.id} className="product-hover">
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                image={product.image}
                brand={product.brand}
                category={product.category}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Paleta de Colores */}
      <ColorPalette />

      {/* Marcas Destacadas */}
      <FeaturedBrands />

      {/* Servicios */}
      <section className="flex flex-col px-4 py-12 md:px-6 section-gradient">
        <h2 className="text-2xl font-bold mb-8 text-center">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Matizado Personalizado",
              description:
                "Creamos el color exacto que necesitas para tu proyecto con nuestra tecnología de última generación.",
              icon: "🎨",
            },
            {
              title: "Asesoría Profesional",
              description:
                "Nuestros expertos te ayudan a elegir los productos adecuados para cada superficie y necesidad.",
              icon: "👨‍🔧",
            },
            {
              title: "Entrega a Domicilio",
              description: "Recibe tus productos directamente en tu hogar o lugar de trabajo sin costo adicional.",
              icon: "🚚",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="card-ferreteria flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-lg transition-all bg-white dark:bg-gray-800"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-medium mb-2 text-[#1d4ed8] dark:text-[#93c5fd] ">
                {service.title}
              </h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section className=" bg-muted/20 py-12">
        <div className="flex flex-col px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Carlos Mendoza",
                role: "Contratista",
                content:
                  "Los matizados de Saturno son los mejores del mercado. Siempre consigo el color exacto que necesito para mis proyectos de construcción.",
              },
              {
                name: "María Rodríguez",
                role: "Diseñadora de Interiores",
                content:
                  "La calidad de sus pinturas decorativas es excepcional. Mis clientes siempre quedan satisfechos con los acabados.",
              },
              {
                name: "Roberto Sánchez",
                role: "Taller Automotriz",
                content:
                  "El servicio de matizado para autos es perfecto. Consiguen igualar cualquier color de fábrica sin importar la antigüedad del vehículo.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="card-ferreteria bg-background p-6 rounded-lg border">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <p className="italic text-muted-foreground mb-4">{testimonial.content}</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#1d4ed8] dark:text-[#93c5fd] ">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col px-4 py-12 md:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Listo para transformar tus espacios?</h2>
          <p className="text-muted-foreground mb-6">
            Encuentra los mejores productos para tus proyectos de pintura y matizado en un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-ferreteria" asChild>
              <Link href="/productos">Ver catálogo</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#3b82f6] text-[#2563eb] hover:bg-[#eff6ff] dark:border-[#93c5fd] dark:text-[#93c5fd] dark:hover:bg-[#1e3a8a]/20"
              asChild
            >
              <Link href="/contacto">Solicitar asesoría</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
