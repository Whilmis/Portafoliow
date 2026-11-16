import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { patchGlitchMaterial, GlitchPostShader } from "./avatarShaders.js";
import "./AvatarGlitch3D.css";

const MODEL_URL = "/models/avatar.glb";

const PRESETS = {
  bust: { target: new THREE.Vector3(0, 1.50, 0), dist: 1.55 },
  full: { target: new THREE.Vector3(0, 0.95, 0), dist: 3.75 },
};

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function AvatarGlitch3D({ onFail }) {
  const rootRef = useRef(null);
  const mountRef = useRef(null);
  const apiRef = useRef({});
  const failRef = useRef(onFail);
  const hudFpsRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [preset, setPreset] = useState("bust");
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    failRef.current = onFail;
  }, [onFail]);

  useEffect(() => {
    const mount = mountRef.current;
    const root = rootRef.current;
    if (!mount || !root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;

    // ── Renderer: Pure pitch-black void ───────────────────────
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch (err) {
      console.error("WebGL initialization failed", err);
      failRef.current?.();
      return;
    }
    let width = mount.clientWidth || 340;
    let height = mount.clientHeight || 440;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 1.0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.94;
    mount.appendChild(renderer.domElement);

    // ── Scene: High-Contrast Black & White Studio ─────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.08;

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.05, 50);
    camera.position.set(0, PRESETS.bust.target.y + 0.05, PRESETS.bust.dist);

    // Soft studio lighting without harsh specular glare
    scene.add(new THREE.AmbientLight(0xffffff, 0.22));

    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(-1.4, 2.6, 2.0);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.65);
    fill.position.set(1.4, 1.6, 1.8);
    scene.add(fill);

    const rim = new THREE.SpotLight(0xffffff, 12, 9, Math.PI / 4, 0.5, 2);
    rim.position.set(1.8, 2.2, -1.8);
    rim.target.position.set(0, 1.3, 0);
    scene.add(rim, rim.target);

    // ── Shared Glitch Uniforms ────────────────────────────────
    const U = {
      uTime: { value: 0 },
      uGlitch: { value: 0 },
    };

    // ── Model Loading & B&W Material Patching ─────────────────
    let mixer = null;
    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;
        model.traverse((o) => {
          if (!o.isMesh) return;
          o.frustumCulled = false;
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => {
            m.side = THREE.DoubleSide;
            // Matte editorial finish: eliminates plastic shine and harsh specular reflections
            m.roughness = Math.max(m.roughness ?? 0.6, 0.78);
            m.metalness = Math.min(m.metalness ?? 0, 0.10);
            patchGlitchMaterial(m, U);
          });
        });
        scene.add(model);

        if (gltf.animations?.length) {
          mixer = new THREE.AnimationMixer(model);
          mixer.clipAction(gltf.animations[0]).play();
        }
        setLoaded(true);
      },
      (ev) => {
        if (ev.total) setProgress(Math.round((ev.loaded / ev.total) * 100));
      },
      (err) => {
        console.error("Avatar load error:", err);
        failRef.current?.();
      }
    );

    // ── Post-processing: Chromatic Glitch + B&W Pass ──────────
    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(width, height);
    composer.addPass(new RenderPass(scene, camera));
    const glitchPass = new ShaderPass(GlitchPostShader);
    glitchPass.uniforms.uRes.value = [width, height];
    composer.addPass(glitchPass);
    composer.addPass(new OutputPass());

    // ── Controls: Smooth 360° Drag & Touch ────────────────────
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(PRESETS.bust.target);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false; // preserve page scroll
    controls.enablePan = false;
    controls.rotateSpeed = 0.75;
    controls.minPolarAngle = Math.PI * 0.30;
    controls.maxPolarAngle = Math.PI * 0.60;
    controls.autoRotate = !reduced;
    controls.autoRotateSpeed = 0.45;
    controls.update();

    let resumeTimer = null;
    const onStart = () => {
      controls.autoRotate = false;
      clearTimeout(resumeTimer);
      setInteracted(true);
    };
    const onEnd = () => {
      clearTimeout(resumeTimer);
      if (!reduced) resumeTimer = setTimeout(() => (controls.autoRotate = true), 3500);
    };
    controls.addEventListener("start", onStart);
    controls.addEventListener("end", onEnd);

    // Camera preset transition
    let tween = null;
    let currentPreset = "bust";
    const goTo = (name) => {
      currentPreset = name;
      const p = PRESETS[name];
      tween = {
        t: 0,
        fromT: controls.target.clone(),
        toT: p.target.clone(),
        fromP: camera.position.clone(),
        toP: new THREE.Vector3(p.target.x, p.target.y + 0.05, p.target.z + p.dist),
      };
    };

    // ── Glitch scheduler ──────────────────────────────────────
    let glitch = 0;
    let burstEnd = 0;
    let nextBurst = 2.4;
    let wasBursting = false;
    const triggerBurst = (t, dur = 0.42) => {
      burstEnd = t + dur;
      nextBurst = burstEnd + 3.0 + Math.random() * 3.8;
    };

    let downX = 0;
    let downY = 0;
    const onDown = (ev) => {
      downX = ev.clientX;
      downY = ev.clientY;
    };
    const onUp = (ev) => {
      if (Math.hypot(ev.clientX - downX, ev.clientY - downY) < 5) triggerBurst(clock.elapsedTime, 0.5);
    };
    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("pointerup", onUp);

    apiRef.current = {
      setPreset: goTo,
      reset: () => goTo(currentPreset),
      burst: () => triggerBurst(clock.elapsedTime, 0.6),
    };

    // ── Resize & visibility ───────────────────────────────────
    const ro = new ResizeObserver(() => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
      glitchPass.uniforms.uRes.value = [width, height];
    });
    ro.observe(mount);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.01 });
    io.observe(mount);

    // ── Animation Loop ────────────────────────────────────────
    const clock = new THREE.Clock();
    let hudAcc = 0;
    let frames = 0;
    let raf = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      if (!visible || document.hidden) return;

      if (!reduced && t > nextBurst) triggerBurst(t, 0.16 + Math.random() * 0.35);
      const bursting = t < burstEnd;
      const target = bursting ? 0.65 + Math.random() * 0.35 : 0;
      glitch += (target - glitch) * (bursting ? 0.5 : 0.16);
      if (bursting !== wasBursting) {
        root.classList.toggle("is-glitching", bursting);
        wasBursting = bursting;
      }

      U.uTime.value = t;
      U.uGlitch.value = glitch;
      glitchPass.uniforms.uTime.value = t;
      glitchPass.uniforms.uGlitch.value = glitch;

      rim.intensity = 12 + glitch * 12 + Math.sin(t * 2.5) * 2;

      if (mixer) mixer.update(dt);

      if (tween) {
        tween.t = Math.min(tween.t + dt / 0.85, 1);
        const k = easeInOut(tween.t);
        controls.target.lerpVectors(tween.fromT, tween.toT, k);
        camera.position.lerpVectors(tween.fromP, tween.toP, k);
        if (tween.t >= 1) tween = null;
      }
      controls.update();

      composer.render(dt);

      // Throttled FPS indicator
      frames++;
      hudAcc += dt;
      if (hudAcc > 0.25) {
        const fps = Math.round(frames / hudAcc);
        frames = 0;
        hudAcc = 0;
        if (hudFpsRef.current) hudFpsRef.current.textContent = `${fps} FPS`;
      }
    };
    loop();

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      ro.disconnect();
      io.disconnect();
      controls.removeEventListener("start", onStart);
      controls.removeEventListener("end", onEnd);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointerup", onUp);
      controls.dispose();
      mixer?.stopAllAction();
      scene.traverse((o) => {
        o.geometry?.dispose();
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        mats.forEach((m) => {
          Object.values(m).forEach((v) => v?.isTexture && v.dispose());
          m.dispose();
        });
      });
      envTex.dispose();
      pmrem.dispose();
      composer.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      apiRef.current = {};
    };
  }, []);

  const changePreset = (name) => {
    setPreset(name);
    apiRef.current.setPreset?.(name);
  };

  return (
    <div className="ag-root mz-breakdown-root" ref={rootRef}>
      <div className="ag-canvas" ref={mountRef} />

      {/* Subtle CRT sensor scanlines */}
      <div className="mz-scanlines" aria-hidden="true" />

      {/* Top minimal corner telemetry */}
      <div className="mz-meta mz-meta--tl" aria-hidden="true">
        <span className="mz-tag">WHILMIS PEREZ // B&amp;W GLITCH RIG</span>
      </div>
      <div className="mz-meta mz-meta--tr" aria-hidden="true">
        <span className="mz-tag" ref={hudFpsRef}>60 FPS</span>
      </div>

      {/* Loading state */}
      {!loaded && (
        <div className="mz-loading">
          <div className="mz-loading-title">INITIALIZING B&amp;W RIG</div>
          <div className="mz-loading-bar"><span style={{ width: `${progress}%` }} /></div>
          <div className="mz-loading-pct">{String(progress).padStart(3, "0")}%</div>
        </div>
      )}

      {/* Minimal Bottom Floating Controls */}
      <div className="mz-toolbar">
        <div className="mz-preset-group">
          <button
            type="button"
            className={preset === "bust" ? "active" : ""}
            onClick={() => changePreset("bust")}
            title="Vista retrato / busto"
          >
            BUST
          </button>
          <button
            type="button"
            className={preset === "full" ? "active" : ""}
            onClick={() => changePreset("full")}
            title="Vista cuerpo completo"
          >
            FULL
          </button>
        </div>

        <div className="mz-toolbar-right">
          <button
            type="button"
            className="mz-tool-btn mz-tool-btn--hot"
            onClick={() => apiRef.current.burst?.()}
            title="Disparar glitch analítico"
          >
            ⚡ GLITCH
          </button>
          <button
            type="button"
            className="mz-tool-btn"
            onClick={() => apiRef.current.reset?.()}
            title="Resetear ángulo de cámara"
          >
            ↺
          </button>
        </div>
      </div>

      {loaded && !interacted && (
        <div className="mz-hint">
          <span>✥</span> DRAG 360° · CLICK TO GLITCH
        </div>
      )}
    </div>
  );
}
