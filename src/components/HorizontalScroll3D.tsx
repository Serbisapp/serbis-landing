
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Realistic Phone 3D Model Component
const RealisticPhone3D = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<Group>(null);
  
  // Calculate which rotation we're on (0, 1, or 2)
  const currentRotation = Math.floor(scrollProgress * 3);
  
  useFrame(() => {
    if (groupRef.current) {
      // 3 full rotations (3 * 2π)
      groupRef.current.rotation.y = scrollProgress * Math.PI * 6;
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(scrollProgress * Math.PI * 4) * 0.1;
      groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.05;
    }
  });

  // Different app screenshots for each rotation
  const appScreenshots = [
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=800&fit=crop', // Profile/connection screen
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=800&fit=crop', // Dashboard/interface
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=800&fit=crop'  // Code/tech screen
  ];

  return (
    <group ref={groupRef} scale={2.2}>
      {/* Phone body - realistic proportions */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 2.8, 0.18]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Phone screen bezel */}
      <mesh position={[0, 0, 0.09]} castShadow>
        <boxGeometry args={[1.3, 2.7, 0.02]} />
        <meshStandardMaterial 
          color="#000000" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Main screen with placeholder image */}
      <mesh position={[0, 0.05, 0.11]}>
        <planeGeometry args={[1.2, 2.4]} />
        <meshStandardMaterial 
          color="#ffffff"
          map={null} // We'll use a texture here later
        />
      </mesh>
      
      {/* Screen content overlay */}
      <mesh position={[0, 0.05, 0.111]}>
        <planeGeometry args={[1.18, 2.36]} />
        <meshBasicMaterial 
          color={currentRotation === 0 ? "#667eea" : currentRotation === 1 ? "#764ba2" : "#f093fb"}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Status bar */}
      <mesh position={[0, 1.15, 0.112]}>
        <planeGeometry args={[1.1, 0.08]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
      </mesh>
      
      {/* App icons grid */}
      {[-0.35, -0.1, 0.15, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0.8, 0.112]}>
          <planeGeometry args={[0.18, 0.18]} />
          <meshBasicMaterial 
            color={i === 0 ? "#ff6b6b" : i === 1 ? "#4ecdc4" : i === 2 ? "#45b7d1" : "#96ceb4"}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Main content area with mock interface */}
      <mesh position={[0, -0.2, 0.112]}>
        <planeGeometry args={[1.0, 1.6]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.95}
        />
      </mesh>
      
      {/* Mock UI elements */}
      {[-0.3, 0, 0.3].map((y, i) => (
        <mesh key={i} position={[0, y - 0.2, 0.113]}>
          <planeGeometry args={[0.8, 0.12]} />
          <meshBasicMaterial 
            color={currentRotation === 0 ? "#e3f2fd" : currentRotation === 1 ? "#f3e5f5" : "#e8f5e8"}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Home indicator (modern iPhone style) */}
      <mesh position={[0, -1.25, 0.112]}>
        <planeGeometry args={[0.25, 0.08]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
      
      {/* Camera notch */}
      <mesh position={[0, 1.3, 0.112]}>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Side buttons */}
      <mesh position={[-0.72, 0.3, 0]} castShadow>
        <boxGeometry args={[0.02, 0.15, 0.03]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>
      
      <mesh position={[-0.72, 0, 0]} castShadow>
        <boxGeometry args={[0.02, 0.25, 0.03]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Power button */}
      <mesh position={[0.72, 0.3, 0]} castShadow>
        <boxGeometry args={[0.02, 0.12, 0.03]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};

// Floating Text Component with connecting line
const FloatingText = ({ 
  position, 
  text, 
  phonePosition,
  side 
}: { 
  position: [number, number, number]; 
  text: string;
  phonePosition: [number, number, number];
  side: 'left' | 'right';
}) => {
  const groupRef = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Text background panel */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.5, 0.8]} />
        <meshBasicMaterial 
          color="#000000" 
          transparent 
          opacity={0.8}
        />
      </mesh>
      
      {/* Text border */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[2.48, 0.78]} />
        <meshBasicMaterial 
          color="#00ff88" 
          transparent 
          opacity={0.9}
        />
      </mesh>
      
      {/* Inner text area */}
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[2.4, 0.7]} />
        <meshBasicMaterial 
          color="#000000" 
          transparent 
          opacity={1}
        />
      </mesh>
      
      {/* Connection line to phone */}
      <mesh 
        position={[
          side === 'left' ? 1.25 : -1.25, 
          0, 
          0
        ]} 
        rotation={[0, 0, side === 'left' ? -0.3 : 0.3]}
      >
        <planeGeometry args={[Math.abs(position[0] - phonePosition[0]) * 0.8, 0.02]} />
        <meshBasicMaterial 
          color="#00ff88" 
          transparent 
          opacity={0.8}
        />
      </mesh>
      
      {/* Line endpoint dot */}
      <mesh position={[side === 'left' ? 2.2 : -2.2, 0, 0]}>
        <circleGeometry args={[0.05, 8]} />
        <meshBasicMaterial 
          color="#00ff88" 
          transparent 
          opacity={1}
        />
      </mesh>
    </group>
  );
};

