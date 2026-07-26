export default function Lighting() {
  return (
    <>
      {/* Ambient base */}
      <ambientLight intensity={0.2} color="#c8d0d8" />

      {/* Key light — warm, from upper-right */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.0}
        color="#ffe8c4"
        castShadow
      />

      {/* Fill light — cool cyan tint, from lower-left */}
      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.5}
        color="#6FC7D4"
      />

      {/* Rim light — amber, from behind for silhouette edge */}
      <directionalLight
        position={[0, 3, -6]}
        intensity={0.7}
        color="#F2A63D"
      />

      {/* Bottom bounce light — subtle, from below */}
      <pointLight
        position={[0, -2, 0]}
        intensity={0.3}
        color="#1a3050"
        distance={10}
        decay={2}
      />
    </>
  );
}
