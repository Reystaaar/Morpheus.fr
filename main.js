/* ============================================
   MORPHÉA — Animations
   ============================================ */

gsap.registerPlugin(ScrollTrigger);

// ========================================
// LOADING SCREEN
// ========================================
(function() {
  const loader = document.getElementById('loader');
  const loaderNum = document.getElementById('loader-num');
  const loaderBar = document.querySelector('.loader-bar');
  let progress = 0;
  const duration = 2800; // ms
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    progress = Math.min(100, Math.round((elapsed / duration) * 100));
    loaderNum.textContent = progress;
    loaderBar.style.width = progress + '%';

    if (progress < 100) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 400);
    }
  }

  document.body.style.overflow = 'hidden';
  requestAnimationFrame(tick);
})();

// --- SCROLL PROGRESS for 3D ---
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (window.sleepdrinkScene) {
    window.sleepdrinkScene.scrollProgress = window.scrollY / max;
  }
});

// ========================================
// SECTION STACKING (scale + blur as you leave)
// ========================================
document.querySelectorAll('.stack-section').forEach((section, i, arr) => {
  if (i === arr.length - 1) return;

  gsap.to(section, {
    scale: 0.92,
    opacity: 0.3,
    filter: 'blur(6px)',
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'bottom bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
});

// ========================================
// SECTION REVEALS (clip-path) — NO clip-path on proof
// ========================================
gsap.fromTo('#story',
  { clipPath: 'circle(0% at 75% 50%)' },
  { clipPath: 'circle(150% at 75% 50%)', ease: 'none',
    scrollTrigger: { trigger: '#story', start: 'top bottom', end: 'top 20%', scrub: true }
  }
);

gsap.fromTo('#ritual',
  { clipPath: 'circle(0% at 25% 50%)' },
  { clipPath: 'circle(150% at 25% 50%)', ease: 'none',
    scrollTrigger: { trigger: '#ritual', start: 'top bottom', end: 'top 20%', scrub: true }
  }
);

gsap.fromTo('#cta-final',
  { clipPath: 'inset(50% 0 50% 0)' },
  { clipPath: 'inset(0% 0 0% 0)', ease: 'none',
    scrollTrigger: { trigger: '#cta-final', start: 'top bottom', end: 'top 30%', scrub: true }
  }
);

// Background parallax zoom
document.querySelectorAll('.poster-section .poster-bg').forEach((bg) => {
  gsap.fromTo(bg, { scale: 1.15 }, {
    scale: 1, ease: 'none',
    scrollTrigger: { trigger: bg.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
  });
});

// ========================================
// HERO
// ========================================
gsap.to('#hero .poster-text', {
  opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.5,
});

ScrollTrigger.create({
  trigger: '#hero',
  start: 'top top',
  end: 'bottom top',
  scrub: true,
  onUpdate: (self) => {
    const p = self.progress;
    gsap.set('#hero .pt-left-mid',      { x: -p * 80, opacity: 1 - p * 2 });
    gsap.set('#hero .pt-right-mid',     { x: p * 80, opacity: 1 - p * 2 });
    gsap.set('#hero .pt-top-center',    { y: -p * 50, opacity: 1 - p * 2 });
    gsap.set('#hero .pt-bottom-center', { y: p * 50, opacity: 1 - p * 2 });
    gsap.set('#hero .pt-bottom-left',   { x: -p * 50, opacity: 1 - p * 2 });
    gsap.set('#hero .pt-bottom-right',  { x: p * 50, opacity: 1 - p * 2 });
  },
});

// ========================================
// STORY
// ========================================
gsap.to('#story .pt-top-center', {
  scrollTrigger: { trigger: '#story', start: 'top 75%', toggleActions: 'play none none none' },
  opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
});

gsap.set('#story .display-huge', { scale: 0.5 });
gsap.to('#story .story-title-pos', {
  scrollTrigger: { trigger: '#story', start: 'top 75%', toggleActions: 'play none none none' },
  opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
});
gsap.to('#story .display-huge', {
  scrollTrigger: { trigger: '#story', start: 'top 75%', toggleActions: 'play none none none' },
  scale: 1, duration: 1.4, ease: 'elastic.out(1, 0.5)',
});

gsap.to('#story .story-desc-pos', {
  scrollTrigger: { trigger: '#story', start: 'top 65%', toggleActions: 'play none none none' },
  opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out',
});

gsap.to('#story .pt-bottom-right', {
  scrollTrigger: { trigger: '#story', start: 'top 65%', toggleActions: 'play none none none' },
  opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out',
});

// ========================================
// RITUAL
// ========================================
gsap.to('#ritual .pt-top-center', {
  scrollTrigger: { trigger: '#ritual', start: 'top 75%', toggleActions: 'play none none none' },
  opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
});

gsap.set('#ritual .display-statement', { scale: 0.6 });
gsap.to('#ritual .ritual-title-pos', {
  scrollTrigger: { trigger: '#ritual', start: 'top 70%', toggleActions: 'play none none none' },
  opacity: 1, y: 0, duration: 1.3, ease: 'power3.out',
});
gsap.to('#ritual .display-statement', {
  scrollTrigger: { trigger: '#ritual', start: 'top 70%', toggleActions: 'play none none none' },
  scale: 1, duration: 1.4, ease: 'elastic.out(1, 0.5)',
});

gsap.to('#ritual .ritual-desc-pos', {
  scrollTrigger: { trigger: '#ritual', start: 'top 60%', toggleActions: 'play none none none' },
  opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: 'power3.out',
});

gsap.to('#ritual .pt-bottom-left', {
  scrollTrigger: { trigger: '#ritual', start: 'top 55%', toggleActions: 'play none none none' },
  opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out',
});

gsap.to('#ritual .pt-bottom-right', {
  scrollTrigger: { trigger: '#ritual', start: 'top 55%', toggleActions: 'play none none none' },
  opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out',
});

// ========================================
// BENEFITS — GSAP Pinned Horizontal Scroll
// ========================================
const slider = document.querySelector('.benefits-slider');
const selectorCards = document.querySelectorAll('.selector-card');
const benefitsBg = document.querySelector('#benefits .poster-bg');
const benefitsGlow = document.querySelector('#benefits .section-glow');

let currentStep = -1;

const benefitsTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#benefits',
    start: 'top top',
    end: () => '+=' + (slider.scrollWidth - window.innerWidth),
    scrub: 0.5,
    pin: '.benefits-track',
    anticipatePin: 1,
    onEnter: () => { benefitsBg.style.opacity = 1; if (benefitsGlow) benefitsGlow.style.opacity = '0.6'; },
    onLeave: () => { benefitsBg.style.opacity = 0; if (benefitsGlow) benefitsGlow.style.opacity = '0'; },
    onEnterBack: () => { benefitsBg.style.opacity = 1; if (benefitsGlow) benefitsGlow.style.opacity = '0.6'; },
    onLeaveBack: () => { benefitsBg.style.opacity = 0; if (benefitsGlow) benefitsGlow.style.opacity = '0'; },
    onUpdate: (self) => {
      const step = Math.min(3, Math.floor(self.progress * 4));
      if (step !== currentStep) {
        currentStep = step;
        selectorCards.forEach((c, i) => c.classList.toggle('active', i === step));
      }
    },
  },
});

