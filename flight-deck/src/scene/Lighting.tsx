export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.15} color="#c8d0d8" />
      {/* Warm key light — slightly amber, from upper-right */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.6}
        color="#ffe8c4"
        castShadow={false}
      />
      {/* Cooler fill — trace-tinted, from lower-left */}
      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.3}
        color="#6FC7D4"
      />
    </>
  );
}
