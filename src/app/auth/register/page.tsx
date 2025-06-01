"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
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
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string

  // Paso 2: Información personal
  dni: string
  phone: string

  // Paso 3: Dirección
  address: string
  city: string
  state: string
  zipCode: string

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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dni: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
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
          registrationData.firstName &&
          registrationData.lastName &&
          registrationData.email &&
          registrationData.password &&
          registrationData.confirmPassword &&
          registrationData.password === registrationData.confirmPassword
        )
      case 2:
        return !!(registrationData.dni && registrationData.phone)
      case 3:
        return !!(
          registrationData.address &&
          registrationData.city &&
          registrationData.state &&
          registrationData.zipCode
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

    // Simulación de registro
    setTimeout(() => {
      setIsLoading(false)
      console.log("Datos de registro:", registrationData)
      // Aquí iría la lógica de registro real
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
                          value={registrationData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2 group">
                      <Label htmlFor="lastName">Apellido *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#3b82f6] transition-colors" />
                        <Input
                          id="lastName"
                          placeholder="Pérez"
                          className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                          value={registrationData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
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
                        value={registrationData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
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
                        value={registrationData.password}
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
                  <div className="space-y-2 group">
                    <Label htmlFor="confirm-password">Confirmar Contraseña *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#3b82f6] transition-colors" />
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                        value={registrationData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
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
                    {registrationData.password !== registrationData.confirmPassword &&
                      registrationData.confirmPassword && (
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
                        value={registrationData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
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
                        value={registrationData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 group">
                      <Label htmlFor="city">Ciudad *</Label>
                      <Input
                        id="city"
                        placeholder="Lima"
                        className="transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                        value={registrationData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2 group">
                      <Label htmlFor="state">Departamento *</Label>
                      <Input
                        id="state"
                        placeholder="Lima"
                        className="transition-all duration-200 focus:ring-2 focus:ring-[#3b82f6]"
                        value={registrationData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
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
                      value={registrationData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
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
                        <strong>Nombre:</strong> {registrationData.firstName} {registrationData.lastName}
                      </p>
                      <p>
                        <strong>Email:</strong> {registrationData.email}
                      </p>
                      <p>
                        <strong>DNI:</strong> {registrationData.dni}
                      </p>
                      <p>
                        <strong>Teléfono:</strong> {registrationData.phone}
                      </p>
                      <p>
                        <strong>Dirección:</strong> {registrationData.address}, {registrationData.city},{" "}
                        {registrationData.state} {registrationData.zipCode}
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

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up-delayed {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes step-content {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-slide-up-delayed {
          animation: slide-up-delayed 1s ease-out;
        }

        .animate-step-content {
          animation: step-content 0.5s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
