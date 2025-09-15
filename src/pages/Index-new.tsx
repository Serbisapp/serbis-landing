import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Users,
  MessageCircle,
  Clock,
  Shield,
  Star,
  CheckCircle,
  Search,
  Zap,
  Menu,
  X,
  Play,
  DollarSign,
  MapPin,
  Award,
  Smartphone,
  Globe,
  Eye
} from "lucide-react";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate screenshots
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreenshot((prev) => (prev + 1) % 4);
    }, 4000);
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
    },
    {
      src: "/lovable-uploads/9a63b71d-a687-4f28-97c2-dfa5cb7bef35.png",
      title: "Perfil Completo",
      description: "Profesionales verificados y calificados"
    }
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <img 
                  src="/lovable-uploads/9a63b71d-a687-4f28-97c2-dfa5cb7bef35.png" 
                  alt="Serbis" 
                  className="w-7 h-7 rounded-lg"
                />
              </div>
              <span className="text-2xl font-bold text-gray-900">Serbis</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Funcionalidades
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Cómo Funciona
              </a>
              <a href="#for-workers" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Para Trabajadores
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-4 bg-white">
              <a href="#features" className="block text-gray-600 hover:text-gray-900 font-medium">
                Funcionalidades
              </a>
              <a href="#how-it-works" className="block text-gray-600 hover:text-gray-900 font-medium">
                Cómo Funciona
              </a>
              <a href="#for-workers" className="block text-gray-600 hover:text-gray-900 font-medium">
                Para Trabajadores
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
                Cualquier servicio,{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  en segundos
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Describe lo que necesitas y te conectamos instantáneamente con el profesional perfecto. 
                <span className="font-semibold text-gray-900"> Simple. Rápido. Confiable.</span>
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-2 mb-8 max-w-2xl mx-auto lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Ej: Necesito un plomero para arreglar una canilla..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-4 text-lg border-0 bg-transparent focus:ring-0 focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    Encontrar
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Quick Services */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {['Plomería', 'Electricidad', 'Limpieza', 'Jardinería', 'Pintura', 'Cerrajería'].map((service) => (
                  <button
                    key={service}
                    onClick={() => {
                      setSearchQuery(`Necesito servicio de ${service.toLowerCase()}`);
                      setTimeout(handleSearch, 100);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 hover:text-gray-900 transition-all duration-200 font-medium"
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* App Screenshots */}
            <div className="relative">
              <div className="relative mx-auto w-80 h-[600px] bg-gradient-to-tr from-gray-900 to-gray-700 rounded-[3rem] p-2 shadow-2xl">
                {/* Phone Frame */}
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-black z-10 flex justify-between items-center px-6 text-white text-sm">
                    <span>9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Screenshot */}
                  <img
                    src={screenshots[currentScreenshot].src}
                    alt={screenshots[currentScreenshot].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div>
              </div>

              {/* Screenshot Indicators */}
              <div className="flex justify-center mt-8 space-x-3">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentScreenshot(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentScreenshot 
                        ? 'bg-blue-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Screenshot Info */}
              <div className="text-center mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {screenshots[currentScreenshot].title}
                </h3>
                <p className="text-gray-600">
                  {screenshots[currentScreenshot].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">5s</div>
              <div className="text-gray-600">Conexión Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Disponibilidad</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Profesionales Verificados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">∞</div>
              <div className="text-gray-600">Tipos de Servicios</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Todo lo que necesitas en una app
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desde la búsqueda hasta el pago, todo integrado para una experiencia perfecta
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Search}
              title="Búsqueda Inteligente"
              description="Describe tu necesidad en lenguaje natural y nuestro algoritmo encuentra al profesional perfecto instantáneamente."
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={Zap}
              title="Conexión en 5 Segundos"
              description="Match automático basado en ubicación, experiencia y disponibilidad del profesional más adecuado."
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={MessageCircle}
              title="Chat Integrado"
              description="Comunicación directa con fotos, videos y documentos. Todo sin salir de la aplicación."
              gradient="from-green-500 to-emerald-500"
            />
            <FeatureCard
              icon={Shield}
              title="Profesionales Verificados"
              description="Todos los profesionales pasan por un proceso de verificación y tienen ratings de clientes reales."
              gradient="from-orange-500 to-red-500"
            />
            <FeatureCard
              icon={Eye}
              title="Seguimiento en Tiempo Real"
              description="Monitorea el progreso de tu servicio con actualizaciones automáticas y notificaciones instantáneas."
              gradient="from-indigo-500 to-blue-500"
            />
            <FeatureCard
              icon={DollarSign}
              title="Negociación Transparente"
              description="Precios claros, negociación directa sin comisiones ocultas. Pagás exactamente lo acordado."
              gradient="from-teal-500 to-green-500"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
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
      <section id="for-workers" className="py-32 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
                ¿Ofrecés algún servicio?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Conectate con clientes de tu zona de forma directa y simple. Sin intermediarios, sin comisiones ocultas.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Trabajo en tu zona</h3>
                    <p className="text-gray-600">Conectate con clientes de tu comunidad local</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Matches instantáneos</h3>
                    <p className="text-gray-600">Recibí solicitudes que coincidan exactamente con tus habilidades</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Construí tu reputación</h3>
                    <p className="text-gray-600">Sistema de calificaciones transparente y reviews reales</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Sin comisiones ocultas</h3>
                    <p className="text-gray-600">Negociás directamente con el cliente, sin intermediarios</p>
                  </div>
                </div>
              </div>

              <a href="https://web.serbis.app" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Quiero Trabajar en Serbis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-2xl p-6 text-center">
                    <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Clientes Locales</h3>
                    <p className="text-gray-600 text-sm">Trabajo en tu comunidad</p>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-6 text-center">
                    <Star className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Reviews Reales</h3>
                    <p className="text-gray-600 text-sm">Construí tu reputación</p>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-6 text-center">
                    <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Conexión Rápida</h3>
                    <p className="text-gray-600 text-sm">Matches al instante</p>
                  </div>
                  <div className="bg-orange-50 rounded-2xl p-6 text-center">
                    <Shield className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Pago Seguro</h3>
                    <p className="text-gray-600 text-sm">Transacciones protegidas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">
            Resolvé cualquier necesidad en minutos
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Únete a miles de personas que ya confían en Serbis para encontrar servicios de calidad
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="https://web.serbis.app" target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                Comenzar Ahora
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/9a63b71d-a687-4f28-97c2-dfa5cb7bef35.png" 
                    alt="Serbis" 
                    className="w-7 h-7 rounded-lg"
                  />
                </div>
                <span className="text-2xl font-bold">Serbis</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                La plataforma que conecta a personas con profesionales de servicios de forma instantánea y confiable.
              </p>
              <div className="text-gray-400">
                <p>Buenos Aires, Argentina</p>
                <a href="mailto:inaki.iturriaga@serbis.app" className="text-blue-400 hover:text-blue-300 transition-colors">
                  inaki.iturriaga@serbis.app
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Cómo Funciona</a></li>
                <li><a href="#for-workers" className="hover:text-white transition-colors">Para Trabajadores</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:inaki.iturriaga@serbis.app" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="https://web.serbis.app" target="_blank" className="hover:text-white transition-colors">Empezar</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Serbis. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, gradient }: {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group hover:-translate-y-2">
    <div className={`w-14 h-14 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
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
      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-10 h-10 text-white" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-sm font-bold text-blue-600">{number}</span>
      </div>
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{description}</p>
  </div>
);

export default Index;