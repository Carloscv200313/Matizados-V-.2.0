import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Droplet, Palette, Truck, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ServiciosPage() {
  return (
    <div className="flex flex-col  px-4 py-6 md:px-6 md:py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span className="font-medium">Servicios</span>
      </nav>

      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Imagen_fondo.jpg"
            alt="Servicios de Matizado"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

        <div className="relative z-10 px-6 py-12 md:py-24 max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Servicios Profesionales de Matizado
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Ofrecemos soluciones personalizadas para todos tus proyectos de pintura y matizado, con la más alta calidad
            y precisión en cada color.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="#servicios">Ver Servicios</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white hover:bg-white/20"
              asChild
            >
              <Link href="/contactanos">Solicitar Cotización</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Services */}
      <section id="servicios" className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestros Servicios Principales</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            En Matizados Saturno nos especializamos en ofrecer soluciones de color precisas y de alta calidad para
            diferentes necesidades y superficies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-neutral-200 dark:bg-neutral-800">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Palette className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Matizado Personalizado</CardTitle>
              <CardDescription>Creamos el color exacto que necesitas</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="">
                Utilizamos tecnología de última generación para crear colores personalizados que se ajusten exactamente
                a tus necesidades. Ya sea que necesites igualar un color existente o crear uno nuevo, podemos hacerlo
                con precisión.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-200 dark:bg-neutral-800">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Asesoría Profesional</CardTitle>
              <CardDescription>Expertos a tu servicio</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p >
                Nuestro equipo de profesionales te ayudará a elegir los productos adecuados para cada superficie y
                necesidad. Te orientamos sobre técnicas de aplicación, preparación de superficies y acabados.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-200 dark:bg-neutral-800">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Entrega a Domicilio</CardTitle>
              <CardDescription>Recibe tus productos donde los necesites</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p >
                Ofrecemos servicio de entrega a domicilio para que recibas tus productos directamente en tu hogar o
                lugar de trabajo. Contamos con envíos rápidos y seguros para garantizar que tus productos lleguen en
                perfecto estado.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services by Category */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Servicios por Categoría</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos servicios especializados para diferentes tipos de proyectos y superficies
          </p>
        </div>

        <Tabs defaultValue="decoraciones" className="w-full px-16">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="decoraciones">Decoraciones</TabsTrigger>
              <TabsTrigger value="vehiculos">Vehículos</TabsTrigger>
              <TabsTrigger value="madera">Madera</TabsTrigger>
              <TabsTrigger value="industrial">Industrial</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="decoraciones">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Servicios para Decoraciones</h3>
                <p className="mb-6">
                  Nuestros servicios de matizado para decoraciones te permiten transformar cualquier espacio con los
                  colores perfectos. Desde interiores elegantes hasta exteriores duraderos, tenemos la solución ideal
                  para tu proyecto.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Igualación de colores para paredes interiores y exteriores</span>
                  </li>
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Creación de paletas de color personalizadas</span>
                  </li>
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Asesoría en combinaciones de colores para espacios</span>
                  </li>
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Pinturas especiales: antimanchas, antihumedad, térmicas</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/contactanos?categoria=decoraciones">Consultar</Link>
                </Button>
              </div>
              <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
                <Image
                  src="/matizado-decoraciones.jpg"
                  alt="Servicios para Decoraciones"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vehiculos">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Servicios para Vehículos</h3>
                <p className="mb-6">
                  Nuestro servicio de matizado automotriz ofrece soluciones precisas para igualar el color original de
                  fábrica de cualquier vehículo. Utilizamos tecnología avanzada para garantizar un acabado perfecto.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Igualación exacta de colores de fábrica</span>
                  </li>
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Pinturas para retoques y reparaciones</span>
                  </li>
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Acabados especiales: metálicos, perlados, mate</span>
                  </li>
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Barnices y protectores UV para mayor durabilidad</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/contactanos?categoria=vehiculos">Consultar</Link>
                </Button>
              </div>
              <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
                <Image
                  src="/matizado-vehiculos.jpg"
                  alt="Servicios para Vehículos"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="madera">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Servicios para Madera</h3>
                <p className="mb-6">
                  Nuestros servicios para madera incluyen tintes, barnices y acabados especiales que realzan la belleza
                  natural de la madera mientras la protegen. Ofrecemos soluciones para interior y exterior.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Tintes personalizados para diferentes tipos de madera</span>
                  </li>
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Barnices protectores con filtro UV</span>
                  </li>
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Acabados especiales: mate, satinado, brillante</span>
                  </li>
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Tratamientos para madera exterior e interior</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/contactanos?categoria=madera">Consultar</Link>
                </Button>
              </div>
              <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
                <Image
                  src="/matizado-madera.jpg"
                  alt="Servicios para Madera"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="industrial">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Servicios Industriales</h3>
                <p className="mb-6">
                  Nuestras soluciones industriales están diseñadas para ofrecer máxima protección y durabilidad en
                  entornos exigentes. Contamos con recubrimientos especializados para diferentes necesidades.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Pinturas anticorrosivas para estructuras metálicas</span>
                  </li>
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Recubrimientos epóxicos para pisos industriales</span>
                  </li>
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Pinturas de alta temperatura para maquinaria</span>
                  </li>
                  <li className="flex items-start">
                    <Droplet className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Señalización industrial con colores normalizados</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/contactanos?categoria=industrial">Consultar</Link>
                </Button>
              </div>
              <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
                <Image
                  src="/matizado-industrial.jpg"
                  alt="Servicios Industriales"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Process */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestro Proceso</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conoce cómo trabajamos para ofrecerte el mejor servicio de matizado
          </p>
        </div>

        <div className="relative"> {/* Contenedor relativo para la línea */}
          {/* Línea que conecta los pasos */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-0"> {/* Añadido z-0 para contexto de apilamiento */}
            <div className="text-center bg-neutral-200 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-6 relative z-10"> {/* Añadido z-10 para que esté por encima de la línea */}
              <div className="relative">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 "> {/* Añadido z-10 */}
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Consulta</h3>
              <p className="text-muted-foreground">
                Analizamos tus necesidades y te asesoramos sobre las mejores opciones para tu proyecto.
              </p>
            </div>
            <div className="text-center border-2 bg-neutral-200 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-xl p-6 relative z-10"> {/* Añadido z-10 para que esté por encima de la línea */}
              <div className="relative">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4"> {/* Añadido z-10 */}
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Matizado</h3>
              <p className="text-muted-foreground">
                Utilizamos tecnología de punta para crear el color exacto que necesitas con alta precisión.
              </p>
            </div>

            <div className="text-center bg-neutral-200 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-6 relative z-10"> {/* Añadido z-10 para que esté por encima de la línea */}
              <div className="relative">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 "> {/* Añadido z-10 */}
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Control de Calidad</h3>
              <p className="text-muted-foreground">
                Verificamos que el color y la calidad del producto cumplan con nuestros estándares.
              </p>
            </div>

            <div className="text-center bg-neutral-200 border-2 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-xl p-6 relative z-10"> {/* Añadido z-10 para que esté por encima de la línea */}
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 "> {/* Añadido z-10 */}
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Entrega</h3>
              <p className="text-muted-foreground">
                Te entregamos el producto final con instrucciones de aplicación y recomendaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Resolvemos tus dudas sobre nuestros servicios de matizado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>¿Cuánto tiempo toma el servicio de matizado?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                El tiempo de matizado depende del tipo de producto y la complejidad del color. Generalmente, un matizado
                estándar toma entre 15-30 minutos. Para colores especiales o grandes cantidades, puede tomar hasta 1
                hora.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>¿Puedo llevar una muestra para igualar el color?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                ¡Absolutamente! Puedes traer una muestra física como un trozo de tela, un objeto, o incluso una pared
                desprendida. Nuestro sistema de colorimetría puede escanear y reproducir el color con alta precisión.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>¿Qué información necesito para un matizado automotriz?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Para un matizado automotriz preciso, es ideal contar con el código de color del vehículo (generalmente
                ubicado en el marco de la puerta o en el compartimento del motor). También es útil conocer la marca,
                modelo y año del vehículo.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>¿Ofrecen garantía en sus servicios de matizado?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Sí, todos nuestros servicios de matizado tienen garantía. Si el color no coincide con tu muestra o
                expectativas, lo ajustaremos sin costo adicional. La garantía cubre la precisión del color, no la
                aplicación del producto.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="dark:bg-neutral-200 bg-neutral-800 text-primary-foreground rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para transformar tu proyecto?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Contáctanos hoy mismo para obtener una cotización personalizada o programar una consulta con nuestros expertos
          en matizado.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contactanos">Solicitar Cotización</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10"
            asChild
          >
            <Link href="/productos">Ver Productos</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
