
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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

export default ConnectionLines;
