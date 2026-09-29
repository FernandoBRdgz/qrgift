import { Component, inject } from '@angular/core';
import { Confeti } from '../confeti';

@Component({
  selector: 'app-cierre',
  template: `
    <section>
      <div class="wrap">
        <p class="ceja">Hasta entonces</p>
        <h2 class="oro-texto">Nos vemos a medianoche</h2>
        <p class="linea">Guarda los recuerdos, que ellos nos van a guardar a nosotros.</p>
        <p class="firma">— F</p>
        <button class="brindar" type="button" (click)="brindar($event)">Brindar</button>
      </div>
    </section>
  `,
  styles: `
    section { padding-block: 100px 110px; text-align: center; background: linear-gradient(180deg, var(--espresso), #120b07); overflow: hidden; }
    .wrap { display: grid; justify-items: center; gap: 20px; }
    h2 { font-size: clamp(2.5rem, 8vw, 4.6rem); font-style: italic; font-weight: 400; }
    .linea { color: var(--suave); max-width: 38ch; font-size: 1.1rem; }
    .firma { font-family: var(--display); font-style: italic; font-size: 1.6rem; color: var(--oro-claro); }
    .brindar { margin-top: 8px; padding: 10px 22px; border-radius: 30px; border: 1px solid var(--oro); background: transparent;
      color: var(--oro-claro); cursor: pointer; font-family: var(--maquina); letter-spacing: .08em; }
    .brindar:hover { background: #c9a45c1a; }
  `,
})
export class Cierre {
  private readonly confeti = inject(Confeti);

  protected brindar(e: MouseEvent): void {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.confeti.lanzar(r.left + r.width / 2, r.top, 120);
  }
}
