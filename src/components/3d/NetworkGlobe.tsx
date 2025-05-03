
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Particles from './particles/Particles';
import ConnectionLines from './particles/ConnectionLines';
import Globe from './globe/Globe';

interface NetworkGlobeProps {
  scale?: number;
}

const NetworkGlobe: React.FC<NetworkGlobeProps> = ({ scale = 1 }) => {
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

export default NetworkGlobe;
