import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group, Vector3, PerspectiveCamera } from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

// Optimized Camera Controller
const CameraController = ({ scrollProgress }: { scrollProgress: number }) => {
  useFrame(({ camera }) => {
    const perspectiveCamera = camera as PerspectiveCamera;
    
    // Simplified camera movement calculations
    const targetX = Math.sin(scrollProgress * 9.42) * 5; // Pre-calculated PI * 3
    const targetY = 2 + Math.sin(scrollProgress * 6.28) * 2; // Pre-calculated PI * 2
    const targetZ = 8 + scrollProgress * 6;
    
    // Smooth interpolation
    perspectiveCamera.position.lerp(new Vector3(targetX, targetY, targetZ), 0.08);
    perspectiveCamera.lookAt(0, 0, 0);
    
    // Simplified FOV changes
    const targetFov = 45 + scrollProgress * 40;
    perspectiveCamera.fov += (targetFov - perspectiveCamera.fov) * 0.08;
    perspectiveCamera.updateProjectionMatrix();
  });
  
  return null;
};

// Optimized Phone Component
const Phone3D = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<Group>(null);
  
  // Load screen textures for front only
  const profileTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=800&fit=crop');
  const dashboardTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=800&fit=crop');
  const codeTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=800&fit=crop');
  
  const frontTextures = [profileTexture, dashboardTexture, codeTexture];
  const currentSection = Math.floor(scrollProgress * 2.99);
  
  // Simplified rotation calculation
  const rotationY = scrollProgress * 12.56; // Pre-calculated PI * 4
  const normalizedRotation = ((rotationY % 6.28) + 6.28) % 6.28; // Pre-calculated PI * 2
  const isViewingBack = normalizedRotation > 1.57 && normalizedRotation < 4.71; // Pre-calculated PI/2 and 3*PI/2

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Optimized rotation with pre-calculated values
      groupRef.current.rotation.y = rotationY;
      groupRef.current.rotation.x = Math.sin(time * 0.8) * 0.2;
      groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.1;
      
      // Simplified scale and position
      const scale = 2.5 + scrollProgress * 1.2;
      groupRef.current.scale.setScalar(scale);
      
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.5;
      groupRef.current.position.x = Math.cos(scrollProgress * 6.28) * 1.2; // Pre-calculated PI * 2
      groupRef.current.position.z = Math.sin(scrollProgress * 3.14) * 0.8; // Pre-calculated PI
    }
  });

  return (
    <group ref={groupRef}>
      {/* Phone body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 2.6, 0.15]} />
        <meshStandardMaterial 
          color="#e5e7eb" 
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>
      
      {/* Screen bezel */}
      <mesh position={[0, 0, 0.076]}>
        <boxGeometry args={[1.15, 2.55, 0.01]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      
      {/* Screen content - only show on front */}
      {!isViewingBack && (
        <mesh position={[0, 0.05, 0.082]}>
          <planeGeometry args={[1.1, 2.4]} />
          <meshStandardMaterial 
            map={frontTextures[currentSection] || frontTextures[0]}
            emissive="#ffffff"
            emissiveIntensity={0.1}
          />
        </mesh>
      )}
    </group>
  );
};

