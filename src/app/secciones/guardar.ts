import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { DATOS, ligaPdf } from '../datos';

type ItemId = 'pase' | 'hierba' | 'llave' | 'cinta';

const ITEMS: Record<ItemId, { nombre: string; texto: string }> = {
  pase: { nombre: 'Pase de abordar ×2.', texto: 'Uno lleva tu nombre y el otro el mío. No se pueden separar: se usan juntos o no se usan.' },
  hierba: { nombre: 'Hierba verde.', texto: 'Restaura por completo después de un vuelo largo. Úsala contra el jet lag y el frío de enero.' },
  llave: { nombre: 'Llave dorada.', texto: 'Abre una puerta en Nueva York. Lo que hay detrás lo vas a descubrir allá.' },
  cinta: { nombre: 'Cinta de tinta ×3.', texto: 'Suficiente para guardar tu progreso. No la gastes toda en una sola noche.' },
};

@Component({
  selector: 'app-guardar',
  template: `
    <section>
      <div class="wrap sala">
        <div class="maletin">
          <div class="titulo"><span>Inventario</span><span>B · F</span></div>
          <div class="rejilla">
            <button class="item" type="button" [attr.aria-pressed]="sel() === 'pase'" aria-label="Pase de abordar, dos" (click)="sel.set('pase')">
              <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="4" y="12" width="40" height="24" rx="3" fill="#F7EFE2"/><path d="M32 12v24" stroke="#A0724E" stroke-dasharray="2 2"/><rect x="8" y="17" width="16" height="3" fill="#8A6424"/><rect x="8" y="23" width="10" height="2" fill="#A0724E"/><path d="M8 29h2M11 29h1M13 29h3M17 29h1M19 29h2M22 29h1" stroke="#2A1C13" stroke-width="3"/><path d="M36 22l4 2-4 2z" fill="#8A6424"/></svg>
              <span class="cant">×2</span>
            </button>
            <button class="item" type="button" [attr.aria-pressed]="sel() === 'hierba'" aria-label="Hierba verde" (click)="sel.set('hierba')">
              <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 40h20l-3 6H17z" fill="#8a6242"/><path d="M24 40c0-10 0-16-2-24M24 40c2-8 6-14 12-18M24 40c-3-7-8-11-14-13" stroke="#4d6a2a" stroke-width="2" fill="none"/><path d="M22 16c-6-6-4-12 0-14 4 3 5 9 0 14zM36 22c1-8 6-10 10-9-1 5-5 9-10 9zM10 27c-6-4-8-9-6-12 4 0 8 4 6 12z" fill="#6E8B3D"/></svg>
              <span class="cant">1</span>
            </button>
            <button class="item" type="button" [attr.aria-pressed]="sel() === 'llave'" aria-label="Llave dorada" (click)="sel.set('llave')">
              <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="15" cy="24" r="9" fill="none" stroke="#E8CD8A" stroke-width="4"/><path d="M24 24h20M38 24v7M43 24v5" stroke="#C9A45C" stroke-width="4" stroke-linecap="round"/><circle cx="15" cy="24" r="3" fill="#8A6424"/></svg>
            </button>
            <button class="item" type="button" [attr.aria-pressed]="sel() === 'cinta'" aria-label="Cinta de tinta" (click)="sel.set('cinta')">
              <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="12" width="36" height="24" rx="3" fill="#2A1C13" stroke="#C9A45C" stroke-width="1.5"/><circle cx="17" cy="24" r="6" fill="#111" stroke="#A0724E" stroke-width="1.5"/><circle cx="31" cy="24" r="6" fill="#111" stroke="#A0724E" stroke-width="1.5"/><path d="M17 18h14" stroke="#9E1C1C" stroke-width="2"/></svg>
              <span class="cant">3</span>
            </button>
          </div>
          <div class="examinar" aria-live="polite"><b>{{ item().nombre }}</b> {{ item().texto }}</div>
        </div>
        <div class="guardado">
          <p class="obtuviste">Obtuviste: Pase de abordar ×2</p>
          <p class="ceja">Sala segura</p>
          <h2>¿Quieres guardar tu progreso?</h2>
          <p>Aquí está el pase oficial en PDF. Guárdalo en tu teléfono y no le digas a nadie dónde lo escondiste.</p>
          @if (pdf) {
            <a class="boton" [href]="pdf" target="_blank" rel="noopener">
              <ng-container [ngTemplateOutlet]="maquina" />
              <span><b>Guardar pase</b><small>Descargar PDF</small></span>
            </a>
          } @else {
            <span class="boton espera" aria-disabled="true">
              <ng-container [ngTemplateOutlet]="maquina" />
              <span><b>Tu pase se está imprimiendo</b><small>Vuelve pronto, ya casi está</small></span>
            </span>
          }
          <ng-template #maquina>
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="22" width="36" height="16" rx="2"/><path d="M12 22V8h18l6 6v8M30 8v6h6"/><path d="M12 30h24M14 38v4h20v-4"/><circle cx="36" cy="27" r="1.5" fill="currentColor"/></svg>
          </ng-template>
        </div>
      </div>
    </section>
  `,
  imports: [NgTemplateOutlet],
  styles: `
    section { padding-block: 84px; background: radial-gradient(70% 60% at 50% 0%, #4a3220 0%, transparent 70%), var(--espresso); }
    .sala { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 28px; align-items: start; }
    .maletin { padding: 18px; border-radius: 6px; background: linear-gradient(180deg, #2d2016, #1f160f); border: 1px solid #c9a45c40;
      box-shadow: inset 0 0 0 6px #1a110b, inset 0 0 0 7px #c9a45c26; }
    .titulo { display: flex; justify-content: space-between; font-family: var(--maquina); font-size: .8rem; color: var(--oro); margin-bottom: 12px; }
    .rejilla { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
    .item { aspect-ratio: 1; display: grid; place-items: center; position: relative; border: 1px solid #c9a45c30; border-radius: 2px; cursor: pointer; padding: 8px;
      background: repeating-linear-gradient(45deg, #ffffff05 0 6px, transparent 6px 12px), #150e09; }
    .item svg { width: 78%; height: 78%; }
    .cant { position: absolute; right: 5px; bottom: 2px; font-family: var(--maquina); font-size: .8rem; color: var(--crema); }
    .item[aria-pressed="true"] { border-color: var(--oro-claro); box-shadow: 0 0 0 1px var(--oro-claro), 0 0 18px #e8cd8a40; }
    .examinar { margin-top: 12px; min-height: 6.2em; padding: 12px 14px; background: #0d0906; border: 1px solid #c9a45c30;
      font-family: var(--maquina); font-size: .92rem; line-height: 1.5; color: var(--crema); }
    .examinar b { color: var(--oro-claro); font-weight: 400; }
    .guardado { display: grid; gap: 16px; }
    .obtuviste { font-family: var(--maquina); font-size: 1rem; color: var(--oro-claro); padding: 10px 14px; border-left: 3px solid var(--oro); }
    h2 { font-size: clamp(2rem, 5.4vw, 3rem); color: var(--crema); }
    .guardado > p:not(.ceja):not(.obtuviste) { color: var(--suave); }
    .boton { display: inline-flex; align-items: center; gap: 14px; justify-self: start; padding: 16px 22px; border-radius: 3px; text-decoration: none;
      border: 1px solid var(--oro-claro); background: linear-gradient(180deg, var(--oro-claro), var(--oro) 60%, #b08840); color: var(--tinta);
      box-shadow: 0 12px 30px -10px #c9a45c99, inset 0 1px 0 #fff8; transition: transform .2s, box-shadow .2s; }
    a.boton:hover { transform: translateY(-2px); box-shadow: 0 18px 36px -10px #c9a45cbb, inset 0 1px 0 #fff8; }
    .boton svg { width: 34px; height: 34px; flex: none; }
    .boton b { display: block; font-family: var(--display); font-weight: 600; font-size: 1.25rem; line-height: 1.1; }
    .boton small { display: block; font-family: var(--maquina); font-size: .82rem; }
    .boton.espera { background: #2c1f16; color: var(--suave); border-color: #c9a45c55; box-shadow: none; }
    .boton.espera b { color: var(--oro-claro); }
    @media (max-width: 860px) { .sala { grid-template-columns: 1fr; } }
  `,
})
export class Guardar {
  protected readonly sel = signal<ItemId>('pase');
  protected readonly item = computed(() => ITEMS[this.sel()]);
  protected readonly pdf = ligaPdf(DATOS.pdf.liga, DATOS.pdf.modo);
}
