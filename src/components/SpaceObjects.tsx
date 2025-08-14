import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

interface SpaceObjectProps {
  position: [number, number, number];
  scrollProgress: number;
  type: 'planet' | 'asteroid' | 'satellite' | 'star';
  onDestroy?: () => void;
}

export const SpaceObject: React.FC<SpaceObjectProps> = ({
  position,
  scrollProgress,
  type,
  onDestroy
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(position);
  const destroyed = useRef(false);

  useFrame((state) => {
    if (!meshRef.current || destroyed.current) return;

    const mesh = meshRef.current;
    const blackHolePosition = new THREE.Vector3(0, 0, 0);
    const currentPosition = new THREE.Vector3(...initialPosition.current);
    
    // Calculate gravitational pull based on scroll progress
    const pullStrength = Math.pow(scrollProgress, 2) * 2;
    const direction = blackHolePosition.clone().sub(currentPosition);
    const distance = direction.length();
    
    // Apply gravitational effect
    direction.normalize();
    const pullForce = direction.multiplyScalar(pullStrength);
    currentPosition.add(pullForce);
    
    // Add some orbital motion
    const time = state.clock.elapsedTime;
    const orbitOffset = new THREE.Vector3(
      Math.sin(time + position[0]) * 0.1,
      Math.cos(time + position[1]) * 0.1,
      Math.sin(time * 0.5 + position[2]) * 0.05
    );
    currentPosition.add(orbitOffset);
    
    mesh.position.copy(currentPosition);
    
    // Scale down as it gets closer to black hole
    const scale = Math.max(0.1, 1 - pullStrength * 0.3);
    mesh.scale.setScalar(scale);
    
    // Rotation for visual interest
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    
    // Check if object should be destroyed (too close to black hole)
    if (distance < 1.5 && !destroyed.current) {
      destroyed.current = true;
      onDestroy?.();
    }
  });

  const getObjectGeometry = () => {
    switch (type) {
      case 'planet':
        return <Sphere args={[0.3, 16, 16]} />;
      case 'asteroid':
        return <Icosahedron args={[0.2]} />;
      case 'satellite':
        return <Box args={[0.1, 0.05, 0.15]} />;
      case 'star':
        return <Sphere args={[0.1, 8, 8]} />;
    }
  };

  const getObjectMaterial = () => {
    switch (type) {
      case 'planet':
        return <meshStandardMaterial color="#4a7c59" roughness={0.8} />;
      case 'asteroid':
        return <meshStandardMaterial color="#666666" roughness={1.0} />;
      case 'satellite':
        return <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.2} />;
      case 'star':
        return (
          <meshBasicMaterial 
            color="#ffffff" 
            transparent
            opacity={0.8}
          />
        );
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {getObjectGeometry()}
      {getObjectMaterial()}
    </mesh>
  );
};

// Star field background
export const StarField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const starsPosition = React.useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={starsPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.005}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation={false}
      />
    </points>
  );
};