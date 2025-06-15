
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Simple Floating 3D Object Component
const FloatingObject = ({ position, color, type, scale = 1 }: {
  position: [number, number, number];
  color: string;
  type: 'sphere' | 'box' | 'torus' | 'cone';
  scale?: number;
}) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  const renderGeometry = () => {
    switch (type) {
      case 'sphere':
        return <sphereGeometry args={[0.5 * scale, 32, 32]} />;
      case 'box':
        return <boxGeometry args={[0.8 * scale, 0.8 * scale, 0.8 * scale]} />;
      case 'torus':
        return <torusGeometry args={[0.5 * scale, 0.2 * scale, 16, 100]} />;
      case 'cone':
        return <coneGeometry args={[0.5 * scale, 1 * scale, 8]} />;
      default:
        return <sphereGeometry args={[0.5 * scale, 32, 32]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderGeometry()}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Simple 3D Text Component
const Simple3DText = ({ text, position, color }: {
  text: string;
  position: [number, number, number];
  color: string;
}) => {
  const groupRef = useRef<any>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <boxGeometry args={[2, 0.5, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

// Main 3D Scene
const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-10, -10, -10]} color="#8b5cf6" />
      
      {/* Floating Objects */}
      <FloatingObject position={[-5, 0, 0]} color="#3b82f6" type="sphere" scale={1.2} />
      <FloatingObject position={[5, 2, -2]} color="#8b5cf6" type="box" />
      <FloatingObject position={[0, -1, 3]} color="#10b981" type="torus" scale={0.8} />
      <FloatingObject position={[-3, 3, 1]} color="#f59e0b" type="cone" />
      <FloatingObject position={[3, -2, -1]} color="#ef4444" type="sphere" />
      
      {/* Simple 3D Text Elements */}
      <Simple3DText text="SERBIS" position={[0, 0, 0]} color="#ffffff" />
      <Simple3DText text="INNOVACIÓN" position={[8, 1, -2]} color="#3b82f6" />
      <Simple3DText text="CALIDAD" position={[-8, -1, 1]} color="#8b5cf6" />
      <Simple3DText text="CONFIANZA" position={[12, 2, 0]} color="#10b981" />
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
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Fixed 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ alpha: true, antialias: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <Scene3D />
        </Canvas>
      </div>
      
      {/* Scrolling Content */}
      <div ref={scrollContentRef} className="relative z-10 flex h-full">
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-screen h-full flex items-center justify-center relative"
          >
            {/* Animated Background Gradient */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-20 animate-pulse`}
              style={{
                animationDelay: `${index * 0.5}s`,
                animationDuration: '3s'
              }}
            />
            
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
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
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
