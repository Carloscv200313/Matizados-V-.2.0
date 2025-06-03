"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, User, Menu, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useDataUser } from "@/Provider/Provider.User"

export function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, setUser, isInitialized } = useDataUser()
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const CerrarSesion = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const categories = [
    { name: "Para decoraciones", href: "/categoria/decoraciones" },
    { name: "Para Vehículos", href: "/categoria/vehiculos" },
    { name: "Para madera", href: "/categoria/madera" },
    { name: "Para industrial", href: "/categoria/industrial" }
  ]

  const brands = [
    { name: "CPP", href: "/marca/cpp" },
    { name: "ANYPSA", href: "/marca/anypsa" },
    { name: "3T", href: "/marca/3t" },
    { name: "LOSARO", href: "/marca/losaro" }
  ]

  // Mostrar estado de carga mientras no esté montado
  if (!isMounted || !isInitialized) {
    return (
      <header className="ferreteria-header sticky top-0 z-50 shadow-lg">
        <div className="container flex gap-8 h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4 md:gap-8">
            <Button variant="ghost" size="icon" className="md:hidden text-white opacity-0">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Image
                src="/logoCompletoHorizontal-02.png"
                alt="Matizados Saturno"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="relative">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </header>
    )
  }
  return (
    <header className="ferreteria-header sticky top-0 z-50 shadow-lg">
      {/* Mobile Search Bar (when activated) */}
      {mobileSearchOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-2 border-b">
          <div className="relative flex items-center">
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="w-full pl-4 pr-10 rounded-md focus-visible:ring-[#3b82f6]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 text-gray-500 hover:text-gray-700"
              onClick={() => setMobileSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="container flex gap-8 h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile Menu Button and Logo */}
        <div className="flex items-center gap-4 md:gap-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            >
              <div className="flex flex-col h-full py-4">
                <div className="mb-6 px-4">
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/logoCompletoHorizontal-02.png"
                      alt="Matizados Saturno"
                      width={150}
                      height={50}
                      className="h-10 w-auto"
                    />
                  </Link>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 overflow-y-auto">
                  <div className="space-y-1 px-2">
                    <Link
                      href="/productos"
                      className="block px-3 py-2 rounded-md font-medium hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20"
                    >
                      Catálogo
                    </Link>

                    <div className="py-2">
                      <h3 className="px-3 mb-2 text-xs uppercase text-gray-500 font-semibold">Categorías</h3>
                      <div className="space-y-1">
                        {categories.map((category) => (
                          <Link
                            key={category.href}
                            href={category.href}
                            className="block px-3 py-2 rounded-md hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="py-2">
                      <h3 className="px-3 mb-2 text-xs uppercase text-gray-500 font-semibold">Marcas</h3>
                      <div className="space-y-1">
                        {brands.map((brand) => (
                          <Link
                            key={brand.href}
                            href={brand.href}
                            className="block px-3 py-2 rounded-md hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20"
                          >
                            {brand.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/servicios"
                      className="block px-3 py-2 rounded-md font-medium hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20"
                    >
                      Servicios
                    </Link>
                  </div>
                </nav>

                {/* User Section */}
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 px-2">
                  {user ? (
                    <div className="space-y-1">
                      <div className="px-3 py-2 font-medium">{user.NOMBRE_USUARIO}</div>
                      <Link
                        href="/perfil"
                        className="block px-3 py-2 rounded-md hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20"
                      >
                        Mi Perfil
                      </Link>
                      <Link
                        href="/pedidos"
                        className="block px-3 py-2 rounded-md hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20"
                      >
                        Mis Pedidos
                      </Link>
                      <button
                        onClick={CerrarSesion}
                        className="block w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Link
                        href="/auth/login"
                        className="block px-3 py-2 rounded-md font-medium hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20"
                      >
                        Iniciar Sesión
                      </Link>
                      <Link
                        href="/auth/register"
                        className="block px-3 py-2 rounded-md font-medium hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20"
                      >
                        Registrarse
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Image
              src="/logoCompletoHorizontal-02.png"
              alt="Matizados Saturno"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/productos" className="nav-link py-2 font-medium">
            Catálogo
          </Link>

          <div className="relative group">
            <button className="nav-link flex items-center gap-1 py-2 font-medium">
              Categorías
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-2 w-48 hidden group-hover:block shadow-lg">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="block px-3 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-gray-900 dark:text-gray-100"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative group">
            <button className="nav-link flex items-center gap-1 py-2 font-medium">
              Marcas
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-2 w-48 hidden group-hover:block shadow-lg">
              {brands.map((brand) => (
                <Link
                  key={brand.href}
                  href={brand.href}
                  className="block px-3 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-gray-900 dark:text-gray-100"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/servicios" className="nav-link py-2 font-medium">
            Servicios
          </Link>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="w-full pl-4 pr-10 rounded-md focus-visible:ring-[#3b82f6] bg-white/10 border-white/20 text-white placeholder:text-white/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full text-white/70 hover:text-white"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex relative cursor-pointer">
            <button
              className="nav-link flex items-center gap-2 text-sm font-medium"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <User className="h-5 w-5" />
              <span>{user ? user.NOMBRE_USUARIO : "Iniciar sesión"}</span>
            </button>
            {isUserMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-2 z-50 shadow-lg"
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                {user ? (
                  <>
                    <Link
                      href="/perfil"
                      className="block px-3 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-[#111827] dark:text-[#f3f4f6]"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      href="/pedidos"
                      className="block px-3 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-[#111827] dark:text-[#f3f4f6]"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Mis Pedidos
                    </Link>
                    <button
                      className="block w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors text-red-600 dark:text-red-400"
                      onClick={() => {
                        CerrarSesion()
                        setIsUserMenuOpen(false)
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block px-3 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-gray-900 dark:text-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block px-3 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-gray-900 dark:text-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Cart */}
          <Link href="/carrito" className="relative">
            <ShoppingCart className="h-5 w-5 text-white" />
            <Badge
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center badge-naranja"
              variant="outline"
            >
              3
            </Badge>
          </Link>
        </div>
      </div>
    </header>
  )
}