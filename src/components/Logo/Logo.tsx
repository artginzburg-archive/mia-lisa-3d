import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

export function Logo() {
  const logoGltf = useGLTF('models/glitr_heart.gltf');

  return (
    <Suspense fallback={null}>
      <primitive object={logoGltf.scene} />
    </Suspense>
  );
}
