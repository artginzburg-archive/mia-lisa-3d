import {
  Center,
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  PresentationControls,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Group } from 'three';

import { Logo } from '../Logo';

export function Scene({ autoRotate }: { autoRotate: boolean }) {
  //#region this fixes the difference in autoRotateSpeed between browsers, that was happening due to framerate (e.g. Safari clamps it to 60, and Chrome allows up to 120).
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(13);
  useFrame((state, delta) => {
    setAutoRotateSpeed(delta * 500); // 750 was kinda fine, but maybe too fast
  });
  //#endregion

  return (
    <>
      <PresentationControls
        // enabled={false}
        // rotation={camera.rotation.reorder('ZXY').toArray() as any}
        global
        cursor={false}
        snap={{ mass: 5, tension: 400, friction: 26 }}
        zoom={1.1}
        polar={[-Math.PI / 4, Math.PI / 4]} // Vertical limits
        // azimuth={[-Infinity, Infinity]} // Horizontal limits
        speed={2}
      >
        <Center>
          {/* <Stage shadows={false} intensity={5}> */}
          {/* <Float
          speed={1} // Animation speed, defaults to 1
          rotationIntensity={1} // XYZ rotation intensity, defaults to 1
          floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[-1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        > */}
          <Logo />
          {/* </Float> */}
          {/* </Stage> */}
        </Center>
      </PresentationControls>
      <spotLight
        position={[0, 15, 0]}
        angle={0.3}
        penumbra={1}
        castShadow
        intensity={2}
        shadow-bias={-0.0001}
      />
      {/* <directionalLight position={[3.3, 1.0, 4.4]} intensity={4} /> */}
      {/* <Environment preset="sunset" /> */}
      <Environment frames={Infinity} resolution={16}>
        {/* Ceiling */}
        <Lightformer
          intensity={0.75}
          rotation-x={Math.PI / 2}
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
        />
        <MovingSpots />
        {/* Sides */}
        <Lightformer
          intensity={4}
          rotation-y={Math.PI / 2}
          position={[-5, 1, -1]}
          scale={[20, 0.1, 1]}
        />
        <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
        <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
        {/* Accent (red) */}
        <Float speed={5} floatIntensity={2} rotationIntensity={2}>
          <Lightformer
            form="ring"
            color="red" // TODO? change to white
            intensity={30}
            scale={10}
            position={[-15, 4, -18]}
            target={[0, 0, 0]}
          />
          {/* Flipped it so that the lighting exists on both sides of the heart */}
          <Lightformer
            form="ring"
            color="red"
            intensity={150}
            scale={10}
            position={[15, 4, 18]}
            target={[0, 0, 0]}
          />
        </Float>
        {/* Background */}
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          {/* <LayerMaterial side={THREE.BackSide}>
            <Color color="#444" alpha={1} mode="normal" />
            <Depth
              colorA="blue"
              colorB="black"
              alpha={0.5}
              mode="normal"
              near={0}
              far={300}
              origin={[100, 100, 100]}
            />
          </LayerMaterial> */}
          <meshStandardMaterial color={'#444'} />
        </mesh>
      </Environment>
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
        enableZoom={false}
        enablePan={false}
        enableDamping={false}
        enableRotate={false}
      />
    </>
  );
}

function MovingSpots({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    return (group.current.position.z += delta * 15) > 60 && (group.current.position.z = -60);
  });
  return (
    <group rotation={[0, 0.5, 0]}>
      <group ref={group}>
        {positions.map((x, i) => (
          <Lightformer
            key={i}
            form="circle"
            intensity={4}
            rotation={[Math.PI / 2, 0, 0]}
            position={[x, 4, i * 4]}
            scale={[3, 1, 1]}
          />
        ))}
      </group>
    </group>
  );
}
