import React, { useMemo, useRef, useState, useEffect } from 'react';
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
  CheckCircle2,
  ChevronRight,
  MapPin,
  Navigation,
  Clock,
  Send
} from "lucide-react";

// --- Utility Functions ---
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;
const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
const normalizeRange = (val: number, min: number, max: number) => clamp((val - min) / (max - min), 0, 1);

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileNavVisible, setMobileNavVisible] = useState(true);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const [activeFeatureStep, setActiveFeatureStep] = useState(0);
  const [featureScrollProgress, setFeatureScrollProgress] = useState(0);
  const featuresScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isDesktop = window.innerWidth >= 1024;

      // Basic scrolled state for glass effect
      setScrolled(currentScrollY > 50);

      // Mobile Nav Visibility Logic
      if (!isDesktop) {
        const targetSection = document.getElementById('how-it-works');
        // Show if at top, or if we have reached the 'how-it-works' section (trigger slightly before it hits top of viewport)
        const triggerPoint = targetSection ? targetSection.offsetTop - window.innerHeight * 0.3 : document.body.offsetHeight;

        const isAtTop = currentScrollY < 50;
        const isPastTrigger = currentScrollY >= triggerPoint;

        if (isAtTop || isPastTrigger) {
          setMobileNavVisible(true);
        } else {
          setMobileNavVisible(false);
        }
      } else {
        setMobileNavVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentScreenshot((prev) => (prev + 1) % 3), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!document.querySelector('script[src*="googletagmanager"]')) {
      const script1 = document.createElement('script');
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-YWGHHB01T7';
      script1.async = true;
      document.head.appendChild(script1);
      const script2 = document.createElement('script');
      script2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-YWGHHB01T7', { page_path: window.location.pathname });`;
      document.head.appendChild(script2);
    }
  }, []);

  const handleSearch = () => window.open('https://web.serbis.app', '_blank');

  const screenshots = [
    { src: "/lovable-uploads/Inclinado1.png", title: "Búsqueda Inteligente", description: "Describe lo que necesitas en lenguaje natural" },
    { src: "/lovable-uploads/Inclinado2.png", title: "Chat Integrado", description: "Comunicación directa con profesionales" },
    { src: "/lovable-uploads/Inclinado3.png", title: "Estado en Tiempo Real", description: "Seguí el progreso de tu servicio" }
  ];

  const featureSteps = useMemo(() => ([
    { key: "search", icon: Search, title: "Describí lo que necesitás", description: "Sin navegar categorías: escribí tu pedido con tus palabras y encontrá ayuda al instante." },
    { key: "chat", icon: MessageCircle, title: "Contactá y coordiná", description: "Hablás directo con la persona y coordinás para ahora o para otro día. Simple y sin rodeos." },
    { key: "live", icon: Navigation, title: "Seguí en tiempo real", description: "Sabé exactamente cuándo llega el profesional. Tranquilidad de principio a fin." },
  ] as const), []);

  useEffect(() => {
    const section = featuresScrollRef.current;
    if (!section) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const totalScrollable = Math.max(1, rect.height - viewportHeight);
        const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollable);
        const progress = scrolled / totalScrollable;
        setFeatureScrollProgress(progress);
        setActiveFeatureStep(Math.min(featureSteps.length - 1, Math.floor(progress * featureSteps.length)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
  }, [featureSteps.length]);

  const scrollToFeatureStep = (index: number) => {
    const section = featuresScrollRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const viewportHeight = window.innerHeight || 1;
    const totalScrollable = Math.max(1, rect.height - viewportHeight);
    const target = sectionTop + (index / featureSteps.length) * totalScrollable + 50;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans selection:bg-gray-100">
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-gray-100' : 'bg-transparent'} ${!mobileNavVisible ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <img src="/favicon.ico" alt="Serbis" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-xl font-bold tracking-tight hidden sm:block">Serbis</span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">Funcionalidades</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">Cómo Funciona</a>
              <a href="#for-workers" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">Para Proveedores</a>
              <Button onClick={() => window.open('https://web.serbis.app', '_blank')} className="bg-black hover:bg-gray-800 text-white px-6 py-2 h-10 rounded-full font-medium">Abrir App</Button>
            </div>
            <div className="md:hidden flex items-center space-x-3">
              <Button onClick={() => window.open('https://web.serbis.app', '_blank')} className="bg-black hover:bg-gray-800 text-white px-4 py-2 h-9 rounded-full font-medium text-sm">Ingresar</Button>
              <button className="p-2 hover:bg-gray-100 rounded-xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-6 space-y-4 bg-white/95 backdrop-blur-xl absolute left-0 w-full px-6 shadow-xl">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-gray-900 font-medium py-2">Funcionalidades</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-gray-900 font-medium py-2">Cómo Funciona</a>
              <a href="#for-workers" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-gray-900 font-medium py-2">Para Proveedores</a>
              <Button onClick={() => window.open('https://web.serbis.app', '_blank')} className="w-full bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium">Abrir App</Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pb-24 px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left z-10">
              <a href="https://emprelatam.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-6 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group align-middle no-underline">
                <span className="text-[11px] font-bold tracking-wider text-gray-900 uppercase">Batch ECL15</span>
                <span className="text-gray-300">|</span>
                <img src="/emprelatam-logo.png" alt="Emprelatam" className="h-5 w-auto object-contain" />
              </a>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-[0.95] tracking-tight mb-6">
                Servicios que generan<br /><span className="text-gray-500">trabajo real.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Serbis conecta tu necesidad de servicio con personas capacitadas por fundaciones, integrándolas al mercado laboral.
              </p>
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-2 mb-6 max-w-2xl mx-auto lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input type="text" placeholder="Necesito un plomero para..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 pr-4 h-14 text-base border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-400 w-full" onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                  </div>
                  <Button size="lg" onClick={handleSearch} className="h-14 bg-black hover:bg-gray-800 text-white px-8 rounded-xl font-semibold group shrink-0">Buscar<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {['Plomería', 'Electricidad', 'Limpieza', 'Jardinería'].map((service) => (
                  <button key={service} onClick={() => { setSearchQuery(`Necesito servicio de ${service.toLowerCase()}`); setTimeout(handleSearch, 100); }} className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-600 hover:text-black transition-all font-medium text-sm border border-gray-200">{service}</button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative w-full max-w-md mx-auto aspect-[4/5]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-gray-100 to-gray-50 rounded-full blur-3xl opacity-60 -z-10" />
                <img src={screenshots[currentScreenshot].src} alt={screenshots[currentScreenshot].title} className="w-full h-full object-contain drop-shadow-2xl transition-all duration-700 ease-in-out transform hover:scale-[1.02]" />
                <div className="absolute -left-8 top-1/4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-gray-100 flex items-center gap-3 animate-bounce-slow">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
                  <div><p className="text-sm font-bold text-gray-900">Conexión</p><p className="text-xs text-gray-500">En 3 segundos</p></div>
                </div>
                <div className="absolute -right-4 bottom-1/4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-gray-100 flex items-center gap-3 animate-bounce-slow delay-1000">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><Shield className="w-5 h-5 text-blue-600" /></div>
                  <div><p className="text-sm font-bold text-gray-900">Perfiles Reales</p><p className="text-xs text-gray-500">Identidad Validada</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 lg:px-8 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6 tracking-tight">Todo lo que necesitas</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">Un recorrido simple: scrolleá y mirá cómo funciona Serbis.</p>
          </div>

          {/* Unified Scroll Animation */}
          <div ref={featuresScrollRef} className="relative" style={{ height: `${featureSteps.length * 100 + 50}vh` }}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
              <div className="w-full flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                {/* Left: Text */}
                <div className="w-full lg:col-span-5 relative z-10 px-4 lg:px-0">
                  <div className="bg-white/80 backdrop-blur-sm p-6 lg:p-8 rounded-3xl border border-gray-100/50 shadow-sm max-h-[40vh] lg:max-h-none overflow-y-auto lg:overflow-visible">
                    <div className="relative min-h-[200px] lg:min-h-[320px]">
                      {featureSteps.map((step, index) => (
                        <div key={step.key} className={`absolute inset-0 transition-all duration-500 ease-out transform ${index === activeFeatureStep ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                          <div className="flex items-center gap-3 mb-4 lg:mb-6">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-xs font-bold">{index + 1}</span>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Paso {index + 1} de {featureSteps.length}</span>
                          </div>
                          <h3 className="text-2xl lg:text-5xl font-bold text-black mb-4 lg:mb-6 leading-[1.1] tracking-tight">{step.title}</h3>
                          <p className="text-base lg:text-xl text-gray-600 leading-relaxed">{step.description}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex gap-2">
                      {featureSteps.map((_, idx) => (<button key={idx} onClick={() => scrollToFeatureStep(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeFeatureStep ? 'w-12 bg-black' : 'w-4 bg-gray-200 hover:bg-gray-300'}`} />))}
                    </div>
                  </div>
                </div>

                {/* Right: 3D Phone */}
                <div className="w-full lg:col-span-7 h-[45vh] lg:h-[600px] flex items-center justify-center relative perspective-[1200px]">
                  <div className="transform scale-75 lg:scale-100 transition-transform duration-300">
                    <PhoneJourneyAnimation progress={featureScrollProgress} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gray-50 px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6 tracking-tight">Así de simple</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Tres pasos para resolver cualquier necesidad de servicio</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <StepCard number="01" title="Describe tu necesidad" description="Escribe en lenguaje natural exactamente lo que necesitas." icon={Search} />
            <StepCard number="02" title="Te conectamos al instante" description="En menos de 5 segundos te mostramos profesionales verificados en tu zona." icon={Zap} />
            <StepCard number="03" title="Coordinas y seguís todo" description="Negocias el precio directamente y seguís el progreso en tiempo real." icon={Eye} />
          </div>
        </div>
      </section >

      {/* For Workers Section */}
      < section id="for-workers" className="py-24 px-6 lg:px-8 bg-white" >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">Para Profesionales</div>
              <h2 className="text-4xl sm:text-5xl font-bold text-black mb-8 tracking-tight">¿Ofrecés algún servicio?</h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">Conectate con clientes de tu zona de forma directa. Sin intermediarios, sin comisiones ocultas.</p>
              <div className="space-y-6 mb-12">
                {[{ icon: CheckCircle, title: "Trabajo en tu zona", desc: "Conectate con clientes de tu comunidad local" }, { icon: Zap, title: "Matches instantáneos", desc: "Recibí solicitudes que coincidan con tus habilidades" }, { icon: Award, title: "Construí tu reputación", desc: "Sistema de calificaciones transparente" }, { icon: DollarSign, title: "Sin comisiones ocultas", desc: "Negociás directamente con el cliente" }].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center flex-shrink-0"><item.icon className="w-4 h-4 text-black" /></div>
                    <div><h3 className="font-bold text-black mb-1">{item.title}</h3><p className="text-sm text-gray-600">{item.desc}</p></div>
                  </div>
                ))}
              </div>
              <Button onClick={() => window.open('https://web.serbis.app', '_blank')} className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold group shadow-xl shadow-black/10">Quiero ser Proveedor<ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 transform rotate-3 rounded-3xl -z-10" />
              <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  {[{ icon: Users, title: "Clientes Locales", sub: "Trabajo cercano" }, { icon: Star, title: "Reviews Reales", sub: "Reputación" }, { icon: Zap, title: "Conexión Rápida", sub: "Sin demoras" }, { icon: Shield, title: "Seguridad", sub: "Datos protegidos" }].map((card, i) => (
                    <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors group cursor-default">
                      <card.icon className="w-10 h-10 text-gray-400 group-hover:text-black transition-colors mx-auto mb-4" />
                      <h3 className="font-bold text-black mb-1 text-sm">{card.title}</h3>
                      <p className="text-gray-500 text-xs">{card.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* CTA Section */}
      < section className="py-24 bg-black text-white px-6 lg:px-8 relative overflow-hidden" >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-900 to-black opacity-50" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 tracking-tight">Resolvé cualquier necesidad en minutos</h2>
          <p className="text-xl mb-12 text-gray-400 leading-relaxed max-w-2xl mx-auto">Únete a la comunidad de Serbis. Calidad, confianza y rapidez en un solo lugar.</p>
          <Button onClick={() => window.open('https://web.serbis.app', '_blank')} className="bg-white text-black hover:bg-gray-200 px-10 py-4 h-auto text-lg rounded-full font-bold group">Comenzar Ahora<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></Button>
        </div>
      </section >

      {/* Footer */}
      < footer className="bg-white py-16 px-6 lg:px-8 border-t border-gray-100" >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center mb-6"><img src="/favicon.ico" alt="Serbis" className="w-8 h-8 mr-3" /><span className="text-xl font-bold tracking-tight">Serbis</span></div>
              <p className="text-gray-500 mb-8 max-w-xs text-sm leading-relaxed">Plataforma de servicios instantáneos. Conectamos necesidades con soluciones reales.</p>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-black text-sm uppercase tracking-wider">Producto</h3>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#features" className="hover:text-black transition-colors">Funcionalidades</a></li>
                <li><a href="#how-it-works" className="hover:text-black transition-colors">Cómo Funciona</a></li>
                <li><a href="#for-workers" className="hover:text-black transition-colors">Para Proveedores</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-black text-sm uppercase tracking-wider">Contacto</h3>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="mailto:help@serbis.app" className="hover:text-black transition-colors">Ayuda y Soporte</a></li>
                <li><a href="https://web.serbis.app" className="hover:text-black transition-colors">Web App</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-16 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Serbis. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer >
    </div >
  );
};

// --- PHONE JOURNEY ANIMATION COMPONENT ---
const PhoneJourneyAnimation = ({ progress }: { progress: number }) => {
  const rotationY = lerp(12, -12, progress);
  const rotationX = lerp(8, 15, progress);

  // Define stages
  const stage1End = 0.33;
  const stage2End = 0.66;

  const stage1Progress = normalizeRange(progress, 0, stage1End);
  const stage2Progress = normalizeRange(progress, stage1End, stage2End);
  const stage3Progress = normalizeRange(progress, stage2End, 1);

  // Determine active screen
  let activeScreen: 'search' | 'chat' | 'map' = 'search';
  if (progress >= stage2End) activeScreen = 'map';
  else if (progress >= stage1End) activeScreen = 'chat';

  return (
    <div
      className="relative w-[280px] h-[560px] transition-transform duration-100 ease-linear"
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
      }}
    >
      {/* Phone Body */}
      <div className="absolute inset-0 bg-[#1a1a1a] rounded-[44px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] p-[10px]">
        <div className="w-full h-full bg-white rounded-[36px] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#1a1a1a] rounded-b-2xl z-50 flex items-center justify-center">
            <div className="w-12 h-3 bg-[#0a0a0a] rounded-full" />
          </div>

          {/* Screen Content Container */}
          <div className="absolute inset-0 pt-10 pb-4 px-4 flex flex-col">
            {/* SEARCH SCREEN */}
            <div className={`absolute inset-0 pt-10 pb-4 px-4 flex flex-col transition-opacity duration-500 ${activeScreen === 'search' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <SearchScreen progress={stage1Progress} />
            </div>

            {/* CHAT SCREEN */}
            <div className={`absolute inset-0 pt-10 pb-4 px-4 flex flex-col transition-opacity duration-500 ${activeScreen === 'chat' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <ChatScreen progress={stage2Progress} />
            </div>

            {/* MAP SCREEN */}
            <div className={`absolute inset-0 pt-10 pb-4 px-4 flex flex-col transition-opacity duration-500 ${activeScreen === 'map' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <MapScreen progress={stage3Progress} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SEARCH SCREEN ---
const SearchScreen = ({ progress }: { progress: number }) => {
  const searchText = "Necesito un plomero urgente";
  const typedLength = Math.floor(progress * 1.5 * searchText.length);
  const displayedText = searchText.substring(0, Math.min(typedLength, searchText.length));

  const showResults = progress > 0.4;
  const showSelection = progress > 0.8;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center mb-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Buscar Servicio</p>
      </div>

      {/* Search Input */}
      <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 border border-gray-100">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
        <span className="text-sm text-gray-800 flex-1 truncate">
          {displayedText}
          <span className="inline-block w-0.5 h-4 bg-black ml-0.5 animate-pulse" />
        </span>
      </div>

      {/* Results */}
      <div className={`mt-4 flex-1 flex flex-col gap-3 transition-all duration-500 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Resultados cercanos</p>

        {[
          { name: "Carlos M.", rating: "4.9", time: "5 min", selected: true },
          { name: "Ana G.", rating: "4.7", time: "12 min", selected: false },
        ].map((worker, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl border-2 flex items-center gap-3 transition-all duration-300 ${worker.selected && showSelection
              ? 'border-black bg-gray-50 scale-[1.02]'
              : 'border-gray-100 bg-white'
              }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
              {worker.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">{worker.name}</p>
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span>{worker.rating}</span>
                <span>•</span>
                <Clock className="w-3 h-3" />
                <span>{worker.time}</span>
              </div>
            </div>
            {worker.selected && showSelection && (
              <CheckCircle2 className="w-5 h-5 text-black" />
            )}
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className={`mt-auto transition-all duration-500 ${showSelection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="w-full bg-black text-white rounded-xl py-3 text-center text-sm font-bold">
          Contactar
        </div>
      </div>
    </div>
  );
};

// --- CHAT SCREEN ---
const ChatScreen = ({ progress }: { progress: number }) => {
  const messages = [
    { from: 'user', text: '¡Hola! ¿Podés venir hoy?' },
    { from: 'worker', text: '¡Hola! Sí, puedo en 30 min' },
    { from: 'user', text: 'Perfecto, te espero entonces!' },
    { from: 'worker', text: '¡Recibido! Voy en camino 🚗' },
  ];

  const visibleMessages = Math.floor(progress * (messages.length + 1));
  const showConfirmation = progress > 0.9;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-gray-100 mb-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">C</div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900">Carlos M.</p>
          <p className="text-[10px] text-green-600 font-medium">En línea</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-3 rounded-2xl text-xs transition-all duration-300 ${i < visibleMessages
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
              } ${msg.from === 'user'
                ? 'bg-black text-white self-end rounded-br-sm'
                : 'bg-gray-100 text-gray-800 self-start rounded-bl-sm'
              }`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Confirmation or Input */}
      <div className="mt-auto">
        {showConfirmation ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-3 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-green-800">Servicio Confirmado</p>
              <p className="text-[10px] text-green-600">Llegada estimada: 30 min</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
            <input type="text" placeholder="Escribe un mensaje..." className="flex-1 bg-transparent text-xs px-2 outline-none" readOnly />
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <Send className="w-3 h-3 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAP SCREEN ---
const MapScreen = ({ progress }: { progress: number }) => {
  // Path points for the red route line (SVG coordinates)
  const pathPoints = "M 30,160 Q 60,140 80,120 T 130,100 T 170,80 T 200,50";

  // Worker position along the path
  const workerProgress = Math.min(progress * 1.2, 1);

  // Approximate position calculation
  const workerX = lerp(30, 200, workerProgress);
  const workerY = lerp(160, 50, workerProgress);

  const showArrived = progress > 0.95;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Seguimiento en vivo</p>
          <p className="text-sm font-bold text-gray-900">Carlos está en camino</p>
        </div>
        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-green-700">EN VIVO</span>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden relative">
        {/* Grid pattern for map effect */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#d1d5db" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Route Path SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 230 200" preserveAspectRatio="xMidYMid meet">
          {/* Full path (gray, dashed) */}
          <path
            d={pathPoints}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
            strokeDasharray="6 4"
          />

          {/* Traveled path (red) */}
          <path
            d={pathPoints}
            fill="none"
            stroke="#ef4444"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              strokeDasharray: 300,
              strokeDashoffset: 300 - (300 * workerProgress),
              transition: 'stroke-dashoffset 100ms linear'
            }}
          />

          {/* Destination marker */}
          <g transform="translate(200, 50)">
            <circle r="12" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
            <circle r="5" fill="#ef4444" />
          </g>

          {/* Origin marker */}
          <g transform="translate(30, 160)">
            <circle r="8" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" />
            <circle r="3" fill="#6b7280" />
          </g>

          {/* Worker marker (moving) */}
          <g transform={`translate(${workerX}, ${workerY})`} style={{ transition: 'transform 100ms linear' }}>
            <circle r="14" fill="#000" />
            <circle r="10" fill="#fff" />
            <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#000">🚗</text>
          </g>
        </svg>

        {/* ETA Card */}
        <div className="absolute bottom-3 left-3 right-3 bg-white rounded-xl p-3 shadow-lg border border-gray-100">
          {showArrived ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-green-800">¡Carlos llegó!</p>
                <p className="text-[10px] text-gray-500">Está esperando en tu ubicación</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-900">Llegada estimada</p>
                <p className="text-lg font-bold text-black">{Math.max(1, Math.round((1 - workerProgress) * 25))} min</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500">Distancia</p>
                <p className="text-sm font-bold text-gray-700">{(Math.max(0.1, (1 - workerProgress) * 2.5)).toFixed(1)} km</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Step Card Component ---
const StepCard = ({ number, title, description, icon: Icon }: { number: string; title: string; description: string; icon: React.ElementType }) => (
  <div className="text-center group p-6 rounded-3xl transition-colors hover:bg-white hover:shadow-xl hover:shadow-gray-200/50">
    <div className="relative mb-8 inline-block">
      <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"><Icon className="w-7 h-7 text-white" /></div>
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-white border-4 border-gray-50 rounded-full flex items-center justify-center shadow-sm"><span className="text-xs font-bold text-black">{number}</span></div>
    </div>
    <h3 className="text-2xl font-bold text-black mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed max-w-xs mx-auto text-sm lg:text-base">{description}</p>
  </div>
);

export default Index;