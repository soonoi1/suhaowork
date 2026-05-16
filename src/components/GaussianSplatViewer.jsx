import { useEffect, useRef, useState } from "react";

function parseSplatBuffer(buffer) {
  const rowLength = 32;
  const view = new DataView(buffer);
  const count = Math.floor(buffer.byteLength / rowLength);
  const rawPositions = new Float32Array(count * 3);
  const rawColors = new Float32Array(count * 3);
  const rawSizes = new Float32Array(count);
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];

  for (let index = 0; index < count; index += 1) {
    const offset = index * rowLength;
    const x = view.getFloat32(offset, true);
    const y = view.getFloat32(offset + 4, true);
    const z = view.getFloat32(offset + 8, true);

    rawPositions[index * 3] = x;
    rawPositions[index * 3 + 1] = y;
    rawPositions[index * 3 + 2] = z;

    min[0] = Math.min(min[0], x);
    min[1] = Math.min(min[1], y);
    min[2] = Math.min(min[2], z);
    max[0] = Math.max(max[0], x);
    max[1] = Math.max(max[1], y);
    max[2] = Math.max(max[2], z);

    rawColors[index * 3] = view.getUint8(offset + 24) / 255;
    rawColors[index * 3 + 1] = view.getUint8(offset + 25) / 255;
    rawColors[index * 3 + 2] = view.getUint8(offset + 26) / 255;

    const scaleX = Math.abs(view.getFloat32(offset + 12, true));
    const scaleY = Math.abs(view.getFloat32(offset + 16, true));
    const scaleZ = Math.abs(view.getFloat32(offset + 20, true));
    rawSizes[index] = Math.min(18, Math.max(2.2, Math.max(scaleX, scaleY, scaleZ) * 210));
  }

  const center = [
    (min[0] + max[0]) / 2,
    (min[1] + max[1]) / 2,
    (min[2] + max[2]) / 2,
  ];
  const maxDimension = Math.max(max[0] - min[0], max[1] - min[1], max[2] - min[2]) || 1;
  const fitScale = 1.85 / maxDimension;
  const order = Array.from({ length: count }, (_, index) => index).sort(
    (a, b) => rawPositions[a * 3 + 2] - rawPositions[b * 3 + 2],
  );
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let sortedIndex = 0; sortedIndex < count; sortedIndex += 1) {
    const sourceIndex = order[sortedIndex];
    positions[sortedIndex * 3] = (rawPositions[sourceIndex * 3] - center[0]) * fitScale;
    positions[sortedIndex * 3 + 1] = (rawPositions[sourceIndex * 3 + 1] - center[1]) * fitScale;
    positions[sortedIndex * 3 + 2] = (rawPositions[sourceIndex * 3 + 2] - center[2]) * fitScale;
    colors[sortedIndex * 3] = rawColors[sourceIndex * 3];
    colors[sortedIndex * 3 + 1] = rawColors[sourceIndex * 3 + 1];
    colors[sortedIndex * 3 + 2] = rawColors[sourceIndex * 3 + 2];
    sizes[sortedIndex] = rawSizes[sourceIndex];
  }

  return { positions, colors, sizes, count };
}

