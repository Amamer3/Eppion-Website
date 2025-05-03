
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

// Extend JSX elements with Three.js objects
extend({ 
  InstancedMesh: THREE.InstancedMesh,
  SphereGeometry: THREE.SphereGeometry, 
  BoxGeometry: THREE.BoxGeometry,
  OctahedronGeometry: THREE.OctahedronGeometry,
  MeshStandardMaterial: THREE.MeshStandardMaterial,
  MeshPhongMaterial: THREE.MeshPhongMaterial,
  LineBasicMaterial: THREE.LineBasicMaterial,
  BufferGeometry: THREE.BufferGeometry,
  BufferAttribute: THREE.BufferAttribute,
  Group: THREE.Group,
  AmbientLight: THREE.AmbientLight,
  PointLight: THREE.PointLight,
  Mesh: THREE.Mesh,
  Line: THREE.Line
});

// Explicitly declare JSX namespace for Three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'instancedMesh': any;
      'sphereGeometry': any;
      'boxGeometry': any;
      'octahedronGeometry': any;
      'meshStandardMaterial': any;
      'meshPhongMaterial': any;
      'lineBasicMaterial': any;
      'bufferGeometry': any;
      'bufferAttribute': any;
      'group': any;
      'ambientLight': any;
      'pointLight': any;
      'mesh': any;
    }
  }
}

interface ParticlesProps {
  count: number;
  color?: string;
}

// Particles component for network effect
const Particles = ({ count = 1000, color = '#9b87f5' }: ParticlesProps) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  useEffect(() => {
    if (!mesh.current) return;
    
    // Generate random positions for each particle
    const dummy = new THREE.Object3D();
    const particles = mesh.current;
    
    // Position each particle
    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 0.5;
      const phi = Math.acos(-1 + Math.random() * 2);
      const theta = Math.random() * Math.PI * 2;
      
      dummy.position.x = radius * Math.sin(phi) * Math.cos(theta);
      dummy.position.y = radius * Math.sin(phi) * Math.sin(theta);
      dummy.position.z = radius * Math.cos(phi);
      
      dummy.lookAt(0, 0, 0);
      dummy.scale.setScalar(Math.random() * 0.5 + 0.1);
      dummy.updateMatrix();
      
      particles.setMatrixAt(i, dummy.matrix);
    }
    
    particles.instanceMatrix.needsUpdate = true;
  }, [count]);
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    // Rotate the entire particle system
    mesh.current.rotation.y += 0.001;
    mesh.current.rotation.x += 0.0005;
  });
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </instancedMesh>
  );
};

// Lines component for connecting particles
const ConnectionLines = () => {
  const lineRef = useRef<THREE.Group>(null);
  const count = 20;
  
  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.rotation.y += 0.001;
      lineRef.current.rotation.z += 0.0005;
    }
  });
  
  return (
    <group ref={lineRef}>
      {Array.from({ length: count }).map((_, i) => {
        const radius = 2;
        const positions: [number, number, number][] = [];
        
        for (let j = 0; j < 2; j++) {
          const phi = Math.acos(-1 + Math.random() * 2);
          const theta = Math.random() * Math.PI * 2;
          
          positions.push([
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
          ]);
        }
        
        // Create a line geometry and material
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(positions.flat(), 3)
        );
        const material = new THREE.LineBasicMaterial({ 
          color: "#7E69AB", 
          transparent: true, 
          opacity: 0.4 
        });
        
        return (
          <mesh key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={positions.length}
                array={new Float32Array(positions.flat())}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#7E69AB" transparent opacity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
};

// Floating sphere with glow effect
const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.8, 64, 64]} />
      <meshPhongMaterial
        color="#1A1F2C"
        emissive="#7E69AB"
        emissiveIntensity={0.2}
        transparent
        opacity={0.8}
        wireframe
      />
    </mesh>
  );
};

// 3D globe component
export const NetworkGlobe: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} color="#1EAEDB" intensity={0.5} />
      
      <group scale={scale}>
        <Globe />
        <Particles count={200} />
        <ConnectionLines />
      </group>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
};

// Enhanced background scene to match the Network Globe aesthetic
export const EnhancedBackgroundScene: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
      <Canvas className="!fixed" camera={{ position: [0, 0, 30], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <pointLight position={[-10, -10, -10]} color="#1EAEDB" intensity={0.2} />
        
        <group position={[0, -scrollY * 0.01, 0]}>
          <EnhancedFloatingObjects count={40} scrollY={scrollY} />
          <DistantParticles count={300} />
          <BackgroundGlow />
        </group>
      </Canvas>
    </div>
  );
};

