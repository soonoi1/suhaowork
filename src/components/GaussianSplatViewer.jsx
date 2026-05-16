import { useEffect, useRef, useState } from "react";

export default function GaussianSplatViewer({
  src,
  className = "",
  sceneTransform = {},
}) {
  const rootRef = useRef(null);
  const viewerRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let disposed = false;
    const rootElement = rootRef.current;
    if (!rootElement) return undefined;

    async function loadScene() {
      try {
        setStatus("loading");
        const GaussianSplats3D = await import("@mkkellogg/gaussian-splats-3d");
        if (disposed || !rootElement) return;

        const viewer = new GaussianSplats3D.Viewer({
          rootElement,
          cameraUp: [0, -1, 0],
          initialCameraPosition: [0, -0.35, 3.2],
          initialCameraLookAt: [0, 0, 0],
          sharedMemoryForWorkers: false,
          gpuAcceleratedSort: false,
          integerBasedSort: false,
          antialiased: true,
          sphericalHarmonicsDegree: 0,
          selfDrivenMode: true,
        });

        viewerRef.current = viewer;

        await viewer.addSplatScene(src, {
          format: GaussianSplats3D.SceneFormat.Splat,
          showLoadingUI: false,
          progressiveLoad: true,
          splatAlphaRemovalThreshold: 4,
          position: sceneTransform.position || [0, 0, 0],
          rotation: sceneTransform.rotation || [0, 0, 0, 1],
          scale: sceneTransform.scale || [1.18, 1.18, 1.18],
        });

        if (disposed) return;
        viewer.start();
        setStatus("ready");
      } catch (error) {
        console.error("Failed to load Gaussian splat scene", error);
        if (!disposed) setStatus("error");
      }
    }

    loadScene();

    return () => {
      disposed = true;
      if (viewerRef.current) {
        viewerRef.current.dispose();
        viewerRef.current = null;
      }
      rootElement.replaceChildren();
    };
  }, [sceneTransform.position, sceneTransform.rotation, sceneTransform.scale, src]);

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
