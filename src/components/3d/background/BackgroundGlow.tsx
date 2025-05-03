
import * as THREE from 'three';

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

export default BackgroundGlow;
