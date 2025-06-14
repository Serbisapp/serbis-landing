
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Apple,
  Menu
} from "lucide-react";
import { AnimatedWrapper } from '@/components/AnimatedWrapper';

const Index = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800 font-mulish text-zinc-100 min-h-screen" id="page-top">
            <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 shadow-xl bg-zinc-950/80 backdrop-blur-xl' : 'py-3 shadow bg-zinc-900/80 backdrop-blur'}`}>
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <a href="#page-top" className="flex items-center gap-3 font-bold">
                        <div className={`bg-white/10 backdrop-blur rounded-xl flex items-center justify-center transition-all duration-300 border border-zinc-700 shadow ${scrolled ? 'w-8 h-8' : 'w-12 h-12'}`}>
                            <Apple className="text-zinc-100 w-6 h-6" />
                        </div>
                        <span className="text-3xl font-newsreader font-semibold tracking-tight bg-gradient-to-tr from-white to-zinc-200 bg-clip-text text-transparent">Serbis</span>
                    </a>
                    
                    <div className="hidden md:flex items-center space-x-2">
                        <a href="#!" className="px-3 py-2 text-sm font-semibold text-zinc-50 bg-zinc-800/60 hover:bg-white/10 border border-zinc-600 rounded-xl shadow transition-all">Soy Proveedor</a>
                        <a href="#how-it-works" className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-xl transition-all">Cómo Funciona</a>
                        <a href="#about-us-footer" className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-xl transition-all">Nosotros</a>
                    </div>
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" className="text-zinc-200 hover:bg-zinc-800/50">
                            <Menu />
                        </Button>
                    </div>
                </div>
            </nav>

            <header className="relative pt-32 pb-20 min-h-[65vh]">
                {/* Soft hero background lights */}
                <div className="absolute top-0 left-0 w-full h-[80vh] overflow-hidden pointer-events-none z-0">
                    <div className="absolute left-0 top-0 w-1/3 h-3/4 bg-gradient-radial from-white/40 via-zinc-200/25 to-transparent blur-2xl opacity-60"></div>
                    <div className="absolute right-0 bottom-0 w-1/2 h-3/5 bg-gradient-to-br from-zinc-400/25 via-zinc-700/30 to-transparent blur-[72px] opacity-40"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-center">
                        <div className="text-center lg:text-left space-y-6 max-w-2xl mx-auto lg:mx-0">
                            <h1 className="font-newsreader font-bold text-5xl sm:text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-white to-zinc-400 drop-shadow-xl tracking-tight mb-0">El estándar Premium para <span className="bg-gradient-to-br from-zinc-100 via-emerald-200 to-white bg-clip-text text-transparent">Servicios Locales</span></h1>
                            <h2 className="font-mulish font-light text-2xl sm:text-3xl md:text-4xl text-zinc-200/90 mb-2">Conectá con profesionales<br className="sm:hidden"/> en segundos, sin esfuerzo.</h2>
                            <p className="text-xl text-zinc-300 max-w-lg mx-auto lg:mx-0">
                                Descubrí la manera <span className="text-white font-semibold">más simple y moderna</span> de resolver tus necesidades con estilo y seguridad. Serbis lleva la experiencia al siguiente nivel.
                            </p>
                            <div className="mt-7 flex flex-col sm:flex-row gap-4 sm:justify-start justify-center">
                                <Button size="lg" className="rounded-xl text-lg font-bold px-10 py-6 bg-gradient-to-tr from-white/90 to-zinc-200 hover:from-white hover:to-white/90 text-zinc-900 shadow-lg border border-zinc-400 shadow-white/10 transition duration-200">
                                    Publicá tu Pedido Ahora
                                </Button>
                                <a href="#why-serbis" className="rounded-xl text-lg font-semibold px-10 py-6 bg-white/5 backdrop-blur border border-zinc-500 text-zinc-200 hover:bg-white/10 hover:text-white shadow-lg transition duration-200">
                                    Descubrí más
                                </a>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 justify-center lg:justify-start">
                                <Button variant="outline" className="w-48 h-14 border-2 border-white/30 bg-zinc-900/50 text-zinc-50 flex items-center gap-2 shadow rounded-2xl hover:bg-zinc-900/80 hover:border-zinc-400 transition-all">
                                    <Apple className="w-6 h-6" />
                                    <div className="text-left">
                                        <div className="text-xs -mb-1 opacity-60">Descargala en el</div>
                                        <div className="text-xl font-semibold leading-tight">App Store</div>
                                    </div>
                                </Button>
                                <Button variant="outline" className="w-48 h-14 border-2 border-white/30 bg-zinc-900/50 text-zinc-50 flex items-center gap-2 shadow rounded-2xl hover:bg-zinc-900/80 hover:border-zinc-400 transition-all">
                                    <svg viewBox="30 336.7 120.9 129.2" className="w-6 h-6 fill-current" aria-hidden="true">
                                        <path d="M153.7 366.2c-3.8 4.5-11.2 8.1-17.3 8.4-1.4..."/>{/* truncated Google Play shape for brevity */}
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-xs -mb-1 opacity-60">Disponible en</div>
                                        <div className="text-xl font-semibold leading-tight">Google Play</div>
                                    </div>
                                </Button>
                            </div>
                        </div>
                        <div className="mx-auto flex flex-col items-center lg:items-end relative z-20">
                            <div className="iphone-mockup scale-110 border-2 border-white/20 shadow-2xl bg-gradient-to-tr from-zinc-800 via-zinc-950 to-zinc-800/90">
                                <div className="relative w-full h-full glass-panel rounded-[calc(var(--iphone-width)_*_0.13)] overflow-hidden flex justify-center items-center iphone-screen-area">
                                    <img src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=540&q=80&auto=format" alt="App preview on iPhone" className="w-full h-full object-cover mix-blend-luminosity opacity-80 shadow-2xl" />
                                </div>
                                <div className="iphone-notch"></div>
                            </div>
                            <div className="hidden sm:block pointer-events-none absolute -left-10 -top-10 w-44 h-44 rounded-full bg-gradient-radial from-zinc-300/60 to-transparent blur-2xl opacity-70 z-0" />
                        </div>
                    </div>
                </div>
            </header>
            
            <AnimatedWrapper tag="section" id="how-it-works" className="py-24 bg-gradient-to-tr from-zinc-800/70 via-zinc-900/90 to-zinc-800/50 border-y border-white/10">
                <div className="container mx-auto px-4">
                    <h2 className="text-center font-newsreader font-bold text-4xl md:text-5xl mb-16 text-zinc-100 drop-shadow">¿Cómo funciona Serbis?</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="backdrop-blur-xl glass-panel border border-white/10 rounded-2xl p-8 text-center transition-all hover:shadow-xl hover:scale-105">
                            <div className="text-5xl mb-6">①</div>
                            <h3 className="font-newsreader font-semibold text-2xl mb-2 text-zinc-50">Describí tu Necesidad</h3>
                            <p className="text-zinc-300 px-2">Contanos qué servicio necesitás. Es simple y elegante.</p>
                        </div>
                        <div className="backdrop-blur-xl glass-panel border border-white/10 rounded-2xl p-8 text-center transition-all hover:shadow-xl hover:scale-105">
                            <div className="text-5xl mb-6">②</div>
                            <h3 className="font-newsreader font-semibold text-2xl mb-2 text-zinc-50">Conectate al Instante</h3>
                            <p className="text-zinc-300 px-2">Encontrá opciones premium en tu zona al instante.</p>
                        </div>
                        <div className="backdrop-blur-xl glass-panel border border-white/10 rounded-2xl p-8 text-center transition-all hover:shadow-xl hover:scale-105">
                            <div className="text-5xl mb-6">③</div>
                            <h3 className="font-newsreader font-semibold text-2xl mb-2 text-zinc-50">Resolvé y Calificá</h3>
                            <p className="text-zinc-300 px-2">Coordiná el servicio y calificá la experiencia. Todo desde la app.</p>
                        </div>
                    </div>
                </div>
            </AnimatedWrapper>
            
            <AnimatedWrapper tag="section" className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="text-center md:text-left">
                             <h2 className="font-newsreader font-bold text-4xl mb-4 text-zinc-100">Explorá el <span className="bg-gradient-to-tr from-zinc-200 to-zinc-400 bg-clip-text text-transparent">Home</span></h2>
                             <p className="text-zinc-300 mb-4 leading-relaxed text-lg">Describí el servicio que necesitas, nosotros elegimos profesionalmente el experto perfecto para tu necesidad en tu área. Todo en menos de 5 segundos, en una experiencia premium.</p>
                             <ul className="space-y-2 text-left inline-block text-zinc-300/90 font-mulish">
                                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-gradient-to-br from-zinc-300 via-zinc-50 to-zinc-400 shadow mx-1" /> Navegación intuitiva y rápida.</li>
                                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-gradient-to-br from-zinc-300 via-zinc-50 to-zinc-400 shadow mx-1" /> Opiniones certificadas y ratings de cada experto.</li>
                                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-gradient-to-br from-zinc-300 via-zinc-50 to-zinc-400 shadow mx-1" /> Accesibilidad total a tus pedidos recientes.</li>
                             </ul>
                        </div>
                        <div className="flex justify-center items-center relative">
                            <div className="overflow-hidden rounded-3xl glass-panel border border-white/10 shadow-2xl w-[300px] h-[600px]">
                                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=540&q=80&auto=format" alt="App home screen" className="w-full h-full object-cover brightness-110" />
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedWrapper>

            <AnimatedWrapper tag="section" className="py-24 bg-gradient-to-tr from-zinc-800/70 via-zinc-900/90 to-zinc-800/50 border-y border-white/10">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="flex justify-center md:order-last">
                            <div className="overflow-hidden rounded-3xl glass-panel border border-white/10 shadow-2xl w-[300px] h-[600px]">
                                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=540&q=80&auto=format"
                                    alt="App chat screen" className="w-full h-full object-cover brightness-110" />
                            </div>
                        </div>
                        <div className="text-center md:text-left md:order-first">
                             <h2 className="font-newsreader font-bold text-4xl mb-4 text-zinc-100">Comunicación <span className="bg-gradient-to-br from-zinc-100 via-zinc-400 to-white bg-clip-text text-transparent">Segura</span></h2>
                             <p className="text-zinc-300 mb-4 leading-relaxed text-lg">Negociá el precio y cerrá los detalles usando nuestro chat ultra seguro, con envío de imágenes y archivos. Confiable, elegante y práctico.</p>
                             <ul className="space-y-2 text-left inline-block text-zinc-300/90 font-mulish">
                                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-gradient-to-br from-zinc-300 via-zinc-50 to-zinc-400 shadow mx-1" /> Mensajería instantánea.</li>
                                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-gradient-to-br from-zinc-300 via-zinc-50 to-zinc-400 shadow mx-1" /> Compartí fotos y archivos en segundos.</li>
                                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-gradient-to-br from-zinc-300 via-zinc-50 to-zinc-400 shadow mx-1" /> Tus conversaciones, protegidas y privadas.</li>
                             </ul>
                        </div>
                    </div>
                </div>
            </AnimatedWrapper>

            <AnimatedWrapper tag="section" className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="text-center md:text-left">
                             <h2 className="font-newsreader font-bold text-4xl mb-4 text-zinc-100">Seguí el <span className="bg-gradient-to-tr from-zinc-200 to-zinc-400 bg-clip-text text-transparent">Estado</span> de tus Pedidos</h2>
                             <p className="text-zinc-300 mb-4 leading-relaxed text-lg">Accedé al progreso de tus pedidos en tiempo real, desde la publicación hasta la finalización. Todo claro y visual.</p>
                             <ul className="space-y-2 text-left inline-block text-zinc-300/90 font-mulish">
                                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-gradient-to-br from-zinc-300 via-zinc-50 to-zinc-400 shadow mx-1" /> Historial completo y visual.</li>
                                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-gradient-to-br from-zinc-300 via-zinc-50 to-zinc-400 shadow mx-1" /> Notificaciones en tiempo real.</li>
                                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-gradient-to-br from-zinc-300 via-zinc-50 to-zinc-400 shadow mx-1" /> Cada etapa visualizada al detalle.</li>
                             </ul>
                        </div>
                        <div className="flex justify-center items-center relative">
                            <div className="overflow-hidden rounded-3xl glass-panel border border-white/10 shadow-2xl w-[300px] h-[600px]">
                                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=540&q=80&auto=format"
                                    alt="App status screen" className="w-full h-full object-cover brightness-110" />
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedWrapper>
            
            <AnimatedWrapper tag="section" id="why-serbis" className="py-28 bg-gradient-to-tr from-zinc-800/70 via-zinc-900/90 to-zinc-800/60">
                <div className="container mx-auto px-4">
                    <h2 className="text-center font-newsreader font-bold text-4xl md:text-5xl mb-16 text-zinc-50 drop-shadow">¿Por qué elegir Serbis?</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        <div className="glass-panel backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-12 text-center transition-all hover:shadow-xl hover:scale-105">
                            <div className="text-3xl mb-3">🤝</div>
                            <h3 className="font-newsreader font-semibold text-xl mb-2 text-zinc-100">Red real y confiable</h3>
                            <p className="text-zinc-300">Personas de tu comunidad, listos para ayudar.</p>
                        </div>
                        <div className="glass-panel backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-12 text-center transition-all hover:shadow-xl hover:scale-105">
                            <div className="text-3xl mb-3">✅</div>
                            <h3 className="font-newsreader font-semibold text-xl mb-2 text-zinc-100">Verificación y reviews</h3>
                            <p className="text-zinc-300">Elegí seguro, con calificaciones confiables.</p>
                        </div>
                        <div className="glass-panel backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-12 text-center transition-all hover:shadow-xl hover:scale-105">
                            <div className="text-3xl mb-3">💬</div>
                            <h3 className="font-newsreader font-semibold text-xl mb-2 text-zinc-100">Comunicación directa</h3>
                            <p className="text-zinc-300">Todo lo que necesitás en una sola app.</p>
                        </div>
                        <div className="glass-panel backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-12 text-center transition-all hover:shadow-xl hover:scale-105">
                            <div className="text-3xl mb-3">⚡️</div>
                            <h3 className="font-newsreader font-semibold text-xl mb-2 text-zinc-100">Premium & Rápido</h3>
                            <p className="text-zinc-300">Encontrá lo que buscás y resolvé ya.</p>
                        </div>
                    </div>
                    <div className="text-center mt-16">
                         <Button size="lg" className="rounded-xl text-lg font-bold px-10 py-6 bg-gradient-to-tr from-white/90 to-zinc-200 hover:from-white hover:to-white/90 text-zinc-900 shadow-lg border border-zinc-400 shadow-white/10 transition duration-200">
                            Descargá la App y Empezá
                        </Button>
                    </div>
                </div>
            </AnimatedWrapper>
            
            <footer id="about-us-footer" className="bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800/90 text-zinc-400 py-12 glass-panel border-t border-white/10">
                <div className="container mx-auto px-4 text-center text-sm space-y-2">
                    <p className="text-zinc-500/80">© Serbis 2024. Todos los derechos reservados.</p>
                    <p>Buenos Aires, Argentina</p>
                    <a href="mailto:inaki.iturriaga@serbis.app" className="hover:text-white transition-colors">inaki.iturriaga@serbis.app</a>
                </div>
            </footer>
        </div>
    );
};

export default Index;