export default function GaussianSplatViewer({ src, className = "" }) {
  const rootRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);
  const dragRef = useRef({ active: false, x: 0, y: 0 });
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let disposed = false;
    const rootElement = rootRef.current;
    if (!rootElement) return undefined;

    async function setupViewer() {
      try {
        setStatus("loading");
        const THREE = await import("three");
        const response = await fetch(src);
        if (!response.ok) throw new Error(`Unable to load splat model: ${response.status}`);
        const buffer = await response.arrayBuffer();
        if (disposed) return;

        const { positions, colors, sizes } = parseSplatBuffer(buffer);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);
        camera.position.set(0, -0.15, 4.15);
        camera.lookAt(0, 0, 0);
        camera.up.set(0, -1, 0);

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);
        rootElement.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("splatColor", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("splatSize", new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          depthTest: false,
          vertexColors: true,
          blending: THREE.NormalBlending,
          uniforms: {
            pixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
            sizeBoost: { value: 1.18 },
          },
          vertexShader: `
            attribute vec3 splatColor;
            attribute float splatSize;
            varying vec3 vColor;
            uniform float pixelRatio;
            uniform float sizeBoost;

            void main() {
              vColor = splatColor;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              float perspective = 300.0 / max(0.6, -mvPosition.z);
              gl_PointSize = clamp(splatSize * sizeBoost * perspective * pixelRatio, 1.4, 34.0);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;

            void main() {
              vec2 point = gl_PointCoord - vec2(0.5);
              float radius = dot(point, point);
              float alpha = exp(-radius * 9.0);
              if (alpha < 0.02) discard;
              gl_FragColor = vec4(vColor, alpha * 0.68);
            }
          `,
        });

        const points = new THREE.Points(geometry, material);
        points.rotation.set(-0.04, -1.46, 0);
        scene.add(points);

        const resize = () => {
          const rect = rootElement.getBoundingClientRect();
          const width = Math.max(1, Math.floor(rect.width));
          const height = Math.max(1, Math.floor(rect.height));
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };

        const animate = () => {
          if (disposed) return;
          points.rotation.y += 0.0011;
          renderer.render(scene, camera);
          frameRef.current = window.requestAnimationFrame(animate);
        };

        const onPointerDown = (event) => {
          dragRef.current = { active: true, x: event.clientX, y: event.clientY };
          rootElement.setPointerCapture?.(event.pointerId);
        };

        const onPointerMove = (event) => {
          if (!dragRef.current.active) return;
          const deltaX = event.clientX - dragRef.current.x;
          const deltaY = event.clientY - dragRef.current.y;
          dragRef.current.x = event.clientX;
          dragRef.current.y = event.clientY;
          points.rotation.y += deltaX * 0.006;
          points.rotation.x += deltaY * 0.003;
        };

        const onPointerUp = (event) => {
          dragRef.current.active = false;
          rootElement.releasePointerCapture?.(event.pointerId);
        };

        const onWheel = (event) => {
          event.preventDefault();
          camera.position.z = Math.min(6, Math.max(2.1, camera.position.z + event.deltaY * 0.002));
        };

        rootElement.addEventListener("pointerdown", onPointerDown);
        rootElement.addEventListener("pointermove", onPointerMove);
        rootElement.addEventListener("pointerup", onPointerUp);
        rootElement.addEventListener("pointerleave", onPointerUp);
        rootElement.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("resize", resize);
        resize();
        animate();
        setStatus("ready");

        rootElement.cleanupGaussianSplat = () => {
          rootElement.removeEventListener("pointerdown", onPointerDown);
          rootElement.removeEventListener("pointermove", onPointerMove);
          rootElement.removeEventListener("pointerup", onPointerUp);
          rootElement.removeEventListener("pointerleave", onPointerUp);
          rootElement.removeEventListener("wheel", onWheel);
          window.removeEventListener("resize", resize);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
        };
      } catch (error) {
        console.error("Failed to load Gaussian splat scene", error);
        if (!disposed) setStatus("error");
      }
    }

    setupViewer();

    return () => {
      disposed = true;
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      rootElement.cleanupGaussianSplat?.();
      rootElement.replaceChildren();
      rendererRef.current = null;
      delete rootElement.cleanupGaussianSplat;
    };
  }, [src]);

  return (
    <div className={`gaussian-splat-viewer ${className}`.trim()}>
      <div className="gaussian-splat-stage" ref={rootRef} />
      <div className="gaussian-splat-vignette" aria-hidden="true" />
      <div className="gaussian-splat-caption">
        <span>Gaussian Splat</span>
        <strong>毛绒材质空间预览</strong>
        <p>{status === "ready" ? "拖拽旋转 / 滚轮缩放" : status === "error" ? "模型加载失败" : "模型加载中"}</p>
      </div>
    </div>
  );
}
