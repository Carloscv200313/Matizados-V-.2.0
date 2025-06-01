import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function PromoBanner() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Imagen_fondo.jpg"
          alt="Matizados Saturno"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>

      <div className="container relative z-10 px-4 py-16 md:py-24 md:px-6">
        <div className="max-w-lg">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Expertos en Matizados y Pinturas
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Encuentra el color perfecto para cada superficie. Calidad profesional para tus proyectos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/productos">Ver Catálogo</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
              asChild
            >
              <Link href="/servicios">Nuestros Servicios</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
