import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { Button } from './Button';

export function Footer({ onGoToWorkerSignup, onOpenPublicManagement, onOpenSerbisAdmin }: { onGoToWorkerSignup: () => void, onOpenPublicManagement: () => void, onOpenSerbisAdmin: () => void }) {
  const faviconUrl = `${import.meta.env.BASE_URL}favicon.ico`;

  return (
    <footer className="bg-black text-white pt-20 pb-12 border-t-2 border-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <div className="grid lg:grid-cols-2 gap-20 mb-20 border-b border-white/20 pb-20">
          <div>
            <div className="mb-8">
              <img src={faviconUrl} alt="Serbis" className="w-16 h-16 rounded-xl object-cover shadow-lg bg-white" />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter leading-none mb-8">
              Reinventando <br />
              el trabajo <br />
              eventual.
            </h2>
            <div className="flex gap-4">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Instagram
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                LinkedIn
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-12 font-mono">
            <div>
              <h4 className="text-accent font-bold uppercase tracking-widest mb-6 text-sm">Plataforma</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">Soluciones <ArrowUpRight size={14} /></a></li>
                <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">Manifiesto <ArrowUpRight size={14} /></a></li>
                <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">Costos <ArrowUpRight size={14} /></a></li>
                <li><button onClick={onGoToWorkerSignup} className="hover:text-accent transition-colors text-left flex items-center gap-2">Soy Trabajador <ArrowUpRight size={14} /></button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-accent font-bold uppercase tracking-widest mb-6 text-sm">Contacto</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <a href="mailto:contacto@serbis.com" className="hover:text-accent transition-colors">contacto@serbis.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <a href="tel:+5491100000000" className="hover:text-accent transition-colors">+54 9 11 0000-0000</a>
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  Buenos Aires, Argentina
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end justify-between gap-4 font-mono text-xs uppercase tracking-widest text-white/40">
          <p>© 2026 SERBIS SAS. SISTEMA OPERATIVO LABORAL v1.0</p>
          <div className="flex gap-8">
            <button onClick={onOpenSerbisAdmin} className="hover:text-white transition-colors">Admin</button>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
