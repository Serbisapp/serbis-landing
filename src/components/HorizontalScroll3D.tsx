
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group, Vector3, PerspectiveCamera } from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Optimized Camera Controller
const CameraController = ({ scrollProgress }: { scrollProgress: number }) => {
  const mobile = useIsMobile();
  
  useFrame(({ camera }) => {
    const perspectiveCamera = camera as PerspectiveCamera;
    
    if (mobile) {
      // Simplified mobile camera movement
      perspectiveCamera.position.lerp(new Vector3(0, 2, 8 + scrollProgress * 3), 0.05);
      perspectiveCamera.lookAt(0, 0, 0);
      const targetFov = 50 + scrollProgress * 20;
      perspectiveCamera.fov += (targetFov - perspectiveCamera.fov) * 0.05;
    } else {
      // Smoother, predictable desktop camera movement
      const targetX = 3 - scrollProgress * 6; // Moves from x=3 to x=-3
      const targetY = 2; // Stable Y
      const targetZ = 8 + scrollProgress * 4; // Moves closer
      perspectiveCamera.position.lerp(new Vector3(targetX, targetY, targetZ), 0.08);
      perspectiveCamera.lookAt(0, 0, 0);
      const targetFov = 45 + scrollProgress * 30;
      perspectiveCamera.fov += (targetFov - perspectiveCamera.fov) * 0.08;
    }
    
    perspectiveCamera.updateProjectionMatrix();
  });
  
  return null;
};

// Ultra-optimized Phone Component for Mobile
const Phone3D = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<Group>(null);
  const mobile = useIsMobile();
  
  // Load the app screenshots for the phone display
  const taskTexture = !mobile ? useLoader(TextureLoader, '/lovable-uploads/bba53f7f-ee96-480d-ad5e-325e9823282b.png') : null;
  const chatTexture = !mobile ? useLoader(TextureLoader, '/lovable-uploads/8d11efbb-db2e-4ceb-9f8e-6bdf05247c33.png') : null;
  const statusTexture = !mobile ? useLoader(TextureLoader, '/lovable-uploads/98092611-df32-4c24-9a64-4a9a804d80dd.png') : null;
  
  const frontTextures = mobile ? [] : [taskTexture, chatTexture, statusTexture];
  const currentSection = Math.floor(scrollProgress * 2.99);
  
  const rotationY = scrollProgress * (mobile ? 6.28 : 12.56); // Reduced rotation on mobile
  const normalizedRotation = ((rotationY % 6.28) + 6.28) % 6.28;
  const isViewingBack = normalizedRotation > 1.57 && normalizedRotation < 4.71;

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      if (mobile) {
        // Minimal mobile animations
        groupRef.current.rotation.y = rotationY;
        groupRef.current.scale.setScalar(2);
        groupRef.current.position.set(0, 0, 0);
      } else {
        // Simplified, predictable desktop animations
        groupRef.current.rotation.y = rotationY;
        groupRef.current.rotation.x = Math.sin(time * 0.4) * 0.1; // Slower, calmer rotation
        groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.05;
        const scale = 2.5 + scrollProgress * 1.2;
        groupRef.current.scale.setScalar(scale);
        // Phone stays at origin, camera does the movement
        groupRef.current.position.set(0, 0, 0);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Phone body - changed to darker grey */}
      <mesh castShadow={!mobile} receiveShadow={!mobile}>
        <boxGeometry args={mobile ? [1.2, 2.6, 0.1] : [1.2, 2.6, 0.15]} />
        <meshBasicMaterial color="#374151" />
      </mesh>
      
      {/* Screen bezel */}
      <mesh position={[0, 0, mobile ? 0.051 : 0.076]}>
        <boxGeometry args={mobile ? [1.15, 2.55, 0.005] : [1.15, 2.55, 0.01]} />
        <meshBasicMaterial color="#111827" />
      </mesh>
      
      {/* Screen content - simplified for mobile */}
      {!isViewingBack && (
        <mesh position={[0, 0.05, mobile ? 0.053 : 0.082]}>
          <planeGeometry args={[1.1, 2.4]} />
          <meshBasicMaterial 
            color={mobile ? "#3b82f6" : undefined}
            map={!mobile && frontTextures[currentSection] ? frontTextures[currentSection] : undefined}
          />
        </mesh>
      )}
    </group>
  );
};

