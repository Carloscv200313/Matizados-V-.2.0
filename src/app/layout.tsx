import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DataUserProvider } from "@/Provider/Provider.User"
import { Toaster } from "@/components/ui/sonner"
import { DataProductosProvider } from "@/Provider/Provider.Carrito"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Matizados Saturno - Especialistas en pinturas y matizados",
  description: "Encuentra los mejores productos para tus proyectos de pintura y matizado en un solo lugar.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <DataProductosProvider>
          <DataUserProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              <Header />
              {children}
              <Toaster />
              <Footer />
            </ThemeProvider>
          </DataUserProvider>
        </DataProductosProvider>
      </body>
    </html>
  )
}
