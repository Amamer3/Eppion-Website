
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingObjectsProps {
  count?: number;
  scrollY?: number;
}

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

export default FloatingObjects;
