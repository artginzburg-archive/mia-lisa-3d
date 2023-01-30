import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import './App.css';
import { Scene } from './components/Scene';

function App() {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="App" style={{ height: '100vh' }}>
      <Suspense
        fallback={
          <img
            src="./images/mialisa_logo.jpg"
            alt="Mia Lisa"
            style={{ width: '100%', height: '100%' }}
          />
        }
      >
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
      </Suspense>
    </div>
  );
}

export default App;
