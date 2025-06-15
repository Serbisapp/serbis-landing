import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextureLoader } from 'three';

gsap.registerPlugin(ScrollTrigger);

// Dynamic Camera Controller with Amazing Animations
const CameraController = ({ scrollProgress }: { scrollProgress: number }) => {
  useFrame(({ camera, clock }) => {
    const time = clock.elapsedTime;
    
    // Calculate which section we're in (0-1, 1-2, 2-3)
    const section = scrollProgress * 3;
    const currentSection = Math.floor(section);
    const sectionProgress = section - currentSection;
    
    // Base positions and rotations for each section
    const cameraStates = [
      // Section 0: Close dramatic angle
      {
        position: new Vector3(3, 2, 6),
        lookAt: new Vector3(0, 0, 0),
        fov: 50
      },
      // Section 1: Overhead cinematic view
      {
        position: new Vector3(0, 8, 4),
        lookAt: new Vector3(0, 0, 0),
        fov: 40
      },
      // Section 2: Side profile with depth
      {
        position: new Vector3(-6, 1, 3),
        lookAt: new Vector3(0, 0, 0),
        fov: 60
      }
    ];
    
    // Get current and next camera states
    const current = cameraStates[currentSection] || cameraStates[0];
    const next = cameraStates[currentSection + 1] || cameraStates[2];
    
    // Smooth interpolation between camera states
    const easedProgress = 1 - Math.pow(1 - sectionProgress, 3); // Cubic ease-out
    
    // Interpolate position
    const targetPos = current.position.clone().lerp(next.position, easedProgress);
    
    // Add dynamic orbital movement
    const orbitRadius = 1.5;
    const orbitSpeed = time * 0.1 + scrollProgress * Math.PI;
    
    targetPos.x += Math.sin(orbitSpeed) * orbitRadius * (1 - scrollProgress * 0.5);
    targetPos.z += Math.cos(orbitSpeed) * orbitRadius * 0.3;
    
    // Add breathing/floating effect
    targetPos.y += Math.sin(time * 0.5 + scrollProgress * Math.PI) * 0.3;
    
    // Smooth camera position transition
    camera.position.lerp(targetPos, 0.03);
    
    // Dynamic look-at with slight offset for interest
    const lookAtTarget = new Vector3(
      Math.sin(time * 0.3) * 0.2,
      Math.sin(time * 0.4) * 0.1,
      0
    );
    
    camera.lookAt(lookAtTarget);
    
    // Dynamic FOV changes for dramatic effect
    const targetFov = current.fov + (next.fov - current.fov) * easedProgress;
    const dynamicFov = targetFov + Math.sin(time * 0.2) * 2;
    
    if (camera.fov !== dynamicFov) {
      camera.fov = dynamicFov;
      camera.updateProjectionMatrix();
    }
    
    // Add subtle camera shake for energy
    if (scrollProgress > 0.1) {
      camera.position.x += (Math.random() - 0.5) * 0.01;
      camera.position.y += (Math.random() - 0.5) * 0.01;
    }
  });
  
  return null;
};