// Mobile-optimized Particle System
const ParticleSystem = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<Group>(null);
  const mobile = useIsMobile();
  
  // Skip particles entirely on mobile
  if (mobile) return null;
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.1 + scrollProgress * 1.57;
    }
  });

  // Reduced particles for desktop
  const particles = Array.from({ length: 2 }, (_, i) => {
    const angle = (i / 2) * 6.28;
    const radius = 3;
    
    return {
      position: [
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius * 0.3
      ] as [number, number, number],
      color: i % 2 === 0 ? '#10b981' : '#3b82f6',
      scale: 0.03
    };
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[0.2, 4, 4]} />
          <meshBasicMaterial 
            color={particle.color} 
            transparent 
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

// Mobile-optimized Lighting
const SceneLighting = () => {
  const mobile = useIsMobile();
  
  if (mobile) {
    // Minimal lighting for mobile
    return <ambientLight intensity={0.8} />;
  }
  
  // Full lighting for desktop
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8} 
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
      <pointLight 
        position={[-5, 3, -2]} 
        intensity={0.3} 
        color="#10b981"
      />
      <pointLight 
        position={[5, -3, 2]} 
        intensity={0.3} 
        color="#3b82f6"
      />
    </>
  );
};

// Mobile-optimized Background Grid
const BackgroundGrid = ({ scrollProgress }: { scrollProgress: number }) => {
  const gridRef = useRef<Group>(null);
  const mobile = useIsMobile();
  
  // Skip background entirely on mobile
  if (mobile) return null;
  
  useFrame(() => {
    if (gridRef.current) {
      gridRef.current.position.z = -10 + scrollProgress * 2;
      gridRef.current.rotation.y = scrollProgress * 0.05;
    }
  });

  // Minimal grid for desktop
  const gridLines = [];
  for (let i = -2; i <= 2; i++) {
    gridLines.push(
      <mesh key={`v${i}`} position={[i * 3, 0, -10]}>
        <boxGeometry args={[0.01, 10, 0.01]} />
        <meshBasicMaterial 
          color="#475569" 
          transparent 
          opacity={0.05}
        />
      </mesh>
    );
  }

  return (
    <group ref={gridRef}>
      {gridLines}
    </group>
  );
};

// Main 3D Scene
const Scene3D = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <>
      <CameraController scrollProgress={scrollProgress} />
      <SceneLighting />
      <BackgroundGrid scrollProgress={scrollProgress} />
      <ParticleSystem scrollProgress={scrollProgress} />
      <Phone3D scrollProgress={scrollProgress} />
    </>
  );
};

