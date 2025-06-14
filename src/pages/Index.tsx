
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Apple,
  Menu,
  ArrowRight,
  Users,
  BadgeCheck,
  MessageCircle,
  Zap,
  Sparkles,
  Rocket,
  Target,
} from "lucide-react";
import { AnimatedWrapper } from '@/components/AnimatedWrapper';

const Index = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const navClass = scrolled 
        ? 'bg-background/95 backdrop-blur-2xl border-b border-zinc-200/60 shadow-lg shadow-black/5' 
        : 'bg-transparent';

    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 font-mulish text-zinc-800 min-h-screen overflow-hidden" id="page-top">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div 
                    className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                        transition: 'transform 0.3s ease-out'
                    }}
                />
                <div 
                    className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"
                    style={{
                        transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
                        transition: 'transform 0.3s ease-out',
                        animationDelay: '1s'
                    }}
                />
            </div>

            {/* --- Navigation --- */}
            <nav className={`fixed w-full top-0 z-50 transition-all duration-700 ${navClass}`}>
                <div className="container mx-auto px-4 flex justify-between items-center py-4">
                    <a href="#page-top" className="flex items-center gap-3 font-bold group">
                        <div className="relative">
                            <Apple className="text-primary w-8 h-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <span className="text-3xl font-newsreader font-bold text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            Serbis
                        </span>
                    </a>
                    
                    <div className="hidden md:flex items-center space-x-2">
                        <a href="#how-it-works" className="px-6 py-3 text-sm font-medium text-zinc-600 hover:text-primary rounded-2xl transition-all duration-300 hover:bg-zinc-100/50 hover:scale-105">
                            Cómo Funciona
                        </a>
                        <a href="#why-serbis" className="px-6 py-3 text-sm font-medium text-zinc-600 hover:text-primary rounded-2xl transition-all duration-300 hover:bg-zinc-100/50 hover:scale-105">
                            Nosotros
                        </a>
                        <Button variant="outline" className="rounded-full px-6 py-3 border-2 hover:scale-105 transition-all duration-300 hover:shadow-lg">
                            Soy Proveedor
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" className="text-zinc-700 hover:scale-110 transition-transform duration-300">
                            <Menu />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <header className="relative pt-40 pb-32 text-center min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedWrapper>
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/40 rounded-full px-6 py-3 mb-8">
                            <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                            <span className="text-sm font-medium text-blue-700">Lanzamiento Oficial</span>
                        </div>
                    </AnimatedWrapper>
                    
                    <AnimatedWrapper>
                        <h1 className="font-newsreader font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 bg-clip-text tracking-tighter max-w-6xl mx-auto leading-tight">
                            El estándar
                            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                                Premium
                            </span>
                            para Servicios Locales
                        </h1>
                    </AnimatedWrapper>
                    
                    <AnimatedWrapper className="[animation-delay:200ms]">
                        <p className="mt-8 text-2xl md:text-3xl text-zinc-600 max-w-4xl mx-auto leading-relaxed font-light">
                           Conectá con profesionales en <span className="font-semibold text-primary">segundos</span>, sin esfuerzo. 
                           <br />Descubrí la manera más <span className="italic">simple y moderna</span> de resolver tus necesidades.
                        </p>
                    </AnimatedWrapper>
                    
                    <AnimatedWrapper className="mt-12 [animation-delay:400ms]">
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Button size="lg" className="group relative overflow-hidden rounded-full text-xl font-bold px-12 py-8 bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 border-0">
                                <span className="relative z-10 flex items-center gap-3">
                                    Publicá tu Pedido Ahora 
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Button>
                            
                            <Button variant="outline" size="lg" className="rounded-full text-xl font-medium px-12 py-8 border-2 border-zinc-300 hover:border-primary hover:scale-105 transition-all duration-300 hover:shadow-lg">
                                Ver Demo
                            </Button>
                        </div>
                    </AnimatedWrapper>

                    <AnimatedWrapper className="mt-20 [animation-delay:600ms]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-zinc-200/50 hover:scale-105 transition-all duration-500 hover:shadow-xl">
                                <div className="text-4xl font-bold text-primary mb-2">+10K</div>
                                <div className="text-zinc-600 font-medium">Usuarios Activos</div>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-zinc-200/50 hover:scale-105 transition-all duration-500 hover:shadow-xl">
                                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                                <div className="text-zinc-600 font-medium">Satisfacción</div>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-zinc-200/50 hover:scale-105 transition-all duration-500 hover:shadow-xl">
                                <div className="text-4xl font-bold text-primary mb-2">5⭐</div>
                                <div className="text-zinc-600 font-medium">Calificación</div>
                            </div>
                        </div>
                    </AnimatedWrapper>
                </div>
            </header>
            
            {/* --- How it Works Section --- */}
            <AnimatedWrapper tag="section" id="how-it-works" className="py-32 bg-gradient-to-b from-white to-gray-50 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="font-newsreader font-black text-5xl md:text-7xl mb-6 text-transparent bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text">
                            Simple. Rápido. Seguro.
                        </h2>
                        <p className="text-2xl text-zinc-600 font-light">Tu solución en tres simples pasos.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        <StepCard 
                            number="1" 
                            icon={Target}
                            title="Describí tu Necesidad" 
                            description="Contanos qué servicio necesitás. Es simple y elegante."
                            delay="0ms"
                        />
                        <StepCard 
                            number="2" 
                            icon={Zap}
                            title="Conectate al Instante" 
                            description="Encontrá opciones premium en tu zona al instante."
                            delay="200ms"
                        />
                        <StepCard 
                            number="3" 
                            icon={Rocket}
                            title="Resolvé y Calificá" 
                            description="Coordiná y calificá la experiencia. Todo desde la app."
                            delay="400ms"
                        />
                    </div>
                </div>
            </AnimatedWrapper>

            {/* --- Why Serbis Section --- */}
            <AnimatedWrapper tag="section" id="why-serbis" className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="font-newsreader font-black text-5xl md:text-7xl mb-6 text-transparent bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text">
                            ¿Por qué elegir Serbis?
                        </h2>
                        <p className="text-2xl text-zinc-600 max-w-3xl mx-auto font-light">
                            Nos enfocamos en la confianza, la calidad y la velocidad para brindarte una experiencia inigualable.
                        </p>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        <ReasonCard 
                            icon={Users} 
                            title="Red real y confiable" 
                            description="Personas de tu comunidad, listos para ayudar."
                            delay="0ms"
                        />
                        <ReasonCard 
                            icon={BadgeCheck} 
                            title="Verificación y reviews" 
                            description="Elegí seguro, con calificaciones confiables."
                            delay="100ms"
                        />
                        <ReasonCard 
                            icon={MessageCircle} 
                            title="Comunicación directa" 
                            description="Todo lo que necesitás en una sola app."
                            delay="200ms"
                        />
                        <ReasonCard 
                            icon={Zap} 
                            title="Premium & Rápido" 
                            description="Encontrá lo que buscás y resolvé ya."
                            delay="300ms"
                        />
                    </div>
                </div>
            </AnimatedWrapper>
            
            {/* --- Final CTA --- */}
            <AnimatedWrapper tag="section" className="py-32 text-center bg-gradient-to-b from-white to-gray-50 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-newsreader font-black text-5xl md:text-7xl text-transparent bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text mb-6">
                            ¿Listo para empezar?
                        </h2>
                        <p className="text-2xl text-zinc-600 max-w-3xl mx-auto mb-12 font-light">
                            Descargá la app hoy mismo y descubrí por qué Serbis es la elección preferida para servicios locales.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                            <AppStoreButton 
                                icon={Apple}
                                title="App Store"
                                subtitle="Descargala en el"
                            />
                            <AppStoreButton 
                                icon={({ className }: { className?: string }) => (
                                    <svg viewBox="30 336.7 120.9 129.2" className={className} fill="currentColor">
                                        <path d="M119.8,414.3c0,0.9,0.8,1.6,1.6,1.6h4.8c0.9,0,1.6-0.8,1.6-1.6V369c0-0.9-0.8-1.6-1.6-1.6h-4.8c-0.9,0-1.6,0.8-1.6,1.6V414.3z M119.8 336.7c0 0.9 0.8 1.6 1.6 1.6h4.8c0.9 0 1.6-0.8 1.6-1.6v-45.3c0-0.9-0.8-1.6-1.6-1.6h-4.8c-0.9 0-1.6 0.8-1.6 1.6V336.7z" />
                                    </svg>
                                )}
                                title="Google Play"
                                subtitle="Disponible en"
                            />
                        </div>
                    </div>
                </div>
            </AnimatedWrapper>
            
            {/* --- Footer --- */}
            <footer className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-zinc-400 py-16">
                <div className="container mx-auto px-4 text-center space-y-4">
                    <div className="flex justify-center mb-6">
                        <Apple className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-lg">© Serbis 2025. Todos los derechos reservados.</p>
                    <p className="text-zinc-500">Buenos Aires, Argentina</p>
                    <a href="mailto:inaki.iturriaga@serbis.app" className="text-blue-400 hover:text-blue-300 transition-colors text-lg font-medium">
                        inaki.iturriaga@serbis.app
                    </a>
                </div>
            </footer>
        </div>
    );
};