// 3D Scene with Realistic Phone
const Scene3D = ({ scrollProgress }: { scrollProgress: number }) => {
  const currentRotation = Math.floor(scrollProgress * 3);
  
  // Different text content for each rotation
  const textContent = [
    {
      text: "PERFILES VERIFICADOS",
      position: [-4, 1, 0] as [number, number, number],
      side: 'left' as const
    },
    {
      text: "IA MATCHING",
      position: [4, 0.5, 0] as [number, number, number],
      side: 'right' as const
    },
    {
      text: "PAGOS SEGUROS",
      position: [-4, -0.5, 0] as [number, number, number],
      side: 'left' as const
    }
  ];

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4facfe" />
      <spotLight 
        position={[0, 20, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={0.8} 
        castShadow 
      />
      
      <RealisticPhone3D scrollProgress={scrollProgress} />
      
      {/* Floating text with connecting lines */}
      {currentRotation < textContent.length && (
        <FloatingText
          position={textContent[currentRotation].position}
          text={textContent[currentRotation].text}
          phonePosition={[0, 0, 0]}
          side={textContent[currentRotation].side}
        />
      )}
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
      feature: "Perfiles Completamente Verificados"
    },
    {
      title: "IA que Entiende",
      subtitle: "Algoritmos inteligentes para matches perfectos",
      feature: "Matching Inteligente Avanzado"
    },
    {
      title: "Pagos Seguros",
      subtitle: "Transacciones protegidas y garantizadas",
      feature: "Sistema de Pagos Protegido"
    }
  ];

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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
            gl.setClearColor(0x0a0a0f, 1);
            gl.shadowMap.enabled = true;
          }}
        >
          <Scene3D scrollProgress={scrollProgress} />
        </Canvas>
      </div>
      
      {/* Professional UI Overlay */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-30">
        <div className="bg-black/70 backdrop-blur-md rounded-xl p-6 border border-emerald-500/30 shadow-2xl">
          <div className="text-emerald-400 text-sm font-mono mb-2">
            SISTEMA {currentRotation + 1}/3 ACTIVO
          </div>
          <div className="text-2xl font-bold text-white mb-2">
            {sections[currentRotation]?.feature || "Sistema Initializing"}
          </div>
        </div>
      </div>
      
      {/* Scrolling Content */}
      <div ref={scrollContentRef} className="relative z-10 flex h-full">
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-screen h-full flex items-center justify-center relative"
          >
            {/* Content */}
            <div className="text-center px-8 relative z-20 max-w-4xl">
              <h2 className="text-5xl md:text-7xl font-black mb-6 text-white">
                {section.title}
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8">
                {section.subtitle}
              </p>
              
              {/* Tech-style feature highlight */}
              <div className="inline-block bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg px-8 py-4 backdrop-blur-sm border border-emerald-500/30">
                <span className="text-emerald-400 font-mono font-semibold tracking-wider">
                  {section.feature.toUpperCase()}
                </span>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {sections.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'bg-emerald-400 scale-150' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Professional Scroll Hint */}
      <div className="absolute bottom-8 right-8 text-slate-400 text-sm font-mono z-30">
        <div className="flex items-center space-x-2">
          <span>SCROLL_HORIZONTAL</span>
          <div className="w-6 h-1 bg-emerald-500 animate-pulse" />
        </div>
      </div>
      
      {/* System progress bar */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 bg-slate-800/50 h-1 rounded-full overflow-hidden z-30 border border-emerald-500/30">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-100"
          style={{ width: `${(scrollProgress * 100)}%` }}
        />
      </div>
    </div>
  );
};
