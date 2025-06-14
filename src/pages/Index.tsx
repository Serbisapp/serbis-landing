
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
} from "lucide-react";
import { AnimatedWrapper } from '@/components/AnimatedWrapper';

const Index = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClass = scrolled 
        ? 'bg-background/80 backdrop-blur-xl border-b' 
        : 'bg-transparent';

    return (
        <div className="bg-background font-mulish text-zinc-800 min-h-screen" id="page-top">
            {/* --- Navigation --- */}
            <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${navClass}`}>
                <div className="container mx-auto px-4 flex justify-between items-center py-3">
                    <a href="#page-top" className="flex items-center gap-2 font-bold">
                        <Apple className="text-primary w-7 h-7" />
                        <span className="text-2xl font-newsreader font-semibold text-primary">Serbis</span>
                    </a>
                    
                    <div className="hidden md:flex items-center space-x-2">
                        <a href="#how-it-works" className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-primary rounded-lg transition-colors">Cómo Funciona</a>
                        <a href="#why-serbis" className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-primary rounded-lg transition-colors">Nosotros</a>
                        <Button variant="outline" className="rounded-full">Soy Proveedor</Button>
                    </div>

                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" className="text-zinc-700">
                            <Menu />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <header className="relative pt-32 pb-20 text-center">
                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedWrapper>
                        <h1 className="font-newsreader font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-zinc-900 tracking-tighter max-w-4xl mx-auto">
                            El estándar Premium para Servicios Locales
                        </h1>
                    </AnimatedWrapper>
                    <AnimatedWrapper className="[animation-delay:200ms]">
                        <p className="mt-6 text-xl md:text-2xl text-zinc-600 max-w-2xl mx-auto">
                           Conectá con profesionales en segundos, sin esfuerzo. Descubrí la manera más simple y moderna de resolver tus necesidades.
                        </p>
                    </AnimatedWrapper>
                    <AnimatedWrapper className="mt-8 flex flex-col sm:flex-row gap-4 justify-center [animation-delay:400ms]">
                        <Button size="lg" className="rounded-full text-lg font-semibold px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-blue-500/10 transition group">
                            Publicá tu Pedido Ahora <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </AnimatedWrapper>
                     <AnimatedWrapper className="mt-16 [animation-delay:600ms]">
                        <div className="relative max-w-5xl mx-auto">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-primary/10 rounded-full blur-3xl" />
                            <img src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&q=80&auto=format" alt="App preview on a modern setup" className="relative rounded-2xl shadow-2xl border-4 border-white" />
                        </div>
                    </AnimatedWrapper>
                </div>
            </header>
            
            {/* --- How it Works Section --- */}
            <AnimatedWrapper tag="section" id="how-it-works" className="py-24 bg-white border-y">
                <div className="container mx-auto px-4">
                    <h2 className="text-center font-newsreader font-bold text-4xl md:text-5xl mb-4 text-zinc-900">Simple. Rápido. Seguro.</h2>
                    <p className="text-center text-lg text-zinc-600 mb-16">Tu solución en tres simples pasos.</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-2">
                            <div className="text-6xl font-bold font-newsreader text-primary/20 mb-4">1</div>
                            <h3 className="font-semibold text-xl mb-2 text-zinc-900">Describí tu Necesidad</h3>
                            <p className="text-zinc-600">Contanos qué servicio necesitás. Es simple y elegante.</p>
                        </div>
                        <div className="text-center p-2">
                            <div className="text-6xl font-bold font-newsreader text-primary/20 mb-4">2</div>
                            <h3 className="font-semibold text-xl mb-2 text-zinc-900">Conectate al Instante</h3>
                            <p className="text-zinc-600">Encontrá opciones premium en tu zona al instante.</p>
                        </div>
                        <div className="text-center p-2">
                            <div className="text-6xl font-bold font-newsreader text-primary/20 mb-4">3</div>
                            <h3 className="font-semibold text-xl mb-2 text-zinc-900">Resolvé y Calificá</h3>
                            <p className="text-zinc-600">Coordiná y calificá la experiencia. Todo desde la app.</p>
                        </div>
                    </div>
                </div>
            </AnimatedWrapper>

            {/* --- Feature Sections --- */}
            <div className="space-y-32 py-32 overflow-hidden">
                <FeatureSection
                    title="Explorá el Home"
                    description="Describí el servicio que necesitas, nosotros elegimos profesionalmente el experto perfecto para tu necesidad en tu área. Todo en menos de 5 segundos, en una experiencia premium."
                    imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=540&q=80&auto=format"
                    imageAlt="App home screen"
                />
                <FeatureSection
                    title="Comunicación Segura"
                    description="Negociá el precio y cerrá los detalles usando nuestro chat ultra seguro, con envío de imágenes y archivos. Confiable, elegante y práctico."
                    imageUrl="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=540&q=80&auto=format"
                    imageAlt="App chat screen"
                    reverse
                />
                <FeatureSection
                    title="Seguí el Estado de tus Pedidos"
                    description="Accedé al progreso de tus pedidos en tiempo real, desde la publicación hasta la finalización. Todo claro y visual."
                    imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=540&q=80&auto=format"
                    imageAlt="App status screen"
                />
            </div>
            
            {/* --- Why Serbis Section --- */}
            <AnimatedWrapper tag="section" id="why-serbis" className="py-24 bg-white border-y">
                <div className="container mx-auto px-4">
                    <h2 className="text-center font-newsreader font-bold text-4xl md:text-5xl mb-4 text-zinc-900">¿Por qué elegir Serbis?</h2>
                     <p className="text-center text-lg text-zinc-600 mb-16 max-w-2xl mx-auto">Nos enfocamos en la confianza, la calidad y la velocidad para brindarte una experiencia inigualable.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ReasonCard icon={Users} title="Red real y confiable" description="Personas de tu comunidad, listos para ayudar." />
                        <ReasonCard icon={BadgeCheck} title="Verificación y reviews" description="Elegí seguro, con calificaciones confiables." />
                        <ReasonCard icon={MessageCircle} title="Comunicación directa" description="Todo lo que necesitás en una sola app." />
                        <ReasonCard icon={Zap} title="Premium & Rápido" description="Encontrá lo que buscás y resolvé ya." />
                    </div>
                </div>
            </AnimatedWrapper>
            
            {/* --- Final CTA --- */}
            <AnimatedWrapper tag="section" className="py-24 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="font-newsreader font-bold text-4xl md:text-5xl text-zinc-900">¿Listo para empezar?</h2>
                    <p className="mt-4 text-lg text-zinc-600 max-w-xl mx-auto">Descargá la app hoy mismo y descubrí por qué Serbis es la elección preferida para servicios locales.</p>
                     <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
                        <Button variant="outline" className="w-48 h-14 border-2 bg-white text-zinc-900 flex items-center gap-2 shadow-sm rounded-2xl hover:bg-zinc-100 transition-all">
                            <Apple className="w-7 h-7" />
                            <div className="text-left">
                                <div className="text-xs -mb-1 opacity-60">Descargala en el</div>
                                <div className="text-xl font-semibold leading-tight">App Store</div>
                            </div>
                        </Button>
                        <Button variant="outline" className="w-48 h-14 border-2 bg-white text-zinc-900 flex items-center gap-2 shadow-sm rounded-2xl hover:bg-zinc-100 transition-all">
                            <svg viewBox="30 336.7 120.9 129.2" className="w-6 h-6 fill-current" aria-hidden="true">
                                <path d="M153.7 366.2c-3.8 4.5-11.2 8.1-17.3 8.4-1.4 0-2.5.2-3.6.2-4.8 0-11.8-2.1-15.3-5.2-3.5-3.1-6.2-7.3-7.2-12.2-1-4.9-.7-9.5 1.1-13.8 1.8-4.3 4.7-8.3 8.8-11.1 4.1-2.8 9.2-4.3 14-4.3 1.5 0 2.8.2 3.9.2 4.9 0 11.2 2.3 14.5 5.5 1.1 1.1 1.9 2.4 2.4 3.8 2.3-1.5 4.3-3.1 5.9-4.8.2-.2.4-.4.5-.5 3.1-3.3 5.4-7.4 5.4-12.3 0-4-.9-7.1-2.4-9.5-1.5-2.4-3.6-4.2-6.2-5.4-2.6-1.2-5.6-1.8-8.7-1.8-3.1 0-6.1.6-8.7 1.8-2.6 1.2-4.7 3-6.2 5.4s-2.4 5.5-2.4 9.5c0 4.9 2.3 9.1 5.4 12.3.1.1.3.3.5.5 1.6 1.7 3.6 3.3 5.9 4.8-.4 1.4-.9 2.7-1.6 4-3.3 6.4-8.2 10-14.5 10-1.1 0-2.4-.1-3.9-.2-4.8 0-9.9 1.5-14 4.3-4.1 2.8-7 6.8-8.8 11.1-1.8 4.3-2.1 8.9-1.1 13.8 1 4.9 3.7 9.1 7.2 12.2 3.5 3.1 8.5 5.2 15.3 5.2 1.1 0 2.2-.1 3.6-.2 6.1-.3 13.5-3.9 17.3-8.4 1.2-1.4 2.2-3.3 2.9-5.5-2.9-1.3-5.5-3.1-7.5-5.3zm-11.2-22.3c-2.3 2.6-5.4 4.1-8.9 4.1-1.1 0-2-.1-2.9-.2-3.3-.4-6.2-2.1-8.2-4.5-2-2.4-3.1-5.4-3.1-8.7 0-3.3 1.1-6.3 3.1-8.7 2-2.4 4.9-4.1 8.2-4.5 1-.1 1.9-.2 2.9-.2 3.5 0 6.6 1.5 8.9 4.1 1.9 2.1 2.8 4.7 2.8 7.6.1 2.8-1 5.5-2.8 7.6z" />
                            </svg>
                            <div className="text-left">
                                <div className="text-xs -mb-1 opacity-60">Disponible en</div>
                                <div className="text-xl font-semibold leading-tight">Google Play</div>
                            </div>
                        </Button>
                    </div>
                </div>
            </AnimatedWrapper>
            
            {/* --- Footer --- */}
            <footer id="about-us-footer" className="bg-white text-zinc-500 py-12 border-t">
                <div className="container mx-auto px-4 text-center text-sm space-y-2">
                    <p>© Serbis 2025. Todos los derechos reservados.</p>
                    <p>Buenos Aires, Argentina</p>
                    <a href="mailto:inaki.iturriaga@serbis.app" className="hover:text-primary transition-colors">inaki.iturriaga@serbis.app</a>
                </div>
            </footer>
        </div>
    );
};

// Helper components for page sections
const FeatureSection = ({ title, description, imageUrl, imageAlt, reverse = false }: { title: string, description: string, imageUrl: string, imageAlt: string, reverse?: boolean }) => (
    <AnimatedWrapper tag="section">
        <div className="container mx-auto px-4">
            <div className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center`}>
                <div className={`text-center md:text-left ${reverse ? 'md:order-last' : ''}`}>
                     <h2 className="font-newsreader font-bold text-4xl mb-4 text-zinc-900">{title}</h2>
                     <p className="text-zinc-600 leading-relaxed text-lg">{description}</p>
                </div>
                <div className="relative flex justify-center items-center">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl" />
                    <img src={imageUrl} alt={imageAlt} className="relative rounded-2xl shadow-xl border-2 border-white w-full max-w-lg" />
                </div>
            </div>
        </div>
    </AnimatedWrapper>
);

const ReasonCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div className="bg-white rounded-2xl p-6 text-center border transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4">
            <Icon className="w-7 h-7" />
        </div>
        <h3 className="font-semibold text-lg mb-2 text-zinc-900">{title}</h3>
        <p className="text-zinc-600 text-sm">{description}</p>
    </div>
);

export default Index;