benefitsTl.to(slider, {
  x: () => -(slider.scrollWidth - window.innerWidth),
  ease: 'none',
});

// Refresh all ScrollTriggers after pin setup so proof section triggers are accurate
ScrollTrigger.refresh();

// ========================================
// PROOF — VICTORY SCREEN (no clip-path, simple fade in)
// ========================================
const victoryRows = document.querySelectorAll('.victory-row');
const victoryNumbers = document.querySelectorAll('.victory-number');
const victoryFills = document.querySelectorAll('.victory-fill');

gsap.set('.victory-header', { opacity: 0, y: -30 });
gsap.to('.victory-header', {
  scrollTrigger: { trigger: '#proof', start: 'top 75%', toggleActions: 'play none none none' },
  opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
});

gsap.set('.victory-title', { scale: 0.4, opacity: 0 });
gsap.to('.victory-title', {
  scrollTrigger: { trigger: '#proof', start: 'top 75%', toggleActions: 'play none none none' },
  scale: 1, opacity: 1, duration: 1.2, delay: 0.2, ease: 'elastic.out(1, 0.4)',
});

victoryRows.forEach((row, i) => {
  gsap.to(row, {
    scrollTrigger: { trigger: '#proof', start: 'top 65%', toggleActions: 'play none none none' },
    opacity: 1, x: 0, duration: 0.8, delay: 0.4 + i * 0.2, ease: 'power3.out',
  });
});

ScrollTrigger.create({
  trigger: '#proof',
  start: 'top 60%',
  onEnter: () => {
    victoryNumbers.forEach((num) => {
      const target = parseFloat(num.dataset.value);
      const isFloat = target % 1 !== 0;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target, duration: 1.8, delay: 0.5, ease: 'power2.out',
        onUpdate: () => { num.textContent = isFloat ? obj.val.toFixed(1) : Math.round(obj.val); },
      });
    });
    setTimeout(() => {
      victoryFills.forEach((fill) => { fill.style.width = fill.dataset.width + '%'; });
    }, 600);
  },
  once: true,
});

gsap.to('.victory-quote', {
  scrollTrigger: { trigger: '#proof', start: 'top 50%', toggleActions: 'play none none none' },
  opacity: 1, y: 0, duration: 1, delay: 1.2, ease: 'power3.out',
});

// ========================================
// CTA
// ========================================
document.querySelectorAll('.cta-content > *').forEach((el, i) => {
  gsap.set(el, { opacity: 0, y: 30 });
  gsap.to(el, {
    scrollTrigger: { trigger: '#cta-final', start: 'top 70%', toggleActions: 'play none none none' },
    opacity: 1, y: 0, duration: 0.8, delay: i * 0.08, ease: 'power3.out',
  });
});

