
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import FloatingObjects from './FloatingObjects';

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

export default BackgroundScene;
