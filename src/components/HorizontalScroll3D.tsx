
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group, Vector3, PerspectiveCamera } from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

// Simplified Camera Controller
const CameraController = ({ scrollProgress }: { scrollProgress: number }) => {
  useFrame(({ camera }) => {
    const perspectiveCamera = camera as PerspectiveCamera;
    
    // Smooth camera movement based on scroll
    const targetX = Math.sin(scrollProgress * Math.PI * 2) * 2;
    const targetY = 1 + Math.sin(scrollProgress * Math.PI) * 0.5;
    const targetZ = 6 + scrollProgress * 2;
    
    // Smooth interpolation
    perspectiveCamera.position.lerp(new Vector3(targetX, targetY, targetZ), 0.05);
    perspectiveCamera.lookAt(0, 0, 0);
    
    // Dynamic FOV
    const targetFov = 50 + scrollProgress * 20;
    perspectiveCamera.fov += (targetFov - perspectiveCamera.fov) * 0.05;
    perspectiveCamera.updateProjectionMatrix();
  });
  
  return null;
};

// Streamlined Phone Component
const Phone3D = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<Group>(null);
  
  // Load screen textures
  const profileTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=800&fit=crop');
  const dashboardTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=800&fit=crop');
  const codeTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=800&fit=crop');
  
  const textures = [profileTexture, dashboardTexture, codeTexture];
  const currentSection = Math.floor(scrollProgress * 2.99);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Smooth rotation
      groupRef.current.rotation.y = scrollProgress * Math.PI * 4;
      groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      
      // Scale and position
      const scale = 2 + scrollProgress * 0.5;
      groupRef.current.scale.setScalar(scale);
      
      groupRef.current.position.y = Math.sin(time * 0.3) * 0.2;
      groupRef.current.position.x = Math.cos(scrollProgress * Math.PI) * 0.5;
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
      
      {/* Screen content */}
      <mesh position={[0, 0.05, 0.082]}>
        <planeGeometry args={[1.1, 2.4]} />
        <meshStandardMaterial 
          map={textures[currentSection] || textures[0]}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Camera notch */}
      <mesh position={[0, 1.25, 0.083]}>
        <boxGeometry args={[0.25, 0.08, 0.02]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
};

// Simple Particle System
const ParticleSystem = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.2 + scrollProgress * Math.PI;
    }
  });

  // Create 8 simple particles
  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
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
          <sphereGeometry args={[0.2, 8, 8]} />
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
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
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

// Background Grid
const BackgroundGrid = ({ scrollProgress }: { scrollProgress: number }) => {
  const gridRef = useRef<Group>(null);
  
  useFrame(() => {
    if (gridRef.current) {
      gridRef.current.position.z = -10 + scrollProgress * 2;
      gridRef.current.rotation.y = scrollProgress * 0.1;
    }
  });

  const gridLines = [];
  for (let i = -5; i <= 5; i++) {
    // Vertical lines
    gridLines.push(
      <mesh key={`v${i}`} position={[i * 2, 0, -10]}>
        <boxGeometry args={[0.02, 20, 0.02]} />
        <meshStandardMaterial 
          color="#475569" 
          transparent 
          opacity={0.1}
        />
      </mesh>
    );
    // Horizontal lines
    gridLines.push(
      <mesh key={`h${i}`} position={[0, i * 2, -10]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 20, 0.02]} />
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
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 60 }}
          shadows
          gl={{ antialias: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x0f172a, 1);
          }}
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
    </div>
  );
};
