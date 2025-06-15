
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Group } from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextureLoader } from 'three';

gsap.registerPlugin(ScrollTrigger);

// Grid Background Component
const GridBackground = ({ scrollProgress }: { scrollProgress: number }) => {
  const gridRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      // Subtle movement with scroll
      gridRef.current.position.z = -20 + scrollProgress * 3;
      gridRef.current.rotation.y = scrollProgress * Math.PI * 0.05;
      // Very gentle floating animation
      gridRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  // Create grid lines - more subtle
  const gridLines = [];
  const gridSize = 15;
  const divisions = 15;
  
  for (let i = 0; i <= divisions; i++) {
    const position = (i / divisions - 0.5) * gridSize;
    // Vertical lines
    gridLines.push(
      <mesh key={`v${i}`} position={[position, 0, -20]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.01, gridSize, 0.01]} />
        <meshStandardMaterial 
          color="#334155" 
          transparent 
          opacity={0.08}
          emissive="#334155"
          emissiveIntensity={0.05}
        />
      </mesh>
    );
    // Horizontal lines
    gridLines.push(
      <mesh key={`h${i}`} position={[0, position, -20]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.01, gridSize, 0.01]} />
        <meshStandardMaterial 
          color="#334155" 
          transparent 
          opacity={0.08}
          emissive="#334155"
          emissiveIntensity={0.05}
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

// Simplified Small Particles Component - much closer to phone
const SmallParticles = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Very slow rotation around the phone
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05 + scrollProgress * Math.PI;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.05;
    }
  });

  // Only 4 small particles, very close to the phone
  const particles = Array.from({ length: 4 }, (_, i) => {
    const angle = (i / 4) * Math.PI * 2;
    const radius = 1.8; // Much closer to phone
    return {
      position: [
        Math.cos(angle) * radius,
        Math.sin(angle * 0.3) * 0.8,
        Math.sin(angle) * radius * 0.5
      ] as [number, number, number],
      color: ['#10b981', '#3b82f6'][i % 2],
      scale: 0.05,
    };
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[0.15, 6, 6]} />
          <meshStandardMaterial 
            color={particle.color} 
            transparent 
            opacity={0.4}
            metalness={0.2}
            roughness={0.6}
            emissive={particle.color}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

// Simplified Flying Elements Component - fewer and smaller
const FlyingElements = () => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Very slow rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.05;
    }
  });

  // Only 6 elements instead of 12, smaller and further away
  const elements = Array.from({ length: 6 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 12 - 8
    ] as [number, number, number],
    color: ['#10b981', '#3b82f6'][Math.floor(Math.random() * 2)],
    scale: Math.random() * 0.15 + 0.05, // Much smaller
    rotationSpeed: (Math.random() - 0.5) * 0.003, // Much slower
  }));

  return (
    <group ref={groupRef}>
      {elements.map((el, i) => (
        <mesh key={i} position={el.position} scale={el.scale}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial 
            color={el.color} 
            transparent 
            opacity={0.25}
            metalness={0.3}
            roughness={0.5}
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

// 3D Scene with Realistic Phone and Simplified Elements
const Scene3D = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[8, 8, 5]} 
        intensity={1.2} 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-8, -8, -5]} intensity={0.4} color="#1e40af" />
      <pointLight position={[8, -8, 5]} intensity={0.3} color="#059669" />
      
      <GridBackground scrollProgress={scrollProgress} />
      <FlyingElements />
      <SmallParticles scrollProgress={scrollProgress} />
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
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
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
            gl.setClearColor(0x0f172a, 1); // Dark blue instead of black
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
            <div className="text-right relative z-20 max-w-xl transform transition-all duration-700 ease-out hover:scale-105">
              <h2 className="text-4xl md:text-6xl font-black mb-4 text-white animate-fade-in-up" 
                  style={{ animationDelay: `${index * 0.2}s` }}>
                {section.title}
              </h2>
              <p className="text-lg md:text-xl text-slate-200 mb-6 animate-fade-in-up" 
                 style={{ animationDelay: `${index * 0.2 + 0.1}s` }}>
                {section.subtitle}
              </p>
              
              {/* Clean feature highlight with enhanced animation */}
              <div className={`inline-block bg-gradient-to-r ${getColorClasses(section.color)}/20 rounded-lg px-6 py-3 backdrop-blur-sm border border-${section.color}-500/30 animate-fade-in-up hover:bg-gradient-to-r hover:${getColorClasses(section.color)}/30 transition-all duration-300 hover:shadow-lg hover:shadow-${section.color}-500/20`}
                   style={{ animationDelay: `${index * 0.2 + 0.2}s` }}>
                <span className={`text-${section.color}-400 font-semibold tracking-wider text-sm`}>
                  {section.feature}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Enhanced Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {sections.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ease-out ${
              i === currentRotation 
                ? 'bg-emerald-400 scale-150 shadow-lg shadow-emerald-400/50' 
                : 'bg-slate-400 hover:bg-slate-300 hover:scale-110'
            }`}
          />
        ))}
      </div>
      
      {/* Subtle animated background overlay */}
      <div className="absolute inset-0 pointer-events-none z-5 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-float" 
             style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-float" 
             style={{ animationDelay: '3s', animationDuration: '10s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-float" 
             style={{ animationDelay: '6s', animationDuration: '9s' }}></div>
      </div>
    </div>
  );
};
