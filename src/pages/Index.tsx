import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Users,
  MessageCircle,
  Shield,
  Star,
  CheckCircle,
  Search,
  Zap,
  Menu,
  X,
  DollarSign,
  Award,
  Eye,
  Sparkles,
  Clock,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate screenshots
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreenshot((prev) => (prev + 1) % 3); // Changed from 4 to 3
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    window.open('https://web.serbis.app', '_blank');
  };

  const screenshots = [
    {
      src: "/lovable-uploads/bba53f7f-ee96-480d-ad5e-325e9823282b.png",
      title: "Búsqueda Inteligente",
      description: "Describe lo que necesitas en lenguaje natural"
    },
    {
      src: "/lovable-uploads/8d11efbb-db2e-4ceb-9f8e-6bdf05247c33.png", 
      title: "Chat Integrado",
      description: "Comunicación directa con profesionales"
    },
    {
      src: "/lovable-uploads/98092611-df32-4c24-9a64-4a9a804d80dd.png",
      title: "Estado en Tiempo Real", 
      description: "Seguí el progreso de tu servicio"
    }
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-2xl border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center -ml-20">
              <img 
                src="/favicon.ico" 
                alt="Serbis" 
                className="w-10 h-10"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">
                Funcionalidades
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">
                Cómo Funciona
              </a>
              <a href="#for-workers" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">
                Para Trabajadores
              </a>
              <Button 
                onClick={() => window.open('https://web.serbis.app', '_blank')}
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 h-10 rounded-full font-medium transition-all duration-300"
              >
                Abrir App
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-6 space-y-4 bg-white/95 backdrop-blur-xl">
              <a href="#features" className="block text-gray-600 hover:text-gray-900 font-medium py-2">
                Funcionalidades
              </a>
              <a href="#how-it-works" className="block text-gray-600 hover:text-gray-900 font-medium py-2">
                Cómo Funciona
              </a>
              <a href="#for-workers" className="block text-gray-600 hover:text-gray-900 font-medium py-2">
                Para Trabajadores
              </a>
              <Button 
                onClick={() => window.open('https://web.serbis.app', '_blank')}
                className="w-full bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium"
              >
                Abrir App
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Hero Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center bg-gray-50 rounded-full px-4 py-2 mb-4">
                <Sparkles className="w-4 h-4 text-black mr-2" />
                <span className="text-sm font-medium text-gray-700">Servicios en segundos</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-[0.95] tracking-tight mb-6">
                Cualquier
                <br />
                <span className="text-gray-600">servicio,</span>
                <br />
                al instante
              </h1>
              <p className="text-xl text-gray-600 mb-4 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Conectamos personas con profesionales verificados en segundos. Sin categorias, solo habilidades.
              </p>
              {/* Search Bar */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 mb-4 max-w-2xl mx-auto lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Necesito un plomero para..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-4 text-base border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-400"
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleSearch}
                    className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 group"
                  >
                    Buscar
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Quick Services */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {['Plomería', 'Electricidad', 'Limpieza', 'Jardinería', 'Pintura'].map((service) => (
                  <button
                    key={service}
                    onClick={() => {
                      setSearchQuery(`Necesito servicio de ${service.toLowerCase()}`);
                      setTimeout(handleSearch, 100);
                    }}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-700 hover:text-gray-900 transition-all duration-200 font-medium text-sm border border-gray-200"
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* App Screenshots */}
            <div className="lg:col-span-5">
              <div className="relative max-w-sm mx-auto mt-12">
                {/* Main Phone */}
                <div className="relative mx-auto w-80 h-[700px] bg-black rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                    {/* Screenshot */}
                    <img
                      src={screenshots[currentScreenshot].src}
                      alt={screenshots[currentScreenshot].title}
                      className="w-full h-full object-cover transition-opacity duration-1000 rounded-[20px]"
                    />
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
                </div>

                {/* Screenshot Indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                  {screenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentScreenshot(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentScreenshot 
                          ? 'bg-black w-6' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Feature Caption */}
                <div className="text-center mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {screenshots[currentScreenshot].title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {screenshots[currentScreenshot].description}
                  </p>
                </div>

                {/* Floating Elements */}
                <div className="absolute -left-4 top-20 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 hidden lg:block">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Conexión exitosa</p>
                      <p className="text-xs text-gray-500">En 3 segundos</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 bottom-32 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 hidden lg:block">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Reviews verificadas</p>
                      <p className="text-xs text-gray-500">Profesional verificado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section id="features" className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6 tracking-tight">
              Todo lo que necesitas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Una experiencia perfecta desde la búsqueda hasta el pago
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Search}
              title="Búsqueda Inteligente"
              description="Describe tu necesidad en lenguaje natural y nuestro algoritmo encuentra al profesional perfecto instantáneamente."
            />
            <FeatureCard
              icon={Zap}
              title="Conexión en 5 Segundos"
              description="Match automático basado en ubicación, experiencia y disponibilidad del profesional más adecuado."
            />
            <FeatureCard
              icon={MessageCircle}
              title="Chat Integrado"
              description="Comunicación directa con fotos, videos y documentos. Todo sin salir de la aplicación."
            />
            <FeatureCard
              icon={Shield}
              title="Profesionales Verificados"
              description="Todos los profesionales pasan por un proceso de verificación y tienen ratings de clientes reales."
            />
            <FeatureCard
              icon={Eye}
              title="Seguimiento en Tiempo Real"
              description="Monitorea el progreso de tu servicio con actualizaciones automáticas y notificaciones instantáneas."
            />
            <FeatureCard
              icon={DollarSign}
              title="Negociación Transparente"
              description="Precios claros, negociación directa sin comisiones ocultas. Pagás exactamente lo acordado."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gray-50 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6 tracking-tight">
              Así de simple
            </h2>
            <p className="text-xl text-gray-600">
              Tres pasos para resolver cualquier necesidad de servicio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <StepCard
              number="01"
              title="Describe tu necesidad"
              description="Escribe en lenguaje natural exactamente lo que necesitas. Nuestro sistema entiende desde 'se me rompió la canilla' hasta solicitudes más complejas."
              icon={Search}
            />
            <StepCard
              number="02"
              title="Te conectamos al instante"
              description="En menos de 5 segundos te mostramos profesionales verificados en tu zona. Ves su perfil, trabajos anteriores y calificaciones."
              icon={Zap}
            />
            <StepCard
              number="03"
              title="Coordinas y seguís todo"
              description="Negocias el precio directamente, coordinas horarios y seguís el progreso en tiempo real desde tu celular."
              icon={Eye}
            />
          </div>
        </div>
      </section>

      {/* For Workers Section */}
      <section id="for-workers" className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-black mb-8 tracking-tight">
                ¿Ofrecés algún servicio?
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Conectate con clientes de tu zona de forma directa y simple. 
                Sin intermediarios, sin comisiones ocultas.
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Trabajo en tu zona</h3>
                    <p className="text-gray-600">Conectate con clientes de tu comunidad local</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Matches instantáneos</h3>
                    <p className="text-gray-600">Recibí solicitudes que coincidan exactamente con tus habilidades</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Construí tu reputación</h3>
                    <p className="text-gray-600">Sistema de calificaciones transparente y reviews reales</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Sin comisiones ocultas</h3>
                    <p className="text-gray-600">Negociás directamente con el cliente, sin intermediarios</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => window.open('https://web.serbis.app', '_blank')}
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 group"
              >
                Quiero Trabajar en Serbis
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors">
                    <Users className="w-10 h-10 text-black mx-auto mb-4" />
                    <h3 className="font-semibold text-black mb-2 text-sm">Clientes Locales</h3>
                    <p className="text-gray-600 text-xs">Trabajo en tu comunidad</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors">
                    <Star className="w-10 h-10 text-black mx-auto mb-4" />
                    <h3 className="font-semibold text-black mb-2 text-sm">Reviews Reales</h3>
                    <p className="text-gray-600 text-xs">Construí tu reputación</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors">
                    <Zap className="w-10 h-10 text-black mx-auto mb-4" />
                    <h3 className="font-semibold text-black mb-2 text-sm">Conexión Rápida</h3>
                    <p className="text-gray-600 text-xs">Matches al instante</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors">
                    <Shield className="w-10 h-10 text-black mx-auto mb-4" />
                    <h3 className="font-semibold text-black mb-2 text-sm">Pago Seguro</h3>
                    <p className="text-gray-600 text-xs">Transacciones protegidas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-black text-white px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 tracking-tight">
            Resolvé cualquier necesidad en minutos
          </h2>
          <p className="text-xl mb-12 text-gray-300 leading-relaxed">
            Únete a miles de personas que ya confían en Serbis para encontrar servicios de calidad
          </p>
          
          <Button 
            onClick={() => window.open('https://web.serbis.app', '_blank')}
            className="bg-white text-black hover:bg-gray-100 px-10 py-4 rounded-full font-semibold transition-all duration-300 group"
          >
            Comenzar Ahora
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-16 px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <img 
                  src="/favicon.ico" 
                  alt="Serbis" 
                  className="w-10 h-10 mr-3"
                />
                <span className="text-xl font-semibold tracking-tight">Serbis</span>
              </div>
              <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                La plataforma que conecta a personas con profesionales de servicios 
                de forma instantánea y confiable.
              </p>
              <div className="text-gray-600 space-y-1">
                <p className="font-medium">Buenos Aires, Argentina</p>
                <a 
                  href="mailto:inaki.iturriaga@serbis.app" 
                  className="text-black hover:text-gray-700 transition-colors font-medium"
                >
                  inaki.iturriaga@serbis.app
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-black">Producto</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#features" className="hover:text-black transition-colors">Funcionalidades</a></li>
                <li><a href="#how-it-works" className="hover:text-black transition-colors">Cómo Funciona</a></li>
                <li><a href="#for-workers" className="hover:text-black transition-colors">Para Proveedores</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-black">Empresa</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="mailto:inaki.iturriaga@serbis.app" className="hover:text-black transition-colors">Contacto</a></li>
                <li><a href="https://web.serbis.app" target="_blank" className="hover:text-black transition-colors">Empezar</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2025 Serbis. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500 p-8 border border-gray-100 group hover:-translate-y-1">
    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors duration-300">
      <Icon className="w-6 h-6 text-black" />
    </div>
    <h3 className="text-xl font-semibold text-black mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// Step Card Component
const StepCard = ({ number, title, description, icon: Icon }: {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}) => (
  <div className="text-center group">
    <div className="relative mb-8">
      <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-105 transition-transform duration-300">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-sm">
        <span className="text-xs font-bold text-black">{number}</span>
      </div>
    </div>
    <h3 className="text-2xl font-bold text-black mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{description}</p>
  </div>
);

export default Index;