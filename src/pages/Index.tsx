
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
  Clock,
  Shield,
  Star,
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
        ? 'bg-background/95 backdrop-blur-2xl border-b border-zinc-200/60 shadow-lg shadow-black/5' 
        : 'bg-transparent';

    return (
        <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 font-mulish text-zinc-800 min-h-screen overflow-hidden" id="page-top">
            {/* Custom Serbis Background Pattern */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.1),transparent_50%),radial-gradient(circle_at_40%_70%,rgba(16,185,129,0.05),transparent_50%)]" />
                <div 
                    className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"
                    style={{
                        transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
                        transition: 'transform 0.3s ease-out',
                        top: '10%',
                        left: '-10%'
                    }}
                />
                <div 
                    className="absolute w-[400px] h-[400px] bg-gradient-to-l from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"
                    style={{
                        transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
                        transition: 'transform 0.3s ease-out',
                        animationDelay: '2s',
                        bottom: '20%',
                        right: '-5%'
                    }}
                />
            </div>

            {/* --- Navigation --- */}
            <nav className={`fixed w-full top-0 z-50 transition-all duration-700 ${navClass}`}>
                <div className="container mx-auto px-4 flex justify-between items-center py-4">
                    <a href="#page-top" className="flex items-center gap-3 font-bold group">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                                <span className="text-white font-black text-lg">S</span>
                            </div>
                            <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150" />
                        </div>
                        <span className="text-3xl font-newsreader font-black text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text">
                            Serbis
                        </span>
                    </a>
                    
                    <div className="hidden md:flex items-center space-x-2">
                        <a href="#como-funciona" className="px-6 py-3 text-sm font-medium text-zinc-600 hover:text-blue-600 rounded-2xl transition-all duration-300 hover:bg-blue-50/50 hover:scale-105">
                            Cómo Funciona
                        </a>
                        <a href="#por-que-serbis" className="px-6 py-3 text-sm font-medium text-zinc-600 hover:text-blue-600 rounded-2xl transition-all duration-300 hover:bg-blue-50/50 hover:scale-105">
                            ¿Por Qué Serbis?
                        </a>
                        <Button variant="outline" className="rounded-full px-6 py-3 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 hover:scale-105 transition-all duration-300 hover:shadow-lg">
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
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/40 rounded-full px-8 py-4 mb-12 shadow-lg shadow-blue-500/10">
                            <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
                            <span className="text-base font-semibold text-blue-700">Conectamos Argentina, un servicio a la vez</span>
                        </div>
                    </AnimatedWrapper>
                    
                    <AnimatedWrapper>
                        <h1 className="font-newsreader font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-gradient-to-r from-zinc-900 via-blue-700 to-purple-700 bg-clip-text tracking-tighter max-w-6xl mx-auto leading-tight mb-8">
                            Tu próximo
                            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">
                                Servicio
                            </span>
                            está a un toque
                        </h1>
                    </AnimatedWrapper>
                    
                    <AnimatedWrapper className="[animation-delay:200ms]">
                        <p className="mt-8 text-2xl md:text-3xl text-zinc-600 max-w-4xl mx-auto leading-relaxed font-light">
                           Desde plomería hasta diseño gráfico, desde limpieza hasta clases particulares.
                           <br />Encontrá <span className="font-semibold text-blue-600">exactamente</span> lo que necesitás, <span className="italic text-purple-600">cuando lo necesitás</span>.
                        </p>
                    </AnimatedWrapper>
                    
                    <AnimatedWrapper className="mt-16 [animation-delay:400ms]">
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Button size="lg" className="group relative overflow-hidden rounded-full text-xl font-bold px-12 py-8 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 border-0">
                                <span className="relative z-10 flex items-center gap-3">
                                    Publicar Pedido 
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Button>
                            
                            <Button variant="outline" size="lg" className="rounded-full text-xl font-medium px-12 py-8 border-2 border-zinc-300 hover:border-blue-500 hover:text-blue-600 hover:scale-105 transition-all duration-300 hover:shadow-lg">
                                Ver Cómo Funciona
                            </Button>
                        </div>
                    </AnimatedWrapper>

                    <AnimatedWrapper className="mt-24 [animation-delay:600ms]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-blue-100/50 hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10">
                                <div className="flex items-center justify-center mb-4">
                                    <Clock className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="text-2xl font-bold text-blue-700 mb-2">Inmediato</div>
                                <div className="text-zinc-600 font-medium">Respuestas en minutos, no días</div>
                            </div>
                            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-purple-100/50 hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10">
                                <div className="flex items-center justify-center mb-4">
                                    <Shield className="w-8 h-8 text-purple-600" />
                                </div>
                                <div className="text-2xl font-bold text-purple-700 mb-2">Confiable</div>
                                <div className="text-zinc-600 font-medium">Proveedores verificados y calificados</div>
                            </div>
                            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-emerald-100/50 hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/10">
                                <div className="flex items-center justify-center mb-4">
                                    <Star className="w-8 h-8 text-emerald-600" />
                                </div>
                                <div className="text-2xl font-bold text-emerald-700 mb-2">Simple</div>
                                <div className="text-zinc-600 font-medium">Una app, todas tus necesidades</div>
                            </div>
                        </div>
                    </AnimatedWrapper>
                </div>
            </header>

            {/* --- 3D Horizontal Scroll Section --- */}
            <HorizontalScroll3D />
            
            {/* --- How it Works Section --- */}
            <AnimatedWrapper tag="section" id="como-funciona" className="py-32 bg-gradient-to-b from-white to-blue-50/30 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="font-newsreader font-black text-5xl md:text-7xl mb-6 text-transparent bg-gradient-to-r from-zinc-900 to-blue-700 bg-clip-text">
                            Así de fácil es usar Serbis
                        </h2>
                        <p className="text-2xl text-zinc-600 font-light">Tres pasos simples para resolver cualquier necesidad.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        <SerbisStepCard 
                            number="1" 
                            icon={Target}
                            title="Contá qué necesitás" 
                            description="Describí tu proyecto, tarea o servicio. Desde arreglar una canilla hasta crear un logo."
                            delay="0ms"
                            color="blue"
                        />
                        <SerbisStepCard 
                            number="2" 
                            icon={Zap}
                            title="Recibí propuestas" 
                            description="Los proveedores de tu zona te contactan con presupuestos y disponibilidad."
                            delay="200ms"
                            color="purple"
                        />
                        <SerbisStepCard 
                            number="3" 
                            icon={Rocket}
                            title="Elegí y listo" 
                            description="Compará, elegí el mejor y coordiná todo desde la app. Después calificá la experiencia."
                            delay="400ms"
                            color="emerald"
                        />
                    </div>
                </div>
            </AnimatedWrapper>

            {/* --- Why Serbis Section --- */}
            <AnimatedWrapper tag="section" id="por-que-serbis" className="py-32 bg-gradient-to-b from-blue-50/30 to-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="font-newsreader font-black text-5xl md:text-7xl mb-6 text-transparent bg-gradient-to-r from-zinc-900 to-purple-700 bg-clip-text">
                            Serbis es diferente
                        </h2>
                        <p className="text-2xl text-zinc-600 max-w-3xl mx-auto font-light">
                            No somos solo otra app de servicios. Somos la plataforma que realmente entiende las necesidades argentinas.
                        </p>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        <SerbisReasonCard 
                            icon={Users} 
                            title="Red local real" 
                            description="Conectamos vecinos con vecinos. Gente de tu barrio, tu ciudad."
                            delay="0ms"
                            color="blue"
                        />
                        <SerbisReasonCard 
                            icon={BadgeCheck} 
                            title="Calidad garantizada" 
                            description="Sistema de reviews y verificación que asegura la mejor experiencia."
                            delay="100ms"
                            color="purple"
                        />
                        <SerbisReasonCard 
                            icon={MessageCircle} 
                            title="Comunicación clara" 
                            description="Chat integrado, notificaciones y seguimiento de cada proyecto."
                            delay="200ms"
                            color="emerald"
                        />
                        <SerbisReasonCard 
                            icon={Zap} 
                            title="Velocidad argentina" 
                            description="Diseñado para la urgencia y el ritmo de vida argentino."
                            delay="300ms"
                            color="orange"
                        />
                    </div>
                </div>
            </AnimatedWrapper>
            
            {/* --- Final CTA --- */}
            <AnimatedWrapper tag="section" className="py-32 text-center bg-gradient-to-b from-white to-slate-50 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-newsreader font-black text-5xl md:text-7xl text-transparent bg-gradient-to-r from-zinc-900 to-blue-700 bg-clip-text mb-6">
                            Probá Serbis hoy
                        </h2>
                        <p className="text-2xl text-zinc-600 max-w-3xl mx-auto mb-12 font-light">
                            Descargá la app y descubrí por qué cada vez más argentinos eligen Serbis para resolver sus necesidades cotidianas.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center mb-16">
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

                        <div className="text-center">
                            <p className="text-lg text-zinc-500 mb-4">¿Preferís usar la web?</p>
                            <Button size="lg" variant="outline" className="rounded-full px-8 py-4 text-lg font-semibold border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 hover:scale-105 transition-all duration-300">
                                Publicar desde el navegador
                            </Button>
                        </div>
                    </div>
                </div>
            </AnimatedWrapper>
            
            {/* --- Footer --- */}
            <footer className="bg-gradient-to-r from-slate-900 to-blue-900 text-slate-300 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-6">
                        <div className="flex justify-center mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-black text-xl">S</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-newsreader font-bold text-white mb-4">Serbis</h3>
                        <p className="text-lg text-slate-400">Conectando Argentina, un servicio a la vez.</p>
                        <div className="pt-8 border-t border-slate-700">
                            <p className="text-slate-400">© 2025 Serbis. Hecho con ❤️ en Buenos Aires, Argentina</p>
                            <a href="mailto:contacto@serbis.app" className="text-blue-400 hover:text-blue-300 transition-colors text-lg font-medium mt-2 inline-block">
                                contacto@serbis.app
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Custom Serbis Step Card Component
const SerbisStepCard = ({ number, icon: Icon, title, description, delay, color }: { 
    number: string, 
    icon: React.ElementType, 
    title: string, 
    description: string,
    delay: string,
    color: 'blue' | 'purple' | 'emerald'
}) => {
    const colorClasses = {
        blue: 'from-blue-600 to-blue-700 text-blue-600 border-blue-100/50 hover:shadow-blue-500/10',
        purple: 'from-purple-600 to-purple-700 text-purple-600 border-purple-100/50 hover:shadow-purple-500/10',
        emerald: 'from-emerald-600 to-emerald-700 text-emerald-600 border-emerald-100/50 hover:shadow-emerald-500/10'
    };

    return (
        <AnimatedWrapper className={`group cursor-pointer [animation-delay:${delay}]`}>
            <div className={`relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center border ${colorClasses[color].split(' ').slice(2).join(' ')} transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white`}>
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r ${colorClasses[color].split(' ').slice(0, 2).join(' ')} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {number}
                </div>
                <div className="mb-6 flex justify-center">
                    <div className={`bg-gradient-to-r from-${color}-50 to-${color}-100 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 ${colorClasses[color].split(' ')[2]}`} />
                    </div>
                </div>
                <h3 className="font-bold text-2xl mb-4 text-zinc-900">{title}</h3>
                <p className="text-zinc-600 text-lg leading-relaxed">{description}</p>
            </div>
        </AnimatedWrapper>
    );
};

