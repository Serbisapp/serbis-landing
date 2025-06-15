
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Apple,
  Menu,
  ArrowRight,
  Users,
  BadgeCheck,
  MessageCircle,
  Clock,
  Shield,
  Star,
  MapPin,
  CheckCircle,
  Phone,
} from "lucide-react";
import { AnimatedWrapper } from '@/components/AnimatedWrapper';
import { HorizontalScroll3D } from '@/components/HorizontalScroll3D';

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
        ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50' 
        : 'bg-transparent';

    return (
        <div className="bg-slate-950 font-inter text-slate-100 min-h-screen overflow-hidden" id="page-top">
            {/* Tech Grid Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:100px_100px]" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
                <div 
                    className="absolute w-[800px] h-[800px] bg-gradient-to-r from-emerald-400/5 to-blue-400/5 rounded-full blur-3xl"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                        transition: 'transform 0.3s ease-out',
                        top: '10%',
                        left: '-20%'
                    }}
                />
                <div 
                    className="absolute w-[600px] h-[600px] bg-gradient-to-l from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"
                    style={{
                        transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
                        transition: 'transform 0.3s ease-out',
                        bottom: '20%',
                        right: '-15%'
                    }}
                />
            </div>

            {/* Navigation */}
            <nav className={`fixed w-full top-0 z-50 transition-all duration-700 ${navClass}`}>
                <div className="container mx-auto px-6 flex justify-between items-center py-6">
                    <a href="#page-top" className="flex items-center gap-3 font-bold group">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg shadow-emerald-500/25">
                                <span className="text-slate-950 font-black text-lg">S</span>
                            </div>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                            Serbis
                        </span>
                    </a>
                    
                    <div className="hidden md:flex items-center space-x-1">
                        <a href="#como-funciona" className="px-6 py-3 text-sm font-medium text-slate-300 hover:text-emerald-400 rounded-xl transition-all duration-300 hover:bg-slate-800/50">
                            Cómo Funciona
                        </a>
                        <a href="#por-que-serbis" className="px-6 py-3 text-sm font-medium text-slate-300 hover:text-emerald-400 rounded-xl transition-all duration-300 hover:bg-slate-800/50">
                            Confianza
                        </a>
                        <Button variant="outline" className="ml-4 rounded-xl px-6 py-3 border border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10 hover:border-emerald-400 transition-all duration-300">
                            Soy Profesional
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-emerald-400">
                            <Menu />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 text-center min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 relative z-10">
                    <AnimatedWrapper>
                        <div className="inline-flex items-center gap-3 bg-slate-800/30 border border-emerald-400/20 rounded-full px-8 py-4 mb-16 backdrop-blur-sm">
                            <MapPin className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm font-medium text-slate-300">Comenzando en Buenos Aires</span>
                        </div>
                    </AnimatedWrapper>
                    
                    <AnimatedWrapper>
                        <h1 className="font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-100 tracking-tight max-w-7xl mx-auto leading-none mb-8">
                            Servicios
                            <span className="block bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Confiables
                            </span>
                        </h1>
                    </AnimatedWrapper>
                    
                    <AnimatedWrapper className="[animation-delay:200ms]">
                        <p className="mt-8 text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-light">
                           Conectamos personas con profesionales locales verificados en Buenos Aires.
                           <br />Desde <span className="text-emerald-400 font-medium">plomería</span> hasta <span className="text-blue-400 font-medium">diseño</span>. Simple, directo, confiable.
                        </p>
                    </AnimatedWrapper>
                    
                    <AnimatedWrapper className="mt-16 [animation-delay:400ms]">
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Button size="lg" className="group relative overflow-hidden rounded-xl text-lg font-semibold px-10 py-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-slate-950 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:scale-105 border-0">
                                <span className="relative z-10 flex items-center gap-3">
                                    Publicar Solicitud 
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                </span>
                            </Button>
                            
                            <Button variant="outline" size="lg" className="rounded-xl text-lg font-medium px-10 py-6 border border-slate-600 text-slate-300 hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-400/5 transition-all duration-300">
                                Buscar Profesionales
                            </Button>
                        </div>
                    </AnimatedWrapper>

                    <AnimatedWrapper className="mt-24 [animation-delay:600ms]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-emerald-400/30 transition-all duration-500 hover:bg-slate-800/50">
                                <CheckCircle className="w-8 h-8 text-emerald-400 mb-4" />
                                <div className="text-lg font-semibold text-slate-200 mb-2">Verificados</div>
                                <div className="text-slate-400 text-sm">Perfiles revisados por nuestro equipo</div>
                            </div>
                            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500 hover:bg-slate-800/50">
                                <MapPin className="w-8 h-8 text-blue-400 mb-4" />
                                <div className="text-lg font-semibold text-slate-200 mb-2">Local</div>
                                <div className="text-slate-400 text-sm">Profesionales en tu barrio</div>
                            </div>
                            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-purple-400/30 transition-all duration-500 hover:bg-slate-800/50">
                                <MessageCircle className="w-8 h-8 text-purple-400 mb-4" />
                                <div className="text-lg font-semibold text-slate-200 mb-2">Directo</div>
                                <div className="text-slate-400 text-sm">Comunicación sin intermediarios</div>
                            </div>
                        </div>
                    </AnimatedWrapper>
                </div>
            </header>

            {/* 3D Horizontal Scroll Section */}
            <HorizontalScroll3D />
            
            {/* How it Works Section */}
            <AnimatedWrapper tag="section" id="como-funciona" className="py-32 bg-slate-950 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="font-bold text-5xl md:text-7xl mb-6 text-slate-100">
                            Cómo Funciona <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Serbis</span>
                        </h2>
                        <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto">Tres pasos simples para conectar con profesionales verificados en tu área.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <StepCard 
                            number="01" 
                            icon={MessageCircle}
                            title="Definí tu solicitud" 
                            description="Describí tu necesidad en lenguaje simple. Nuestro sistema identifica la categoría, complejidad y urgencia del trabajo."
                            delay="0ms"
                            color="emerald"
                        />
                        <StepCard 
                            number="02" 
                            icon={Users}
                            title="Elegí tu profesional" 
                            description="Te mostramos profesionales verificados en tu barrio. Comparás experiencia, precios y disponibilidad en un solo lugar."
                            delay="200ms"
                            color="blue"
                        />
                        <StepCard 
                            number="03" 
                            icon={Star}
                            title="Coordiná y calificá" 
                            description="Coordinás el trabajo directamente con el profesional, realizás el pago y dejás tu calificación al terminar."
                            delay="400ms"
                            color="purple"
                        />
                    </div>
                </div>
            </AnimatedWrapper>

            {/* Why Serbis Section */}
            <AnimatedWrapper tag="section" id="por-que-serbis" className="py-32 bg-slate-950 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="font-bold text-5xl md:text-7xl mb-6 text-slate-100">
                            ¿Por Qué <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Serbis?</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
                            Una plataforma diseñada para la confianza y transparencia en el mercado argentino.
                        </p>
                    </div>
                    
                    <div className="max-w-4xl mx-auto space-y-8">
                        <ValuePropCard 
                            icon={BadgeCheck} 
                            title="Confianza garantizada" 
                            description="Todos los proveedores pasan por un proceso de revisión manual donde verificamos identidad, experiencia y referencias."
                            delay="0ms"
                            color="emerald"
                        />
                        <ValuePropCard 
                            icon={Clock} 
                            title="Todo en un lugar" 
                            description="Podés comparar presupuestos, ver disponibilidad real y leer reseñas auténticas sin dar vueltas por diferentes sitios."
                            delay="100ms"
                            color="blue"
                        />
                        <ValuePropCard 
                            icon={Shield} 
                            title="Transparencia total" 
                            description="Verás reseñas reales de otros usuarios, precios claros y el historial completo de trabajos de cada profesional."
                            delay="200ms"
                            color="purple"
                        />
                    </div>
                </div>
            </AnimatedWrapper>
            
            {/* Final CTA */}
            <AnimatedWrapper tag="section" className="py-32 text-center bg-slate-950 relative">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-bold text-5xl md:text-7xl text-slate-100 mb-6">
                            Comenzá <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Hoy</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 font-light">
                            Registrate gratis y publicá tu primera solicitud. Conectá con profesionales verificados en Buenos Aires.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center mb-16">
                            <Button size="lg" className="rounded-xl px-12 py-6 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-blue-500 text-slate-950 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:scale-105 border-0">
                                Registrarme Gratis
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-xl px-12 py-6 text-lg font-medium border border-slate-600 text-slate-300 hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-400/5 transition-all duration-300">
                                Soy Profesional
                            </Button>
                        </div>

                        <div className="text-center">
                            <p className="text-slate-500 mb-6">¿Tenés dudas?</p>
                            <Button size="lg" variant="outline" className="rounded-xl px-8 py-4 text-lg font-medium border border-slate-600 text-slate-300 hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-400/5 transition-all duration-300">
                                <Phone className="w-5 h-5 mr-2" />
                                Hablemos
                            </Button>
                        </div>
                    </div>
                </div>
            </AnimatedWrapper>
            
            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16">
                <div className="container mx-auto px-6">
                    <div className="text-center space-y-6">
                        <div className="flex justify-center mb-8">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/25">
                                <span className="text-slate-950 font-black text-xl">S</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-200 mb-4">Serbis</h3>
                        <p className="text-slate-500">Conectando profesionales verificados en Buenos Aires</p>
                        <div className="pt-8 border-t border-slate-800">
                            <p className="text-slate-500">© 2025 Serbis. Buenos Aires, Argentina</p>
                            <a href="mailto:hello@serbis.tech" className="text-emerald-400 hover:text-emerald-300 transition-colors text-lg font-medium mt-2 inline-block">
                                hello@serbis.tech
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Step Card Component  
const StepCard = ({ number, icon: Icon, title, description, delay, color }: { 
    number: string, 
    icon: React.ElementType, 
    title: string, 
    description: string,
    delay: string,
    color: 'emerald' | 'blue' | 'purple'
}) => {
    const colorClasses = {
        emerald: 'text-emerald-400 border-emerald-400/20 hover:border-emerald-400/40 hover:bg-emerald-400/5',
        blue: 'text-blue-400 border-blue-400/20 hover:border-blue-400/40 hover:bg-blue-400/5',
        purple: 'text-purple-400 border-purple-400/20 hover:border-purple-400/40 hover:bg-purple-400/5'
    };

    return (
        <AnimatedWrapper className={`group cursor-pointer [animation-delay:${delay}]`}>
            <div className={`relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border ${colorClasses[color]} transition-all duration-500 hover:scale-105 h-full`}>
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-mono text-slate-500">{number}</span>
                    <div className={`p-3 rounded-xl bg-slate-700/50 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${colorClasses[color].split(' ')[0]}`} />
                    </div>
                </div>
                <h3 className="font-semibold text-xl mb-4 text-slate-200">{title}</h3>
                <p className="text-slate-400 leading-relaxed">{description}</p>
            </div>
        </AnimatedWrapper>
    );
};

// Value Proposition Card Component
const ValuePropCard = ({ icon: Icon, title, description, delay, color }: { 
    icon: React.ElementType, 
    title: string, 
    description: string,
    delay: string,
    color: 'emerald' | 'blue' | 'purple'
}) => {
    const colorClasses = {
        emerald: 'text-emerald-400 border-emerald-400/20 hover:border-emerald-400/40 hover:bg-emerald-400/5',
        blue: 'text-blue-400 border-blue-400/20 hover:border-blue-400/40 hover:bg-blue-400/5',
        purple: 'text-purple-400 border-purple-400/20 hover:border-purple-400/40 hover:bg-purple-400/5'
    };

    return (
        <AnimatedWrapper className={`group cursor-pointer [animation-delay:${delay}]`}>
            <div className={`bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border ${colorClasses[color]} transition-all duration-500 hover:scale-105 flex items-start gap-6`}>
                <div className={`p-4 rounded-xl bg-slate-700/50 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <Icon className={`w-8 h-8 ${colorClasses[color].split(' ')[0]}`} />
                </div>
                <div>
                    <h3 className="font-semibold text-2xl mb-4 text-slate-200">{title}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
                </div>
            </div>
        </AnimatedWrapper>
    );
};

export default Index;
