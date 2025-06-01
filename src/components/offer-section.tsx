"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface OfferSectionProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  variant?: "standard" | "countdown"
}

export function OfferSection({ title, subtitle, ctaText, ctaLink, variant = "standard" }: OfferSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 22,
    minutes: 54,
    seconds: 27,
  })

  useEffect(() => {
    if (variant !== "countdown") return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newSeconds = prev.seconds - 1
        const newMinutes = newSeconds < 0 ? prev.minutes - 1 : prev.minutes
        const newHours = newMinutes < 0 ? prev.hours - 1 : prev.hours

        return {
          hours: newHours < 0 ? 23 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds,
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [variant])

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          {variant === "countdown" && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>
                Acaba en: {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          )}
          <Button variant="outline" size="sm" asChild>
            <Link href={ctaLink}>{ctaText}</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="overflow-hidden">
            <CardContent className="p-0">
              <Link href={`/oferta/${item}`} className="block">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={`/placeholder.svg?height=300&width=500&text=Oferta ${item}`}
                    alt={`Oferta ${item}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                    <h3 className="font-medium">Oferta Especial {item}</h3>
                    <p className="text-sm">Hasta 50% de descuento</p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
