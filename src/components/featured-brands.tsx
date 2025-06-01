import Link from "next/link"
import Image from "next/image"

export function FeaturedBrands() {
  const brands = [
    { name: "Proton", logo: "/placeholder.svg?height=80&width=160&text=Proton", href: "/marca/proton" },
    { name: "Saturno", logo: "/placeholder.svg?height=80&width=160&text=Saturno", href: "/marca/saturno" },
    { name: "ColorCar", logo: "/placeholder.svg?height=80&width=160&text=ColorCar", href: "/marca/colorcar" },
    { name: "WoodProtect", logo: "/placeholder.svg?height=80&width=160&text=WoodProtect", href: "/marca/woodprotect" },
    { name: "IndusPaint", logo: "/placeholder.svg?height=80&width=160&text=IndusPaint", href: "/marca/induspaint" },
  ]

  return (
    <section className="flex flex-col px-4 py-12 md:px-6">
      <h2 className="text-2xl font-bold mb-8 text-center">Nuestras Marcas</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {brands.map((brand, index) => (
          <Link
            key={index}
            href={brand.href}
            className="flex items-center justify-center p-6 border rounded-lg hover:border-primary hover:shadow-md transition-all bg-background"
          >
            <Image
              src={brand.logo || "/placeholder.svg"}
              alt={brand.name}
              width={160}
              height={80}
              className="max-h-12 w-auto"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
