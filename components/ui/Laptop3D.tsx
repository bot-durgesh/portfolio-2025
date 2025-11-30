'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles, Environment, MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function FloatingCodeSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      sphereRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={sphereRef} args={[1, 64, 64]} scale={1}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function CodeRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ring1Ref.current) ring1Ref.current.rotation.z += 0.01;
    if (ring2Ref.current) ring2Ref.current.rotation.z -= 0.015;
    if (ring3Ref.current) ring3Ref.current.rotation.z += 0.008;
  });

  return (
    <group>
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.03, 16, 100]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <torusGeometry args={[2, 0.03, 16, 100]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <torusGeometry args={[2.2, 0.03, 16, 100]} />
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function FloatingShapes() {
  return (
    <group>
      {/* Wireframe Cube */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1} position={[-2, 1.5, 0]}>
        <Box args={[0.5, 0.5, 0.5]}>
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} wireframe />
        </Box>
      </Float>

      {/* Torus */}
      <Float speed={1.8} rotationIntensity={1} floatIntensity={1.2} position={[2, -0.8, 0.5]}>
        <Torus args={[0.4, 0.15, 16, 32]}>
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
        </Torus>
      </Float>

      {/* Solid Cube */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.3} position={[1.5, 1.5, -0.5]}>
        <Box args={[0.4, 0.4, 0.4]}>
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} />
        </Box>
      </Float>

      {/* Wireframe Sphere */}
      <Float speed={1.6} rotationIntensity={2} floatIntensity={0.8} position={[-1.5, -1.5, 0.3]}>
        <Sphere args={[0.35, 32, 32]}>
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} wireframe />
        </Sphere>
      </Float>

      {/* Small Octahedron */}
      <Float speed={1.4} rotationIntensity={1.3} floatIntensity={1.1} position={[-2, -0.5, -0.5]}>
        <mesh>
          <octahedronGeometry args={[0.35]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
        </mesh>
      </Float>

      {/* Small Tetrahedron */}
      <Float speed={1.7} rotationIntensity={1.8} floatIntensity={0.9} position={[1.8, -1.3, -0.3]}>
        <mesh>
          <tetrahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function FloatingParticles() {
  return (
    <group>
      <Sparkles count={80} scale={6} size={2} speed={0.3} color="#8b5cf6" />
      <Sparkles count={40} scale={5} size={1.5} speed={0.4} color="#3b82f6" />
      <Sparkles count={25} scale={7} size={2.5} speed={0.2} color="#ec4899" />
    </group>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <spotLight position={[0, 5, 0]} intensity={0.8} angle={0.6} penumbra={1} color="#ec4899" />

      <FloatingCodeSphere />
      <CodeRings />
      <FloatingShapes />
      <FloatingParticles />

      <Environment preset="night" />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.8}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.3}
        target={[0, 0, 0]}
      />
    </>
  );
}

function Loader() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#8b5cf6',
      fontSize: '20px',
      fontFamily: 'monospace',
      textAlign: 'center'
    }}>
      <div className="animate-pulse">Loading Experience...</div>
    </div>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ 
          position: [0, 0, 6], 
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </Canvas>
      <Suspense fallback={<Loader />}>
        <div style={{ display: 'none' }} />
      </Suspense>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}