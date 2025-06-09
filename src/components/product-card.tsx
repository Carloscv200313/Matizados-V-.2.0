import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  ID_PRODUCTO: number
  NOMBRE_PRODUCTO: string
  NOMBRE_MARCA: string
  NOMBRE_CATEGORIA: string
  PRECIO_PRODUCTO: number
  LOGO_PRODUCTO: string
  ESTADO_PRODUCTO: string
  DESCRIPCION: string
}
export function ProductCard({
  ID_PRODUCTO,
  NOMBRE_PRODUCTO,
  PRECIO_PRODUCTO,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  LOGO_PRODUCTO,
  NOMBRE_MARCA,
  NOMBRE_CATEGORIA,
}: ProductCardProps) {
  return (
    <Link
      href={`/producto/${ID_PRODUCTO}`}
      className={cn(
        "card-ferreteria group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-background transition-all hover:shadow-lg"
      )}
    >
      {NOMBRE_MARCA && (
        <div className="absolute right-2 top-2 z-10">
          <Badge variant="secondary" className="text-xs badge-azul">
            {NOMBRE_MARCA}
          </Badge>
        </div>
      )}
      <div className="aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800 p-4">
        <Image
          src={"/logo.png"}
          alt={NOMBRE_PRODUCTO}
          width={300}
          height={300}
          className="h-full w-full object-contain transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        {NOMBRE_CATEGORIA && (
          <div className="mb-2">
            <span className="text-xs text-[#2563eb] dark:text-[#93c5fd] capitalize font-medium">
              {NOMBRE_CATEGORIA}
            </span>
          </div>
        )}
        <h3 className="mb-2 line-clamp-2 text-sm font-medium group-hover:text-[#2563eb] dark:group-hover:text-[#93c5fd] transition-colors">
          {NOMBRE_PRODUCTO}
        </h3>
        <div className="mt-auto">
          <div className="flex items-end gap-2 mb-3">
            <span className="text-lg font-bold text-[#1d4ed8] dark:text-[#bfdbfe]">
              ${PRECIO_PRODUCTO.toFixed(2)}
            </span>
          </div>
          <Button
            size="sm"
            className="w-full gap-2 bg-gradient-to-r from-[#3b82f6] to-[#f97316] hover:from-[#2563eb] hover:to-[#ea580c] text-white"
          >
            Ver Producto
          </Button>
        </div>
      </div>
    </Link>
  )
}
