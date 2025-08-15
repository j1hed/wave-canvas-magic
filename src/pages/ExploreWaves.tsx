import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Environment, Sparkles, Html } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface WaveControlsProps {
  amplitude: number[]
  setAmplitude: (value: number[]) => void
  frequency: number[]
  setFrequency: (value: number[]) => void
  speed: number[]
  setSpeed: (value: number[]) => void
  isPlaying: boolean
  setIsPlaying: (value: boolean) => void
  particles: boolean
  setParticles: (value: boolean) => void
  onReset: () => void
}

function WaveControls({ 
  amplitude, setAmplitude, 
  frequency, setFrequency, 
  speed, setSpeed,
  isPlaying, setIsPlaying,
  particles, setParticles,
  onReset 
}: WaveControlsProps) {
  const navigate = useNavigate()

  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-4">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-background/80 backdrop-blur-sm border-primary/30"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="bg-background/80 backdrop-blur-sm border-primary/30"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <Card className="p-4 bg-background/80 backdrop-blur-sm border-primary/30">
          <h3 className="text-sm font-semibold mb-3 text-foreground">Amplitude</h3>
          <Slider
            value={amplitude}
            onValueChange={setAmplitude}
            max={2}
            min={0.1}
            step={0.1}
            className="w-full"
          />
          <span className="text-xs text-muted-foreground mt-1 block">{amplitude[0].toFixed(1)}</span>
        </Card>

        <Card className="p-4 bg-background/80 backdrop-blur-sm border-primary/30">
          <h3 className="text-sm font-semibold mb-3 text-foreground">Frequency</h3>
          <Slider
            value={frequency}
            onValueChange={setFrequency}
            max={2}
            min={0.1}
            step={0.1}
            className="w-full"
          />
          <span className="text-xs text-muted-foreground mt-1 block">{frequency[0].toFixed(1)}</span>
        </Card>

        <Card className="p-4 bg-background/80 backdrop-blur-sm border-primary/30">
          <h3 className="text-sm font-semibold mb-3 text-foreground">Speed</h3>
          <Slider
            value={speed}
            onValueChange={setSpeed}
            max={3}
            min={0.1}
            step={0.1}
            className="w-full"
          />
          <span className="text-xs text-muted-foreground mt-1 block">{speed[0].toFixed(1)}</span>
        </Card>

        <Card className="p-4 bg-background/80 backdrop-blur-sm border-primary/30">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Particles</h3>
              <Switch
                checked={particles}
                onCheckedChange={setParticles}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Interactive3DWave({ amplitude, frequency, speed, isPlaying, particles }: {
  amplitude: number
  frequency: number
  speed: number
  isPlaying: boolean
  particles: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_amplitude: { value: amplitude },
    u_frequency: { value: frequency },
    u_colorA: { value: new THREE.Color('#0ea5e9') },
    u_colorB: { value: new THREE.Color('#06b6d4') },
    u_colorC: { value: new THREE.Color('#8b5cf6') }
  }), [])

  const vertexShader = `
    uniform float u_time;
    uniform float u_amplitude;
    uniform float u_frequency;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      float wave1 = sin(pos.x * u_frequency + u_time) * u_amplitude;
      float wave2 = sin(pos.z * u_frequency * 0.7 + u_time * 1.3) * u_amplitude * 0.5;
      float wave3 = sin(pos.x * u_frequency * 1.2 + pos.z * u_frequency * 0.8 + u_time * 0.8) * u_amplitude * 0.3;
      
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
      
      float alpha = 0.8;
      
      gl_FragColor = vec4(color, alpha);
    }
  `

  useFrame((state) => {
    if (materialRef.current && isPlaying) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime * speed
      materialRef.current.uniforms.u_amplitude.value = amplitude
      materialRef.current.uniforms.u_frequency.value = frequency
    }
  })

  return (
    <group>
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[15, 15, 100, 100]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {particles && (
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
          <Sparkles count={100} scale={[15, 5, 15]} size={3} speed={0.6} color="#06b6d4" />
        </Float>
      )}
      
      {/* HTML overlay for title */}
      <Html
        position={[0, 4, 0]}
        center
        style={{
          color: '#0ea5e9',
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          pointerEvents: 'none',
          textShadow: '0 0 10px rgba(14, 165, 233, 0.5)'
        }}
      >
        Wave Explorer
      </Html>
    </group>
  )
}

export default function ExploreWaves() {
  const [amplitude, setAmplitude] = useState([0.8])
  const [frequency, setFrequency] = useState([0.5])
  const [speed, setSpeed] = useState([1.0])
  const [isPlaying, setIsPlaying] = useState(true)
  const [particles, setParticles] = useState(true)

  const handleReset = () => {
    setAmplitude([0.8])
    setFrequency([0.5])
    setSpeed([1.0])
    setIsPlaying(true)
    setParticles(true)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <WaveControls
        amplitude={amplitude}
        setAmplitude={setAmplitude}
        frequency={frequency}
        setFrequency={setFrequency}
        speed={speed}
        setSpeed={setSpeed}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        particles={particles}
        setParticles={setParticles}
        onReset={handleReset}
      />

      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#0ea5e9" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          <pointLight position={[0, 10, 0]} intensity={0.8} color="#06b6d4" />
          
          <Interactive3DWave
            amplitude={amplitude[0]}
            frequency={frequency[0]}
            speed={speed[0]}
            isPlaying={isPlaying}
            particles={particles}
          />
          
          <Environment preset="night" />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 6}
            autoRotate={false}
          />
        </Canvas>
      </div>

      {/* Info panel */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <Card className="p-4 bg-background/80 backdrop-blur-sm border-primary/30 max-w-md mx-auto">
          <h3 className="text-sm font-semibold mb-2 text-foreground">Controls</h3>
          <p className="text-xs text-muted-foreground">
            • Drag to rotate the view<br/>
            • Scroll to zoom in/out<br/>
            • Use sliders to control wave properties<br/>
            • Toggle particles and playback
          </p>
        </Card>
      </div>
    </div>
  )
}