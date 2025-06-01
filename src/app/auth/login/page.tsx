"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulación de carga
    setTimeout(() => {
      setIsLoading(false)
      console.log("Login:", formData)
    }, 1500)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] via-white to-[#fff7ed] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2563eb] to-[#f97316] bg-clip-text text-transparent">
            Bienvenido de vuelta
          </h1>
          <p className="text-muted-foreground mt-2">Inicia sesión en tu cuenta de Matizados Saturno</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
              <CardDescription className="text-center">Ingresa tus credenciales para continuar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2 group">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Correo electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#3b82f6] transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2 group">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Contraseña
                    </Label>
                    <Link
                      href="/auth/recuperar"
                      className="text-xs text-[#2563eb] dark:text-[#93c5fd] hover:text-[#f97316] transition-colors"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#3b82f6] transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.remember}
                    onCheckedChange={(checked) => handleInputChange("remember", checked as boolean)}
                    className="data-[state=checked]:bg-[#3b82f6] data-[state=checked]:border-[#3b82f6]"
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Recordar mi sesión
                  </Label>
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-11 text-base font-medium bg-gradient-to-r from-[#3b82f6] to-[#f97316] hover:from-[#2563eb] hover:to-[#ea580c] text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Iniciando sesión...
                      </>
                    ) : (
                      "Iniciar sesión"
                    )}
                  </Button>
                </motion.div>
              </form>
              
              {/* Register Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    href="/auth/register"
                    className="font-medium text-[#2563eb] dark:text-[#93c5fd] hover:text-[#f97316] transition-colors"
                  >
                    Crear cuenta
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}