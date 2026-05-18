import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SparkRenderer, SplatMesh } from "@sparkjsdev/spark";

function fitSplatToView(mesh, pivot, camera, controls) {
  const box = mesh.getBoundingBox?.(true) || new THREE.Box3().setFromObject(mesh);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const maxAxis = Math.max(size.x, size.y, size.z, 0.0001);
  const scale = 2.22 / maxAxis;

  mesh.position.copy(center).multiplyScalar(-1);
  mesh.scale.setScalar(1);
  mesh.rotation.set(0, 0, 0);
  pivot.position.set(0, 0, 0);
  pivot.scale.setScalar(scale);
  pivot.rotation.set(0, -0.2, Math.PI);
  mesh.updateMatrixWorld(true);
  pivot.updateMatrixWorld(true);

  const distance = 4.85;
  camera.position.set(0, 0.08, distance);
  camera.near = 0.01;
  camera.far = Math.max(100, distance * 8);
  camera.updateProjectionMatrix();

  controls.target.set(0, 0, 0);
  controls.minDistance = 1.6;
  controls.maxDistance = 8;
  controls.update();
}

export default function GaussianSplatViewer({
  modelUrl,
  src,
  height = "100%",
  autoRotate = true,
  className = "",
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const splatRef = useRef(null);
  const sparkRef = useRef(null);
  const frameRef = useRef(0);
  const resizeObserverRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  const url = modelUrl || src;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !url) return undefined;

    let disposed = false;
    setStatus("loading");
    setMessage("");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);
    let renderFrame = () => {};
    let splatInitialized = false;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.rotateSpeed = 0.42;
    controls.zoomSpeed = 0.72;
    controls.panSpeed = 0.58;
    controlsRef.current = controls;

    const spark = new SparkRenderer({
      renderer,
      sortRadial: true,
      minPixelRadius: 0,
      maxPixelRadius: 768,
      maxStdDev: Math.sqrt(8),
      falloff: 1,
      focalAdjustment: 1,
      transparent: true,
      onDirty: () => {
        if (!disposed) renderFrame();
      },
    });
    scene.add(spark);
    sparkRef.current = spark;
    const modelPivot = new THREE.Group();
    scene.add(modelPivot);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const nextHeight = Math.max(1, Math.floor(rect.height));
      camera.aspect = width / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, nextHeight, false);
      spark.setDirty();
    };

    const splat = new SplatMesh({
      url,
      lod: false,
      onProgress: (event) => {
        if (!disposed && event.lengthComputable && event.total) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setMessage(`${percent}%`);
        }
      },
      onLoad: (mesh) => {
        if (disposed) return;
        fitSplatToView(mesh, modelPivot, camera, controls);
        setStatus("ready");
        setMessage("");
        spark.setDirty();
      },
    });

    splatRef.current = splat;
    modelPivot.add(splat);
    resize();

    resizeObserverRef.current = new ResizeObserver(resize);
    resizeObserverRef.current.observe(container);

    splat.initialized
      .then(() => {
        splatInitialized = true;
      })
      .catch((error) => {
        if (disposed) return;
        setStatus("error");
        setMessage(error?.message || "Gaussian model load failed");
      });

    renderFrame = () => {
      if (disposed) return;
      renderer.render(scene, camera);
    };

    function animate() {
      if (disposed) return;

      if (autoRotate && status !== "error") {
        modelPivot.rotation.y += 0.001;
        spark.setDirty();
      }

      controls.update();
      renderer.render(scene, camera);
      frameRef.current = window.requestAnimationFrame(animate);
    }

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameRef.current);
      resizeObserverRef.current?.disconnect();
      controls.dispose();
      if (splatInitialized) {
        splat.dispose();
      } else {
        splat.initialized
          .catch(() => undefined)
          .finally(() => splat.dispose());
      }
      spark.dispose();
      renderer.dispose();
      renderer.forceContextLoss?.();
      renderer.domElement.remove();
      rendererRef.current = null;
      controlsRef.current = null;
      splatRef.current = null;
      sparkRef.current = null;
    };
  }, [url, autoRotate]);

  return (
    <div className={`gaussian-splat-viewer ${className}`.trim()} style={{ height }}>
      <div className="gaussian-splat-stage" ref={containerRef} />
      {status !== "ready" ? (
        <div className="gaussian-splat-loading">
          {status === "loading" ? `LOADING GAUSSIAN MODEL ${message}` : `MODEL LOAD FAILED / ${message}`}
        </div>
      ) : null}
      <div className="gaussian-splat-vignette" aria-hidden="true" />
      <div className="gaussian-splat-caption">
        <span>Gaussian Splatting Preview</span>
        <strong>毛绒材质空间预览</strong>
        <p>真实 3DGS 渲染 / 支持旋转、缩放、平移 / SS4 持续推进高斯技术，下一个版本将会上线</p>
      </div>
    </div>
  );
}
