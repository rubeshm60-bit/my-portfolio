import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// 3D Glowing Particle Cloud that tracks mouse movement
function GlowingParticles() {
  const pointsRef = useRef();
  
  // Generate random points in a spherical/torus-like structure
  const count = 1500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create a particle ring / torus shape
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      
      // Torus knot equations
      const p = 3; // frequency parameters
      const q = 4;
      const r = 2.0 + 0.6 * Math.cos(q * u);
      
      const x = r * Math.cos(p * u);
      const y = r * Math.sin(p * u);
      const z = 0.6 * Math.sin(q * u);
      
      // Add random displacement for fuzziness
      arr[i * 3] = x + (Math.random() - 0.5) * 0.25;
      arr[i * 3 + 1] = y + (Math.random() - 0.5) * 0.25;
      arr[i * 3 + 2] = z + (Math.random() - 0.5) * 0.25;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const { pointer } = state;
    
    // Smoothly interpolate rotation toward mouse position
    const targetX = pointer.y * 0.5; // Up/down tilt
    const targetY = pointer.x * 0.5; // Left/right turn
    
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetX, 0.05);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetY, 0.05);
    
    // Constant slow drift rotation
    pointsRef.current.rotation.z += 0.002;
    
    // Wave effect on particles using shader/time
    const time = state.clock.getElapsedTime();
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      
      // Apply slight wave distortion along Z axis
      const dist = Math.sqrt(x*x + y*y);
      const wave = Math.sin(dist * 2 - time * 1.5) * 0.05;
      positionAttribute.setZ(i, positions[i * 3 + 2] + wave);
    }
    positionAttribute.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Subtitle/background floating element (e.g. wireframe sphere) for complexity
function WireframeObject() {
  const meshRef = useRef();

  useFrame((state) => {
    const { pointer } = state;
    
    // Rotate relative to mouse and time
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -pointer.y * 0.3, 0.03);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.x * 0.3, 0.03);
    meshRef.current.rotation.z += 0.001;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.6, 0.4, 120, 16]} />
      <meshBasicMaterial
        color="#8b5cf6"
        wireframe
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function Canvas3D() {
  return (
    <div className="canvas-container h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={['#030008']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#c084fc" />
        
        <GlowingParticles />
        <WireframeObject />

        {/* Post-Processing Composer for Hyperrealistic Glow */}
        <EffectComposer>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