// 3D background component with floating objects
export const BackgroundScene: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <Canvas className="canvas-container" camera={{ position: [0, 0, 30], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.3} />
      
      <FloatingObjects count={15} scrollY={scrollY} />
    </Canvas>
  );
};

// Background glow effect
const BackgroundGlow: React.FC = () => {
  return (
    <mesh position={[0, 0, -20]}>
      <sphereGeometry args={[15, 32, 32]} />
      <meshStandardMaterial
        color="#1A1F2C"
        emissive="#7E69AB"
        emissiveIntensity={0.05}
        transparent
        opacity={0.2}
      />
    </mesh>
  );
};

// Distant particles for depth effect
const DistantParticles: React.FC<{ count: number }> = ({ count }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  useEffect(() => {
    if (!mesh.current) return;
    
    const dummy = new THREE.Object3D();
    
    for (let i = 0; i < count; i++) {
      // Position particles in a wider space
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 30 - 15;
      
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(Math.random() * 0.3 + 0.1);
      dummy.updateMatrix();
      
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count]);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0001;
    }
  });
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial 
        color="#b3a4f7" 
        emissive="#b3a4f7"
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
};

interface FloatingObjectsProps {
  count?: number;
  scrollY?: number;
}

// Enhanced floating objects to match the Network Globe aesthetic
const EnhancedFloatingObjects: React.FC<FloatingObjectsProps> = ({ count = 25, scrollY = 0 }) => {
  const objects = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (!objects.current) return;
    
    // Position objects randomly
    Array.from({ length: count }).forEach((_, i) => {
      const child = objects.current?.children[i];
      if (!child) return;
      
      // Random positions with more depth
      child.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20 - 10
      );
      
      // Random rotations
      child.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      // Random scale
      const scale = Math.random() * 1.2 + 0.3;
      child.scale.set(scale, scale, scale);
    });
  }, [count]);
  
  useFrame((state) => {
    if (!objects.current) return;
    
    // Apply scroll effect
    objects.current.position.y = scrollY * 0.01;
    
    // Animate each object
    objects.current.children.forEach((child, i) => {
      // Slower rotation for more elegant movement
      child.rotation.x += 0.0005;
      child.rotation.y += 0.0008;
      child.rotation.z += 0.0003;
      
      // Subtle floating motion
      child.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
      child.position.x += Math.cos(Date.now() * 0.001 + i) * 0.001;
    });
  });
  
  return (
    <group ref={objects}>
      {Array.from({ length: count }).map((_, i) => {
        const type = Math.floor(Math.random() * 3);
        // Use colors matching the NetworkGlobe
        const color = i % 3 === 0 ? "#9b87f5" : (i % 3 === 1 ? "#7E69AB" : "#1EAEDB");
        
        return (
          <mesh key={i}>
            {type === 0 && <boxGeometry args={[1, 1, 1]} />}
            {type === 1 && <sphereGeometry args={[0.6, 16, 16]} />}
            {type === 2 && <octahedronGeometry args={[0.8]} />}
            <meshStandardMaterial 
              color={color}
              transparent
              opacity={0.15}
              wireframe={Math.random() > 0.6}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Original floating objects implementation
const FloatingObjects: React.FC<FloatingObjectsProps> = ({ count = 10, scrollY = 0 }) => {
  const objects = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (!objects.current) return;
    
    // Position objects randomly
    Array.from({ length: count }).forEach((_, i) => {
      const child = objects.current?.children[i];
      if (!child) return;
      
      // Random positions
      child.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 10 - 10
      );
      
      // Random rotations
      child.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      // Random scale
      const scale = Math.random() * 1.5 + 0.5;
      child.scale.set(scale, scale, scale);
    });
  }, [count]);
  
  useFrame(() => {
    if (!objects.current) return;
    
    // Apply scroll effect
    objects.current.position.y = scrollY * 0.01;
    
    // Animate each object
    objects.current.children.forEach((child, i) => {
      child.rotation.x += 0.001;
      child.rotation.y += 0.002;
      child.rotation.z += 0.0015;
      
      // Subtle floating motion
      child.position.y += Math.sin(Date.now() * 0.001 + i) * 0.003;
    });
  });
  
  return (
    <group ref={objects}>
      {Array.from({ length: count }).map((_, i) => {
        const type = Math.floor(Math.random() * 3);
        const color = i % 2 === 0 ? "#7E69AB" : "#1EAEDB";
        
        return (
          <mesh key={i}>
            {type === 0 && <boxGeometry args={[1, 1, 1]} />}
            {type === 1 && <sphereGeometry args={[0.8, 16, 16]} />}
            {type === 2 && <octahedronGeometry args={[1]} />}
            <meshStandardMaterial 
              color={color}
              transparent
              opacity={0.2}
              wireframe={Math.random() > 0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
};
