
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Group } from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextureLoader } from 'three';

gsap.registerPlugin(ScrollTrigger);

// Flying Elements Component
const FlyingElements = () => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Reduced rotation speed from 0.1 to 0.03
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      // Reduced oscillation speed from 0.05 to 0.02
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  const elements = Array.from({ length: 12 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15 - 5
    ] as [number, number, number],
    color: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'][Math.floor(Math.random() * 4)],
    scale: Math.random() * 0.3 + 0.1,
    // Reduced rotation speed from 0.02 to 0.008
    rotationSpeed: (Math.random() - 0.5) * 0.008,
  }));

  return (
    <group ref={groupRef}>
      {elements.map((el, i) => (
        <mesh key={i} position={el.position} scale={el.scale}>
          {Math.random() > 0.5 ? (
            <boxGeometry args={[0.5, 0.5, 0.5]} />
          ) : (
            <sphereGeometry args={[0.3, 8, 8]} />
          )}
          <meshStandardMaterial 
            color={el.color} 
            transparent 
            opacity={0.4}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// Realistic Phone 3D Model Component
const RealisticPhone3D = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<Group>(null);
  
  // Load real images for the phone screen
  const profileTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=800&fit=crop');
  const dashboardTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=800&fit=crop');
  const codeTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=800&fit=crop');
  
  // Calculate which rotation we're on (0, 1, or 2)
  const currentRotation = Math.floor(scrollProgress * 3);
  const textures = [profileTexture, dashboardTexture, codeTexture];
  
  useFrame(() => {
    if (groupRef.current) {
      // 3 full rotations (3 * 2π)
      groupRef.current.rotation.y = scrollProgress * Math.PI * 6;
      // Reduced floating animation speed and amplitude
      groupRef.current.position.y = Math.sin(scrollProgress * Math.PI * 2) * 0.05;
      groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.02;
    }
  });

  return (
    <group ref={groupRef} scale={2.5}>
      {/* Phone body - lighter color for better visibility */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 2.6, 0.15]} />
        <meshStandardMaterial 
          color="#6b7280" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Phone screen bezel */}
      <mesh position={[0, 0, 0.076]} castShadow>
        <boxGeometry args={[1.15, 2.55, 0.01]} />
        <meshStandardMaterial 
          color="#374151" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Main screen with real image */}
      <mesh position={[0, 0.05, 0.082]}>
        <planeGeometry args={[1.1, 2.4]} />
        <meshStandardMaterial 
          map={textures[currentRotation] || textures[0]}
          transparent={false}
        />
      </mesh>
      
      {/* Status bar overlay */}
      <mesh position={[0, 1.15, 0.083]}>
        <planeGeometry args={[1.08, 0.12]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.7} />
      </mesh>
      
      {/* Camera notch */}
      <mesh position={[0, 1.25, 0.083]}>
        <boxGeometry args={[0.25, 0.08, 0.02]} />
        <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Volume buttons */}
      <mesh position={[-0.61, 0.4, 0]} castShadow>
        <boxGeometry args={[0.02, 0.12, 0.03]} />
        <meshStandardMaterial color="#6b7280" metalness={0.7} roughness={0.3} />
      </mesh>
      
      <mesh position={[-0.61, 0.15, 0]} castShadow>
        <boxGeometry args={[0.02, 0.25, 0.03]} />
        <meshStandardMaterial color="#6b7280" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Power button */}
      <mesh position={[0.61, 0.4, 0]} castShadow>
        <boxGeometry args={[0.02, 0.15, 0.03]} />
        <meshStandardMaterial color="#6b7280" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Lightning port */}
      <mesh position={[0, -1.28, 0]} castShadow>
        <boxGeometry args={[0.15, 0.03, 0.08]} />
        <meshStandardMaterial color="#4b5563" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Speaker grilles */}
      {[-0.3, -0.15, 0, 0.15, 0.3].map((x, i) => (
        <mesh key={i} position={[x, -1.28, 0.02]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.06, 8]} />
          <meshStandardMaterial color="#4b5563" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      
      {/* Camera lens */}
      <mesh position={[-0.35, 1.05, 0.083]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Camera glass */}
      <mesh position={[-0.35, 1.05, 0.094]}>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
        <meshStandardMaterial color="#000033" transparent opacity={0.9} />
      </mesh>
    </group>
  );
};

// 3D Scene with Realistic Phone and Flying Elements
const Scene3D = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.8} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#4facfe" />
      <pointLight position={[10, -10, 5]} intensity={0.6} color="#00f2fe" />
      <spotLight 
        position={[0, 20, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1.2} 
        castShadow 
      />
      
      <FlyingElements />
      <RealisticPhone3D scrollProgress={scrollProgress} />
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
    
    // Set up horizontal scrolling
    const totalWidth = scrollContent.scrollWidth;
    const viewportWidth = container.offsetWidth;
    const scrollDistance = totalWidth - viewportWidth;

    gsap.to(scrollContent, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Calculate current rotation phase
  const currentRotation = Math.floor(scrollProgress * 3);

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

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'emerald': return 'from-emerald-500 to-emerald-400';
      case 'blue': return 'from-blue-500 to-blue-400';
      case 'purple': return 'from-purple-500 to-purple-400';
      default: return 'from-emerald-500 to-blue-400';
    }
  };

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
      {/* Fixed 3D Canvas Background with Phone */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ 
            alpha: true, 
            antialias: true
          }}
          shadows
          onCreated={({ gl }) => {
            gl.setClearColor(0x475569, 1);
            gl.shadowMap.enabled = true;
          }}
        >
          <Scene3D scrollProgress={scrollProgress} />
        </Canvas>
      </div>
      
      {/* Scrolling Content */}
      <div ref={scrollContentRef} className="relative z-10 flex h-full">
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-screen h-full flex items-center justify-end relative pr-32"
          >
            {/* Content positioned to the right, away from phone */}
            <div className="text-right relative z-20 max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black mb-4 text-white">
                {section.title}
              </h2>
              <p className="text-lg md:text-xl text-slate-200 mb-6">
                {section.subtitle}
              </p>
              
              {/* Clean feature highlight */}
              <div className={`inline-block bg-gradient-to-r ${getColorClasses(section.color)}/20 rounded-lg px-6 py-3 backdrop-blur-sm border border-${section.color}-500/30`}>
                <span className={`text-${section.color}-400 font-semibold tracking-wider text-sm`}>
                  {section.feature}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Simple Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {sections.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentRotation ? 'bg-emerald-400 scale-150' : 'bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
