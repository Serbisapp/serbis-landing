import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Edit,
  Zap,
  CheckCircle2,
  Compass,
  Star,
  Bell,
  Send,
  Paperclip,
  ShieldCheck,
  History,
  CheckCircle,
  Users,
  BadgeCheck,
  MessageSquare,
  Gauge,
  Play,
  Apple,
  Menu
} from "lucide-react";
import { AnimatedWrapper } from '@/components/AnimatedWrapper';

const PlaceholderImage = ({ className }: { className?: string }) => (
    <div className={`bg-gray-300 animate-pulse ${className}`} />
);

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
        <div className="bg-white font-mulish text-gray-800" id="page-top">
            <nav className={`fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm transition-all duration-300 ${scrolled ? 'py-2 shadow-md' : 'py-3 shadow-sm'}`}>
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <a href="#page-top" className="flex items-center gap-2 font-bold text-gray-800">
                        <div className={`bg-serbis-primary rounded-lg flex items-center justify-center transition-all duration-300 ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`}>
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <span className="text-2xl font-bold">Serbis</span>
                    </a>
                    
                    <div className="hidden md:flex items-center space-x-1">
                        <a href="#!" className="px-3 py-2 text-sm font-semibold text-serbis-primary border border-serbis-primary rounded-md hover:bg-serbis-primary hover:text-white transition-colors">Soy Proveedor</a>
                        <a href="#how-it-works" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-serbis-primary transition-colors rounded-md">Cómo Funciona</a>
                        <a href="#about-us-footer" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-serbis-primary transition-colors rounded-md">Nosotros</a>
                    </div>
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu />
                        </Button>
                    </div>
                </div>
            </nav>

            <header className="pt-28 pb-16 bg-gray-50 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 text-center lg:text-left">
                            <h2 className="font-newsreader font-bold text-5xl md:text-6xl text-gray-900">Basta de listas.</h2>
                            <h1 className="font-newsreader font-bold text-4xl md:text-5xl text-gray-900 mt-2 mb-4">
                                Encontrá al profesional ideal.<br/>
                                <strong className="text-serbis-primary">En 5 segundos.</strong>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8">
                                Servicios de confianza, calificados por tu comunidad. Olvidate de las complicaciones, Serbis te conecta.
                            </p>
                            <Button size="lg" className="bg-serbis-primary hover:bg-blue-700 text-white font-bold px-6 py-7 text-base rounded-md">
                                Publicá tu Pedido Ahora
                            </Button>
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
                                <Button variant="outline" className="w-48 h-14 border-2 flex items-center justify-center gap-2">
                                    <Play className="w-7 h-7" />
                                    <div className="text-left">
                                        <div className="text-xs -mb-1">GET IT ON</div>
                                        <div className="text-xl font-semibold leading-tight">Google Play</div>
                                    </div>
                                </Button>
                                <Button variant="outline" className="w-48 h-14 border-2 flex items-center justify-center gap-2">
                                    <Apple className="w-7 h-7" />
                                    <div className="text-left">
                                        <div className="text-xs -mb-1">Download on the</div>
                                        <div className="text-xl font-semibold leading-tight">App Store</div>
                                    </div>
                                </Button>
                            </div>
                        </div>
                        <div className="lg:col-span-5 hidden lg:block">
                            <div className="relative flex justify-center items-center h-full min-h-[520px] [perspective:1800px]">
                                <div className="iphone-mockup">
                                    <div className="relative w-full h-full bg-black rounded-[calc(var(--iphone-width)_*_0.13)] overflow-hidden iphone-screen-area">
                                        <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=60" alt="App preview on iPhone" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="iphone-notch"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <AnimatedWrapper tag="section" id="how-it-works" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-center font-newsreader font-semibold text-4xl mb-16">Así de fácil es con Serbis</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="text-center">
                            <Edit className="w-12 h-12 text-serbis-primary mx-auto mb-4"/>
                            <h3 className="font-newsreader font-semibold text-2xl mb-2">1. Describí tu Necesidad</h3>
                            <p className="text-gray-600 px-2">Contanos qué servicio necesitás. Es rápido y simple.</p>
                        </div>
                        <div className="text-center">
                            <Zap className="w-12 h-12 text-serbis-primary mx-auto mb-4"/>
                            <h3 className="font-newsreader font-semibold text-2xl mb-2">2. Conectá al Instante</h3>
                            <p className="text-gray-600 px-2">Nuestro sistema te encuentra opciones calificadas en tu zona.</p>
                        </div>
                        <div className="text-center">
                            <CheckCircle2 className="w-12 h-12 text-serbis-primary mx-auto mb-4"/>
                            <h3 className="font-newsreader font-semibold text-2xl mb-2">3. Resolvé y Calificá</h3>
                            <p className="text-gray-600 px-2">Coordiná el servicio y ayudá a la comunidad con tu reseña. Todo dentro de nuestra app.</p>
                        </div>
                    </div>
                </div>
            </AnimatedWrapper>
            
            <AnimatedWrapper tag="section" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                             <h2 className="font-newsreader font-bold text-4xl mb-4">Explorá el <strong className="text-serbis-primary">Home</strong></h2>
                             <p className="text-gray-600 mb-4 leading-relaxed">Describí el servicio que necesitas, nostros te emparejamos con una persona capaz en tu area. No clasificamos, entendemos que se necesita para solucionar tu problema y quien puede hacerlo en tu area. Todo en menos de 5 segundos.</p>
                             <ul className="space-y-2 text-left inline-block">
                                <li className="flex items-center gap-3"><Compass className="w-5 h-5 text-serbis-primary flex-shrink-0"/>Navegación intuitiva para encontrar lo que necesitás.</li>
                                <li className="flex items-center gap-3"><Star className="w-5 h-5 text-serbis-primary flex-shrink-0"/>Ratings y reviews de cada trabajador.</li>
                                <li className="flex items-center gap-3"><Bell className="w-5 h-5 text-serbis-primary flex-shrink-0"/>Acceso rápido a tus pedidos y chats recientes.</li>
                             </ul>
                        </div>
                        <div className="flex justify-center">
                            <img src="https://images.unsplash.com/photo-1555774698-0b77e0abfe3d?w=800&auto=format&fit=crop&q=60" alt="App home screen" className="w-[280px] h-[570px] rounded-3xl shadow-xl app-feature-image object-cover" />
                        </div>
                    </div>
                </div>
            </AnimatedWrapper>

            <AnimatedWrapper tag="section" className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center md:order-last">
                           <img src="https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?w=800&auto=format&fit=crop&q=60" alt="App chat screen" className="w-[280px] h-[570px] rounded-3xl shadow-xl app-feature-image object-cover" />
                        </div>
                        <div className="text-center md:text-left md:order-first">
                             <h2 className="font-newsreader font-bold text-4xl mb-4">Comunicación segura con el <strong className="text-serbis-primary">Chat</strong></h2>
                             <p className="text-gray-600 mb-4 leading-relaxed">Coordiná detalles, compartí imágenes y <strong>negocia el precio</strong> directamente con los proveedores a través de nuestro chat integrado y seguro.</p>
                             <ul className="space-y-2 text-left inline-block">
                                <li className="flex items-center gap-3"><Send className="w-5 h-5 text-serbis-primary flex-shrink-0"/>Mensajería instantánea para respuestas rápidas.</li>
                                <li className="flex items-center gap-3"><Paperclip className="w-5 h-5 text-serbis-primary flex-shrink-0"/>Compartí archivos y fotos relevantes para el servicio.</li>
                                <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-serbis-primary flex-shrink-0"/>Conversaciones seguras y privadas dentro de la app.</li>
                             </ul>
                        </div>
                    </div>
                </div>
            </AnimatedWrapper>

             <AnimatedWrapper tag="section" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                             <h2 className="font-newsreader font-bold text-4xl mb-4">Seguí el <strong className="text-serbis-primary">Estado</strong> de tus Pedidos</h2>
                             <p className="text-gray-600 mb-4 leading-relaxed">Mantenete informado en tiempo real sobre el progreso de tus solicitudes de servicio, desde la publicación hasta la finalización.</p>
                             <ul className="space-y-2 text-left inline-block">
                                <li className="flex items-center gap-3"><History className="w-5 h-5 text-serbis-primary flex-shrink-0"/>Historial completo de todos tus pedidos y servicios.</li>
                                <li className="flex items-center gap-3"><Bell className="w-5 h-5 text-serbis-primary flex-shrink-0"/>Notificaciones instantáneas sobre actualizaciones importantes.</li>
                                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-serbis-primary flex-shrink-0"/>Visualizá claramente cada etapa del proceso.</li>
                             </ul>
                        </div>
                        <div className="flex justify-center">
                           <img src="https://images.unsplash.com/photo-1583569883582-cc61434b455c?w=800&auto=format&fit=crop&q=60" alt="App status screen" className="w-[280px] h-[570px] rounded-3xl shadow-xl app-feature-image object-cover" />
                        </div>
                    </div>
                </div>
            </AnimatedWrapper>
            
            <AnimatedWrapper tag="section" id="why-serbis" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-center font-newsreader font-semibold text-4xl mb-16">¿Por qué elegir Serbis?</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        <div className="text-center">
                            <Users className="w-12 h-12 text-serbis-primary mx-auto mb-4"/>
                            <h3 className="font-newsreader font-semibold text-xl mb-2">Ayuda de tu Comunidad</h3>
                            <p className="text-gray-600">Conectate con personas de tu barrio dispuestas a ayudarte.</p>
                        </div>
                        <div className="text-center">
                            <BadgeCheck className="w-12 h-12 text-serbis-primary mx-auto mb-4"/>
                            <h3 className="font-newsreader font-semibold text-xl mb-2">Calificaciones Reales</h3>
                            <p className="text-gray-600">Decidí con confianza gracias a las opiniones de otros usuarios.</p>
                        </div>
                        <div className="text-center">
                            <MessageSquare className="w-12 h-12 text-serbis-primary mx-auto mb-4"/>
                            <h3 className="font-newsreader font-semibold text-xl mb-2">Comunicación Directa</h3>
                            <p className="text-gray-600">Chat seguro para coordinar todos los detalles del servicio.</p>
                        </div>
                        <div className="text-center">
                            <Gauge className="w-12 h-12 text-serbis-primary mx-auto mb-4"/>
                            <h3 className="font-newsreader font-semibold text-xl mb-2">Rápido y Eficaz</h3>
                            <p className="text-gray-600">Encontrá lo que buscás en segundos y resolvé sin demoras.</p>
                        </div>
                    </div>
                    <div className="text-center mt-16">
                         <Button size="lg" className="bg-serbis-primary hover:bg-blue-700 text-white font-bold px-6 py-7 text-base rounded-md">
                            Descargá la App y Empezá
                        </Button>
                    </div>
                </div>
            </AnimatedWrapper>
            
            <footer id="about-us-footer" className="bg-gray-900 text-gray-400 py-12">
                <div className="container mx-auto px-4 text-center text-sm space-y-1">
                    <p>© Serbis 2024. Todos los derechos reservados.</p>
                    <p>Buenos Aires, Argentina</p>
                    <a href="mailto:inaki.iturriaga@serbis.app" className="hover:text-white transition-colors">inaki.iturriaga@serbis.app</a>
                </div>
            </footer>
        </div>
    );
};

export default Index;
