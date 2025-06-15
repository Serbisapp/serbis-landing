import React, { useRef, useState, useLayoutEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group, Vector3, PerspectiveCamera, Color, BufferGeometry, Float32BufferAttribute, PointsMaterial, AdditiveBlending, Points } from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileCarousel } from './MobileCarousel';

gsap.registerPlugin(ScrollTrigger);

// Optimized Camera Controller
const CameraController = ({ scrollProgress }: { scrollProgress: number }) => {
  useFrame(({ camera }) => {
    try {
      const perspectiveCamera = camera as PerspectiveCamera;
      
      // Simplified desktop camera movement
      const targetX = 3 - scrollProgress * 6;
      const targetY = 1.5; // Adjusted Y for better framing
      const targetZ = 7 + scrollProgress * 3; // Adjusted Z for better framing
      perspectiveCamera.position.lerp(new Vector3(targetX, targetY, targetZ), 0.08);
      perspectiveCamera.lookAt(0, 0, 0);
      const targetFov = 50 + scrollProgress * 20; // Adjusted FOV
      perspectiveCamera.fov += (targetFov - perspectiveCamera.fov) * 0.08;
      
      perspectiveCamera.updateProjectionMatrix();
    } catch (error) {
      console.log('Camera controller error:', error);
    }
  });
  
  return null;
};

// Desktop-only Phone Component
const Phone3D = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<Group>(null);
  
  // Load textures for desktop
  let taskTexture = null;
  let chatTexture = null;
  let statusTexture = null;
  
  try {
    taskTexture = useLoader(TextureLoader, '/lovable-uploads/bba53f7f-ee96-480d-ad5e-325e9823282b.png');
    chatTexture = useLoader(TextureLoader, '/lovable-uploads/8d11efbb-db2e-4ceb-9f8e-6bdf05247c33.png');
    statusTexture = useLoader(TextureLoader, '/lovable-uploads/98092611-df32-4c24-9a64-4a9a804d80dd.png');
  } catch (error) {
    console.log('Texture loading error:', error);
  }
  
  const frontTextures = [taskTexture, chatTexture, statusTexture];
  const currentSection = Math.floor(scrollProgress * 2.99);
  
  const rotationY = scrollProgress * 12.56; // Two full rotations
  const normalizedRotation = ((rotationY % 6.28) + 6.28) % 6.28;
  const isViewingBack = normalizedRotation > Math.PI / 2 && normalizedRotation < (3 * Math.PI) / 2;

  useFrame((state) => {
    try {
      if (groupRef.current) {
        const time = state.clock.elapsedTime;
        
        groupRef.current.rotation.y = rotationY;
        groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.08; // Subtle tilt
        groupRef.current.rotation.z = Math.cos(time * 0.2) * 0.04; // Subtle sway
        const scale = 2.8 + scrollProgress * 1; // Adjusted scale progression
        groupRef.current.scale.setScalar(scale);
        groupRef.current.position.set(0, 0, 0);
      }
    } catch (error) {
      console.log('Phone3D animation error:', error);
    }
  });

  // Screen dimensions (approx 9:19.5 aspect ratio like modern phones)
  const screenWidth = 1.0;
  const screenHeight = screenWidth * (19.5 / 9);
  const phoneWidth = screenWidth + 0.1;
  const phoneHeight = screenHeight + 0.1;
  const phoneDepth = 0.12;

  return (
    <group ref={groupRef}>
      {/* Phone body with rounded edges */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[phoneWidth, phoneHeight, phoneDepth]} />
        {/* Metallic-like material */}
        <meshStandardMaterial color="#4A4A4A" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Screen Bezel */}
      <mesh position={[0, 0, phoneDepth / 2 + 0.001]}>
        <planeGeometry args={[screenWidth + 0.02, screenHeight + 0.02]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Screen content */}
      {!isViewingBack && frontTextures[currentSection] && (
        <mesh position={[0, 0, phoneDepth / 2 + 0.002]}>
          <planeGeometry args={[screenWidth, screenHeight]} />
          <meshBasicMaterial 
            map={frontTextures[currentSection]}
          />
        </mesh>
      )}

      {/* Notch/Camera Island */}
      <mesh position={[0, screenHeight / 2 - 0.05, phoneDepth / 2 + 0.0015]}>
        <boxGeometry args={[0.25, 0.04, 0.01]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Side Buttons (example) */}
      <mesh position={[-phoneWidth / 2 - 0.01, 0.3, 0]}> 
        <boxGeometry args={[0.02, 0.2, 0.06]} />
        <meshStandardMaterial color="#303030" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[-phoneWidth / 2 - 0.01, 0.0, 0]}> 
        <boxGeometry args={[0.02, 0.12, 0.06]} />
        <meshStandardMaterial color="#303030" metalness={0.5} roughness={0.4} />
      </mesh>

    </group>
  );
};

