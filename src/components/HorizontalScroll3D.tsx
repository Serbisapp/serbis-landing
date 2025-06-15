
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Phone 3D Model Component
const Phone3D = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<Group>(null);
  
  // Calculate which rotation we're on (0, 1, or 2)
  const currentRotation = Math.floor(scrollProgress * 3);
  const rotationProgress = (scrollProgress * 3) % 1;
  
  useFrame(() => {
    if (groupRef.current) {
      // 3 full rotations (3 * 2π)
      groupRef.current.rotation.y = scrollProgress * Math.PI * 6;
      // Slight floating animation
      groupRef.current.position.y = Math.sin(scrollProgress * Math.PI * 4) * 0.2;
      groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.1;
    }
  });

  // Different colors/content for each rotation
  const phoneColors = [
    '#1f2937', // Dark gray for first rotation
    '#4f46e5', // Indigo for second rotation
    '#059669'  // Emerald for third rotation
  ];

  const screenColors = [
    '#3b82f6', // Blue screen
    '#8b5cf6', // Purple screen
    '#10b981'  // Green screen
  ];

  const currentPhoneColor = phoneColors[currentRotation] || phoneColors[0];
  const currentScreenColor = screenColors[currentRotation] || screenColors[0];

  return (
    <group ref={groupRef} scale={2.5}>
      {/* Phone body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 2.4, 0.15]} />
        <meshStandardMaterial color={currentPhoneColor} />
      </mesh>
      
      {/* Phone screen */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[1, 2, 0.02]} />
        <meshStandardMaterial 
          color={currentScreenColor} 
          emissive={currentScreenColor} 
          emissiveIntensity={0.3} 
        />
      </mesh>
      
      {/* Screen content - app icons */}
      <mesh position={[-0.25, 0.6, 0.1]}>
        <boxGeometry args={[0.15, 0.15, 0.01]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[0, 0.6, 0.1]}>
        <boxGeometry args={[0.15, 0.15, 0.01]} />
        <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[0.25, 0.6, 0.1]}>
        <boxGeometry args={[0.15, 0.15, 0.01]} />
        <meshStandardMaterial color="#22c55e" emissive="#16a34a" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Dynamic content based on rotation */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[0.8, 0.6, 0.01]} />
        <meshStandardMaterial 
          color={currentRotation === 0 ? "#3b82f6" : currentRotation === 1 ? "#8b5cf6" : "#10b981"}
          emissive={currentRotation === 0 ? "#2563eb" : currentRotation === 1 ? "#7c3aed" : "#059669"}
          emissiveIntensity={0.4} 
        />
      </mesh>
      
      {/* Phone camera */}
      <mesh position={[0, 1, 0.08]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 8]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      
      {/* Home button */}
      <mesh position={[0, -1, 0.08]}>
        <cylinderGeometry args={[0.08, 0.08, 0.01, 16]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
      
      {/* Floating particles around phone */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 1.5 + Math.sin(scrollProgress * Math.PI * 8 + i) * 0.3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(scrollProgress * Math.PI * 6 + i) * 0.5;
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial 
              color={currentScreenColor} 
              emissive={currentScreenColor} 
              emissiveIntensity={0.6} 
            />
          </mesh>
        );
      })}
    </group>
  );
};

// 3D Scene with Phone
const Scene3D = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.6} />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />
      
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
  const rotationProgress = (scrollProgress * 3) % 1;

  const sections = [
    {
      title: "Conectá con Profesionales",
      subtitle: "Miles de expertos verificados esperándote",
      color: "from-blue-600 to-purple-600",
      phoneFeature: "Perfiles Verificados"
    },
    {
      title: "IA que Entiende",
      subtitle: "Algoritmos inteligentes para matches perfectos",
      color: "from-purple-600 to-pink-600",
      phoneFeature: "Matching Inteligente"
    },
    {
      title: "Pagos Seguros",
      subtitle: "Transacciones protegidas y garantizadas",
      color: "from-pink-600 to-red-600",
      phoneFeature: "Pagos Protegidos"
    },
    {
      title: "Red Nacional",
      subtitle: "Presencia en todo el territorio argentino",
      color: "from-red-600 to-orange-600",
      phoneFeature: "Cobertura Total"
    },
    {
      title: "Crecimiento Exponencial",
      subtitle: "Expandiéndonos a toda Latinoamérica",
      color: "from-orange-600 to-yellow-600",
      phoneFeature: "Expansión Regional"
    }
  ];

  // Get rotation-specific content
  const getRotationContent = () => {
    switch(currentRotation) {
      case 0:
        return {
          title: "Primera Rotación",
          subtitle: "Descubrí la app que cambiará tu vida",
          feature: "📱 Interfaz Intuitiva"
        };
      case 1:
        return {
          title: "Segunda Rotación", 
          subtitle: "Conectate con los mejores profesionales",
          feature: "🤝 Matches Perfectos"
        };
      case 2:
        return {
          title: "Tercera Rotación",
          subtitle: "Garantía total en cada servicio",
          feature: "🛡️ Máxima Seguridad"
        };
      default:
        return sections[0];
    }
  };

  const rotationContent = getRotationContent();

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-slate-950">
      {/* Fixed 3D Canvas Background with Phone */}
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
      
      {/* Rotation indicator and animated text */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-30">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="text-white/60 text-sm mb-2">
            Rotación {currentRotation + 1} de 3
          </div>
          <div className="text-2xl font-bold text-white mb-2 animate-pulse">
            {rotationContent.title}
          </div>
          <div className="text-lg text-blue-300 animate-bounce">
            {rotationContent.feature}
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
              
              {/* Phone feature highlight */}
              <div 
                className="mt-8 inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-6 py-3 backdrop-blur-sm border border-white/10 opacity-0 animate-fade-in"
                style={{
                  animationDelay: `${index * 0.2 + 0.6}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <span className="text-white font-semibold">{section.phoneFeature}</span>
              </div>
              
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
      
      {/* Rotation progress bar */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 bg-white/10 h-2 rounded-full overflow-hidden z-30">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
          style={{ width: `${(scrollProgress * 100)}%` }}
        />
      </div>
    </div>
  );
};
