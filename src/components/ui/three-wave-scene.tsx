'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Text3D, Environment, Sparkles } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WaveGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_colorA: { value: new THREE.Color('#0ea5e9') },
    u_colorB: { value: new THREE.Color('#06b6d4') },
    u_colorC: { value: new THREE.Color('#8b5cf6') }
  }), [])

  const vertexShader = `
    uniform float u_time;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      float wave1 = sin(pos.x * 0.5 + u_time * 0.8) * 0.3;
      float wave2 = sin(pos.z * 0.3 + u_time * 1.2) * 0.2;
      float wave3 = sin(pos.x * 0.8 + pos.z * 0.4 + u_time * 1.5) * 0.15;
      
      pos.y += wave1 + wave2 + wave3;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = `
    uniform float u_time;
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;
    uniform vec3 u_colorC;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec2 uv = vUv;
      
      float wave = sin(vPosition.x * 0.1 + u_time * 0.5) * 0.5 + 0.5;
      float pulse = sin(u_time * 2.0) * 0.5 + 0.5;
      
      vec3 color = mix(u_colorA, u_colorB, wave);
      color = mix(color, u_colorC, pulse * 0.3);
      
      float alpha = smoothstep(0.0, 0.1, vPosition.y + 0.5);
      
      gl_FragColor = vec4(color, alpha * 0.8);
    }
  `

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null!)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(300 * 3)
    for (let i = 0; i < 300; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = Math.random() * 10 - 2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={300}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#0ea5e9" transparent opacity={0.6} />
    </points>
  )
}

export function ThreeWaveScene() {
  return (
    <div className="absolute inset-0 opacity-40">
      <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0ea5e9" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <Float
          speed={1.5}
          rotationIntensity={0.5}
          floatIntensity={0.3}
        >
          <WaveGeometry />
        </Float>
        
        <FloatingParticles />
        <Sparkles count={50} scale={[20, 10, 20]} size={2} speed={0.4} color="#06b6d4" />
        
        <Environment preset="night" />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}