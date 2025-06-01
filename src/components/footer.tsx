import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0f1114] text-white">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image src="/logo.png" alt="Matizados Saturno" width={150} height={50} className="h-10 w-auto" />
            </Link>
            <p className="text-gray-400 mb-4">
              Especialistas en pinturas y matizados para todo tipo de superficies. Calidad y precisión garantizada.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categoria/decoraciones" className="text-gray-400 hover:text-white transition-colors">
                  Para decoraciones
                </Link>
              </li>
              <li>
                <Link href="/categoria/vehiculos" className="text-gray-400 hover:text-white transition-colors">
                  Para Vehículos
                </Link>
              </li>
              <li>
                <Link href="/categoria/madera" className="text-gray-400 hover:text-white transition-colors">
                  Para madera
                </Link>
              </li>
              <li>
                <Link href="/categoria/industrial" className="text-gray-400 hover:text-white transition-colors">
                  Para industrial
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Enlaces Útiles</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/nosotros" className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-gray-400 hover:text-white transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="text-gray-400 hover:text-white transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/politicas" className="text-gray-400 hover:text-white transition-colors">
                  Políticas de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-gray-400 hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Av. Principal 123, Lima, Perú</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-400">(01) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-400">info@matizadossaturno.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Matizados Saturno. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
