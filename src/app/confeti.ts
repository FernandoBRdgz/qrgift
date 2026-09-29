import { DOCUMENT, Injectable, inject } from '@angular/core';
import { movimientoReducido } from './azar';

interface Pieza {
  x: number; y: number; vx: number; vy: number;
  r: number; vr: number; w: number; h: number;
  c: string; vida: number;
}

const COLORES = ['#E8CD8A', '#C9A45C', '#F7EFE2', '#A0724E', '#FFF4D6'];
const VIDA = 240;

/** Confeti dorado sobre un canvas fijo que se crea la primera vez que se usa. */
@Injectable({ providedIn: 'root' })
export class Confeti {
  private readonly doc = inject(DOCUMENT);
  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;
  private piezas: Pieza[] = [];
  private corriendo = false;

  lanzar(x: number, y: number, n = 140): void {
    if (movimientoReducido()) return;
    this.prepara();
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = 4 + Math.random() * 9;
      this.piezas.push({
        x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6,
        r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.3,
        w: 4 + Math.random() * 6, h: 6 + Math.random() * 8,
        c: COLORES[i % COLORES.length], vida: 0,
      });
    }
    if (!this.corriendo) {
      this.corriendo = true;
      requestAnimationFrame(this.paso);
    }
  }

  private prepara(): void {
    if (!this.canvas) {
      const c = this.doc.createElement('canvas');
      c.setAttribute('aria-hidden', 'true');
      c.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:60';
      this.doc.body.appendChild(c);
      this.canvas = c;
      this.ctx = c.getContext('2d')!;
    }
    const dpr = devicePixelRatio || 1;
    this.canvas.width = innerWidth * dpr;
    this.canvas.height = innerHeight * dpr;
    this.ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private paso = (): void => {
    const g = this.ctx!;
    g.clearRect(0, 0, innerWidth, innerHeight);
    this.piezas = this.piezas.filter((p) => p.vida < VIDA && p.y < innerHeight + 40);
    for (const p of this.piezas) {
      p.vida++;
      p.vx *= 0.985;
      p.vy = p.vy * 0.985 + 0.22;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      g.save();
      g.translate(p.x, p.y);
      g.rotate(p.r);
      g.scale(1, Math.cos(p.vida * 0.15));
      g.globalAlpha = Math.max(0, 1 - p.vida / VIDA);
      g.fillStyle = p.c;
      g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      g.restore();
    }
    if (this.piezas.length) requestAnimationFrame(this.paso);
    else {
      this.corriendo = false;
      g.clearRect(0, 0, innerWidth, innerHeight);
    }
  };
}
