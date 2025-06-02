import Link from "next/link"
import Image from "next/image"

export function FeaturedBrands() {
  const brands = [
    { name: "CPP", logo: "/CPP_LOGO.png", href: "/marca/cpp" },
    { name: "ANYPSA", logo: "/ANYPSA_LOGO.png", href: "/marca/anypsa" },
    { name: "3T", logo: "/3T_LOGO.png", href: "/marca/3t" },
    { name: "LOZARO", logo: "/LOZARO_LOGO.png", href: "/marca/losaro" },
  ]
  
  return (
    <section className="flex flex-col px-4 py-12 md:px-6">
      <h2 className="text-2xl font-bold mb-8 text-center">Nuestras Marcas</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {brands.map((brand, index) => (
          <Link
            key={index}
            href={brand.href}
            className="flex items-center justify-center p-6 border rounded-lg hover:border-primary hover:shadow-md transition-all bg-background"
          >
            <Image
              src={brand.logo || "/placeholder.svg"}
              alt={brand.name}
              width={500}
              height={300}
              className="object-contain h-20 w-auto"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
