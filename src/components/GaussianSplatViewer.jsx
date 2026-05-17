import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const SH_C0 = 0.28209479177387814;

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function sigmoid(value) {
  return 1 / (1 + Math.exp(-value));
}

function normalizePointCloud(points, colors, sizes) {
  const count = points.length / 3;
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];

  for (let index = 0; index < count; index += 1) {
    const base = index * 3;
    for (let axis = 0; axis < 3; axis += 1) {
      const value = points[base + axis];
      if (value < min[axis]) min[axis] = value;
      if (value > max[axis]) max[axis] = value;
    }
  }

  const center = [
    (min[0] + max[0]) / 2,
    (min[1] + max[1]) / 2,
    (min[2] + max[2]) / 2,
  ];
  const span = Math.max(max[0] - min[0], max[1] - min[1], max[2] - min[2], 0.0001);
  const scale = 2.35 / span;

  for (let index = 0; index < count; index += 1) {
    const base = index * 3;
    points[base] = (points[base] - center[0]) * scale;
    points[base + 1] = (points[base + 1] - center[1]) * scale;
    points[base + 2] = (points[base + 2] - center[2]) * scale;
  }

  return { points, colors, sizes, count };
}

function liftColor(value, gain = 1.42) {
  return clamp01(Math.pow(clamp01(value), 0.72) * gain + 0.035);
}

function parseBinarySplat(buffer) {
  const rowLength = 32;
  const count = Math.floor(buffer.byteLength / rowLength);
  const view = new DataView(buffer);
  const points = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const offset = index * rowLength;
    const pointBase = index * 3;
    points[pointBase] = view.getFloat32(offset, true);
    points[pointBase + 1] = -view.getFloat32(offset + 4, true);
    points[pointBase + 2] = -view.getFloat32(offset + 8, true);

    const scaleX = Math.abs(view.getFloat32(offset + 12, true));
    const scaleY = Math.abs(view.getFloat32(offset + 16, true));
    const scaleZ = Math.abs(view.getFloat32(offset + 20, true));
    sizes[index] = clamp01(Math.max(scaleX, scaleY, scaleZ) * 18) * 18 + 5;

    colors[pointBase] = liftColor(view.getUint8(offset + 24) / 255, 1.5);
    colors[pointBase + 1] = liftColor(view.getUint8(offset + 25) / 255, 1.42);
    colors[pointBase + 2] = liftColor(view.getUint8(offset + 26) / 255, 1.3);
  }

  return normalizePointCloud(points, colors, sizes);
}

