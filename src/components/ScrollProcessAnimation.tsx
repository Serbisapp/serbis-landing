import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
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
  const renderedStepRef = useRef(0);
  const lastRawStepRef = useRef(0);
  const scrollDirectionRef = useRef<1 | -1 | 0>(0);
  const reduceMotion = useReducedMotion();
  const [scrollStep, setScrollStep] = useState(0);

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

  const maxStep = Math.max(steps.length - 1, 0);

  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      const container = containerRef.current;
      const pinnedLayer = pinnedLayerRef.current;

      if (container && pinnedLayer) {
        const viewportHeight = Math.max(window.innerHeight || 0, 1);
        const stickyTopPx = 80;
        const panelHeight = Math.max(viewportHeight - stickyTopPx, 1);
        const pinRange = Math.max(container.offsetHeight - panelHeight, 0);
        const rect = container.getBoundingClientRect();
        const traveled = pinRange <= 0 ? 0 : Math.max(0, Math.min(pinRange, stickyTopPx - rect.top));

        // Keep the pinned layer locked to the viewport while inside the section.
        pinnedLayer.style.transform = `translate3d(0, ${traveled.toFixed(3)}px, 0)`;

        const rawStep = pinRange <= 0 || maxStep === 0 ? 0 : (traveled / pinRange) * maxStep;
        const delta = rawStep - lastRawStepRef.current;
        if (Math.abs(delta) > 0.001) {
          scrollDirectionRef.current = delta > 0 ? 1 : -1;
        }
        lastRawStepRef.current = rawStep;

        let nextStep = rawStep;
        if (reduceMotion) {
          nextStep = Math.round(rawStep);
        } else {
          const base = Math.floor(rawStep);
          const local = rawStep - base;
          const assistStrength = 0.82;
          const assistPower = 2.35;
          const directedLocal =
            scrollDirectionRef.current > 0
              ? 1 - Math.pow(1 - local, assistPower)
              : scrollDirectionRef.current < 0
                ? Math.pow(local, assistPower)
                : local;
          const assistedLocal = local * (1 - assistStrength) + directedLocal * assistStrength;
          nextStep = base + assistedLocal;
        }

        if (Math.abs(renderedStepRef.current - nextStep) >= 0.001) {
          renderedStepRef.current = nextStep;
          setScrollStep(nextStep);
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [maxStep, reduceMotion]);

  const jumpToStep = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;

      const clampedIndex = Math.max(0, Math.min(maxStep, index));
      const rect = container.getBoundingClientRect();
      const start = window.scrollY + rect.top;
      const viewport = Math.max(window.innerHeight || 0, 1);
      const stickyTopPx = 80;
      const panelHeight = Math.max(viewport - stickyTopPx, 1);
      const pinRange = Math.max(container.offsetHeight - panelHeight, 0);
      const progress = maxStep === 0 ? 0 : clampedIndex / maxStep;
      const targetY = start - stickyTopPx + progress * pinRange;

      renderedStepRef.current = clampedIndex;
      setScrollStep(clampedIndex);

      window.scrollTo({ top: targetY, behavior: reduceMotion ? 'auto' : 'smooth' });
    },
    [maxStep, reduceMotion]
  );

  const clampedStep = Math.max(0, Math.min(maxStep, scrollStep));
  const fromIndex = Math.floor(clampedStep);
  const toIndex = Math.min(maxStep, fromIndex + 1);
  const mix = toIndex === fromIndex ? 0 : clampedStep - fromIndex;
  const activeIndex = Math.max(0, Math.min(maxStep, Math.round(clampedStep)));
  const fromStep = steps[fromIndex] ?? steps[0];
  const toStep = steps[toIndex] ?? fromStep;

  if (!fromStep || !toStep) {
    return null;
  }

  const layerStyle = (opacity: number, offsetX: number, offsetY: number): React.CSSProperties => ({
    opacity,
    transform: reduceMotion ? 'translate3d(0, 0, 0)' : `translate3d(${offsetX}px, ${offsetY}px, 0)`,
    transition: 'none',
    willChange: 'opacity, transform',
  });

  const renderDesktopStep = (step: Step, index: number) => (
    <>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm">
          {React.createElement(step.icon, { size: 24 })}
        </div>
        <div className="font-mono text-xs font-bold uppercase tracking-widest text-black/40">
          Paso {index + 1}/{steps.length}
        </div>
      </div>

      <h3 className="text-3xl font-display font-bold text-black mb-4">{step.label}</h3>
      <p className="text-lg text-black/60 leading-relaxed font-sans">{step.description}</p>

      <div className="mt-8 flex gap-2">
        {steps.map((_, i) => (
          <div
            key={`${step.key}-dot-${i}`}
            className={cn(
              'h-1.5 rounded-full transition-all duration-200',
              i === index ? 'w-8 bg-accent' : 'w-2 bg-black/10'
            )}
          />
        ))}
      </div>
    </>
  );

  const storyHeightVh = Math.max(320, steps.length * 70);

  return (
    <section className="relative bg-white border-b-2 border-black z-30">
      <div ref={containerRef} className="relative" style={{ height: `${storyHeightVh}vh`, position: 'relative' }}>
        <div ref={pinnedLayerRef} className="absolute inset-x-0 top-0 transform-gpu will-change-transform">
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
                    <div className="relative min-h-[84px]">
                      <div style={layerStyle(1 - mix, 0, -6 * mix)}>
                        <div className="text-2xl font-display font-bold uppercase tracking-tight">{fromStep.title}</div>
                        <div className="mt-2 font-mono text-sm text-black/80">{fromStep.description}</div>
                      </div>
                      {toIndex !== fromIndex && (
                        <div className="absolute inset-0 pointer-events-none" style={layerStyle(mix, 0, 6 * (1 - mix))}>
                          <div className="text-2xl font-display font-bold uppercase tracking-tight">{toStep.title}</div>
                          <div className="mt-2 font-mono text-sm text-black/80">{toStep.description}</div>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <Button size="sm" variant="outline" onClick={() => jumpToStep(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0}>
                        Anterior
                      </Button>
                      <div className="font-mono text-xs font-bold uppercase tracking-widest text-black/70">
                        {activeIndex + 1}/{steps.length}
                      </div>
                      <Button size="sm" onClick={() => jumpToStep(Math.min(maxStep, activeIndex + 1))} disabled={activeIndex === maxStep}>
                        Siguiente
                      </Button>
                    </div>

                    <div className="mt-6 relative min-h-[340px]">
                      <div style={layerStyle(1 - mix, 0, -8 * mix)}>
                        <StepPanel>{fromStep.screen}</StepPanel>
                      </div>
                      {toIndex !== fromIndex && (
                        <div className="absolute inset-0 pointer-events-none" style={layerStyle(mix, 0, 8 * (1 - mix))}>
                          <StepPanel>{toStep.screen}</StepPanel>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Desktop: single active step */}
                  <div className="hidden lg:block mt-10 pb-24">
                    <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 max-w-md min-h-[260px] relative overflow-hidden">
                      <div style={layerStyle(1 - mix, -12 * mix, 0)}>{renderDesktopStep(fromStep, fromIndex)}</div>
                      {toIndex !== fromIndex && (
                        <div className="absolute inset-0 p-8 pointer-events-none" style={layerStyle(mix, 12 * (1 - mix), 0)}>
                          {renderDesktopStep(toStep, toIndex)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Desktop: content panel */}
                <div className="hidden lg:flex lg:items-center lg:justify-center lg:self-center">
                  <div className="w-full max-w-lg min-h-[340px] relative">
                    <div style={layerStyle(1 - mix, 0, -10 * mix)}>
                      <StepPanel>{fromStep.screen}</StepPanel>
                    </div>
                    {toIndex !== fromIndex && (
                      <div className="absolute inset-0 pointer-events-none" style={layerStyle(mix, 0, 10 * (1 - mix))}>
                        <StepPanel>{toStep.screen}</StepPanel>
                      </div>
                    )}
                  </div>
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
