import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, CheckCircle2, CreditCard, MessageCircle, Plus, Search, Send, Sparkles, Users } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Button } from './landing/Button';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type IconType = React.ComponentType<{ size?: number; className?: string }>;

type Step = {
  key: string;
  label: string;
  title: string;
  description: string;
  icon: IconType;
  screen: React.ReactNode;
};

export function ScrollProcessAnimation({ onOpenWizard }: { onOpenWizard: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedLayerRef = useRef<HTMLDivElement>(null);
  const panelOffsetRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const steps: Step[] = useMemo(
    () => [
      {
        key: 'wizard',
        label: '1. Contratación',
        title: 'Describí lo que necesitás.',
        description: 'Defina los requerimientos del puesto.',
        icon: Plus,
        screen: <WizardScreen reduceMotion={!!reduceMotion} />,
      },
      {
        key: 'compare',
        label: '2. Selección Inteligente',
        title: 'Te mostramos el match.',
        description: 'Tecnología de filtrado inmediato.',
        icon: Search,
        screen: <CompareScreen reduceMotion={!!reduceMotion} />,
      },
      {
        key: 'send',
        label: '3. Propuesta',
        title: 'Enviamos la oferta.',
        description: 'Notificación a candidatos.',
        icon: Send,
        screen: <OfferSentScreen reduceMotion={!!reduceMotion} />,
      },
      {
        key: 'confirm',
        label: '4. Confirmación',
        title: 'Elegí y pagá.',
        description: 'Selección final y gestión de pagos.',
        icon: CreditCard,
        screen: <SelectAndPayScreen reduceMotion={!!reduceMotion} />,
      },
      {
        key: 'ops',
        label: '5. Ejecución',
        title: 'El trabajo se realiza.',
        description: 'Monitoreo de asistencia y cumplimiento.',
        icon: CheckCircle2,
        screen: <WorkCarriedOutScreen reduceMotion={!!reduceMotion} />,
      },
    ],
    [onOpenWizard, reduceMotion]
  );

  const updateActiveIndex = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(steps.length - 1, next));
      if (activeIndexRef.current === clamped) return;
      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
    },
    [steps.length]
  );

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    let rafId = 0;
    let scheduled = false;

    const updateFromScroll = () => {
      scheduled = false;
      const container = containerRef.current;
      if (!container) return;

      const viewportHeight = Math.max(window.innerHeight || 0, 1);
      const stickyTopPx = 80;
      const panelHeight = Math.max(viewportHeight - stickyTopPx, 1);
      const pinRange = container.offsetHeight - panelHeight;
      if (pinRange <= 0) {
        activeIndexRef.current = 0;
        setActiveIndex(0);
        if (panelOffsetRef.current !== 0) {
          panelOffsetRef.current = 0;
          if (pinnedLayerRef.current) {
            pinnedLayerRef.current.style.transform = 'translate3d(0, 0px, 0)';
          }
        }
        return;
      }

      const rect = container.getBoundingClientRect();
      const scrolledWithinContainer = Math.max(0, Math.min(pinRange, stickyTopPx - rect.top));
      if (Math.abs(panelOffsetRef.current - scrolledWithinContainer) >= 0.1) {
        panelOffsetRef.current = scrolledWithinContainer;
        if (pinnedLayerRef.current) {
          pinnedLayerRef.current.style.transform = `translate3d(0, ${scrolledWithinContainer.toFixed(3)}px, 0)`;
        }
      }

      const progress = scrolledWithinContainer / pinRange;
      const stepSize = 1 / steps.length;
      const boundaryBuffer = Math.min(0.04, stepSize * 0.2);
      const rawIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      const previous = activeIndexRef.current;
      let next = rawIndex;

      if (next > previous && progress < (previous + 1) * stepSize + boundaryBuffer) {
        next = previous;
      } else if (next < previous && progress > previous * stepSize - boundaryBuffer) {
        next = previous;
      }

      updateActiveIndex(next);
    };

    const scheduleUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = window.requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [steps.length, updateActiveIndex]);

  const jumpToStep = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const start = window.scrollY + rect.top;
      const viewport = Math.max(window.innerHeight || 0, 1);
      const stickyTopPx = 80;
      const panelHeight = Math.max(viewport - stickyTopPx, 1);
      const pinRange = container.offsetHeight - panelHeight;
      if (pinRange <= 0) return;

      const progress = steps.length <= 1 ? 0 : (index + 0.5) / steps.length;
      const target = start - stickyTopPx + progress * pinRange;

      updateActiveIndex(index);
      window.scrollTo({ top: target, behavior: reduceMotion ? 'auto' : 'smooth' });
    },
    [reduceMotion, steps.length, updateActiveIndex]
  );

  const storyHeightVh = Math.max(400, steps.length * 90);

  return (
    <section className="relative bg-white border-b-2 border-black z-30">
      <div ref={containerRef} className="relative" style={{ height: `${storyHeightVh}vh`, position: 'relative' }}>
        <div
          ref={pinnedLayerRef}
          className="absolute inset-x-0 top-0 transform-gpu will-change-transform"
        >
          <div className="h-[calc(100vh-5rem)] flex flex-col justify-center">
          {/* Background */}
          <div className="absolute inset-0" aria-hidden>
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            <div className="absolute inset-0 bg-white/85" />
          </div>

          <div className="mx-auto max-w-[1400px] px-6 md:px-12 h-full w-full flex items-center justify-center py-8 md:py-12">
            <div className="w-full grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
              {/* Narrative */}
              <div className="relative">
                <h2 className="mt-6 md:mt-8 hidden lg:block text-4xl md:text-5xl font-display font-semibold tracking-tight leading-[1.1]">
                  Gestión simplificada,
                  <br />
                  <span className="text-accent">paso a paso.</span>
                </h2>

                <p className="mt-4 hidden lg:block font-mono text-base md:text-lg text-black/70 max-w-lg">
                  Una plataforma diseñada para optimizar sus tiempos de contratación.
                </p>

                {/* Mobile: compact active step */}
                <div className="mt-8 lg:hidden">
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.div
                      key={steps[activeIndex]?.key + '-m-title'}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                      transition={{ duration: reduceMotion ? 0 : 0.16, ease: 'easeOut' }}
                    >
                      <div className="text-2xl font-display font-bold uppercase tracking-tight">{steps[activeIndex]?.title}</div>
                      <div className="mt-2 font-mono text-sm text-black/80">{steps[activeIndex]?.description}</div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-5 flex items-center justify-between">
                    <Button size="sm" variant="outline" onClick={() => jumpToStep(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0}>
                      Anterior
                    </Button>
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-black/70">
                      {activeIndex + 1}/{steps.length}
                    </div>
                    <Button size="sm" onClick={() => jumpToStep(Math.min(steps.length - 1, activeIndex + 1))} disabled={activeIndex === steps.length - 1}>
                      Siguiente
                    </Button>
                  </div>

                  <div className="mt-6">
                    <StepPanel>{steps[activeIndex]?.screen}</StepPanel>
                  </div>
                </div>

                {/* Desktop: single active step (User request: only one step shown at a time) */}
                <div className="hidden lg:block mt-10 pb-24">
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.div
                      key={steps[activeIndex]?.key + '-d-step'}
                      initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 10 }}
                      transition={{ duration: reduceMotion ? 0 : 0.16, ease: 'easeOut' }}
                      className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 max-w-md min-h-[260px] relative"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm">
                          {React.createElement(steps[activeIndex].icon, { size: 24 })}
                        </div>
                        <div className="font-mono text-xs font-bold uppercase tracking-widest text-black/40">
                          Paso {activeIndex + 1}/{steps.length}
                        </div>
                      </div>

                      <h3 className="text-3xl font-display font-bold text-black mb-4">
                        {steps[activeIndex].label}
                      </h3>
                      <p className="text-lg text-black/60 leading-relaxed font-sans">
                        {steps[activeIndex].description}
                      </p>

                      {/* Step Progress Dots */}
                      <div className="mt-8 flex gap-2">
                        {steps.map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              'h-1.5 rounded-full transition-all duration-300',
                              i === activeIndex ? 'w-8 bg-accent' : 'w-2 bg-black/10'
                            )}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Desktop: content panel — centered in column */}
              <div className="hidden lg:flex lg:items-center lg:justify-center lg:self-center">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={steps[activeIndex]?.key + '-panel'}
                    className="w-full max-w-lg min-h-[340px]"
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                    transition={{ duration: reduceMotion ? 0 : 0.16, ease: 'easeOut' }}
                  >
                    <StepPanel>{steps[activeIndex]?.screen}</StepPanel>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      <div className="p-6">{children}</div>
    </div>
  );
}

