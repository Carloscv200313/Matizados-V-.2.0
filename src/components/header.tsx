"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, User, Menu, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  //const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Simulación de usuario logueado

  return (
    <header className="ferreteria-header sticky top-0 z-50 shadow-lg">
      <div className="container flex gap-8 h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center ">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Image src="/logoCompletoHorizontal-02.png" alt="Matizados Saturno" width={150} height={50} className="h-12 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <button className="nav-link flex items-center gap-1 py-2 font-medium">
              Categorías
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-2 w-48 hidden group-hover:block shadow-lg">
              <Link
                href="/categoria/decoraciones"
                className="block px-3 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-gray-900 dark:text-gray-100"
              >
                Para decoraciones
              </Link>
              <Link
                href="/categoria/vehiculos"
                className="block px-3 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-gray-900 dark:text-gray-100"
              >
                Para Vehículos
              </Link>
              <Link
                href="/categoria/madera"
                className="block px-3 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-gray-900 dark:text-gray-100"
              >
                Para madera
              </Link>
              <Link
                href="/categoria/industrial"
                className="block px-3 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-gray-900 dark:text-gray-100"
              >
                Para industrial
              </Link>
            </div>
          </div>
          <div className="relative group">
            <button className="nav-link flex items-center gap-1 py-2 font-medium">
              Marcas
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-2 w-48 hidden group-hover:block shadow-lg">
              <Link
                href="/marca/proton"
                className="block px-3 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-gray-900 dark:text-gray-100"
              >
                Proton
              </Link>
              <Link
                href="/marca/saturno"
                className="block px-3 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-gray-900 dark:text-gray-100"
              >
                Saturno
              </Link>
              <Link
                href="/marca/colorcar"
                className="block px-3 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-gray-900 dark:text-gray-100"
              >
                ColorCar
              </Link>
              <Link
                href="/marca/woodprotect"
                className="block px-3 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-gray-900 dark:text-gray-100"
              >
                WoodProtect
              </Link>
            </div>
          </div>
          <Link href="/servicios" className="nav-link py-2 font-medium">
            Servicios
          </Link>
          <Link href="/contactanos" className="nav-link py-2 font-medium">
            Contáctanos
          </Link>
        </nav>
        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="w-full pl-4 pr-10 rounded-md focus-visible:ring-[#3b82f6] bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full text-white/70 hover:text-white"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {/* User Menu - Desktop */}
          <div className="hidden md:flex relative cursor-pointer">
            <button
              className="nav-link flex items-center gap-2 text-sm font-medium"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <User className="h-5 w-5" />
              <span>{isLoggedIn ? "Juan Perez" : "Iniciar sesión"}</span>
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-2 z-50 shadow-lg">
                {isLoggedIn ? (
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
                        setIsLoggedIn(false)
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
                      className="block px-3 py-2  hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors text-gray-900 dark:text-gray-100"
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

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-y-scroll"
            >
              <div className="flex flex-col h-full">
                <div className="py-4">
                  <div className="relative mb-4 ml-4">
                    <Input
                      
                      placeholder="Buscar productos..."
                      className="w-4/5 pl-2 pr-10 rounded-md focus-visible:ring focus-visible:ring-[#3b82f6] "
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-16 top-0 h-full text-gray-400 hover:text-gray-600"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-1">
                    <div className="py-2">
                      <h3 className="mb-2 px-4 text-xs uppercase text-gray-500 font-semibold">Categorías</h3>
                      <Link
                        href="/categoria/decoraciones"
                        className="block px-4 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors"
                      >
                        Para decoraciones
                      </Link>
                      <Link
                        href="/categoria/vehiculos"
                        className="block px-4 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors"
                      >
                        Para Vehículos
                      </Link>
                      <Link
                        href="/categoria/madera"
                        className="block px-4 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors"
                      >
                        Para madera
                      </Link>
                      <Link
                        href="/categoria/industrial"
                        className="block px-4 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors"
                      >
                        Para industrial
                      </Link>
                    </div>

                    <div className="py-2">
                      <h3 className="mb-2 px-4 text-xs uppercase text-gray-500 font-semibold">Marcas</h3>
                      <Link
                        href="/marca/proton"
                        className="block px-4 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors"
                      >
                        Proton
                      </Link>
                      <Link
                        href="/marca/saturno"
                        className="block px-4 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors"
                      >
                        Saturno
                      </Link>
                      <Link
                        href="/marca/colorcar"
                        className="block px-4 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors"
                      >
                        ColorCar
                      </Link>
                      <Link
                        href="/marca/woodprotect"
                        className="block px-4 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors"
                      >
                        WoodProtect
                      </Link>
                    </div>

                    <div className="py-2">
                      <Link
                        href="/servicios"
                        className="block px-4 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors"
                      >
                        Servicios
                      </Link>
                      <Link
                        href="/contactanos"
                        className="block px-4 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors"
                      >
                        Contáctanos
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-4">
                  {isLoggedIn ? (
                    <div className="space-y-1">
                      <div className="px-4 py-2 font-medium">Juan Perez</div>
                      <Link
                        href="/perfil"
                        className="block px-4 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors"
                      >
                        Mi Perfil
                      </Link>
                      <Link
                        href="/pedidos"
                        className="block px-4 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/20 rounded-md transition-colors"
                      >
                        Mis Pedidos
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors text-red-600 dark:text-red-400"
                        onClick={() => setIsLoggedIn(false)}
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Link
                        href="/auth"
                        className="block px-4 py-2 hover:bg-[#252f3b] dark:hover:bg-[#1e3a8a]/80 rounded-md transition-colors"
                      >
                        Iniciar Sesión
                      </Link>
                      <Link
                        href="/auth?tab=register"
                        className="block px-4 py-2 hover:bg-[#eff6ff] dark:hover:bg-[#1e3a8a]/80 rounded-md transition-colors"
                      >
                        Registrarse
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
