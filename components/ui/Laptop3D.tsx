'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshReflectorMaterial, RoundedBox } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

// ─── Screen glow plane ───────────────────────────────────────────────────────
function ScreenGlow() {
  const glowRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.15 + Math.sin(clock.elapsedTime * 1.4) * 0.16;
    }
  });
  return (
    <mesh ref={glowRef} position={[0, 0, 0.012]}>
      <planeGeometry args={[2.55, 1.62]} />
      <meshStandardMaterial
        color="#07101d"
        emissive="#00b8ff"
        emissiveIntensity={1.15}
        roughness={0.05}
        metalness={0}
      />
    </mesh>
  );
}

// ─── Stylized code bars (no external font dependency) ───────────────────────
const CODE_BARS = [
  { width: 1.35, x: -0.58, y: 0.58, color: '#c9d1d9' },
  { width: 1.62, x: -0.45, y: 0.42, color: '#79c0ff' },
  { width: 1.48, x: -0.52, y: 0.28, color: '#79c0ff' },
  { width: 0.82, x: -0.85, y: 0.14, color: '#d2a8ff' },
  { width: 1.05, x: -0.73, y: 0.00, color: '#ff7b72' },
  { width: 0.22, x: -1.13, y: -0.14, color: '#c9d1d9' },
  { width: 1.76, x: -0.38, y: -0.34, color: '#3d4a5a' },
  { width: 0.34, x: -1.05, y: -0.52, color: '#00ff8c' },
];

function ScreenContent() {
  return (
    <group position={[0, 0, 0.025]}>
      {/* scanline tint strips */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={i} position={[0, 0.72 - i * 0.12, 0.001]}>
          <planeGeometry args={[2.5, 0.06]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} />
        </mesh>
      ))}
      {/* pseudo code bars */}
      {CODE_BARS.map((bar, i) => (
        <mesh key={i} position={[bar.x, bar.y, 0.003]}>
          <planeGeometry args={[bar.width, 0.045]} />
          <meshBasicMaterial color={bar.color} transparent opacity={0.95} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Laptop lid (screen half) ─────────────────────────────────────────────────
function LaptopLid({ lidAngle }: { lidAngle: number }) {
  return (
    <group rotation={[lidAngle, 0, 0]} position={[0, 0.06, -1.32]}>
      {/* outer shell */}
      <RoundedBox args={[2.8, 1.85, 0.09]} radius={0.06} smoothness={7} position={[0, 0.925, 0]}>
        <meshStandardMaterial color="#c6cad4" roughness={0.18} metalness={0.95} />
      </RoundedBox>

      {/* screen bezel inset */}
      <mesh position={[0, 0.925, 0.048]}>
        <planeGeometry args={[2.68, 1.73]} />
        <meshStandardMaterial color="#0a0d14" roughness={0.24} metalness={0.1} />
      </mesh>

      {/* screen surface */}
      <group position={[0, 0.925, 0.05]}>
        <ScreenGlow />
        <ScreenContent />
      </group>

      {/* subtle screen edge glow */}
      <mesh position={[0, 0.925, 0.053]}>
        <planeGeometry args={[2.55, 1.62]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} />
      </mesh>

      {/* Apple-style logo dot on back */}
      <mesh position={[0, 0.925, -0.048]}>
        <circleGeometry args={[0.14, 32]} />
        <meshStandardMaterial color="#4e5362" roughness={0.08} metalness={1} emissive="#00d4ff" emissiveIntensity={0.12} />
      </mesh>
    </group>
  );
}

// ─── Laptop base (keyboard half) ─────────────────────────────────────────────
function LaptopBase() {
  const keyCols = 13;
  const keyRows = 4;
  const keys = useMemo(() => {
    const list = [];
    for (let r = 0; r < keyRows; r++) {
      for (let c = 0; c < keyCols; c++) {
        list.push({
          x: -1.17 + c * 0.195,
          z: -0.72 + r * 0.21,
          w: r === keyRows - 1 && c === 5 ? 0.78 : 0.155,
        });
      }
    }
    return list;
  }, []);

  return (
    <group>
      {/* base shell */}
      <RoundedBox args={[2.8, 0.14, 2.7]} radius={0.05} smoothness={7} position={[0, 0, 0]}>
        <meshStandardMaterial color="#c7cbd6" roughness={0.16} metalness={0.96} />
      </RoundedBox>

      {/* top deck */}
      <mesh position={[0, 0.072, 0]}>
        <planeGeometry args={[2.76, 2.66]} />
        <meshStandardMaterial color="#111620" roughness={0.22} metalness={0.72} />
      </mesh>

      {/* keyboard plate */}
      <mesh position={[0, 0.075, 0.1]}>
        <planeGeometry args={[2.55, 1.78]} />
        <meshStandardMaterial color="#0e121b" roughness={0.36} metalness={0.45} />
      </mesh>

      {/* individual key caps */}
      {keys.map((k, i) => (
        <RoundedBox
          key={i}
          args={[k.w, 0.025, 0.165]}
          radius={0.025}
          smoothness={6}
          position={[k.x, 0.088, k.z + 0.08]}
        >
          <meshStandardMaterial color="#1b2030" roughness={0.32} metalness={0.62} />
        </RoundedBox>
      ))}

      {/* trackpad */}
      <RoundedBox args={[0.85, 0.008, 0.58]} radius={0.03} smoothness={6} position={[0, 0.076, 0.88]}>
        <meshStandardMaterial color="#3a4152" roughness={0.08} metalness={0.92} />
      </RoundedBox>

      {/* bottom rubber feet */}
      {[[-1.2, 1.15], [1.2, 1.15], [-1.2, -1.15], [1.2, -1.15]].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.075, z]}>
          <cylinderGeometry args={[0.09, 0.09, 0.02, 16]} />
          <meshStandardMaterial color="#222" roughness={0.9} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Reflection floor ─────────────────────────────────────────────────────────
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.85, 0]}>
      <planeGeometry args={[14, 14]} />
      <MeshReflectorMaterial
        blur={[0, 0]}
        resolution={1024}
        mixBlur={0.1}
        mixStrength={24}
        roughness={0.52}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#0f1220"
        metalness={0.75}
        mirror={0.25}
      />
    </mesh>
  );
}

// ─── Full laptop assembled ────────────────────────────────────────────────────
function Laptop() {
  const groupRef = useRef<THREE.Group>(null);
  const lidAngle = -Math.PI * 0.48; // ~86° open

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.18;
    }
  });

  return (
    <Float speed={1.4} floatIntensity={0.22} rotationIntensity={0.05}>
      <group ref={groupRef} rotation={[0.14, 0.38, 0]} scale={1.22}>
        <LaptopBase />
        <LaptopLid lidAngle={lidAngle} />
      </group>
    </Float>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* ambient + directional */}
      <ambientLight intensity={0.38} />
      <directionalLight position={[4, 6, 3]} intensity={1.8} color="#ffffff" castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.7} color="#7dd3fc" />
      {/* screen spill glow */}
      <pointLight position={[0, 1.2, 0.6]} intensity={2.2} color="#00d4ff" distance={4.5} decay={2} />
      <pointLight position={[0, 0.8, 0.4]} intensity={1.1} color="#38bdf8" distance={3.5} decay={2} />

      <Laptop />
      <Floor />

      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 2.1}
        minAzimuthAngle={-Math.PI / 5}
        maxAzimuthAngle={Math.PI / 5}
        autoRotate
        autoRotateSpeed={0.45}
      />
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function Laptop3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.55, 4.2], fov: 34, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}