function StepCard({
  step,
  index,
  total,
  active,
  done,
  onSelect,
}: {
  step: Step;
  index: number;
  total: number;
  active: boolean;
  done: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'group w-full text-left border border-black/5 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        active ? 'bg-white ring-1 ring-black/5' : 'bg-surface-50/50 hover:bg-white'
      )}
      aria-current={active ? 'step' : undefined}
    >
      <div className="p-4 flex items-start gap-4">
        <div
          className={cn(
            'w-12 h-12 rounded-lg border border-black/5 shadow-sm flex items-center justify-center transition-colors',
            active ? 'bg-primary text-white' : done ? 'bg-accent text-white' : 'bg-white text-black/60'
          )}
          aria-hidden
        >
          {done ? <Check size={18} /> : <step.icon size={18} />}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="font-display font-semibold text-black tracking-tight">{step.label}</div>
              <div className="mt-1 font-sans text-sm text-black/60 leading-relaxed">{step.description}</div>
            </div>

            <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-black/70">
              {active ? 'Ahora' : done ? 'Listo' : `Paso ${index + 1}/${total}`}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function DotProgress({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-1.5 rounded-full transition-colors',
            i === active ? 'w-5 bg-black' : i < active ? 'w-5 bg-accent' : 'w-2.5 bg-black/20'
          )}
        />
      ))}
    </div>
  );
}