// Enhanced Phone with More Dynamic Animation
const CinematicPhone3D = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<Group>(null);
  
  // Load real images for the phone screen
  const profileTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=800&fit=crop');
  const dashboardTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=800&fit=crop');
  const codeTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=800&fit=crop');
  
  const currentRotation = Math.floor(scrollProgress * 3);
  const textures = [profileTexture, dashboardTexture, codeTexture];
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Complex rotation system - not just spinning
      const rotationMultiplier = 1 + scrollProgress * 2; // Speed up as we progress
      groupRef.current.rotation.y = scrollProgress * Math.PI * 6 * rotationMultiplier;
      
      // Add secondary rotation on X and Z for complexity
      groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.3 + 
                                   Math.sin(time * 0.3) * 0.1;
      groupRef.current.rotation.z = Math.cos(scrollProgress * Math.PI * 1.5) * 0.2;
      
      // Dynamic scaling effect
      const breathScale = 1 + Math.sin(time * 0.4) * 0.05;
      const scrollScale = 1 + scrollProgress * 0.3; // Grow as we scroll
      groupRef.current.scale.setScalar(breathScale * scrollScale * 2.5);
      
      // Complex position animation
      groupRef.current.position.y = Math.sin(scrollProgress * Math.PI * 3) * 0.8 +
                                   Math.sin(time * 0.2) * 0.1;
      groupRef.current.position.x = Math.cos(scrollProgress * Math.PI * 2) * 0.3;
      groupRef.current.position.z = Math.sin(scrollProgress * Math.PI) * 0.5;
      
      // Add wobble effect during transitions
      const transitionZones = [0.33, 0.66]; // Where sections transition
      for (const zone of transitionZones) {
        const distance = Math.abs(scrollProgress - zone);
        if (distance < 0.1) {
          const wobbleIntensity = (0.1 - distance) * 10;
          groupRef.current.rotation.x += Math.sin(time * 8) * wobbleIntensity * 0.02;
          groupRef.current.rotation.z += Math.cos(time * 6) * wobbleIntensity * 0.02;
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Enhanced Phone body with gradient effect */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 2.6, 0.15]} />
        <meshStandardMaterial 
          color="#9ca3af" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#4a5568"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Phone screen bezel with glow */}
      <mesh position={[0, 0, 0.076]} castShadow>
        <boxGeometry args={[1.15, 2.55, 0.01]} />
        <meshStandardMaterial 
          color="#1a202c" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#2d3748"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Main screen with enhanced glow */}
      <mesh position={[0, 0.05, 0.082]}>
        <planeGeometry args={[1.1, 2.4]} />
        <meshStandardMaterial 
          map={textures[currentRotation] || textures[0]}
          emissive="#ffffff"
          emissiveIntensity={0.3}
          transparent={false}
        />
      </mesh>
      
      {/* Screen glow effect */}
      <mesh position={[0, 0.05, 0.085]}>
        <planeGeometry args={[1.3, 2.6]} />
        <meshBasicMaterial 
          color="#60a5fa"
          transparent 
          opacity={0.1}
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
        <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
      </mesh>
      
      <mesh position={[-0.61, 0.15, 0]} castShadow>
        <boxGeometry args={[0.02, 0.25, 0.03]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Power button */}
      <mesh position={[0.61, 0.4, 0]} castShadow>
        <boxGeometry args={[0.02, 0.15, 0.03]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Lightning port */}
      <mesh position={[0, -1.28, 0]} castShadow>
        <boxGeometry args={[0.15, 0.03, 0.08]} />
        <meshStandardMaterial color="#6b7280" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Speaker grilles */}
      {[-0.3, -0.15, 0, 0.15, 0.3].map((x, i) => (
        <mesh key={i} position={[x, -1.28, 0.02]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.06, 8]} />
          <meshStandardMaterial color="#6b7280" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      
      {/* Camera lens */}
      <mesh position={[-0.35, 1.05, 0.083]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Camera glass */}
      <mesh position={[-0.35, 1.05, 0.094]}>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
        <meshStandardMaterial color="#000033" transparent opacity={0.9} />
      </mesh>
    </group>
  );
};

// Enhanced Particle Systems with More Drama
const CinematicParticles = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Particle system responds dramatically to scroll
      groupRef.current.rotation.y = time * 0.5 + scrollProgress * Math.PI * 2;
      groupRef.current.rotation.x = Math.sin(time * 0.3 + scrollProgress * Math.PI) * 0.5;
      groupRef.current.rotation.z = Math.cos(time * 0.2) * 0.3;
      
      // Pulsing effect
      const pulseScale = 1 + Math.sin(time * 2 + scrollProgress * Math.PI * 4) * 0.3;
      groupRef.current.scale.setScalar(pulseScale);
    }
  });

  // More particles, more colors, more chaos!
  const particles = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const layer = Math.floor(i / 8); // 3 layers of 8 particles each
    const radius = 2 + layer * 1.5;
    const height = Math.sin(angle * 3 + layer) * 1.5;
    
    return {
      position: [
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius * 0.6
      ] as [number, number, number],
      color: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'][i % 6],
      scale: 0.02 + (i % 3) * 0.01,
      rotationSpeed: (i % 2 === 0 ? 1 : -1) * (0.01 + (i % 4) * 0.005)
    };
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial 
            color={particle.color} 
            transparent 
            opacity={0.8}
            metalness={0.3}
            roughness={0.4}
            emissive={particle.color}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

// Dynamic Lighting System
const CinematicLighting = ({ scrollProgress }: { scrollProgress: number }) => {
  const lightRef = useRef<any>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.elapsedTime;
      
      // Dynamic light movement
      lightRef.current.position.x = Math.sin(time * 0.3 + scrollProgress * Math.PI) * 8;
      lightRef.current.position.y = 5 + Math.cos(time * 0.2) * 3;
      lightRef.current.position.z = 3 + Math.sin(time * 0.4) * 2;
      
      // Color changes based on scroll
      const colors = [
        [1, 0.8, 0.6], // Warm
        [0.6, 0.8, 1], // Cool  
        [1, 0.6, 1]    // Purple
      ];
      
      const colorIndex = Math.floor(scrollProgress * 2.99);
      const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
      const colorProgress = (scrollProgress * 3) - colorIndex;
      
      const currentColor = colors[colorIndex];
      const nextColor = colors[nextColorIndex];
      
      lightRef.current.color.setRGB(
        currentColor[0] + (nextColor[0] - currentColor[0]) * colorProgress,
        currentColor[1] + (nextColor[1] - currentColor[1]) * colorProgress,
        currentColor[2] + (nextColor[2] - currentColor[2]) * colorProgress
      );
      
      // Intensity pulsing
      lightRef.current.intensity = 0.8 + Math.sin(time * 1.5) * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight 
        ref={lightRef}
        intensity={0.8} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      
      {/* Additional accent lights */}
      <pointLight 
        position={[-8, -5, -3]} 
        intensity={0.4} 
        color="#10b981"
        distance={15}
        decay={2}
      />
      <pointLight 
        position={[8, 5, -5]} 
        intensity={0.3} 
        color="#3b82f6"
        distance={12}
        decay={2}
      />
      <pointLight 
        position={[0, -8, 8]} 
        intensity={0.5} 
        color="#8b5cf6"
        distance={20}
        decay={1.5}
      />
    </>
  );
};

