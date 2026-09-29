import { Component, ElementRef, afterNextRender, viewChild } from '@angular/core';
import { azar } from '../azar';

@Component({
  selector: 'app-bosque',
  template: `
    <section>
      <svg #pinos viewBox="0 0 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true"></svg>
      <div class="textos">
        <p class="frase">Del bosque con niebla a la ciudad que nunca se apaga.</p>
        <p class="guino">It's been waiting for you.</p>
      </div>
    </section>
  `,
  styles: `
    section { position: relative; min-height: clamp(240px, 32vw, 340px); overflow: hidden; display: flex; align-items: flex-end;
      background: linear-gradient(180deg, var(--espresso), #241a14 55%, var(--noche)); }
    svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .textos { position: relative; z-index: 2; width: 100%; display: grid; justify-items: center; gap: 10px;
      padding: 0 16px calc(36px + env(safe-area-inset-bottom, 0px)); text-align: center; }
    .frase { font-family: var(--display); font-style: italic; font-size: clamp(1.1rem, 3.4vw, 1.5rem); color: var(--crema); text-shadow: 0 2px 12px #000; }
    .guino { font-family: var(--maquina); font-size: .9rem; letter-spacing: .08em; color: var(--oro-claro); text-shadow: 0 2px 10px #000; }
  `,
})
export class Bosque {
  private readonly pinos = viewChild.required<ElementRef<SVGSVGElement>>('pinos');

  constructor() {
    afterNextRender(() => (this.pinos().nativeElement.innerHTML = dibujaPinos()));
  }
}

/** Tres capas de pinos en niebla, al estilo de Forks. */
function dibujaPinos(): string {
  const out = [
    '<defs><linearGradient id="g-niebla" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1C120C" stop-opacity="0"/>' +
    '<stop offset=".6" stop-color="#9c8a78" stop-opacity=".18"/><stop offset="1" stop-color="#241710" stop-opacity=".9"/></linearGradient></defs>',
  ];
  const capas = [
    { c: '#2b2a1e', y: 120, s: 1, n: 26, semilla: 3 },
    { c: '#1f1f15', y: 150, s: 1.3, n: 20, semilla: 5 },
    { c: '#16140e', y: 180, s: 1.6, n: 15, semilla: 9 },
  ];
  for (const capa of capas) {
    const r = azar(capa.semilla);
    for (let i = 0; i < capa.n; i++) {
      const x = i * (1240 / capa.n) - 20 + r() * 30;
      const h = (70 + r() * 60) * capa.s, w = h * 0.36, y = capa.y + r() * 30;
      let p = `M${x} ${y - h}`;
      for (let k = 1; k <= 4; k++) {
        const yy = y - h + (h * k) / 4, ww = (w * k) / 4;
        p += ` L${(x + ww).toFixed(1)} ${yy.toFixed(1)} L${(x + ww * 0.55).toFixed(1)} ${yy.toFixed(1)}`;
      }
      p += ` L${x + w * 0.1} 260 L${x - w * 0.1} 260`;
      for (let k = 4; k >= 1; k--) {
        const yy = y - h + (h * k) / 4, ww = (w * k) / 4;
        p += ` L${(x - ww * 0.55).toFixed(1)} ${yy.toFixed(1)} L${(x - ww).toFixed(1)} ${yy.toFixed(1)}`;
      }
      out.push(`<path d="${p} Z" fill="${capa.c}"/>`);
    }
    out.push(`<rect x="0" y="${capa.y - 40}" width="1200" height="${300 - capa.y}" fill="url(#g-niebla)" opacity=".7"/>`);
  }
  return out.join('');
}
