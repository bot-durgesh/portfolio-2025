'use client';
import { Canvas } from '@react-three/fiber';
import { Text, Html, PresentationControls, useGLTF, Environment, Float, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';

function MacBookExperience() {
  const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');

  return (
    <>
      <PresentationControls
        global
        rotation={[0.13, -0.3, 0]} // Adjusted Y rotation to face left
        polar={[-0.4, 0.2]}
        azimuth={[-1.2, 0.8]} // Expanded azimuth range for better control
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.3}>
          {/* Screen Light - adjusted position to match laptop rotation */}
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={100}
            color={'#70cede'}
            rotation={[0.1, Math.PI - 0.3, 0]} // Adjusted rotation to match laptop
            position={[-0.4, 0.55, -1.0]} // Adjusted position
          />

          <primitive
            object={computer.scene}
            position-y={-1.2}
            scale={1.7}
          >
           

            <Html
              transform
              wrapperClass='htmlScreen'
              distanceFactor={1.17}
              position={[-0.25, 1.56, -1.4]} // Centered X position, moved Z closer to screen
              rotation-x={-0.256}
              rotation-y={0} // Remove Y rotation to keep content straight
            >
              <div
                style={{
                  width: '1024px',
                  height: '640px',
                  // background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
                  borderRadius: '12px',
                  padding: '20px',
                  fontFamily: 'monospace',
                  color: '#00ff88',
                  // fontSize: '50px', // Increased font size for better visibility
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                >
                {/* Terminal Header */}
                <div style={{
                fontSize: '40px', // Increased font size for better visibility
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '40px',
                  paddingBottom: '15px',
                  borderBottom: '2px solid #334155',
                  width: '100%'
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#f59e0b', borderRadius: '50%' }}></div>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                  </div>
                  <div style={{ marginLeft: '20px', color: '#64748b' }}>Terminal - Durgesh@MacBook-Pro</div>
                </div>

                {/* Simple Content - Just 3 lines */}
                <div style={{ textAlign: 'center', lineHeight: '2' }}>
                  <div style={{ marginBottom: '20px', fontSize: '40px' }}>
                    <span style={{ color: '#f59e0b' }}>Hello World!</span>{' '}
                    <span style={{ color: '#ffffff' }}>I'm</span>{' '}
                    <span style={{ color: '#3b82f6' }}>Durgesh Ankoji</span>
                  </div>

                  <div style={{ marginBottom: '20px', fontSize: '40px' }}>
                    
                    <span style={{ color: '#10b981' }}>Competitive Programmer</span>
                  </div>
                  <div style={{ marginBottom: '20px', fontSize: '40px' }}>
                    <span style={{ color: '#ec4899' }}>Full Stack Developer</span>{' '}
                    
                  </div>

                  <div style={{ fontSize: '40px', color: '#8b5cf6' }}>
                    Building amazing web experiences with passion ✨
                  </div>
                </div>

                

                
              </div>
            </Html>

          </primitive>


        </Float>
      </PresentationControls>

      <ContactShadows
        position-y={-1.4}
        opacity={0.4}
        scale={5}
        blur={2.4}
      />

      <Environment preset="city" />
    </>
  );
}

// Loading component
function Loader() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#00ff88',
      fontSize: '18px',
      fontFamily: 'monospace'
    }}>
      Loading MacBook...
    </div>
  );
}

export default function Laptop3D() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        shadows
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <MacBookExperience />
        </Suspense>
      </Canvas>
      <Suspense fallback={<Loader />}>
        <div style={{ display: 'none' }} />
      </Suspense>
    </div>
  );
}