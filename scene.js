/* ============================================
   MORPHÉA — 3D Scene
   ============================================ */

const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 0, 10);

// Lights
scene.add(new THREE.AmbientLight(0xffe8d6, 0.6));
const k = new THREE.DirectionalLight(0xfff5e6, 1.8); k.position.set(3, 5, 5); scene.add(k);
const f = new THREE.DirectionalLight(0xdcc8ff, 0.7); f.position.set(-4, 2, 3); scene.add(f);
const r = new THREE.DirectionalLight(0xffd6e8, 0.7); r.position.set(0, 3, -5); scene.add(r);
const u = new THREE.PointLight(0xffb347, 0.5, 12); u.position.set(0, -3, 3); scene.add(u);

const gummyGroup = new THREE.Group();
scene.add(gummyGroup);

const gummyMat = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color(0xd4763a),
  roughness: 0.18,
  metalness: 0.05,
  clearcoat: 1.0,
  clearcoatRoughness: 0.08,
});

// Colors that harmonize with each section's background
const SECTION_CONFIGS = [
  { id: 'hero',      x:  0,   y:  0,   z: 0, ry: 0,   rx: 0,    sc: 1.0,  c: [0xd4, 0x76, 0x3a] },
  { id: 'story',     x:  3.2, y:  0.3, z: 0, ry: 0.8, rx: 0.08, sc: 0.85, c: [0x7b, 0x4b, 0xc6] },
  { id: 'ritual',    x: -3,   y:  0,   z: 1, ry:-0.6, rx:-0.05, sc: 0.9,  c: [0x0d, 0x94, 0x88] },
  { id: 'benefits',  x:  3.8, y:  0,   z: 0, ry: 0.3, rx: 0,    sc: 0.8,  c: [0x8b, 0x73, 0x55] },
  { id: 'proof',     x:  5.5, y:  1.5, z:-2, ry: 0.4, rx: 0.05, sc: 0.4,  c: [0x7c, 0x3a, 0xed] },
  { id: 'cta-final', x:  0,   y: -3,   z: 0, ry: 0,   rx: 0,    sc: 0.15, c: [0xe5, 0x3e, 0x3e] },
];

// Mobile-specific: gummy stays centered, only y shifts slightly
// Mobile: gummy centered, positioned in the gap between title and description
const MOBILE_CONFIGS = [
  { id: 'hero',      y:  0.2, sc: 0.7,  c: [0xd4, 0x76, 0x3a] },
  { id: 'story',     y:  0.3, sc: 0.6,  c: [0x7b, 0x4b, 0xc6] },
  { id: 'ritual',    y:  0.3, sc: 0.6,  c: [0x0d, 0x94, 0x88] },
  { id: 'benefits',  y:  0.5, sc: 0.55, c: [0x8b, 0x73, 0x55] },
  { id: 'proof',     y: -0.5, sc: 0.35, c: [0x7c, 0x3a, 0xed] },
  { id: 'cta-final', y: -2,   sc: 0.1,  c: [0xe5, 0x3e, 0x3e] },
];

function lerp(a, b, t) { return a + (b - a) * t; }
function smooth(t) { return t * t * (3 - 2 * t); }

function getGummyState(mobile) {
  const vh = window.innerHeight;
  const configs = mobile ? MOBILE_CONFIGS : SECTION_CONFIGS;

  for (let i = 0; i < configs.length; i++) {
    const el = document.getElementById(configs[i].id);
    if (!el) continue;

    const rect = el.getBoundingClientRect();
    if (rect.top < vh && rect.bottom > 0) {
      const cfg = configs[i];
      const nextCfg = configs[Math.min(i + 1, configs.length - 1)];
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.bottom - rect.top - vh)));
      const t = smooth(Math.max(0, Math.min(1, progress)));

      if (mobile) {
        return {
          x: 0, z: 0, ry: 0, rx: 0,
          y: lerp(cfg.y, nextCfg.y, t),
          sc: lerp(cfg.sc, nextCfg.sc, t),
          cr: lerp(cfg.c[0], nextCfg.c[0], t) / 255,
          cg: lerp(cfg.c[1], nextCfg.c[1], t) / 255,
          cb: lerp(cfg.c[2], nextCfg.c[2], t) / 255,
        };
      } else {
        return {
          x: lerp(cfg.x, nextCfg.x, t),
          y: lerp(cfg.y, nextCfg.y, t),
          z: lerp(cfg.z, nextCfg.z, t),
          ry: lerp(cfg.ry, nextCfg.ry, t),
          rx: lerp(cfg.rx, nextCfg.rx, t),
          sc: lerp(cfg.sc, nextCfg.sc, t),
          cr: lerp(cfg.c[0], nextCfg.c[0], t) / 255,
          cg: lerp(cfg.c[1], nextCfg.c[1], t) / 255,
          cb: lerp(cfg.c[2], nextCfg.c[2], t) / 255,
        };
      }
    }
  }

  const cfg = configs[0];
  if (mobile) {
    return { x: 0, y: cfg.y, z: 0, ry: 0, rx: 0, sc: cfg.sc, cr: cfg.c[0]/255, cg: cfg.c[1]/255, cb: cfg.c[2]/255 };
  }
  return { x: cfg.x, y: cfg.y, z: cfg.z, ry: cfg.ry, rx: cfg.rx, sc: cfg.sc, cr: cfg.c[0]/255, cg: cfg.c[1]/255, cb: cfg.c[2]/255 };
}