// Simplified Particle System (reduced from 8 to 4 particles)
const ParticleSystem = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.2 + scrollProgress * 3.14; // Pre-calculated PI
    }
  });

  // Reduced particles for better mobile performance
  const particles = Array.from({ length: 4 }, (_, i) => {
    const angle = (i / 4) * 6.28; // Pre-calculated PI * 2
    const radius = 3 + (i % 2) * 0.5;
    
    return {
      position: [
        Math.cos(angle) * radius,
        Math.sin(angle * 0.5) * 1,
        Math.sin(angle) * radius * 0.3
      ] as [number, number, number],
      color: i % 2 === 0 ? '#10b981' : '#3b82f6',
      scale: 0.05 + (i % 3) * 0.02
    };
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[0.2, 6, 6]} />
          <meshStandardMaterial 
            color={particle.color} 
            transparent 
            opacity={0.6}
            emissive={particle.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

// Clean Lighting Setup
const SceneLighting = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8} 
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
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

// Simplified Background Grid (reduced complexity)
const BackgroundGrid = ({ scrollProgress }: { scrollProgress: number }) => {
  const gridRef = useRef<Group>(null);
  
  useFrame(() => {
    if (gridRef.current) {
      gridRef.current.position.z = -10 + scrollProgress * 2;
      gridRef.current.rotation.y = scrollProgress * 0.1;
    }
  });

  const gridLines = [];
  // Reduced grid lines from 11x11 to 7x7 for better performance
  for (let i = -3; i <= 3; i++) {
    // Vertical lines
    gridLines.push(
      <mesh key={`v${i}`} position={[i * 2, 0, -10]}>
        <boxGeometry args={[0.02, 14, 0.02]} />
        <meshStandardMaterial 
          color="#475569" 
          transparent 
          opacity={0.1}
        />
      </mesh>
    );
    // Horizontal lines
    gridLines.push(
      <mesh key={`h${i}`} position={[0, i * 2, -10]} rotation={[0, 0, 1.57]}>
        <boxGeometry args={[0.02, 14, 0.02]} />
        <meshStandardMaterial 
          color="#475569" 
          transparent 
          opacity={0.1}
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

  useEffect(() => {
    if (!containerRef.current || !scrollContentRef.current) return;

    const container = containerRef.current;
    const scrollContent = scrollContentRef.current;
    
    const totalWidth = scrollContent.scrollWidth;
    const viewportWidth = container.offsetWidth;
    const scrollDistance = totalWidth - viewportWidth;

    // Create the main scroll animation with controlled speed
    gsap.to(scrollContent, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollDistance * 2}`, // Double the scroll distance to make it slower
        scrub: 2, // Increased scrub value for smoother, slower scrolling
        pin: true,
        anticipatePin: 1,
        refreshPriority: -1, // Lower priority to prevent conflicts
        onUpdate: (self) => {
          // Smooth the progress updates to prevent jerky animations
          const smoothProgress = gsap.utils.clamp(0, 1, self.progress);
          setScrollProgress(smoothProgress);
        },
        // Add scroll resistance for mobile
        onRefresh: () => {
          ScrollTrigger.refresh();
        }
      }
    });

    // Add scroll momentum dampening for smoother experience
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      document.body.style.pointerEvents = 'none';
      
      scrollTimeout = setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

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
      {/* 3D Canvas Background with mobile optimizations */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 60 }}
          shadows
          gl={{ 
            antialias: false, // Disabled for mobile performance
            powerPreference: "high-performance"
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x0f172a, 1);
            // Set pixel ratio manually for better mobile performance
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }}
          performance={{ min: 0.5 }} // Allow lower framerates on mobile
        >
          <Scene3D scrollProgress={scrollProgress} />
        </Canvas>
      </div>
      
      {/* Content */}
      <div ref={scrollContentRef} className="relative z-10 flex h-full">
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-screen h-full flex items-center justify-end pr-32"
          >
            <div className="text-right max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black mb-4 text-white">
                {section.title}
              </h2>
              <p className="text-lg md:text-xl text-slate-200 mb-6">
                {section.subtitle}
              </p>
              
              <div className={`inline-block bg-gradient-to-r from-${section.color}-500/20 to-${section.color}-400/20 rounded-lg px-6 py-3 backdrop-blur-sm border border-${section.color}-500/30`}>
                <span className={`text-${section.color}-400 font-semibold text-sm`}>
                  {section.feature}
                </span>
              </div>
            </div>
          </div>
        ))}
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
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/60 text-sm z-30">
        <div className="flex items-center space-x-2">
          <span>Scroll slowly for best experience</span>
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