// Enhanced Step Card Component
const StepCard = ({ number, icon: Icon, title, description, delay }: { 
    number: string, 
    icon: React.ElementType, 
    title: string, 
    description: string,
    delay: string
}) => (
    <AnimatedWrapper className={`group cursor-pointer [animation-delay:${delay}]`}>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-zinc-200/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 hover:bg-white">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {number}
            </div>
            <div className="mb-6 flex justify-center">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                </div>
            </div>
            <h3 className="font-bold text-2xl mb-4 text-zinc-900">{title}</h3>
            <p className="text-zinc-600 text-lg leading-relaxed">{description}</p>
        </div>
    </AnimatedWrapper>
);

// Enhanced Reason Card Component
const ReasonCard = ({ icon: Icon, title, description, delay }: { 
    icon: React.ElementType, 
    title: string, 
    description: string,
    delay: string
}) => (
    <AnimatedWrapper className={`group cursor-pointer [animation-delay:${delay}]`}>
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-zinc-200/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 hover:bg-white h-full">
            <div className="mb-6 flex justify-center">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                </div>
            </div>
            <h3 className="font-bold text-xl mb-4 text-zinc-900">{title}</h3>
            <p className="text-zinc-600 leading-relaxed">{description}</p>
        </div>
    </AnimatedWrapper>
);

// App Store Button Component
const AppStoreButton = ({ icon: Icon, title, subtitle }: {
    icon: React.ElementType,
    title: string,
    subtitle: string
}) => (
    <button className="group w-60 h-16 border-2 border-zinc-300 bg-white text-zinc-900 flex items-center gap-4 shadow-lg rounded-2xl hover:bg-zinc-50 hover:border-primary hover:scale-105 transition-all duration-300 px-6">
        <Icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
        <div className="text-left">
            <div className="text-xs text-zinc-500 leading-tight">{subtitle}</div>
            <div className="text-xl font-bold leading-tight">{title}</div>
        </div>
    </button>
);

export default Index;