const Background3D = ({ scrollProgress }: { scrollProgress: number }) => {
  const backgroundRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (backgroundRef.current) {
      // Subtle movement with scroll and time
      backgroundRef.current.rotation.y = state.clock.elapsedTime * 0.01 + scrollProgress * 0.1;
      backgroundRef.current.position.z = -30 + scrollProgress * 2;
    }
  });

  // Create layered background elements for depth
  const backgroundElements = [];
  
  // Layer 1: Far background spheres
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 25;
    backgroundElements.push(
      <mesh 
        key={`far-${i}`} 
        position={[
          Math.cos(angle) * radius,
          Math.sin(angle * 0.5) * 10,
          Math.sin(angle) * radius - 40
        ]}
        scale={0.8}
      >
        <sphereGeometry args={[1.5, 12, 12]} />
        <meshStandardMaterial 
          color={i % 2 === 0 ? "#1e293b" : "#334155"} 
          transparent 
          opacity={0.3}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    );
  }

  // Layer 2: Mid background geometric shapes
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const radius = 18;
    backgroundElements.push(
      <mesh 
        key={`mid-${i}`} 
        position={[
          Math.cos(angle + Math.PI/6) * radius,
          Math.sin(angle * 0.7) * 8,
          Math.sin(angle) * radius * 0.6 - 25
        ]}
        rotation={[angle * 0.3, angle * 0.5, 0]}
        scale={0.4}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#475569" 
          transparent 
          opacity={0.2}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
    );
  }

  return (
    <group ref={backgroundRef}>
      {backgroundElements}
    </group>
  );
};

// Grid Background Component - more subtle
const GridBackground = ({ scrollProgress }: { scrollProgress: number }) => {
  const gridRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      // Very subtle movement with scroll
      gridRef.current.position.z = -15 + scrollProgress * 1;
      gridRef.current.rotation.y = scrollProgress * Math.PI * 0.02;
      // Gentle floating animation
      gridRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  // Create subtle grid lines
  const gridLines = [];
  const gridSize = 12;
  const divisions = 12;
  
  for (let i = 0; i <= divisions; i++) {
    const position = (i / divisions - 0.5) * gridSize;
    // Vertical lines
    gridLines.push(
      <mesh key={`v${i}`} position={[position, 0, -15]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.005, gridSize, 0.005]} />
        <meshStandardMaterial 
          color="#475569" 
          transparent 
          opacity={0.04}
          emissive="#475569"
          emissiveIntensity={0.02}
        />
      </mesh>
    );
    // Horizontal lines
    gridLines.push(
      <mesh key={`h${i}`} position={[0, position, -15]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.005, gridSize, 0.005]} />
        <meshStandardMaterial 
          color="#475569" 
          transparent 
          opacity={0.04}
          emissive="#475569"
          emissiveIntensity={0.02}
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

// Reduced Flying Elements Component
const FlyingElements = () => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Very slow rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.005;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.004) * 0.03;
    }
  });

  // Only 4 elements, much smaller and slower
  const elements = Array.from({ length: 4 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8 - 6
    ] as [number, number, number],
    color: ['#10b981', '#3b82f6'][Math.floor(Math.random() * 2)],
    scale: Math.random() * 0.1 + 0.03, // Much smaller
    rotationSpeed: (Math.random() - 0.5) * 0.001, // Much slower
  }));

  return (
    <group ref={groupRef}>
      {elements.map((el, i) => (
        <mesh key={i} position={el.position} scale={el.scale}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial 
            color={el.color} 
            transparent 
            opacity={0.2}
            metalness={0.3}
            roughness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

// Enhanced 3D Scene with Cinematic Camera
const CinematicScene3D = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <>
      <CameraController scrollProgress={scrollProgress} />
      <CinematicLighting scrollProgress={scrollProgress} />
      
      <Background3D scrollProgress={scrollProgress} />
      <GridBackground scrollProgress={scrollProgress} />
      <FlyingElements />
      <CinematicParticles scrollProgress={scrollProgress} />
      <CinematicPhone3D scrollProgress={scrollProgress} />
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
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* 3D Canvas Background with proper 3D scene */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ 
            alpha: false, 
            antialias: true,
            shadowMap: { enabled: true, type: 2 }
          }}
          shadows
          onCreated={({ gl }) => {
            gl.setClearColor(0x0f172a, 1); // Dark background
            gl.shadowMap.enabled = true;
          }}
        >
          <CinematicScene3D scrollProgress={scrollProgress} />
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
