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
  Zap,
  Camera,
  DollarSign,
  Eye,
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
                        <a href="#funcionalidades" className="px-6 py-3 text-sm font-medium text-slate-300 hover:text-emerald-400 rounded-xl transition-all duration-300 hover:bg-slate-800/50">
                            Funcionalidades
                        </a>
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
                        <div className="inline-flex items-center gap-3 bg-slate-800/30 border border-orange-400/20 rounded-full px-8 py-4 mb-16 backdrop-blur-sm">
                            <Zap className="w-4 h-4 text-orange-400" />
                            <span className="text-sm font-medium text-slate-300">Fase Piloto • Zona Norte AMBA</span>
                        </div>
                    </AnimatedWrapper>
                    
                    <AnimatedWrapper>
                        <div className="font-bold text-slate-100 tracking-tight max-w-7xl mx-auto leading-none mb-8 space-y-4">
                            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                                Tu Problema
                            </div>
                            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-black">
                                5 Segundos
                            </div>
                            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                                Tu Solución
                            </div>
                        </div>
                    </AnimatedWrapper>
                    
                    <AnimatedWrapper className="[animation-delay:200ms]">
                        <p className="mt-8 text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-light">
                           Olvidate de listas eternas y búsquedas sin fin. <span className="text-emerald-400 font-semibold">Escribí tu problema</span> y <span className="text-blue-400 font-semibold">te conectamos en 5 segundos</span> con el profesional perfecto en tu zona.
                           <br />Todo integrado: chat, negociación de precios y seguimiento en vivo.
                        </p>
                    </AnimatedWrapper>
                    
                    <AnimatedWrapper className="mt-16 [animation-delay:400ms]">
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Button size="lg" className="group relative overflow-hidden rounded-xl text-lg font-semibold px-12 py-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-slate-950 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:scale-105 border-0">
                                <span className="relative z-10 flex items-center gap-3">
                                    Probar Ahora 
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                </span>
                            </Button>
                        </div>
                    </AnimatedWrapper>

                    <AnimatedWrapper className="mt-24 [animation-delay:600ms]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50 hover:border-emerald-400/40 transition-all duration-500 hover:bg-slate-800/50 hover:scale-105 group">
                                <div className="flex flex-col items-center text-center space-y-6">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-emerald-400/30">
                                            <Zap className="w-8 h-8 text-emerald-400" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 text-sm font-bold px-2 py-1 rounded-full">5s</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-slate-100 mb-3">Conexión Instantánea</div>
                                        <div className="text-slate-400 leading-relaxed">Geolocalización inteligente para matches perfectos al instante</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50 hover:border-blue-400/40 transition-all duration-500 hover:bg-slate-800/50 hover:scale-105 group">
                                <div className="flex flex-col items-center text-center space-y-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-blue-400/30">
                                        <MessageCircle className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-slate-100 mb-3">Todo Integrado</div>
                                        <div className="text-slate-400 leading-relaxed">Chat, fotos, videos, negociación de precios en un solo lugar</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50 hover:border-purple-400/40 transition-all duration-500 hover:bg-slate-800/50 hover:scale-105 group">
                                <div className="flex flex-col items-center text-center space-y-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-purple-400/30">
                                        <Eye className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-slate-100 mb-3">Status en Vivo</div>
                                        <div className="text-slate-400 leading-relaxed">Seguí el progreso del trabajo en tiempo real</div>
                                    </div>
                                </div>
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
                            Así de <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Simple</span>
                        </h2>
                        <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto">Sin complicaciones, sin pérdida de tiempo. Directo al grano.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <StepCard 
                            number="01" 
                            icon={MessageCircle}
                            title="Escribí tu problema" 
                            description="Una línea, una foto. Entendemos exactamente qué necesitás y encontramos al profesional perfecto en tu zona."
                            delay="0ms"
                            color="emerald"
                        />
                        <StepCard 
                            number="02" 
                            icon={Zap}
                            title="Te conectamos en 5 segundos" 
                            description="Match instantáneo con el profesional ideal. Chateás directo, ves su portfolio y negociás el precio sin intermediarios."
                            delay="200ms"
                            color="blue"
                        />
                        <StepCard 
                            number="03" 
                            icon={Eye}
                            title="Seguís todo en vivo" 
                            description="Status del trabajo en tiempo real, chat integrado y pagás directo al profesional. Todo controlado desde la app."
                            delay="400ms"
                            color="purple"
                        />
                    </div>
                </div>
            </AnimatedWrapper>

            {/* Current Features Section */}
            <AnimatedWrapper tag="section" id="funcionalidades" className="py-32 bg-slate-950 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="font-bold text-5xl md:text-7xl mb-6 text-slate-100">
                            Todo en <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Una App</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
                            No más apps separadas, no más pérdida de tiempo. Serbis es tu centro de comando completo.
                        </p>
                    </div>
                    
                    <div className="max-w-4xl mx-auto space-y-8">
                        <FeatureCard 
                            icon={Zap} 
                            title="Te conectamos en 5 segundos" 
                            description="Algoritmo inteligente que conecta automáticamente tu problema con el profesional perfecto según ubicación, experiencia y disponibilidad."
                            status="active"
                            delay="0ms"
                            color="emerald"
                            animationType="slide-left"
                        />
                        <FeatureCard 
                            icon={MessageCircle} 
                            title="Chat completo integrado" 
                            description="Mensajería con fotos, videos, documentos. Comunicación directa sin salir de la app para coordinar cada detalle."
                            status="active"
                            delay="100ms"
                            color="blue"
                            animationType="slide-right"
                        />
                        <FeatureCard 
                            icon={DollarSign} 
                            title="Negociación de precios" 
                            description="Hablá el precio directo con el profesional. Transparencia total sin comisiones ocultas ni intermediarios."
                            status="active"
                            delay="200ms"
                            color="purple"
                            animationType="slide-left"
                        />
                        <FeatureCard 
                            icon={Eye} 
                            title="Status en tiempo real" 
                            description="Seguí el progreso del trabajo minuto a minuto. Sabés exactamente qué está pasando sin necesidad de llamar."
                            status="active"
                            delay="300ms"
                            color="emerald"
                            animationType="slide-right"
                        />
                        <FeatureCard 
                            icon={Camera} 
                            title="Portfolio visual completo" 
                            description="Cada profesional muestra trabajos anteriores con fotos y videos reales. Ves exactamente qué esperar."
                            status="active"
                            delay="400ms"
                            color="blue"
                            animationType="slide-left"
                        />
                        <FeatureCard 
                            icon={Star} 
                            title="Sistema de calificaciones" 
                            description="Reseñas y calificaciones reales de usuarios. Confianza total en cada profesional que contactás."
                            status="active"
                            delay="500ms"
                            color="purple"
                            animationType="slide-right"
                        />
                        <FeatureCard 
                            icon={Clock} 
                            title="Pagos integrados" 
                            description="Próximamente: procesamiento seguro de pagos dentro de la plataforma. Una experiencia completamente integrada."
                            status="coming"
                            delay="600ms"
                            color="orange"
                            animationType="slide-left"
                        />
                    </div>
                </div>
            </AnimatedWrapper>
            
            {/* Final CTA */}
            <AnimatedWrapper tag="section" className="py-32 text-center bg-slate-950 relative">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-bold text-5xl md:text-7xl text-slate-100 mb-6">
                            Probá <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Serbis</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 font-light">
                            Únete al futuro de los servicios locales. Descargá la app y resolvé tu problema en 5 segundos.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center mb-16">
                            <Button size="lg" className="rounded-xl px-12 py-6 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-blue-500 text-slate-950 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:scale-105 border-0">
                                Descargar App
                            </Button>
                        </div>

                        <div className="text-center">
                            <p className="text-slate-500 mb-6">¿Consultas sobre el piloto?</p>
                            <Button size="lg" variant="outline" className="rounded-xl px-8 py-4 text-lg font-medium border border-slate-600 text-slate-300 hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-400/5 transition-all duration-300">
                                <Phone className="w-5 h-5 mr-2" />
                                Contactanos
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
                        <p className="text-slate-500">El futuro de los servicios locales • Fase Piloto</p>
                        <div className="pt-8 border-t border-slate-800">
                            <p className="text-slate-500">© 2025 Serbis. Zona Norte AMBA, Argentina</p>
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

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, status, delay, color, animationType }: { 
    icon: React.ElementType, 
    title: string, 
    description: string,
    status: 'active' | 'coming',
    delay: string,
    color: 'emerald' | 'blue' | 'purple' | 'orange',
    animationType: 'slide-left' | 'slide-right'
}) => {
    const colorClasses = {
        emerald: 'text-emerald-400 border-emerald-400/20 hover:border-emerald-400/40 hover:bg-emerald-400/5',
        blue: 'text-blue-400 border-blue-400/20 hover:border-blue-400/40 hover:bg-blue-400/5',
        purple: 'text-purple-400 border-purple-400/20 hover:border-purple-400/40 hover:bg-purple-400/5',
        orange: 'text-orange-400 border-orange-400/20 hover:border-orange-400/40 hover:bg-orange-400/5'
    };

    const statusBadge = status === 'active' 
        ? <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">Activo</span>
        : <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-400/10 text-orange-400 border border-orange-400/20">Próximamente</span>;

    const animationClass = animationType === 'slide-left' 
        ? 'opacity-0 -translate-x-12 animate-[slide-in-from-left_0.8s_ease-out_forwards]'
        : 'opacity-0 translate-x-12 animate-[slide-in-from-right_0.8s_ease-out_forwards]';

    return (
        <div 
            className={`group cursor-pointer ${animationClass}`}
            style={{ animationDelay: delay }}
        >
            <div className={`bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border ${colorClasses[color]} transition-all duration-500 hover:scale-105 flex items-start gap-6`}>
                <div className={`p-4 rounded-xl bg-slate-700/50 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <Icon className={`w-8 h-8 ${colorClasses[color].split(' ')[0]}`} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <h3 className="font-semibold text-2xl text-slate-200">{title}</h3>
                        {statusBadge}
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Index;
