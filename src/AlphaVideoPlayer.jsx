import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_FRAME = {
  videoW: 2000,
  videoH: 1000,
  w: 1000,
  h: 1000,
  aFrame: [0, 0, 1000, 1000],
  rgbFrame: [1000, 0, 1000, 1000],
};

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform sampler2D u_video;
  uniform vec4 u_alphaFrame;
  uniform vec4 u_rgbFrame;
  varying vec2 v_uv;

  void main() {
    vec2 rgbUv = u_rgbFrame.xy + v_uv * u_rgbFrame.zw;
    vec2 alphaUv = u_alphaFrame.xy + v_uv * u_alphaFrame.zw;
    vec3 color = texture2D(u_video, rgbUv).rgb;
    float alpha = texture2D(u_video, alphaUv).r;
    gl_FragColor = vec4(color, alpha);
  }
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(message || "Alpha video shader failed to compile.");
  }

  return shader;
}

function createProgram(gl) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(message || "Alpha video shader program failed to link.");
  }

  return program;
}

function normalizeFrame(frame) {
  const [x, y, width, height] = frame;

  return [
    x / DEFAULT_FRAME.videoW,
    1 - (y + height) / DEFAULT_FRAME.videoH,
    width / DEFAULT_FRAME.videoW,
    height / DEFAULT_FRAME.videoH,
  ];
}

function normalizeConfiguredFrame(frame, videoW, videoH) {
  const [x, y, width, height] = frame;

  return [
    x / videoW,
    1 - (y + height) / videoH,
    width / videoW,
    height / videoH,
  ];
}

function getFrameConfig(config = DEFAULT_FRAME) {
  const sourceConfig = config.landscape || config.portrait || config;
  const videoW = sourceConfig.videoW || DEFAULT_FRAME.videoW;
  const videoH = sourceConfig.videoH || DEFAULT_FRAME.videoH;
  const outputW = sourceConfig.w || sourceConfig.rgbFrame?.[2] || DEFAULT_FRAME.w;
  const outputH = sourceConfig.h || sourceConfig.rgbFrame?.[3] || DEFAULT_FRAME.h;

  if (!sourceConfig.videoW || !sourceConfig.videoH) {
    return {
      outputW,
      outputH,
      alphaFrame: normalizeFrame(sourceConfig.aFrame || DEFAULT_FRAME.aFrame),
      rgbFrame: normalizeFrame(sourceConfig.rgbFrame || DEFAULT_FRAME.rgbFrame),
    };
  }

  return {
    outputW,
    outputH,
    alphaFrame: normalizeConfiguredFrame(sourceConfig.aFrame || DEFAULT_FRAME.aFrame, videoW, videoH),
    rgbFrame: normalizeConfiguredFrame(sourceConfig.rgbFrame || DEFAULT_FRAME.rgbFrame, videoW, videoH),
  };
}

export function AlphaVideoPlayer({
  src,
  config = DEFAULT_FRAME,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  ariaLabel = "透明视频播放器",
}) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(0);
  const cleanupRef = useRef(null);
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const frame = useMemo(() => getFrameConfig(config), [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || !src) return undefined;

    let gl;
    let program;
    let texture;
    let destroyed = false;

    const stopRenderLoop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    cleanupRef.current = stopRenderLoop;

    try {
      gl = canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      });

      if (!gl) {
        setFallbackVisible(true);
        return stopRenderLoop;
      }

      program = createProgram(gl);
      gl.useProgram(program);

      const positionLocation = gl.getAttribLocation(program, "a_position");
      const alphaFrameLocation = gl.getUniformLocation(program, "u_alphaFrame");
      const rgbFrameLocation = gl.getUniformLocation(program, "u_rgbFrame");
      const videoLocation = gl.getUniformLocation(program, "u_video");
      const buffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      );
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      texture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.uniform1i(videoLocation, 0);
      gl.uniform4fv(alphaFrameLocation, frame.alphaFrame);
      gl.uniform4fv(rgbFrameLocation, frame.rgbFrame);
      gl.clearColor(0, 0, 0, 0);

      const render = () => {
        if (destroyed) return;

        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }

        rafRef.current = requestAnimationFrame(render);
      };

      render();

      return () => {
        destroyed = true;
        stopRenderLoop();
        if (gl && texture) gl.deleteTexture(texture);
        if (gl && buffer) gl.deleteBuffer(buffer);
        if (gl && program) gl.deleteProgram(program);
        cleanupRef.current = null;
      };
    } catch (error) {
      console.error(error);
      setFallbackVisible(true);
      return stopRenderLoop;
    }
  }, [frame.alphaFrame, frame.rgbFrame, src]);

  useEffect(() => () => cleanupRef.current?.(), []);

  return (
    <div className={`alpha-video-player ${className}`} aria-label={ariaLabel} role="img">
      <canvas ref={canvasRef} width={frame.outputW} height={frame.outputH} />
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload="auto"
        aria-hidden="true"
      />
      {fallbackVisible ? <video className="alpha-video-fallback" src={src} autoPlay={autoPlay} loop={loop} muted={muted} playsInline={playsInline} /> : null}
    </div>
  );
}
