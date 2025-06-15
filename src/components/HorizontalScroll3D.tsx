
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group, Vector3, PerspectiveCamera } from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

// Mobile detection utility
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         window.innerWidth < 768;
};

// Optimized Camera Controller
const CameraController = ({ scrollProgress }: { scrollProgress: number }) => {
  const mobile = isMobile();
  
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
  const mobile = isMobile();
  
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
  const mobile = isMobile();
  
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
  const mobile = isMobile();
  
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
  const mobile = isMobile();
  
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

export const HorizontalScroll3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mobile = isMobile();

  useEffect(() => {
    if (!containerRef.current || !scrollContentRef.current) return;

    const container = containerRef.current;
    const scrollContent = scrollContentRef.current;
    
    const totalWidth = scrollContent.scrollWidth;
    const viewportWidth = container.offsetWidth;
    const scrollDistance = totalWidth - viewportWidth;

    // Faster scroll animation for mobile
    const scrollMultiplier = mobile ? 1.5 : 2;
    const scrubValue = mobile ? 1 : 2;

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

    // Simplified scroll handling for mobile
    if (!mobile) {
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
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mobile]);

  const sections = [
    {
      title: "Conectá con Profesionales",
      subtitle: "Miles de expertos verificados esperándote",
      feature: "Perfiles Completamente Verificados",
      color: "emerald"
    },
    {
      title: "IA que Entiende", 
      subtitle: "Algoritmos inteligentes para matches perfectos",
      feature: "Matching Inteligente Avanzado",
      color: "blue"
    },
    {
      title: "Pagos Seguros",
      subtitle: "Transacciones protegidas y garantizadas", 
      feature: "Sistema de Pagos Protegido",
      color: "purple"
    }
  ];

  const currentSection = Math.floor(scrollProgress * 2.99);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* 3D Canvas Background with aggressive mobile optimizations */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: mobile ? 50 : 60 }}
          shadows={!mobile}
          gl={{ 
            antialias: false,
            powerPreference: mobile ? "low-power" : "high-performance",
            alpha: false,
            depth: !mobile,
            stencil: false,
            preserveDrawingBuffer: false
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x0f172a, 1);
            gl.setPixelRatio(mobile ? 1 : Math.min(window.devicePixelRatio, 2));
            if (mobile) {
              gl.shadowMap.enabled = false;
            }
          }}
          performance={{ min: mobile ? 0.2 : 0.5 }}
          frameloop={mobile ? "demand" : "always"}
          dpr={mobile ? 1 : [1, 2]}
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
              i === currentSection 
                ? 'bg-emerald-400 scale-150' 
                : 'bg-slate-400'
            }`}
          />
        ))}
      </div>
      
      {/* Scroll Indicator - Hidden on mobile, translated to Spanish */}
      {!mobile && (
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
      )}
    </div>
  );
};
