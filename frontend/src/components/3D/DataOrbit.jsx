import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

function CategoryTower({ position, height, color, label, amount }) {
  const towerRef = useRef();

  useFrame((state) => {
    if (!towerRef.current) {
      return;
    }

    // Subtle pulse gives life to bars without distracting from values.
    const pulse =
      1 + Math.sin(state.clock.elapsedTime * 1.6 + position[0]) * 0.02;
    towerRef.current.scale.set(pulse, 1, pulse);
  });

  return (
    <group ref={towerRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.55, 0.55, height, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>

      <mesh position={[0, height + 0.18, 0]}>
        <sphereGeometry args={[0.24, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
        />
      </mesh>

      <Text
        position={[0, height + 0.75, 0]}
        fontSize={0.35}
        color="#e5e7eb"
        anchorX="center"
        anchorY="middle"
      >
        {`${label}  $${Math.round(amount).toLocaleString()}`}
      </Text>
    </group>
  );
}

function Scene({ categories }) {
  const orbitRef = useRef();

  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += 0.0025;
    }
  });

  const maxValue = useMemo(
    () => Math.max(...categories.map((item) => item.value), 1),
    [categories],
  );

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <ringGeometry args={[4.4, 6.8, 64]} />
        <meshStandardMaterial
          color="#334155"
          emissive="#1e293b"
          emissiveIntensity={0.35}
        />
      </mesh>

      <group ref={orbitRef}>
        {categories.map((item, index) => {
          const angle = (index / categories.length) * Math.PI * 2;
          const radius = 5.4;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const height = 1.2 + (item.value / maxValue) * 5;

          return (
            <CategoryTower
              key={`${item.name}-${index}`}
              position={[x, 0, z]}
              height={height}
              color={item.fill}
              label={item.name}
              amount={item.value}
            />
          );
        })}
      </group>
    </group>
  );
}

export default function DataOrbit({ categories = [] }) {
  const hasData = categories.length > 0;
  const displayCategories = hasData
    ? categories
    : [{ name: "No Data", value: 1, fill: "#64748b" }];

  return (
    <Canvas
      camera={{ position: [0, 6, 14], fov: 50 }}
      className="w-full h-full"
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[8, 12, 5]} intensity={1.1} />
      <pointLight position={[-8, 6, -8]} intensity={0.7} color="#a855f7" />
      <Scene categories={displayCategories} />
      <OrbitControls enablePan={false} minDistance={9} maxDistance={20} />
    </Canvas>
  );
}
