"use client"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { redirect } from 'next/navigation'
import {
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  Mail,
  Lock,
  Phone,
  CreditCard,
  MapPin,
  FileText,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RegistrationData {
  // Paso 1: Información básica
  nombre: string
  apellido: string
  correo: string
  contraseña: string
  confirmContraseña: string

  // Paso 2: Información personal
  dni: string
  telefono: string

  // Paso 3: Dirección
  direccion: string
  ciudad: string
  estado: string
  codigoPostal: string

  // Paso 4: Términos
  acceptTerms: boolean
  acceptMarketing: boolean
}

const stepIcons = [User, CreditCard, MapPin, FileText]
const stepTitles = ["Información Básica", "Datos Personales", "Dirección", "Términos y Condiciones"]
const stepDescriptions = [
  "Crea tu cuenta con información básica",
  "Completa tus datos personales",
  "Añade tu dirección de entrega",
  "Acepta nuestros términos y condiciones",
]

export default function RegisterPage() {
  
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    confirmContraseña: "",
    dni: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    acceptTerms: false,
    acceptMarketing: false,
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: keyof RegistrationData, value: string | boolean) => {
    setRegistrationData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          registrationData.nombre &&
          registrationData.apellido &&
          registrationData.correo &&
          registrationData.contraseña &&
          registrationData.confirmContraseña &&
          registrationData.contraseña === registrationData.confirmContraseña
        )
      case 2:
        return !!(registrationData.dni && registrationData.telefono)
      case 3:
        return !!(
          registrationData.direccion &&
          registrationData.ciudad &&
          registrationData.estado &&
          registrationData.codigoPostal
        )
      case 4:
        return registrationData.acceptTerms
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const cuerpo = {
      NOMBRE_USUARIO: registrationData.nombre + " " + registrationData.apellido,
      CONTRASENA_USUARIO: registrationData.contraseña,
      DNI_USUARIO: registrationData.dni,
      CORREO_USUARIO: registrationData.correo,
      TELEFONO_USUARIO: registrationData.telefono,
      DIRECCION_DETALLE: registrationData.direccion,
      DEPARTAMENTO: registrationData.ciudad,
      DISTRITO: registrationData.estado,
      CODIGO_POSTAL: registrationData.codigoPostal,
    }
    console.log("Datos de registro:", cuerpo)
    const response = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cuerpo),
    })
    console.log("Respuesta del servidor:", response)
    if (!response.ok) {
      setIsLoading(false)
      const errorData = await response.json()
      console.error("Error al registrar:", errorData)
      alert("Error al registrar la cuenta. Por favor, inténtalo de nuevo.")
      return
    }
    // Simulación de registro
    setTimeout(() => {
      setIsLoading(false)
      redirect('/auth/login')
    }, 2000)
  }

  const StepIcon = stepIcons[currentStep - 1]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] via-white to-[#fff7ed] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2563eb] to-[#f97316] bg-clip-text text-transparent">
            Crear cuenta nueva
          </h1>
          <p className="text-muted-foreground mt-2">Únete a Matizados Saturno y descubre nuestros productos</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            {Array.from({ length: totalSteps }, (_, i) => {
              const stepNumber = i + 1
              const isActive = stepNumber === currentStep
              const isCompleted = stepNumber < currentStep
              const StepIconComponent = stepIcons[i]

              return (
                <div key={stepNumber} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? "bg-[#3b82f6] text-white scale-110"
                        : isActive
                          ? "bg-[#f97316] text-white scale-110 shadow-lg"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {isCompleted ? <Check className="h-6 w-6" /> : <StepIconComponent className="h-6 w-6" />}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-xs font-medium transition-colors ${
                        isActive
                          ? "text-[#ea580c] dark:text-[#fdba74]"
                          : isCompleted
                            ? "text-[#2563eb] dark:text-[#93c5fd]"
                            : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Paso {stepNumber}
                    </p>
                    <p className="text-xs text-muted-foreground hidden sm:block">{stepTitles[i]}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <Progress
            value={progress}
            className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden"
          />
        </div>

        {/* Registration Card */}
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm animate-slide-up-delayed">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#f97316] flex items-center justify-center">
                <StepIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">{stepTitles[currentStep - 1]}</CardTitle>
                <CardDescription>{stepDescriptions[currentStep - 1]}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Paso 1: Información Básica */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-step-content">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 group">
                      <Label htmlFor="firstName">Nombre *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#3b82f6] transition-colors" />
                        <Input
                          id="firstName"
                          placeholder="Juan"
                          className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                          value={registrationData.nombre}
                          onChange={(e) => handleInputChange("nombre", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2 group">
                      <Label htmlFor="apellido">Apellido *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#3b82f6] transition-colors" />
                        <Input
                          id="apellido"
                          placeholder="Pérez"
                          className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                          value={registrationData.apellido}
                          onChange={(e) => handleInputChange("apellido", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <Label htmlFor="email-register">Correo electrónico *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#3b82f6] transition-colors" />
                      <Input
                        id="email-register"
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                        value={registrationData.correo}
                        onChange={(e) => handleInputChange("correo", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <Label htmlFor="password-register">Contraseña *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#3b82f6] transition-colors" />
                      <Input
                        id="password-register"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                        value={registrationData.contraseña}
                        onChange={(e) => handleInputChange("contraseña", e.target.value)}
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
                  <div className="space-y-2 group">
                    <Label htmlFor="confirm-password">Confirmar Contraseña *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#3b82f6] transition-colors" />
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                        value={registrationData.confirmContraseña}
                        onChange={(e) => handleInputChange("confirmContraseña", e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {registrationData.contraseña !== registrationData.confirmContraseña &&
                      registrationData.confirmContraseña && (
                        <p className="text-sm text-red-500 animate-shake">Las contraseñas no coinciden</p>
                      )}
                  </div>
                </div>
              )}

              {/* Paso 2: Datos Personales */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-step-content">
                  <div className="space-y-2 group">
                    <Label htmlFor="dni">DNI *</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#3b82f6] transition-colors" />
                      <Input
                        id="dni"
                        placeholder="12345678"
                        className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                        value={registrationData.dni}
                        onChange={(e) => handleInputChange("dni", e.target.value)}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Este dato no podrá ser modificado posteriormente</p>
                  </div>
                  <div className="space-y-2 group">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#3b82f6] transition-colors" />
                      <Input
                        id="phone"
                        placeholder="+51 999 999 999"
                        className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                        value={registrationData.telefono}
                        onChange={(e) => handleInputChange("telefono", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 3: Dirección */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-step-content">
                  <div className="space-y-2 group">
                    <Label htmlFor="address">Dirección *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#3b82f6] transition-colors" />
                      <Input
                        id="address"
                        placeholder="Av. Principal 123"
                        className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                        value={registrationData.direccion}
                        onChange={(e) => handleInputChange("direccion", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 group">
                      <Label htmlFor="city">Departamento *</Label>
                      <Input
                        id="city"
                        placeholder="Lima"
                        className="transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                        value={registrationData.ciudad}
                        onChange={(e) => handleInputChange("ciudad", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2 group">
                      <Label htmlFor="state">Distrito *</Label>
                      <Input
                        id="state"
                        placeholder="Lima"
                        className="transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                        value={registrationData.estado}
                        onChange={(e) => handleInputChange("estado", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <Label htmlFor="zipCode">Código Postal *</Label>
                    <Input
                      id="zipCode"
                      placeholder="15001"
                      className="transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                      value={registrationData.codigoPostal}
                      onChange={(e) => handleInputChange("codigoPostal", e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Paso 4: Términos y Condiciones */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-step-content">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 border rounded-lg bg-[#eff6ff] dark:bg-[#172554]/20">
                      <Checkbox
                        id="terms"
                        checked={registrationData.acceptTerms}
                        onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                        className="data-[state=checked]:bg-[#3b82f6] data-[state=checked]:border-[#3b82f6] mt-1"
                        required
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                        Acepto los{" "}
                        <Link
                          href="/terminos"
                          className="text-[#2563eb] hover:text-[#fb923c] underline"
                        >
                          términos y condiciones
                        </Link>{" "}
                        y la{" "}
                        <Link
                          href="/privacidad"
                          className="text-[#2563eb] hover:text-[#fb923c] underline"
                        >
                          política de privacidad
                        </Link>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3 p-4 border rounded-lg">
                      <Checkbox
                        id="marketing"
                        checked={registrationData.acceptMarketing}
                        onCheckedChange={(checked) => handleInputChange("acceptMarketing", checked as boolean)}
                        className="data-[state=checked]:bg-[#f97316] data-[state=checked]:border-[#f97316] mt-1"
                      />
                      <Label htmlFor="marketing" className="text-sm leading-relaxed cursor-pointer">
                        Acepto recibir ofertas y promociones por correo electrónico (opcional)
                      </Label>
                    </div>
                  </div>

                  {/* Resumen de datos */}
                  <div className="bg-gradient-to-r from-[#eff6ff] to-[#fff7ed] dark:from-[#172554]/20 dark:to-[#431407]/20 rounded-lg p-6">
                    <h3 className="font-medium mb-4 text-[#1d4ed8] dark:text-[#bfdbfe]">
                      Resumen de tu cuenta:
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Nombre:</strong> {registrationData.nombre} {registrationData.apellido}
                      </p>
                      <p>
                        <strong>Email:</strong> {registrationData.correo}
                      </p>
                      <p>
                        <strong>DNI:</strong> {registrationData.dni}
                      </p>
                      <p>
                        <strong>Teléfono:</strong> {registrationData.telefono}
                      </p>
                      <p>
                        <strong>Dirección:</strong> {registrationData.direccion}, {registrationData.ciudad},{" "}
                        {registrationData.estado} {registrationData.codigoPostal}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Botones de navegación */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Anterior
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className="flex items-center gap-2 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#3b82f6] to-[#f97316] text-white"
                  >
                    Siguiente
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!validateStep(currentStep) || isLoading}
                    className="flex items-center gap-2 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 bg-gradient-to-r from-[#3b82f6] to-[#f97316] text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creando cuenta...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Crear cuenta
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
