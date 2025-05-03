
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

// Import components
import NetworkGlobe from './3d/NetworkGlobe';
import EnhancedBackgroundScene from './3d/background/EnhancedBackgroundScene';
import BackgroundScene from './3d/background/BackgroundScene';

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

// Re-export components
export { NetworkGlobe, EnhancedBackgroundScene, BackgroundScene };
