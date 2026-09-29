import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { azar, movimientoReducido } from '../azar';

interface Cuenta { d: string; h: string; m: string; s: string; }

@Component({
  selector: 'app-hero',
  template: `
    <section>
      <canvas #cielo class="cielo" aria-hidden="true"></canvas>
      <div class="wrap texto">
        <p class="ceja">Feliz cumpleaños</p>
        <h1>Bren, nos vamos <em class="oro-texto">a Nueva York</em></h1>
        <p class="sub">Tú y yo, para empezar el año en la ciudad donde el mundo entero cuenta hacia atrás.</p>
        @if (cuenta(); as c) {
          <div class="cuenta">
            <div><b>{{ c.d }}</b><small>días</small></div>
            <div><b>{{ c.h }}</b><small>horas</small></div>
            <div><b>{{ c.m }}</b><small>min</small></div>
            <div><b>{{ c.s }}</b><small>seg</small></div>
          </div>
          <p class="nota">para recibir juntos el Año Nuevo en Nueva York</p>
        } @else {
          <p class="nota">Feliz año nuevo, Bren. Lo logramos.</p>
        }
      </div>
      <svg #skyline class="skyline" viewBox="0 0 1200 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true"></svg>
    </section>
  `,
  styles: `
    section { position: relative; min-height: min(860px, 100svh); display: flex; flex-direction: column; overflow: hidden;
      background: radial-gradient(90% 60% at 50% 100%, #4a2f1e 0%, transparent 70%),
                  linear-gradient(180deg, #120b07 0%, var(--noche) 60%, var(--espresso) 100%); }
    .cielo { position: absolute; inset: 0; width: 100%; height: 100%; }
    .texto { position: relative; z-index: 2; padding-block: calc(clamp(40px, 9vh, 120px) + env(safe-area-inset-top, 0px)) 24px; display: grid; gap: 20px; justify-items: start; }
    h1 { font-size: clamp(2.9rem, 11vw, 6.2rem); font-weight: 400; letter-spacing: -.01em; color: var(--crema); }
    h1 em { display: block; font-style: italic; font-weight: 500; }
    .sub { font-size: clamp(1.05rem, 2.6vw, 1.3rem); color: var(--suave); max-width: 36ch; }
    .cuenta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
    .cuenta div { min-width: 74px; padding: 10px 12px 8px; border: 1px solid #c9a45c55; border-radius: 3px; background: #1c120ccc;
      backdrop-filter: blur(4px); text-align: center; }
    .cuenta b { display: block; font-family: var(--display); font-size: 2rem; font-weight: 500; line-height: 1; color: var(--oro-claro); font-variant-numeric: tabular-nums; }
    .cuenta small { font-size: .66rem; letter-spacing: .2em; text-transform: uppercase; color: var(--suave); }
    .nota { font-family: var(--maquina); font-size: .85rem; color: var(--oro); }
    .skyline { position: relative; z-index: 1; display: block; width: 100%; height: clamp(200px, 34vw, 340px); margin-top: auto; }
    .skyline ::ng-deep .ventana { fill: var(--oro-claro); }
    .skyline ::ng-deep .ventana.t { animation: titila 5s ease-in-out infinite; }
    @keyframes titila { 0%, 100% { opacity: .9; } 50% { opacity: .15; } }
    @media (max-width: 620px) {
      .cuenta { width: 100%; }
      .cuenta div { min-width: 0; flex: 1; padding-block: 12px 10px; }
      .cuenta b { font-size: 2.3rem; }
    }
  `,
})
export class Hero {
  private readonly cielo = viewChild.required<ElementRef<HTMLCanvasElement>>('cielo');
  private readonly skyline = viewChild.required<ElementRef<SVGSVGElement>>('skyline');
  protected readonly cuenta = signal<Cuenta | null>(calculaCuenta());

  constructor() {
    const destroy = inject(DestroyRef);
    const reloj = setInterval(() => this.cuenta.set(calculaCuenta()), 1000);
    destroy.onDestroy(() => clearInterval(reloj));

    afterNextRender(() => {
      this.skyline().nativeElement.innerHTML = dibujaSkyline();
      const parar = animaCielo(this.cielo().nativeElement);
      destroy.onDestroy(parar);
    });
  }
}

/**
 * Cuenta regresiva a la medianoche del 1 de enero en la Ciudad de México (UTC−6 todo el año; sin horario de verano desde 2022).
 * null durante la semana de año nuevo.
 */
function calculaCuenta(): Cuenta | null {
  const ahora = Date.now();
  const y = new Date().getUTCFullYear();
  const esteAnio = Date.UTC(y, 0, 1, 6);
  if (ahora >= esteAnio && ahora - esteAnio < 7 * 864e5) return null;
  const s = Math.max(0, Math.floor((Date.UTC(y + 1, 0, 1, 6) - ahora) / 1000));
  const dos = (n: number) => String(n).padStart(2, '0');
  return { d: String(Math.floor(s / 86400)), h: dos(Math.floor((s % 86400) / 3600)), m: dos(Math.floor((s % 3600) / 60)), s: dos(s % 60) };
}