// Load OBJ
let loaded = false;
const mtlL = new THREE.MTLLoader();
mtlL.setPath('./'); // Pointeur corrigé
mtlL.load('gummy.mtl', (mats) => {
  mats.preload();
  const objL = new THREE.OBJLoader();
  objL.setMaterials(mats);
  objL.setPath('./'); // Pointeur corrigé
  objL.load('gummy.obj', (obj) => {
    obj.traverse((ch) => { if (ch.isMesh) ch.material = gummyMat; });
    const box = new THREE.Box3().setFromObject(obj);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    obj.position.sub(center);
    obj.scale.setScalar(3.5 / Math.max(size.x, size.y, size.z));
    gummyGroup.add(obj);
    loaded = true;
  }, undefined, (e) => console.warn('OBJ err:', e));
}, undefined, (e) => console.warn('MTL err:', e));

window.sleepdrinkScene = { gummyGroup, camera, renderer, scrollProgress: 0 };

let mouseX = 0, mouseY = 0, hoverScale = 1;
window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

const clock = new THREE.Clock();
const D = 0.07;
let cur = { x: 0, y: 0, z: 0, ry: 0, rx: 0, sc: 1, cr: 0.83, cg: 0.46, cb: 0.23 };

function isMobile() { return window.innerWidth <= 768; }

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const sp = window.sleepdrinkScene.scrollProgress;
  const mobile = isMobile();

  if (loaded) {
    const kf = getGummyState(mobile);

    cur.x  += (kf.x  - cur.x)  * D;
    cur.y  += (kf.y  - cur.y)  * D;
    cur.z  += (kf.z  - cur.z)  * D;
    cur.ry += (kf.ry - cur.ry) * D;
    cur.rx += (kf.rx - cur.rx) * D;
    cur.sc += (kf.sc - cur.sc) * D;
    cur.cr += (kf.cr - cur.cr) * D;
    cur.cg += (kf.cg - cur.cg) * D;
    cur.cb += (kf.cb - cur.cb) * D;

    if (!mobile) {
      const gummyScreen = new THREE.Vector3(cur.x, cur.y, cur.z).project(camera);
      const dx = mouseX - gummyScreen.x;
      const dy = mouseY - gummyScreen.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      hoverScale += ((dist < 0.35 ? 1.12 : 1) - hoverScale) * 0.06;
    } else {
      hoverScale = 1;
    }

    const bob = Math.sin(t * 0.8) * (mobile ? 0.05 : 0.1);
    gummyGroup.position.set(cur.x, cur.y + bob, cur.z);
    gummyGroup.scale.setScalar(cur.sc * hoverScale);

    const rotSpeed = mobile ? 0.3 : 0.7;
    gummyGroup.rotation.y = t * rotSpeed + cur.ry;
    gummyGroup.rotation.x = Math.sin(t * 0.25) * 0.04 + cur.rx + (mobile ? 0 : mouseY * 0.08);
    gummyGroup.rotation.z = mobile ? 0 : mouseX * -0.04;

    gummyMat.clearcoat = hoverScale > 1.02 ? 1.5 : 1.0;
    gummyMat.color.setRGB(
      Math.min(1, cur.cr + (hoverScale - 1) * 0.5),
      Math.min(1, cur.cg + (hoverScale - 1) * 0.5),
      Math.min(1, cur.cb + (hoverScale - 1) * 0.5)
    );
  }

  gummyGroup.visible = sp < 0.92;
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
