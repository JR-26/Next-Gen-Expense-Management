import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedOrb({ position, speed, color, size }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.01
      meshRef.current.rotation.y += speed * 0.015
      meshRef.current.position.y += Math.sin(Date.now() * 0.001 * speed) * 0.02
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <Icosahedron args={[size, 4]}>
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          wireframe={false}
        />
      </Icosahedron>
      <pointLight position={[0, 0, 0]} color={color} intensity={2} distance={100} />
    </group>
  )
}

export default function FloatingOrbs() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 60 }}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <AnimatedOrb position={[-6, 3, 0]} speed={1} color="#a855f7" size={1.5} />
      <AnimatedOrb position={[6, -2, -3]} speed={1.5} color="#ec4899" size={1.2} />
      <AnimatedOrb position={[0, 0, -6]} speed={0.8} color="#f43f5e" size={1.8} />
      <AnimatedOrb position={[4, 4, -2]} speed={1.2} color="#6366f1" size={1.3} />
    </Canvas>
  )
}