gsap.set('.cta-display', { scale: 0.7 });
gsap.to('.cta-display', {
  scrollTrigger: { trigger: '#cta-final', start: 'top 70%', toggleActions: 'play none none none' },
  scale: 1, duration: 1.2, delay: 0.15, ease: 'elastic.out(1, 0.5)',
});

// ========================================
// NAV COLOR on CTA (+ dark class for hover fix)
// ========================================
const nav = document.querySelector('#nav');

ScrollTrigger.create({
  trigger: '#cta-final',
  start: 'top 60px',
  end: 'bottom 60px',
  onEnter: () => {
    nav.classList.add('nav-dark');
    gsap.to('#nav .nav-logo, #nav .nav-brand', { color: '#1a1a1a', duration: 0.3 });
    gsap.to('#nav .nav-action', { color: '#1a1a1a', borderColor: '#1a1a1a', duration: 0.3 });
  },
  onLeaveBack: () => {
    nav.classList.remove('nav-dark');
    gsap.to('#nav .nav-logo, #nav .nav-brand', { color: '#fff', duration: 0.3 });
    gsap.to('#nav .nav-action', { color: '#fff', borderColor: 'rgba(255,255,255,0.4)', duration: 0.3 });
  },
});

// ========================================
// SMOOTH ANCHORS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const t = document.querySelector(link.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ========================================
// FALLING GUMMIES ANIMATION — Victory Section
// ========================================
(function() {
  const canvas = document.getElementById('falling-gummies-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const proof = document.getElementById('proof');
  let gummies = [];
  let animating = false;
  let animId = null;

  function resize() {
    const rect = proof.getBoundingClientRect();
    canvas.width = proof.offsetWidth;
    canvas.height = proof.offsetHeight;
  }

  function createGummy() {
    const size = 14 + Math.random() * 22;
    return {
      x: Math.random() * canvas.width,
      y: -size - Math.random() * canvas.height * 0.5,
      size: size,
      speed: 0.6 + Math.random() * 1.4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      wobbleAmp: 0.3 + Math.random() * 0.8,
      wobbleFreq: 0.01 + Math.random() * 0.02,
      wobbleOffset: Math.random() * Math.PI * 2,
      opacity: 0.15 + Math.random() * 0.25,
      hue: [280, 260, 300, 320][Math.floor(Math.random() * 4)],
    };
  }

  function drawGummy(g, t) {
    ctx.save();
    ctx.globalAlpha = g.opacity;
    ctx.translate(g.x + Math.sin(t * g.wobbleFreq + g.wobbleOffset) * g.wobbleAmp * 20, g.y);
    ctx.rotate(g.rotation);

    // Gummy bear shape
    const s = g.size;
    ctx.fillStyle = `hsla(${g.hue}, 60%, 55%, 1)`;
    ctx.beginPath();
    // Body (rounded)
    ctx.ellipse(0, 0, s * 0.4, s * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Head
    ctx.beginPath();
    ctx.ellipse(0, -s * 0.52, s * 0.28, s * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
    // Ears
    ctx.beginPath();
    ctx.ellipse(-s * 0.22, -s * 0.7, s * 0.1, s * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(s * 0.22, -s * 0.7, s * 0.1, s * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    // Highlight
    ctx.fillStyle = `hsla(${g.hue}, 70%, 75%, 0.4)`;
    ctx.beginPath();
    ctx.ellipse(-s * 0.1, -s * 0.15, s * 0.12, s * 0.2, -0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function animateGummies() {
    if (!animating) return;
    const t = performance.now() * 0.001;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = gummies.length - 1; i >= 0; i--) {
      const g = gummies[i];
      g.y += g.speed;
      g.rotation += g.rotSpeed;
      drawGummy(g, t);
      if (g.y > canvas.height + g.size * 2) {
        gummies.splice(i, 1);
      }
    }

    if (gummies.length > 0) {
      animId = requestAnimationFrame(animateGummies);
    } else {
      animating = false;
    }
  }

  function startFalling() {
    resize();
    gummies = [];
    const count = window.innerWidth <= 768 ? 18 : 30;
    for (let i = 0; i < count; i++) {
      gummies.push(createGummy());
    }
    // Stagger some extra gummies
    setTimeout(() => { for (let i = 0; i < Math.floor(count * 0.5); i++) gummies.push(createGummy()); }, 800);
    setTimeout(() => { for (let i = 0; i < Math.floor(count * 0.3); i++) gummies.push(createGummy()); }, 1600);
    animating = true;
    animateGummies();
  }

  ScrollTrigger.create({
    trigger: '#proof',
    start: 'top 60%',
    onEnter: startFalling,
    once: true,
  });

  window.addEventListener('resize', resize);
})();