function PanelTop({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-lg md:text-xl font-display font-bold uppercase tracking-wide text-black">{title}</div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

function WizardScreen({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div>
      <PanelTop title="1. Contratación" right={<DotProgress total={5} active={0} />} />

      <div className="mt-4 bg-surface-50/50 rounded-xl p-4 border border-black/5">
        <textarea
          rows={4}
          placeholder="Ej: Carga y descarga…"
          className="w-full resize-none rounded-lg border border-black/10 bg-white px-3 py-3 font-sans text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
        />
        <div className="mt-4 h-11 rounded-lg bg-primary text-white font-medium flex items-center justify-center gap-2 shadow-sm hover:bg-black/90 transition-colors cursor-pointer">
          Continuar <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
}

function CompareScreen({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div>
      <PanelTop title="2. Selección (IA)" right={<DotProgress total={5} active={1} />} />

      <div className="mt-4 bg-surface-50/50 rounded-xl p-4 border border-black/5">
        <div className="text-xs font-mono font-bold uppercase tracking-widest text-black/60 mb-3">Matches encontrados</div>
        <div className="space-y-3">
          <WorkerMatchRow name="Juan P." role="Carga/Descarga" match={96} />
          <WorkerMatchRow name="María G." role="Depósito" match={91} />
          <WorkerMatchRow name="Kevin R." role="Logística" match={86} />
        </div>
      </div>
    </div>
  );
}

function OfferSentScreen({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div>
      <PanelTop title="3. Propuesta" right={<DotProgress total={5} active={2} />} />

      <div className="mt-4 bg-surface-50/50 rounded-xl p-4 border border-black/5">
        <div className="text-xs font-mono font-bold uppercase tracking-widest text-black/60 mb-3">Ofertas enviadas</div>
        <div className="space-y-3">
          <OfferRow name="Juan P." status="Enviada" />
          <OfferRow name="María G." status="Enviada" />
          <OfferRow name="Kevin R." status="Enviada" />
        </div>
      </div>

      <div className="mt-4 bg-white rounded-xl shadow-sm border border-black/5 p-4">
        <div className="text-xs font-mono font-bold uppercase tracking-widest text-black/60">Siguiente</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm font-display font-bold uppercase tracking-wide text-black">Esperamos respuestas</div>
          <MessageCircle size={18} className="text-black/60" />
        </div>
      </div>
    </div>
  );
}

function SelectAndPayScreen({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div>
      <PanelTop title="4. Confirmación" right={<DotProgress total={5} active={3} />} />

      <div className="mt-4 bg-surface-50/50 rounded-xl p-4 border border-black/5">
        <div className="text-xs font-mono font-bold uppercase tracking-widest text-black/60 mb-3">Próximos pagos</div>
        <div className="space-y-3">
          <ConfirmedWorkerRow name="Juan P." role="Carga/Descarga" selected />
          <ConfirmedWorkerRow name="María G." role="Depósito" selected />
          <ConfirmedWorkerRow name="Kevin R." role="Logística" selected />
        </div>
        <div className="mt-4 h-11 rounded-lg bg-primary text-white font-medium flex items-center justify-center gap-2 shadow-sm hover:bg-black/90 transition-colors cursor-pointer">
          Pagar $126.000 <CreditCard size={16} />
        </div>
      </div>
    </div>
  );
}

function WorkCarriedOutScreen({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div>
      <PanelTop title="5. Trabajo en marcha" right={<DotProgress total={5} active={4} />} />

      <div className="mt-4 bg-white rounded-xl shadow-sm border border-black/5 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-display font-bold uppercase text-black">Equipo en sitio</div>
          <div className="bg-accent text-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">
            Live
          </div>
        </div>

        <div className="h-3 bg-black/10 overflow-hidden border border-black/20">
          <div className="h-full bg-accent" style={{ width: '55%' }} />
        </div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-black/40">Avance: 55%</div>

        <div className="mt-6 border-t-2 border-black pt-4">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-black/60">3 confirmados trabajando</div>
        </div>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center border border-black bg-white px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-black/70">
      {children}
    </div>
  );
}

function TimelineRow({ time, text }: { time: string; text: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border border-black/15 bg-white px-3 py-3">
      <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-black/50 shrink-0">{time}</div>
      <div className="font-mono text-xs text-black/70 leading-relaxed">{text}</div>
    </div>
  );
}

function WorkerMatchRow({ name, role, match }: { name: string; role: string; match: number }) {
  const width = `${Math.max(0, Math.min(100, match))}%`;
  return (
    <div className="bg-white rounded-lg border border-black/5 p-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-display font-bold uppercase text-black">{name}</div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-black/60">{role}</div>
        </div>
        <div className="shrink-0 text-xs font-mono font-bold text-black">{match}%</div>
      </div>
      <div className="mt-2 h-1.5 bg-black/10 overflow-hidden">
        <div className="h-full bg-accent" style={{ width }} />
      </div>
    </div>
  );
}

function ConfirmedWorkerRow({ name, role, selected }: { name: string; role: string; selected: boolean }) {
  return (
    <div className="bg-white rounded-lg border border-black/5 shadow-sm p-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-sm font-display font-bold uppercase tracking-wide text-black truncate">{name}</div>
        <div className="mt-1 font-mono text-xs uppercase tracking-widest text-black/50">{role}</div>
        <div className="mt-1 font-mono text-[11px] font-bold uppercase tracking-widest text-black/60">Confirmado</div>
      </div>
      <div
        className={cn(
          'w-9 h-9 rounded-full border border-black/10 flex items-center justify-center shrink-0 shadow-sm',
          selected ? 'bg-accent text-white' : 'bg-white text-black'
        )}
        aria-hidden
      >
        <Check size={18} />
      </div>
    </div>
  );
}

function OfferRow({ name, status }: { name: string; status: string }) {
  return (
    <div className="bg-white rounded-lg border border-black/5 shadow-sm p-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-sm font-display font-bold uppercase tracking-wide text-black truncate">{name}</div>
        <div className="mt-1 font-mono text-[11px] font-bold uppercase tracking-widest text-black/50">{status}</div>
      </div>
      <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shadow-md shrink-0">
        <Check size={18} />
      </div>
    </div>
  );
}
