import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import './App.css';
import { Scene } from './components/Scene';

function App() {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="App" style={{ height: '100vh' }}>
      <Canvas
        onPointerDown={() => {
          setAutoRotate(false);
        }}
        onPointerUp={() => {
          setAutoRotate(true);
        }}
      >
        <Scene autoRotate={autoRotate} />
      </Canvas>
    </div>
  );
}

export default App;
