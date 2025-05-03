
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'instancedMesh': any;
      'sphereGeometry': any;
      'boxGeometry': any;
      'octahedronGeometry': any;
      'meshStandardMaterial': any;
      'meshPhongMaterial': any;
      'lineBasicMaterial': any;
      'bufferGeometry': any;
      'bufferAttribute': any;
      'group': any;
      'ambientLight': any;
      'pointLight': any;
      'mesh': any;
    }
  }
}
