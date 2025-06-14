
import { ArrowRight, MapPin, MessageSquare, Star, Users, CheckCircle, Clock, Shield, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Serbis</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('como-funciona')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              ¿Cómo funciona?
            </button>
            <button 
              onClick={() => scrollToSection('testimonios')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Testimonios
            </button>
          </nav>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
            Publicar mi primera tarea
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Encuentra ayuda calificada en 
              <span className="text-blue-600"> minutos</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 leading-relaxed">
              Sin categorías, sin burocracia.
            </p>
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
              Describe tu tarea con tus propias palabras. Nuestra IA te conecta al instante con profesionales locales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
              >
                Publicar mi primera tarea
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('como-funciona')}
                className="px-8 py-4 text-lg"
              >
                ¿Cómo funciona?
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">5.000+</div>
                <div className="text-gray-600">tareas completadas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 flex items-center justify-center">
                  4.8 <Star className="ml-1 h-6 w-6 fill-current" />
                </div>
                <div className="text-gray-600">calificación promedio</div>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-blue-600">En minutos</div>
                <div className="text-gray-600">tiempo de respuesta</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas en una sola plataforma
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conectamos clientes y prestadores de servicio de manera inteligente y rápida
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Publicación en lenguaje natural
                </h3>
                <p className="text-gray-600">
                  Explica lo que necesitas como si hablaras con un amigo—sin menús desplegables ni categorías fijas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Emparejamiento instantáneo por IA
                </h3>
                <p className="text-gray-600">
                  Nuestro motor de NLP encuentra a las personas adecuadas cerca de ti, ordenadas por habilidad y cercanía.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Vista de mapa en tiempo real
                </h3>
                <p className="text-gray-600">
                  Sigue tu tarea en un mapa en vivo y rastrea la llegada de tu experto.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Chat y envío de fotos integrados
                </h3>
                <p className="text-gray-600">
                  Aclara detalles, comparte imágenes del problema y recibe presupuestos firmes sin llamadas externas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Perfiles verificados y valoraciones
                </h3>
                <p className="text-gray-600">
                  Consulta reseñas previas, fotos de trabajos realizados y etiquetas de habilidades antes de reservar.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Respuesta inmediata
                </h3>
                <p className="text-gray-600">
                  Recibe respuestas y presupuestos en minutos, no en días. Sin esperas innecesarias.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-xl text-gray-600">
              Tres pasos simples para conseguir la ayuda que necesitas
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Publicá tu tarea
                </h3>
                <p className="text-gray-600">
                  Describí lo que necesitas con palabras cotidianas. Sin formularios complicados.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Conectá al instante
                </h3>
                <p className="text-gray-600">
                  Nuestra IA encuentra profesionales locales perfectos para tu tarea en segundos.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Finalizá y valorá
                </h3>
                <p className="text-gray-600">
                  Sin suscripciones ni costos ocultos. Pagás solo por el trabajo completado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-gray-600">
              Miles de tareas exitosas nos respaldan
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">M</span>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg text-gray-700 mb-4 italic">
                      "Publiqué un trabajo de pintura al mediodía y a las 14:00 ya tenía tres pintores calificados en mi puerta. Increíble la rapidez y calidad del servicio."
                    </blockquote>
                    <cite className="text-gray-600 font-semibold">
                      María, Palermo
                    </cite>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-3">
                    "Perfecto para emergencias. Cuando se rompió mi canilla un domingo, encontré un plomero en 15 minutos."
                  </p>
                  <cite className="text-gray-600 text-sm">Carlos, Belgrano</cite>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-3">
                    "Como prestador, me encanta la flexibilidad. Trabajo cuando quiero y siempre cerca de casa."
                  </p>
                  <cite className="text-gray-600 text-sm">Ana, Villa Crespo</cite>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para conseguir la ayuda que necesitas?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya confían en Serbis para resolver sus tareas diarias
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Publicar mi primera tarea
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            >
              Registrarme como prestador
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-2xl font-bold">Serbis</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2024 Serbis. Todos los derechos reservados.</p>
              <p className="text-sm mt-1">Conectando Argentina, una tarea a la vez.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
