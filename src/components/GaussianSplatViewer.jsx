import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Splat } from "@react-three/drei";

function SplatModel({ src }) {
  const groupRef = useRef(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef} position={[-0.03, -0.08, 0.02]} rotation={[-0.08, -1.42, 0]} scale={1.16}>
      <Splat src={src} alphaTest={0.02} toneMapped={false} chunkSize={50000} />
    </group>
  );
}

export default function GaussianSplatViewer({ src, className = "" }) {
  return (
    <div className={`gaussian-splat-viewer ${className}`.trim()}>
      <div className="gaussian-splat-stage">
        <Canvas
          camera={{ position: [0, 0, 3.55], fov: 32, near: 0.01, far: 100 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <color attach="background" args={["#050505"]} />
          <Suspense fallback={null}>
            <SplatModel src={src} />
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            rotateSpeed={0.45}
            minPolarAngle={Math.PI * 0.24}
            maxPolarAngle={Math.PI * 0.78}
          />
        </Canvas>
      </div>
      <div className="gaussian-splat-vignette" aria-hidden="true" />
      <div className="gaussian-splat-caption">
        <span>Gaussian Splat</span>
        <strong>毛绒材质空间预览</strong>
        <p>真实 Gaussian Splatting 渲染 / 拖拽旋转</p>
      </div>
    </div>
  );
}
