/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { Suspense, memo, useEffect, useRef, useState } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import {
  Image,
  MeshTransmissionMaterial,
  Preload,
  Text,
  useFBO,
  useGLTF,
} from "@react-three/drei";
import { easing } from "maath";

export default function FluidGlass({ mode = "lens", lensProps = {}, barProps = {}, cubeProps = {} }) {
  const Wrapper = mode === "bar" ? Bar : mode === "cube" ? Cube : Lens;
  const modeProps = mode === "bar" ? barProps : mode === "cube" ? cubeProps : lensProps;

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.7]}>
      <Suspense fallback={null}>
        <Wrapper modeProps={modeProps}>
          <Typography />
          <SceneImages />
          <Preload />
        </Wrapper>
      </Suspense>
    </Canvas>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}) {
  const ref = useRef(null);
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    const geo = nodes[geometryKey]?.geometry;
    if (!geo) return;

    geo.computeBoundingBox();
    geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;

    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if (modeProps.scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.2, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x050505, 1);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;
  const geometry = nodes[geometryKey]?.geometry;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.22}
        rotation-x={Math.PI / 2}
        geometry={geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...props }) {
  return (
    <ModeWrapper
      glb="/assets/3d/lens.glb"
      geometryKey="Cylinder"
      followPointer
      modeProps={modeProps}
      {...props}
    />
  );
}

function Cube({ modeProps, ...props }) {
  return (
    <ModeWrapper
      glb="/assets/3d/cube.glb"
      geometryKey="Cube"
      followPointer
      modeProps={modeProps}
      {...props}
    />
  );
}

function Bar({ modeProps = {}, ...props }) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: "#ffffff",
    attenuationColor: "#ffffff",
    attenuationDistance: 0.25,
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...props}
    />
  );
}

function SceneImages() {
  const group = useRef(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.55) * 0.08;
    group.current.rotation.z = Math.sin(t * 0.28) * 0.018;
  });

  return (
    <group ref={group}>
      <Image position={[-2.25, 0.05, 1.2]} scale={[2.1, 1.3, 1]} url="/assets/fur-material-close-bg.jpg" />
      <Image position={[2.2, -0.18, 2.5]} scale={[2.2, 1.18, 1]} url="/assets/fur-characters-bg.png" />
      <Image position={[0, -1.55, 3.1]} scale={[2.65, 1.1, 1]} url="/assets/hero-fur-hat.png" />
    </group>
  );
}

function Typography() {
  const [fontSize, setFontSize] = useState(0.5);

  useEffect(() => {
    const onResize = () => setFontSize(window.innerWidth <= 760 ? 0.3 : 0.5);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <group>
      <Text
        position={[0, 0.82, 4.5]}
        fontSize={fontSize}
        letterSpacing={0}
        outlineWidth={0}
        outlineBlur="18%"
        outlineColor="#000"
        outlineOpacity={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        SS4
      </Text>
      <Text
        position={[0, 0.26, 4.7]}
        fontSize={fontSize * 0.22}
        letterSpacing={0}
        color="#f5f5f0"
        anchorX="center"
        anchorY="middle"
      >
        TEXTURE EXPLORATION
      </Text>
      <Text
        position={[0, -0.08, 4.8]}
        fontSize={fontSize * 0.13}
        letterSpacing={0}
        color="#c9905e"
        anchorX="center"
        anchorY="middle"
      >
        fluid glass / refraction / material response
      </Text>
    </group>
  );
}
