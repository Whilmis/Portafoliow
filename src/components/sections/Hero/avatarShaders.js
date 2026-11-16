// ─────────────────────────────────────────────────────────────
//  Pure Black & White Editorial Glitch Shaders
//  1. High-contrast Black & White desaturation on all model materials
//  2. Crisp specular white rim lighting along silhouette
//  3. Lateral slice jitter during glitch bursts
//  4. Chromatic RGB channel split & CRT scanlines on post-processing
// ─────────────────────────────────────────────────────────────

// Dave Hoskins hash13
const HASH = /* glsl */ `
float gHash(vec3 p) {
  p = fract(p * vec3(0.1031, 0.1030, 0.0973));
  p += dot(p, p.yxz + 33.33);
  return fract((p.x + p.y) * p.z);
}
`;

const VERT_PARS = /* glsl */ `
uniform float uTime;
uniform float uGlitch;
${HASH}
`;

const VERT_MAIN = /* glsl */ `
{
  // Subtle lateral slice jitter during glitch bursts
  float sliceY = floor(transformed.y * 28.0);
  float tQuantum = floor(uTime * 20.0);
  float jitterActive = step(0.85, gHash(vec3(sliceY, tQuantum, 3.14))) * uGlitch;
  float jitterOffset = (gHash(vec3(sliceY, tQuantum, 7.89)) - 0.5) * 0.07 * jitterActive;
  transformed.x += jitterOffset;
}
`;

const FRAG_PARS = /* glsl */ `
uniform float uTime;
uniform float uGlitch;
`;

// High-contrast Black & White material conversion
const FRAG_BW = /* glsl */ `
float luma = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
// High-contrast curve: deep blacks, pure bright highlights
luma = pow(luma, 1.12);
diffuseColor.rgb = vec3(luma);
`;

// Crisp, subtle specular rim lighting along silhouette (softened to prevent glare)
const FRAG_RIM = /* glsl */ `
vec3 gV = normalize(vViewPosition);
vec3 gN = normalize(normal);
float gRim = 1.0 - clamp(abs(dot(gN, gV)), 0.0, 1.0);
totalEmissiveRadiance += vec3(1.0) * pow(gRim, 4.5) * (0.16 + 0.40 * uGlitch);
`;

/**
 * Patches materials to render in pure high-contrast Black & White with glitch jitter.
 */
export function patchGlitchMaterial(material, shared) {
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, shared);
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", `#include <common>\n${VERT_PARS}`)
      .replace("#include <skinning_vertex>", `#include <skinning_vertex>\n${VERT_MAIN}`);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\n${FRAG_PARS}`)
      .replace("#include <map_fragment>", `#include <map_fragment>\n${FRAG_BW}`)
      .replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>\n${FRAG_RIM}`);
  };
  material.customProgramCacheKey = () => "whil-bw-glitch-v1";
  material.needsUpdate = true;
}

// Full-screen pass: Chromatic RGB split (red-cyan fringing on B&W base) + slice displacement + scanlines
export const GlitchPostShader = {
  name: "WhilBWGlitchPost",
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uGlitch: { value: 0 },
    uRes: { value: [1, 1] },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uGlitch;
    uniform vec2 uRes;
    varying vec2 vUv;

    float h2(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    void main() {
      vec2 uv = vUv;

      // Lateral horizontal block tearing during glitch burst
      float slice = floor(uv.y * 36.0);
      float tq = floor(uTime * 22.0);
      float jump = step(1.0 - uGlitch * 0.40, h2(vec2(slice, tq)));
      uv.x += (h2(vec2(slice, tq + 7.0)) - 0.5) * 0.08 * jump * uGlitch;

      // RGB Chromatic Aberration (creates gorgeous red/cyan fringing against the B&W model)
      float amt = 0.0006 + uGlitch * 0.012;
      vec2 dir = vec2(1.0, 0.2 * sin(uTime * 3.0));
      vec4 cr = texture2D(tDiffuse, uv + dir * amt);
      vec4 cg = texture2D(tDiffuse, uv);
      vec4 cb = texture2D(tDiffuse, uv - dir * amt);
      vec3 col = vec3(cr.r, cg.g, cb.b);
      float a = max(max(cr.a, cg.a), cb.a);

      // Convert any leftover color into pure black and white base
      float luma = dot(col, vec3(0.299, 0.587, 0.114));
      // Blend back chromatic split during glitch, otherwise keep pure grayscale
      col = mix(vec3(luma), col, clamp(uGlitch * 2.2, 0.0, 1.0));

      // High contrast editorial curve
      col = pow(col, vec3(1.10));

      // Delicate CRT scanline texture
      float scan = 0.97 + 0.03 * sin(uv.y * uRes.y * 1.3);
      col *= scan;

      // Static noise grain during glitch burst
      float n = h2(uv * uRes + fract(uTime * 61.0) * 100.0);
      col += (n - 0.5) * uGlitch * 0.14 * a;

      col = max(col, 0.0);
      gl_FragColor = vec4(col, a);
    }
  `,
};
