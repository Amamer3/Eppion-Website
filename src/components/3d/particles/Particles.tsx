
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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

export default Particles;
