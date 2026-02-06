import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

type NavbarProps = {
  onGoToAuth: () => void;
  onGoToSignup: () => void;
  onGoToWorkerSignup: () => void;
  onOpenWizard: () => void;
  onOpenManagement: () => void;
  onOpenPublicManagement: () => void;
};

export function Navbar({ onGoToAuth, onGoToSignup, onGoToWorkerSignup, onOpenWizard }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const faviconUrl = `${import.meta.env.BASE_URL}favicon.ico`;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-50/80 backdrop-blur-md border-b border-black/5 h-20 flex items-center transition-all duration-300">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src={faviconUrl}
              alt="Serbis"
              className="w-10 h-10 rounded-lg object-cover shadow-md group-hover:shadow-lg transition-all duration-300"
            />
            <span className="font-display font-bold text-2xl tracking-tight text-black group-hover:text-primary transition-colors">Serbis</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex items-center gap-8 text-sm font-medium text-black/70">
              <a href="#process" className="hover:text-primary transition-colors">Cómo funciona</a>
              <a href="#impact" className="hover:text-primary transition-colors">Impacto</a>
              <a href="#cta" className="hover:text-primary transition-colors">Empezar</a>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onGoToWorkerSignup}
                className="text-sm font-medium text-black/70 hover:text-primary transition-colors"
              >
                Soy Trabajador
              </button>
              <div className="w-px h-4 bg-black/10" />
              <button
                onClick={onGoToAuth}
                className="text-sm font-medium text-black/70 hover:text-primary transition-colors"
              >
                Ingresar
              </button>
              <Button onClick={onGoToSignup} size="sm" className="ml-2 shadow-md hover:shadow-lg">
                Registrar
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-black/70 hover:bg-black/5 rounded-lg transition-all"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-surface-50/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-200">
          <div className="h-20 border-b border-black/5 flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <img src={faviconUrl} alt="Serbis" className="w-8 h-8 rounded-lg object-cover" />
              <span className="font-display font-bold text-2xl tracking-tight text-black">Serbis</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-6 gap-8">
            <nav className="flex flex-col gap-6 text-3xl font-display font-bold text-black/80">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Manifiesto</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Red</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Costos</a>
            </nav>

            <div className="w-full h-px bg-black/5" />

            <div className="grid gap-4">
              <Button onClick={() => { setIsMobileMenuOpen(false); onGoToSignup(); }} size="lg" className="w-full shadow-lg">
                Registrar
              </Button>
              <Button onClick={() => { setIsMobileMenuOpen(false); onGoToWorkerSignup(); }} variant="outline" size="lg" className="w-full">
                Soy Trabajador
              </Button>
              <button onClick={() => { setIsMobileMenuOpen(false); onGoToAuth(); }} className="text-center font-medium text-black/60 mt-4 hover:text-black transition-colors">
                Ingresar a mi cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