// Mobile Touch Carousel Component
const MobileCarousel = ({ sections, currentSection, setCurrentSection }: {
  sections: Array<{
    title: string;
    subtitle: string;
    feature: string;
    color: string;
  }>;
  currentSection: number;
  setCurrentSection: (index: number) => void;
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
    if (isRightSwipe && currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-950">
      {/* 3D Background - Simplified for mobile */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ 
            antialias: false,
            powerPreference: "low-power",
            alpha: false,
            depth: false,
            stencil: false,
            preserveDrawingBuffer: false
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x0f172a, 1);
            gl.setPixelRatio(1);
          }}
          performance={{ min: 0.2 }}
          frameloop="demand"
          dpr={1}
        >
          <Scene3D scrollProgress={currentSection / (sections.length - 1)} />
        </Canvas>
      </div>

      {/* Mobile Content */}
      <div 
        className="absolute inset-0 z-10 flex items-center justify-center p-4"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="w-full max-w-sm">
          <div className="bg-slate-900/90 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 text-center">
            <h2 className="text-2xl font-black mb-4 text-white">
              {sections[currentSection].title}
            </h2>
            <p className="text-sm text-slate-200 mb-6">
              {sections[currentSection].subtitle}
            </p>
            
            <div className={`inline-block bg-gradient-to-r from-${sections[currentSection].color}-500/20 to-${sections[currentSection].color}-400/20 rounded-lg px-4 py-2 backdrop-blur-sm border border-${sections[currentSection].color}-500/30`}>
              <span className={`text-${sections[currentSection].color}-400 font-semibold text-sm`}>
                {sections[currentSection].feature}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/80 border-slate-600 hover:bg-slate-800"
        onClick={prevSection}
        disabled={currentSection === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/80 border-slate-600 hover:bg-slate-800"
        onClick={nextSection}
        disabled={currentSection === sections.length - 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Progress Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {sections.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === currentSection 
                ? 'bg-emerald-400 scale-150' 
                : 'bg-slate-400'
            }`}
            onClick={() => setCurrentSection(i)}
          />
        ))}
      </div>

      {/* Swipe Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/60 text-sm z-30">
        <span>Desliza o toca las flechas para navegar</span>
      </div>
    </div>
  );
};

export const HorizontalScroll3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const mobile = useIsMobile();

  const sections = [
    {
      title: "Explorá el Home",
      subtitle: "Describí tu necesidad y te conectamos con un profesional verificado en segundos. Simple, rápido y con ratings de tu comunidad.",
      feature: "Conexión en 5 segundos",
      color: "emerald"
    },
    {
      title: "Comunicación Segura y Directa", 
      subtitle: "Coordiná todo por nuestro chat integrado: detalles, imágenes y precios. Comunicación directa, privada y segura.",
      feature: "Chat Integrado y Privado",
      color: "blue"
    },
    {
      title: "Seguí el Estado de tus Pedidos",
      subtitle: "Seguí el progreso de tu servicio en tiempo real con notificaciones instantáneas. Control total, desde tu celular.", 
      feature: "Status en Tiempo Real",
      color: "purple"
    }
  ];

  // Desktop scroll effect
  useEffect(() => {
    if (mobile || !containerRef.current || !scrollContentRef.current) return;

    const container = containerRef.current;
    const scrollContent = scrollContentRef.current;
    
    const totalWidth = scrollContent.scrollWidth;
    const viewportWidth = container.offsetWidth;
    const scrollDistance = totalWidth - viewportWidth;

    const scrollMultiplier = 2;
    const scrubValue = 2;

    gsap.to(scrollContent, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollDistance * scrollMultiplier}`,
        scrub: scrubValue,
        pin: true,
        anticipatePin: 1,
        refreshPriority: -1,
        onUpdate: (self) => {
          const smoothProgress = gsap.utils.clamp(0, 1, self.progress);
          setScrollProgress(smoothProgress);
        }
      }
    });

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      document.body.style.pointerEvents = 'none';
      
      scrollTimeout = setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [mobile]);

  // Mobile version
  if (mobile) {
    return <MobileCarousel sections={sections} currentSection={currentSection} setCurrentSection={setCurrentSection} />;
  }

  // Desktop version
  const desktopCurrentSection = Math.floor(scrollProgress * 2.99);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 60 }}
          shadows
          gl={{ 
            antialias: false,
            powerPreference: "high-performance",
            alpha: false,
            depth: true,
            stencil: false,
            preserveDrawingBuffer: false
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x0f172a, 1);
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }}
          performance={{ min: 0.5 }}
          frameloop="always"
          dpr={[1, 2]}
        >
          <Scene3D scrollProgress={scrollProgress} />
        </Canvas>
      </div>
      
      {/* This invisible div drives the scroll animation's progress. */}
      <div ref={scrollContentRef} className="absolute h-full">
        <div style={{ width: `${sections.length * 100}vw`, height: '1px' }} />
      </div>
      
      {/* Content - Absolutely positioned and fades in/out */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {sections.map((section, index) => {
          const sectionMiddle = (index + 0.5) / sections.length;
          const distance = Math.abs(scrollProgress - sectionMiddle);
          const halfSection = 0.5 / sections.length;
          const opacity = gsap.utils.clamp(0, 1, (halfSection - distance) / (halfSection * 0.5));

          let positionClasses: string;
          
          if (index === 2) {
            // Section 2 on the left, as the phone model moves to the right
            positionClasses = 'absolute inset-y-0 left-0 w-1/2 flex justify-center items-center';
          } else {
            // Section 0 and 1 on the right, as phone is on left or center
            positionClasses = 'absolute inset-y-0 right-0 w-1/2 flex justify-center items-center';
          }
          
          return (
            <div
              key={index}
              className={`${positionClasses} p-8 md:p-16`}
              style={{ opacity, pointerEvents: opacity > 0 ? 'auto' : 'none' }}
            >
              <div
                className="bg-slate-900/80 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-slate-700/50 max-w-lg text-left"
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 text-white">
                  {section.title}
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-slate-200 mb-6">
                  {section.subtitle}
                </p>
                
                <div className={`inline-block bg-gradient-to-r from-${section.color}-500/20 to-${section.color}-400/20 rounded-lg px-3 md:px-4 py-2 backdrop-blur-sm border border-${section.color}-500/30`}>
                  <span className={`text-${section.color}-400 font-semibold text-xs md:text-sm`}>
                    {section.feature}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {sections.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === desktopCurrentSection 
                ? 'bg-emerald-400 scale-150' 
                : 'bg-slate-400'
            }`}
          />
        ))}
      </div>
      
      {/* Scroll Indicator - Desktop only */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/60 text-sm z-30">
        <div className="flex items-center space-x-2">
          <span>Desplázate lentamente para mejor experiencia</span>
          <div className="w-1 h-6 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="w-full bg-emerald-400 rounded-full transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
