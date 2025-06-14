
import { ArrowRight, MapPin, MessageSquare, Star, Users, Clock, Shield, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const Index = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const useAnim = (options = {}) => useInView({ triggerOnce: true, ...options });

  // Refs para estadísticas
  const [stats1Ref, stats1InView] = useAnim({ threshold: 0.5 });
  const [stats2Ref, stats2InView] = useAnim({ threshold: 0.5 });
  const [stats3Ref, stats3InView] = useAnim({ threshold: 0.5 });

  // Refs para características
  const [featuresTitleRef, featuresTitleInView] = useAnim({ threshold: 0.5 });
  const [feature1Ref, feature1InView] = useAnim({ threshold: 0.2 });
  const [feature2Ref, feature2InView] = useAnim({ threshold: 0.2 });
  const [feature3Ref, feature3InView] = useAnim({ threshold: 0.2 });
  const [feature4Ref, feature4InView] = useAnim({ threshold: 0.2 });
  const [feature5Ref, feature5InView] = useAnim({ threshold: 0.2 });
  const [feature6Ref, feature6InView] = useAnim({ threshold: 0.2 });

  // Refs para "cómo funciona"
  const [howItWorksTitleRef, howItWorksTitleInView] = useAnim({ threshold: 0.5 });
  const [howItWorksStep1Ref, howItWorksStep1InView] = useAnim({ threshold: 0.5 });
  const [howItWorksStep2Ref, howItWorksStep2InView] = useAnim({ threshold: 0.5 });
  const [howItWorksStep3Ref, howItWorksStep3InView] = useAnim({ threshold: 0.5 });
  
  // Refs para testimonios
  const [testimonialsTitleRef, testimonialsTitleInView] = useAnim({ threshold: 0.5 });
  const [testimonialMainRef, testimonialMainInView] = useAnim({ threshold: 0.2 });
  const [testimonial1Ref, testimonial1InView] = useAnim({ threshold: 0.2 });
  const [testimonial2Ref, testimonial2InView] = useAnim({ threshold: 0.2 });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-semibold text-gray-900 tracking-tight">Serbis</span>
          </div>
          <nav className="hidden md:flex items-center space-x-10">
            <button 
              onClick={() => scrollToSection('como-funciona')}
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              ¿Cómo funciona?
            </button>
            <button 
              onClick={() => scrollToSection('testimonios')}
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Testimonios
            </button>
          </nav>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
            Comenzar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Encuentra ayuda{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                en minutos
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 mb-6 font-light leading-relaxed">
              Sin categorías. Sin burocracia.
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              Describe tu tarea con tus propias palabras. Nuestra IA te conecta al instante con profesionales locales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Publicar mi primera tarea
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => scrollToSection('como-funciona')}
                className="px-10 py-4 text-lg font-medium hover:bg-gray-50 rounded-full transition-all duration-200"
              >
                Ver cómo funciona
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl mx-auto">
              <div ref={stats1Ref} className={cn("text-center transition-all duration-700 ease-out", stats1InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">5.000+</div>
                <div className="text-gray-500 font-medium">tareas completadas</div>
              </div>
              <div ref={stats2Ref} className={cn("text-center transition-all duration-700 ease-out delay-200", stats2InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 flex items-center justify-center mb-2">
                  4.8 <Star className="ml-2 h-8 w-8 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-gray-500 font-medium">calificación promedio</div>
              </div>
              <div ref={stats3Ref} className={cn("text-center transition-all duration-700 ease-out delay-[400ms]", stats3InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Minutos</div>
                <div className="text-gray-500 font-medium">tiempo de respuesta</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={featuresTitleRef} className={cn("text-center mb-20 transition-all duration-700 ease-out", featuresTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Todo en una plataforma
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Conectamos clientes y prestadores de servicio de manera inteligente y rápida
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div ref={feature1Ref} className={cn("bg-white rounded-3xl p-10 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1", "transition-all duration-700 ease-out", feature1InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Lenguaje natural
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Explica lo que necesitas como si hablaras con un amigo—sin menús complicados.
              </p>
            </div>

            <div ref={feature2Ref} className={cn("bg-white rounded-3xl p-10 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1", "transition-all duration-700 ease-out delay-150", feature2InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-8">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                IA instantánea
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Encuentra a las personas adecuadas cerca de ti, ordenadas por habilidad y cercanía.
              </p>
            </div>

            <div ref={feature3Ref} className={cn("bg-white rounded-3xl p-10 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1", "transition-all duration-700 ease-out delay-300", feature3InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Mapa en vivo
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sigue tu tarea en tiempo real y rastrea la llegada de tu experto.
              </p>
            </div>

            <div ref={feature4Ref} className={cn("bg-white rounded-3xl p-10 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1", "transition-all duration-700 ease-out", feature4InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-8">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Chat integrado
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Aclara detalles y comparte fotos sin llamadas externas.
              </p>
            </div>

            <div ref={feature5Ref} className={cn("bg-white rounded-3xl p-10 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1", "transition-all duration-700 ease-out delay-150", feature5InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-8">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Perfiles verificados
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Consulta reseñas y trabajos realizados antes de reservar.
              </p>
            </div>

            <div ref={feature6Ref} className={cn("bg-white rounded-3xl p-10 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1", "transition-all duration-700 ease-out delay-300", feature6InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-8">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Respuesta inmediata
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Recibe respuestas en minutos, no en días.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={howItWorksTitleRef} className={cn("text-center mb-20 transition-all duration-700 ease-out", howItWorksTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Así de simple
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Tres pasos para conseguir la ayuda que necesitas
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-16">
              <div ref={howItWorksStep1Ref} className={cn("text-center group transition-all duration-700 ease-out", howItWorksStep1InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Publicá tu tarea
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Describí lo que necesitas con palabras cotidianas.
                </p>
              </div>

              <div ref={howItWorksStep2Ref} className={cn("text-center group transition-all duration-700 ease-out delay-200", howItWorksStep2InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Conectá al instante
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Nuestra IA encuentra profesionales perfectos en segundos.
                </p>
              </div>

              <div ref={howItWorksStep3Ref} className={cn("text-center group transition-all duration-700 ease-out delay-[400ms]", howItWorksStep3InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Finalizá y valorá
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Pagás solo por el trabajo completado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={testimonialsTitleRef} className={cn("text-center mb-20 transition-all duration-700 ease-out", testimonialsTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Historias reales
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Miles de tareas exitosas nos respaldan
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div ref={testimonialMainRef} className={cn("bg-white rounded-3xl p-12 shadow-sm mb-12 transition-all duration-700 ease-out", testimonialMainInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">M</span>
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-2xl text-gray-700 mb-6 font-light leading-relaxed">
                    "Publiqué un trabajo de pintura al mediodía y a las 14:00 ya tenía tres pintores calificados en mi puerta. Increíble la rapidez y calidad."
                  </blockquote>
                  <cite className="text-gray-600 font-semibold text-lg">
                    María González, Palermo
                  </cite>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div ref={testimonial1Ref} className={cn("bg-white rounded-3xl p-8 shadow-sm transition-all duration-700 ease-out", testimonial1InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  "Perfecto para emergencias. Cuando se rompió mi canilla un domingo, encontré un plomero en 15 minutos."
                </p>
                <cite className="text-gray-600 font-medium">Carlos, Belgrano</cite>
              </div>

              <div ref={testimonial2Ref} className={cn("bg-white rounded-3xl p-8 shadow-sm transition-all duration-700 ease-out delay-200", testimonial2InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')}>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  "Como prestador, me encanta la flexibilidad. Trabajo cuando quiero y siempre cerca de casa."
                </p>
                <cite className="text-gray-600 font-medium">Ana, Villa Crespo</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Únete a miles de usuarios que ya confían en Serbis para resolver sus tareas diarias
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Publicar mi primera tarea
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300"
            >
              Registrarme como prestador
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-semibold tracking-tight">Serbis</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p className="font-medium">&copy; 2024 Serbis. Todos los derechos reservados.</p>
              <p className="text-sm mt-2 font-light">Conectando Argentina, una tarea a la vez.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
