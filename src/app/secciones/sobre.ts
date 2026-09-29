import { Component, DOCUMENT, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Confeti } from '../confeti';
import { movimientoReducido } from '../azar';

type Estado = 'cerrado' | 'abierto' | 'fuera' | 'oculto';

@Component({
  selector: 'app-sobre',
  template: `
    @if (estado() !== 'oculto') {
      <div class="sobre-fondo" [class.abierto]="estado() !== 'cerrado'" [class.fuera]="estado() === 'fuera'"
           role="dialog" aria-modal="true" aria-label="Sobre para Bren">
        <div class="caja">
          <p class="para">Para Bren</p>
          <div class="sobre">
            <div class="cuerpo"></div>
            <div class="solapa"></div>
            <button class="sello" type="button" aria-label="Romper el sello y abrir" (click)="abrir()"><span>B</span></button>
          </div>
          <p class="texto">Hoy es un día especial, y tú mereces algo igual de especial.</p>
          <p class="pista">Toca el sello</p>
        </div>
      </div>
    }
  `,
  styles: `
    .sobre-fondo { position: fixed; inset: 0; z-index: 50; display: grid; place-items: center; overflow: hidden;
      padding: calc(20px + env(safe-area-inset-top, 0px)) max(12px, env(safe-area-inset-right, 0px)) calc(20px + env(safe-area-inset-bottom, 0px)) max(12px, env(safe-area-inset-left, 0px));
      background: radial-gradient(120% 90% at 50% 42%, #3a2519 0%, var(--espresso) 70%);
      overscroll-behavior: none; touch-action: none; transition: opacity .9s ease, visibility .9s; }
    .sobre-fondo.fuera { opacity: 0; visibility: hidden; }
    .caja { display: grid; justify-items: center; gap: clamp(18px, 3.2svh, 32px); text-align: center; width: min(680px, 100%); }
    .para { font-family: var(--display); font-style: italic; font-size: clamp(3rem, 13vw, 4.6rem); line-height: 1; color: var(--crema); }
    /* Tan ancho como quepa, sin que el sobre y los textos pasen de la altura de la pantalla. */
    .sobre { position: relative; width: min(100%, calc((100svh - 360px) * 1.45)); aspect-ratio: 1.45; perspective: 1100px; container-type: inline-size; }
    .cuerpo { position: absolute; inset: 0; border-radius: 8px; background: linear-gradient(160deg, #8a6242, #6b4a31 60%, #5a3d28);
      box-shadow: 0 34px 70px -22px #000, inset 0 0 0 1px #ffffff14; }
    .cuerpo::before { content: ""; position: absolute; inset: 0; border-radius: 8px;
      background: linear-gradient(to top right, transparent 49.6%, #00000026 50%, transparent 50.4%),
                  linear-gradient(to top left, transparent 49.6%, #00000026 50%, transparent 50.4%); }
    .solapa { position: absolute; inset: 0 0 auto; height: 58%; transform-origin: top; transition: transform 1s cubic-bezier(.6,.05,.3,1); z-index: 2; }
    .solapa::before { content: ""; position: absolute; inset: 0; clip-path: polygon(0 0, 100% 0, 50% 100%);
      background: linear-gradient(180deg, #9a7050, #7a563a); filter: drop-shadow(0 4px 6px #0006); }
    .abierto .solapa { transform: rotateX(180deg); }
    .sello { position: absolute; left: 50%; top: 58%; transform: translate(-50%, -50%); z-index: 3; width: clamp(104px, 30cqw, 150px); aspect-ratio: 1;
      border: 0; border-radius: 50%; cursor: pointer; display: grid; place-items: center; touch-action: manipulation; -webkit-tap-highlight-color: transparent;
      background: radial-gradient(circle at 35% 30%, var(--oro-claro), var(--oro) 45%, var(--oro-hondo) 100%);
      box-shadow: 0 8px 22px #0008, inset 0 -4px 8px #0004, inset 0 3px 6px #fff5; transition: transform .5s ease, opacity .5s ease;
      animation: brillo 2.8s ease-in-out infinite; }
    .sello::before { content: ""; position: absolute; inset: 10%; border-radius: 50%; border: 1.5px dashed #5a3d2899; }
    .sello span { font-family: var(--display); font-style: italic; font-weight: 600; font-size: clamp(2.9rem, 13cqw, 4.2rem); color: var(--tinta); text-shadow: 0 1px 0 #fff6; }
    .sello:active { transform: translate(-50%, -50%) scale(.95); }
    @media (hover: hover) { .sello:hover { transform: translate(-50%, -50%) scale(1.05); } }
    .abierto .sello { transform: translate(-50%, -50%) scale(.2) rotate(40deg); opacity: 0; animation: none; }
    @keyframes brillo { 50% { box-shadow: 0 8px 22px #0008, 0 0 0 10px #e8cd8a1f, inset 0 -4px 8px #0004, inset 0 3px 6px #fff5; } }
    .texto { font-size: clamp(1.15rem, 4.6vw, 1.35rem); line-height: 1.5; color: var(--texto); max-width: 26ch; }
    .pista { font-family: var(--maquina); font-size: .95rem; letter-spacing: .12em; color: var(--oro); animation: latido 2.4s ease-in-out infinite; }
    @keyframes latido { 50% { opacity: .45; } }
    /* En teléfono el sobre es más alto para llenar la pantalla. */
    @media (max-width: 620px) and (orientation: portrait) {
      .sobre { width: min(100%, calc((100svh - 380px) * 1.2)); aspect-ratio: 1.2; }
      .solapa { height: 56%; }
      .sello { top: 56%; }
    }
  `,
})
export class Sobre implements OnInit, OnDestroy {
  private readonly doc = inject(DOCUMENT);
  private readonly confeti = inject(Confeti);
  protected readonly estado = signal<Estado>('cerrado');
  private timers: ReturnType<typeof setTimeout>[] = [];

  ngOnInit(): void {
    this.doc.body.classList.add('sellado');
  }

  protected abrir(): void {
    if (this.estado() !== 'cerrado') return;
    const r = movimientoReducido();
    this.estado.set('abierto');
    this.timers.push(
      setTimeout(() => this.confeti.lanzar(innerWidth / 2, innerHeight * 0.45, 160), r ? 0 : 450),
      setTimeout(() => { this.estado.set('fuera'); this.doc.body.classList.remove('sellado'); }, r ? 50 : 1100),
      setTimeout(() => this.estado.set('oculto'), r ? 100 : 2100),
    );
  }

  ngOnDestroy(): void {
    this.timers.forEach(clearTimeout);
    this.doc.body.classList.remove('sellado');
  }
}
