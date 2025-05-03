
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DistantParticlesProps {
  count: number;
}

const DistantParticles: React.FC<DistantParticlesProps> = ({ count }) => {
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

export default DistantParticles;