// Starfield Component
const Starfield = () => {
  const starsRef = useRef<Points>(null!);
  const numStars = 5000;

  const positions = useMemo(() => {
    const pos = new Float32Array(numStars * 3);
    for (let i = 0; i < numStars; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return pos;
  }, [numStars]);

  const sizes = useMemo(() => {
    const s = new Float32Array(numStars);
    for (let i = 0; i < numStars; i++) {
      s[i] = Math.random() * 1.5 + 0.5; // Star sizes
    }
    return s;
  }, [numStars]);

  const colors = useMemo(() => {
    const c = new Float32Array(numStars * 3);
    const baseColor = new Color(0.6, 0.7, 1.0); // Bluish white
    for (let i = 0; i < numStars; i++) {
      const intensity = Math.random() * 0.5 + 0.5;
      c[i * 3] = baseColor.r * intensity;
      c[i * 3 + 1] = baseColor.g * intensity;
      c[i * 3 + 2] = baseColor.b * intensity;
    }
    return c;
  }, [numStars]);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
      starsRef.current.rotation.x += 0.0001;
      // Add subtle twinkle effect by modulating opacity or color over time if desired
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          normalized
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.1} // Base size, will be multiplied by attribute
        sizeAttenuation
        vertexColors
        blending={AdditiveBlending}
        transparent
        opacity={0.8}
        depthWrite={false} // Important for blending
      />
    </points>
  );
};

// Desktop-only Scene
const Scene3D = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <>
      <CameraController scrollProgress={scrollProgress} />
      <ambientLight intensity={0.6} /> {/* Slightly increased ambient light */}
      <directionalLight 
        position={[8, 10, 8]} // Adjusted position for better highlights
        intensity={1.0} // Increased intensity
        castShadow
        shadow-mapSize-width={512} // Increased shadow map for better quality
        shadow-mapSize-height={512}
      />
      <pointLight 
        position={[-8, 5, -5]} // Adjusted position
        intensity={0.5} 
        color="#10b981"
      />
      <pointLight 
        position={[8, -5, 5]} // Adjusted position
        intensity={0.5} 
        color="#3b82f6"
      />
      <Phone3D scrollProgress={scrollProgress} />
      <Starfield />
    </>
  );
};

export const HorizontalScroll3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const mobile = useIsMobile();

  console.log('HorizontalScroll3D rendering, mobile:', mobile);

  const sections = [
    {
      title: "Explorá el Home",
      subtitle: "Describí tu necesidad y te conectamos con un profesional verificado en segundos. Simple, rápido y con ratings de tu comunidad.",
      feature: "Conexión en 5 segundos",
      color: "emerald",
      image: "/lovable-uploads/bba53f7f-ee96-480d-ad5e-325e9823282b.png"
    },
    {
      title: "Comunicación Segura y Directa", 
      subtitle: "Coordiná todo por nuestro chat integrado: detalles, imágenes y precios. Comunicación directa, privada y segura.",
      feature: "Chat Integrado y Privado",
      color: "blue",
      image: "/lovable-uploads/8d11efbb-db2e-4ceb-9f8e-6bdf05247c33.png"
    },
    {
      title: "Seguí el Estado de tus Pedidos",
      subtitle: "Seguí el progreso de tu servicio en tiempo real con notificaciones instantáneas. Control total, desde tu celular.", 
      feature: "Status en Tiempo Real",
      color: "purple",
      image: "/lovable-uploads/98092611-df32-4c24-9a64-4a9a804d80dd.png"
    }
  ];

  // Use useLayoutEffect with GSAP context for robust setup and cleanup.
  // This hook is now called unconditionally to comply with the Rules of Hooks.
  // The logic inside is conditional based on the `mobile` state.
  useLayoutEffect(() => {
    // Only run the effect on desktop when refs are available.
    if (mobile !== false || !containerRef.current || !scrollContentRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const container = containerRef.current!;
      const scrollContent = scrollContentRef.current!;
      
      const totalWidth = scrollContent.scrollWidth;
      const viewportWidth = container.offsetWidth;
      const scrollDistance = totalWidth - viewportWidth;

      if (scrollDistance <= 0) return;

      const scrollMultiplier = 2;
      const scrubValue = 2;

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${scrollDistance * scrollMultiplier}`,
        scrub: scrubValue,
        pin: true,
        anticipatePin: 1,
        animation: gsap.to(scrollContent, {
          x: -scrollDistance,
          ease: "none",
        }),
        onUpdate: (self) => {
          const smoothProgress = gsap.utils.clamp(0, 1, self.progress);
          setScrollProgress(smoothProgress);
        },
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP animations and ScrollTriggers
  }, [mobile]); // Dependency on `mobile` ensures this effect re-evaluates on change.

  // Wait until mobile status is determined to prevent flash of incorrect content
  if (mobile === undefined) {
    return <div className="h-screen bg-slate-900" />;
  }

  // Early return for mobile - NO Canvas rendering at all
  if (mobile) {
    console.log('Rendering mobile carousel, currentSection:', currentSection);
    return <MobileCarousel sections={sections} currentSection={currentSection} setCurrentSection={setCurrentSection} />;
  }

  // Desktop version only
  const desktopCurrentSection = Math.floor(scrollProgress * 2.99);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* 3D Canvas Background - Desktop Only */}
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
