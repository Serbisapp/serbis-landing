
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Argentina 3D Map Component
const ArgentinaMap = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      // Rotate based on scroll progress
      groupRef.current.rotation.y = scrollProgress * Math.PI * 4;
      groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.2;
      groupRef.current.position.y = Math.sin(scrollProgress * Math.PI * 3) * 0.5;
    }
  });

  // Simple Argentina outline using basic shapes
  return (
    <group ref={groupRef} scale={2}>
      {/* Main body of Argentina */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 4, 0.2]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      
      {/* Northern provinces */}
      <mesh position={[0.3, 1.8, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.15]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      
      {/* Patagonia */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[1, 1.2, 0.15]} />
        <meshStandardMaterial color="#3730a3" />
      </mesh>
      
      {/* Buenos Aires area */}
      <mesh position={[0.4, 0.5, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.2]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      
      {/* Mendoza/Wine region */}
      <mesh position={[-0.3, 0, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.15]} />
        <meshStandardMaterial color="#7c3aed" />
      </mesh>
      
      {/* Tierra del Fuego */}
      <mesh position={[0.2, -2.8, 0]}>
        <boxGeometry args={[0.4, 0.2, 0.1]} />
        <meshStandardMaterial color="#5b21b6" />
      </mesh>
      
      {/* Floating cities/points of interest */}
      <mesh position={[0.4, 0.5, 0.5]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.3} />
      </mesh>
      
      <mesh position={[-0.2, 0.8, 0.5]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.3} />
      </mesh>
      
      <mesh position={[0.1, -1.2, 0.5]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

// 3D Scene with Argentina Map
const Scene3D = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.6} />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />
      
      <ArgentinaMap scrollProgress={scrollProgress} />
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

  const sections = [
    {
      title: "El Futuro de los Servicios",
      subtitle: "Conectamos el talento argentino con quienes lo necesitan",
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "Tecnología Avanzada",
      subtitle: "IA que entiende tus necesidades y conecta con los mejores",
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Red Nacional",
      subtitle: "Más de 50.000 profesionales verificados en todo el país",
      color: "from-pink-600 to-red-600"
    },
    {
      title: "Garantía Total",
      subtitle: "Respaldo completo en cada servicio contratado",
      color: "from-red-600 to-orange-600"
    },
    {
      title: "Crecimiento Constante",
      subtitle: "Expandiéndonos a nuevas ciudades cada mes",
      color: "from-orange-600 to-yellow-600"
    }
  ];

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-slate-950">
      {/* Fixed 3D Canvas Background with Argentina Map */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ alpha: true, antialias: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x0f1629, 1);
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
            className="flex-shrink-0 w-screen h-full flex items-center justify-center relative"
          >
            {/* Content */}
            <div className="text-center px-8 relative z-20">
              <h2 
                className="text-6xl md:text-8xl font-black mb-8 text-white opacity-0 animate-fade-in"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {section.title}
              </h2>
              <p 
                className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto opacity-0 animate-fade-in"
                style={{
                  animationDelay: `${index * 0.2 + 0.3}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {section.subtitle}
              </p>
              
              {/* Floating Elements */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" />
            </div>
            
            {/* Progress Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {sections.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === index ? 'bg-white scale-125' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute bottom-8 right-8 text-white/60 text-sm animate-pulse z-30">
        Deslizá horizontalmente →
      </div>
    </div>
  );
};
