import React, { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { BlackHole, ParticleField } from './BlackHole';
import { SpaceObject, StarField } from './SpaceObjects';
import * as THREE from 'three';

interface SpaceObjectData {
  id: string;
  position: [number, number, number];
  type: 'planet' | 'asteroid' | 'satellite' | 'star';
}

export const SpaceScene: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [spaceObjects, setSpaceObjects] = useState<SpaceObjectData[]>([]);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate space objects based on scroll progress
  useEffect(() => {
    const generateObjects = () => {
      const newObjects: SpaceObjectData[] = [];
      const objectCount = Math.floor(scrollProgress * 50); // More objects as user scrolls

      for (let i = 0; i < objectCount; i++) {
        const types: ('planet' | 'asteroid' | 'satellite' | 'star')[] = 
          ['planet', 'asteroid', 'satellite', 'star'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        // Position objects around the scene, ready to be pulled in
        const radius = 8 + Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        newObjects.push({
          id: `object-${i}`,
          position: [
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
          ],
          type
        });
      }

      setSpaceObjects(newObjects);
    };

    generateObjects();
  }, [scrollProgress]);

  const handleObjectDestroy = useCallback((id: string) => {
    setSpaceObjects(prev => prev.filter(obj => obj.id !== id));
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#4a9eff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff6600" />

        {/* Background stars */}
        <StarField />
        <Stars radius={100} depth={50} count={1000} factor={2} saturation={0} fade />

        {/* Black hole and particle effects */}
        <BlackHole />
        <ParticleField />

        {/* Dynamic space objects */}
        {spaceObjects.map((obj) => (
          <SpaceObject
            key={obj.id}
            position={obj.position}
            type={obj.type}
            scrollProgress={scrollProgress}
            onDestroy={() => handleObjectDestroy(obj.id)}
          />
        ))}

        {/* Camera controls (optional - can be removed for pure scroll interaction) */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};