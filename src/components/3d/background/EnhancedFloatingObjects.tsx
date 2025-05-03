
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingObjectsProps {
  count?: number;
  scrollY?: number;
}

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

export default EnhancedFloatingObjects;
