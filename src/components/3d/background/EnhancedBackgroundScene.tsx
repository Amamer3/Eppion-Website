
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import EnhancedFloatingObjects from './EnhancedFloatingObjects';
import DistantParticles from './DistantParticles';
import BackgroundGlow from './BackgroundGlow';

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

export default EnhancedBackgroundScene;
