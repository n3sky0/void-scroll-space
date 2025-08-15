import React, { useRef, useMemo } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { Sphere, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Black hole shader material
const BlackHoleMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color('#ff6600'),
    resolution: new THREE.Vector2(),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader - creates black hole effect with accretion disk
  `
    uniform float time;
    uniform vec3 color;
    uniform vec2 resolution;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    void main() {
      vec2 center = vec2(0.5, 0.5);
      vec2 uv = vUv;
      float dist = distance(uv, center);
      
      // Create black hole event horizon
      float horizon = 0.15;
      float accretionInner = 0.2;
      float accretionOuter = 0.45;
      
      vec3 finalColor = vec3(0.0);
      float alpha = 0.0;
      
      // Black hole center (complete darkness)
      if (dist < horizon) {
        finalColor = vec3(0.0);
        alpha = 1.0;
      }
      // Accretion disk
      else if (dist > accretionInner && dist < accretionOuter) {
        float accretionFactor = (dist - accretionInner) / (accretionOuter - accretionInner);
        
        // Create swirling pattern
        float angle = atan(uv.y - center.y, uv.x - center.x) + time * 2.0;
        float spiral = sin(angle * 8.0 + dist * 20.0 - time * 5.0) * 0.5 + 0.5;
        
        // Add noise for turbulence
        vec2 noiseCoord = uv * 10.0 + time * 0.5;
        float turbulence = noise(noiseCoord) * 0.3;
        
        // Create temperature gradient (hotter = more orange/white, cooler = more red)
        float temperature = (1.0 - accretionFactor) * spiral + turbulence;
        
        // Color based on temperature
        vec3 hotColor = vec3(1.0, 0.8, 0.3); // Hot white-orange
        vec3 mediumColor = vec3(1.0, 0.4, 0.1); // Orange
        vec3 coolColor = vec3(0.8, 0.2, 0.1); // Red
        
        if (temperature > 0.7) {
          finalColor = mix(mediumColor, hotColor, (temperature - 0.7) / 0.3);
        } else {
          finalColor = mix(coolColor, mediumColor, temperature / 0.7);
        }
        
        // Intensity based on spiral pattern and distance
        float intensity = spiral * (1.0 - accretionFactor) * 0.8;
        finalColor *= intensity;
        alpha = intensity * 0.9;
      }
      // Gravitational lensing glow
      else if (dist < accretionOuter + 0.1) {
        float glowFactor = 1.0 - ((dist - accretionOuter) / 0.1);
        finalColor = color * 0.3 * glowFactor;
        alpha = glowFactor * 0.3;
      }
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

// Extend the material
extend({ BlackHoleMaterial });

// Type declaration for TypeScript
declare module '@react-three/fiber' {
  interface ThreeElements {
    blackHoleMaterial: any;
  }
}

export const BlackHole: React.FC = () => {
  const materialRef = useRef<any>();
  const { size } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.resolution.set(size.width, size.height);
    }
  });

  return (
    <Sphere args={[2, 64, 64]} position={[0, 0, 0]}>
      <blackHoleMaterial
        ref={materialRef}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </Sphere>
  );
};

// Particle field around black hole
export const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      // Create particles in a sphere around the black hole
      const radius = Math.random() * 15 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#4a9eff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};