function parseGaussianPly(buffer) {
  const headerBytes = new Uint8Array(buffer, 0, Math.min(buffer.byteLength, 24000));
  const headerText = new TextDecoder().decode(headerBytes);
  const headerEnd = headerText.indexOf("end_header");
  if (headerEnd < 0) throw new Error("Invalid PLY header");

  const header = headerText.slice(0, headerEnd);
  let dataOffset = headerEnd + "end_header".length;
  while (headerBytes[dataOffset] === 10 || headerBytes[dataOffset] === 13) {
    dataOffset += 1;
  }
  const vertexMatch = header.match(/element vertex\s+(\d+)/);
  const vertexCount = vertexMatch ? Number(vertexMatch[1]) : 0;
  if (!vertexCount) throw new Error("PLY vertex count missing");

  const properties = [];
  let inVertex = false;
  header.split(/\r?\n/).forEach((line) => {
    if (line.startsWith("element vertex")) {
      inVertex = true;
      return;
    }
    if (line.startsWith("element ") && !line.startsWith("element vertex")) {
      inVertex = false;
    }
    if (inVertex && line.startsWith("property ")) {
      const [, type, name] = line.trim().split(/\s+/);
      properties.push({ type, name });
    }
  });

  const typeSizes = {
    char: 1,
    uchar: 1,
    int8: 1,
    uint8: 1,
    short: 2,
    ushort: 2,
    int16: 2,
    uint16: 2,
    int: 4,
    uint: 4,
    int32: 4,
    uint32: 4,
    float: 4,
    float32: 4,
    double: 8,
    float64: 8,
  };
  const rowLength = properties.reduce((sum, property) => sum + (typeSizes[property.type] || 4), 0);
  const view = new DataView(buffer, dataOffset);
  const points = new Float32Array(vertexCount * 3);
  const colors = new Float32Array(vertexCount * 3);
  const sizes = new Float32Array(vertexCount);

  const readValue = (property, offset) => {
    switch (property.type) {
      case "uchar":
      case "uint8":
        return view.getUint8(offset);
      case "char":
      case "int8":
        return view.getInt8(offset);
      case "ushort":
      case "uint16":
        return view.getUint16(offset, true);
      case "short":
      case "int16":
        return view.getInt16(offset, true);
      case "uint":
      case "uint32":
        return view.getUint32(offset, true);
      case "int":
      case "int32":
        return view.getInt32(offset, true);
      case "double":
      case "float64":
        return view.getFloat64(offset, true);
      default:
        return view.getFloat32(offset, true);
    }
  };

  for (let index = 0; index < vertexCount; index += 1) {
    const values = {};
    let offset = index * rowLength;
    properties.forEach((property) => {
      values[property.name] = readValue(property, offset);
      offset += typeSizes[property.type] || 4;
    });

    const pointBase = index * 3;
    points[pointBase] = values.x || 0;
    points[pointBase + 1] = -(values.y || 0);
    points[pointBase + 2] = -(values.z || 0);

    colors[pointBase] = liftColor(0.5 + SH_C0 * (values.f_dc_0 || 0), 1.5);
    colors[pointBase + 1] = liftColor(0.5 + SH_C0 * (values.f_dc_1 || 0), 1.42);
    colors[pointBase + 2] = liftColor(0.5 + SH_C0 * (values.f_dc_2 || 0), 1.3);

    const opacity = sigmoid(values.opacity || 0);
    const scale = Math.max(
      Math.exp(values.scale_0 || -4),
      Math.exp(values.scale_1 || -4),
      Math.exp(values.scale_2 || -4),
    );
    sizes[index] = clamp01(scale * 14) * 18 + opacity * 9 + 4;
  }

  return normalizePointCloud(points, colors, sizes);
}

function PointCloudModel({ data }) {
  const pointsRef = useRef(null);
  const geometry = useMemo(() => {
    const nextGeometry = new THREE.BufferGeometry();
    nextGeometry.setAttribute("position", new THREE.BufferAttribute(data.points, 3));
    nextGeometry.setAttribute("color", new THREE.BufferAttribute(data.colors, 3));
    nextGeometry.setAttribute("size", new THREE.BufferAttribute(data.sizes, 1));
    nextGeometry.computeBoundingSphere();
    return nextGeometry;
  }, [data]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.028,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.94,
        depthWrite: false,
        vertexColors: true,
        blending: THREE.NormalBlending,
      }),
    [],
  );

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0014;
    }
  });

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  return (
    <points ref={pointsRef} geometry={geometry} material={material} rotation={[0.08, 0.52, 0]} />
  );
}

function GaussianPointCloud({ src }) {
  const [state, setState] = useState({ status: "loading", data: null, message: "" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, message: "" });

    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (cancelled) return;
        const data = src.toLowerCase().endsWith(".ply")
          ? parseGaussianPly(buffer)
          : parseBinarySplat(buffer);
        setState({ status: "ready", data, message: "" });
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ status: "error", data: null, message: error.message || "Asset load failed" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (state.status === "loading") {
    return <div className="gaussian-splat-loading">LOADING GAUSSIAN MODEL</div>;
  }

  if (state.status === "error") {
    return <div className="gaussian-splat-loading">MODEL LOAD FAILED / {state.message}</div>;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 3.25], fov: 34, near: 0.01, far: 100 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#050505"]} />
      <PointCloudModel data={state.data} />
      <OrbitControls
        enablePan={false}
        enableZoom
        rotateSpeed={0.42}
        minDistance={2.2}
        maxDistance={5.8}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.82}
      />
    </Canvas>
  );
}

export default function GaussianSplatViewer({ src, className = "" }) {
  return (
    <div className={`gaussian-splat-viewer ${className}`.trim()}>
      <div className="gaussian-splat-stage">
        <GaussianPointCloud src={src} />
      </div>
      <div className="gaussian-splat-vignette" aria-hidden="true" />
      <div className="gaussian-splat-caption">
        <span>Gaussian Preview</span>
        <strong>毛绒材质空间预览</strong>
        <p>可拖拽旋转 / 支持 .splat 与 Gaussian PLY</p>
      </div>
    </div>
  );
}