// Custom Serbis Reason Card Component
const SerbisReasonCard = ({ icon: Icon, title, description, delay, color }: { 
    icon: React.ElementType, 
    title: string, 
    description: string,
    delay: string,
    color: 'blue' | 'purple' | 'emerald' | 'orange'
}) => {
    const colorClasses = {
        blue: 'text-blue-600 from-blue-50 to-blue-100 hover:shadow-blue-500/10',
        purple: 'text-purple-600 from-purple-50 to-purple-100 hover:shadow-purple-500/10',
        emerald: 'text-emerald-600 from-emerald-50 to-emerald-100 hover:shadow-emerald-500/10',
        orange: 'text-orange-600 from-orange-50 to-orange-100 hover:shadow-orange-500/10'
    };

    return (
        <AnimatedWrapper className={`group cursor-pointer [animation-delay:${delay}]`}>
            <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-${color}-100/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white h-full ${colorClasses[color].split(' ').slice(2).join(' ')}`}>
                <div className="mb-6 flex justify-center">
                    <div className={`bg-gradient-to-r ${colorClasses[color].split(' ').slice(1, 3).join(' ')} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 ${colorClasses[color].split(' ')[0]}`} />
                    </div>
                </div>
                <h3 className="font-bold text-xl mb-4 text-zinc-900">{title}</h3>
                <p className="text-zinc-600 leading-relaxed">{description}</p>
            </div>
        </AnimatedWrapper>
    );
};

// App Store Button Component
const AppStoreButton = ({ icon: Icon, title, subtitle }: {
    icon: React.ElementType,
    title: string,
    subtitle: string
}) => (
    <button className="group w-60 h-16 border-2 border-zinc-300 bg-white text-zinc-900 flex items-center gap-4 shadow-lg rounded-2xl hover:bg-blue-50 hover:border-blue-400 hover:scale-105 transition-all duration-300 px-6">
        <Icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
        <div className="text-left">
            <div className="text-xs text-zinc-500 leading-tight">{subtitle}</div>
            <div className="text-xl font-bold leading-tight">{title}</div>
        </div>
    </button>
);

export default Index;
