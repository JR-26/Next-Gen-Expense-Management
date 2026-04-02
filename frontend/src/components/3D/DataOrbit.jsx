import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function DataPoint({ position, color, label }) {
  return (
    <group position={position}>
      <Sphere args={[0.4, 32, 32]}>
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
        />
      </Sphere>
      <pointLight color={color} intensity={2} distance={50} />
    </group>
  )
}

function RotatingOrbit() {
  const orbitRef = useRef()

  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.z += 0.005
    }
  })

  const orbits = [
    { radius: 5, points: 5, color: '#a855f7' },
    { radius: 8, points: 7, color: '#ec4899' },
    { radius: 11, points: 8, color: '#f43f5e' },
  ]

  return (
    <group ref={orbitRef}>
      {orbits.map((orbit, idx) => (
        <group key={idx}>
          <Line
            points={Array.from({ length: 128 }, (_, i) => {
              const angle = (i / 128) * Math.PI * 2
              return [
                Math.cos(angle) * orbit.radius,
                Math.sin(angle) * orbit.radius,
                0,
              ]
            })}
            color={orbit.color}
            lineWidth={1}
            transparent
            opacity={0.3}
          />
          {Array.from({ length: orbit.points }, (_, i) => {
            const angle = (i / orbit.points) * Math.PI * 2
            return (
              <DataPoint
                key={i}
                position={[
                  Math.cos(angle) * orbit.radius,
                  Math.sin(angle) * orbit.radius,
                  0,
                ]}
                color={orbit.color}
              />
            )
          })}
        </group>
      ))}
    </group>
  )
}

export default function DataOrbit() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 50 }}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <RotatingOrbit />
    </Canvas>
  )
}