function dibujaSkyline(): string {
  const r = azar(1989);
  const out: string[] = [
    '<defs><linearGradient id="g-edif" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A3224"/><stop offset="1" stop-color="#1C120C"/></linearGradient>' +
    '<linearGradient id="g-atras" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E1F16"/><stop offset="1" stop-color="#1C120C"/></linearGradient></defs>',
  ];
  const ventanas = (x: number, y: number, w: number, h: number, dens: number): string => {
    let s = '';
    for (let yy = y + 8; yy < h + y - 6; yy += 9) {
      for (let xx = x + 5; xx < x + w - 5; xx += 7) {
        if (r() < dens) {
          const titila = r() < 0.18 ? ` t" style="animation-delay:${(r() * 5).toFixed(2)}s` : '';
          s += `<rect class="ventana${titila}" x="${xx.toFixed(1)}" y="${yy}" width="2.4" height="3.4" opacity="${(0.35 + r() * 0.6).toFixed(2)}"/>`;
        }
      }
    }
    return s;
  };
  // Fila trasera
  for (let x = -10; x < 1210;) {
    const w = 30 + r() * 50, h = 70 + r() * 120;
    out.push(`<rect x="${x.toFixed(1)}" y="${(320 - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="url(#g-atras)"/>`);
    out.push(ventanas(x, 320 - h, w, h, 0.12));
    x += w + 2;
  }
  const borde = ' fill="url(#g-edif)" stroke="#C9A45C" stroke-opacity=".55" stroke-width="1"';
  // One World Trade Center
  out.push(`<path d="M150 320 L150 118 L178 70 L206 118 L206 320 Z"${borde}/><path d="M178 70 V8" stroke="#E8CD8A" stroke-width="2"/><circle cx="178" cy="8" r="2.5" fill="#FFF4D6"/>`);
  out.push(ventanas(152, 120, 52, 200, 0.22));
  // Empire State
  out.push(`<path d="M520 320 V170 H530 V140 H542 V112 H552 V92 H560 V72 H566 V92 H574 V112 H584 V140 H596 V170 H606 V320 Z"${borde}/><path d="M563 72 V20" stroke="#E8CD8A" stroke-width="2.2"/><circle cx="563" cy="20" r="3" fill="#FFF4D6"/>`);
  out.push(ventanas(522, 172, 82, 148, 0.3));
  // Chrysler
  out.push(`<path d="M800 320 V150 H808 V128 Q836 86 864 128 V150 H872 V320 Z"${borde}/>`);
  out.push('<g fill="none" stroke="#E8CD8A" stroke-width="1.3" opacity=".9"><path d="M812 128 Q836 94 860 128"/><path d="M818 126 Q836 100 854 126"/><path d="M824 124 Q836 106 848 124"/></g><path d="M836 96 V40" stroke="#E8CD8A" stroke-width="2"/>');
  out.push(ventanas(802, 152, 68, 168, 0.28));
  // Fila delantera, dejando libres los tres edificios icónicos
  const r2 = azar(13);
  for (let x = -10; x < 1210;) {
    const w = 40 + r2() * 70, h = 40 + r2() * 80;
    if (!((x > 120 && x < 230) || (x > 490 && x < 620) || (x > 780 && x < 890))) {
      out.push(`<rect x="${x.toFixed(1)}" y="${(320 - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}"${borde.replace('.55', '.3')}/>`);
      out.push(ventanas(x, 320 - h, w, h, 0.2));
    }
    x += w + 3;
  }
  return out.join('');
}

/** Estrellas que titilan y fuegos artificiales dorados. Devuelve la función para detenerlo. */
function animaCielo(c: HTMLCanvasElement): () => void {
  const g = c.getContext('2d')!;
  const reduce = movimientoReducido();
  let W = 0, H = 0, t = 0, visible = true, activo = true;
  let estrellas: { x: number; y: number; s: number; f: number }[] = [];
  let chispas: { x: number; y: number; vx: number; vy: number; vida: number; max: number; c: string }[] = [];

  const tam = () => {
    W = c.clientWidth; H = c.clientHeight;
    const dpr = devicePixelRatio || 1;
    c.width = W * dpr; c.height = H * dpr;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const r = azar(7);
    estrellas = Array.from({ length: Math.round((W * H) / 5200) }, () => ({ x: r() * W, y: r() * H * 0.7, s: r() * 1.3 + 0.3, f: r() * 6.28 }));
  };
  const estallido = () => {
    const x = W * (0.15 + Math.random() * 0.7), y = H * (0.1 + Math.random() * 0.3), n = 46;
    const cols = ['#E8CD8A', '#C9A45C', '#FFF4D6'];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 6.283, v = 1.2 + Math.random() * 1.8;
      chispas.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vida: 0, max: 70 + Math.random() * 40, c: cols[i % 3] });
    }
  };
  const dibuja = () => {
    if (!activo) return;
    g.clearRect(0, 0, W, H);
    t++;
    g.fillStyle = '#F4EADB';
    for (const s of estrellas) {
      g.globalAlpha = reduce ? 0.6 : 0.35 + 0.5 * Math.abs(Math.sin(t * 0.012 + s.f));
      g.fillRect(s.x, s.y, s.s, s.s);
    }
    if (!reduce) {
      if (t % 150 === 30) estallido();
      chispas = chispas.filter((p) => p.vida < p.max);
      for (const p of chispas) {
        p.vida++; p.vx *= 0.975; p.vy = p.vy * 0.975 + 0.025; p.x += p.vx; p.y += p.vy;
        g.globalAlpha = 1 - p.vida / p.max;
        g.fillStyle = p.c;
        g.beginPath(); g.arc(p.x, p.y, 1.6, 0, 6.283); g.fill();
      }
    }
    g.globalAlpha = 1;
    if (visible && !reduce) requestAnimationFrame(dibuja);
  };

  tam();
  addEventListener('resize', tam);
  const io = new IntersectionObserver((es) => {
    const antes = visible;
    visible = es[0].isIntersecting;
    if (visible && !antes && !reduce) requestAnimationFrame(dibuja);
  });
  io.observe(c);
  dibuja();

  return () => { activo = false; io.disconnect(); removeEventListener('resize', tam); };
}
