import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  brand?: string
  category?: string
  className?: string
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  discount,
  image,
  brand,
  category,
  className,
}: ProductCardProps) {
  return (
    <Link
      href={`/producto/${id}`}
      className={cn(
        "card-ferreteria group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-background transition-all hover:shadow-lg",
        className,
      )}
    >
      {discount && (
        <div className="absolute left-2 top-2 z-10 rounded-full badge-naranja px-2 py-1 text-xs font-medium text-white">
          -{discount}%
        </div>
      )}
      {brand && (
        <div className="absolute right-2 top-2 z-10">
          <Badge variant="secondary" className="text-xs badge-azul">
            {brand}
          </Badge>
        </div>
      )}
      <div className="aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800 p-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={300}
          height={300}
          className="h-full w-full object-contain transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        {category && (
          <div className="mb-2">
            <span className="text-xs text-[#2563eb] dark:text-[#93c5fd] capitalize font-medium">
              {category}
            </span>
          </div>
        )}
        <h3 className="mb-2 line-clamp-2 text-sm font-medium group-hover:text-[#2563eb] dark:group-hover:text-[#93c5fd] transition-colors">
          {name}
        </h3>
        <div className="mt-auto">
          <div className="flex items-end gap-2 mb-3">
            <span className="text-lg font-bold text-[#1d4ed8] dark:text-[#bfdbfe]">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-xs line-through text-muted-foreground">${originalPrice.toFixed(2)}</span>
            )}
          </div>
          <Button
            size="sm"
            className="w-full gap-2 bg-gradient-to-r from-[#3b82f6] to-[#f97316] hover:from-[#2563eb] hover:to-[#ea580c] text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            Añadir
          </Button>
        </div>
      </div>
    </Link>
  )
}
