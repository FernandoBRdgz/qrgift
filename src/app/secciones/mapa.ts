import { Component } from '@angular/core';

@Component({
  selector: 'app-mapa',
  template: `
    <section>
      <div class="wrap">
        <div class="encabezado">
          <p class="epigrafe">It's been waiting for you.</p>
          <h2>Lo que vamos a vivir</h2>
          <p>Invierno en Manhattan y Brooklyn. Estos son los lugares que ya tienen nuestro nombre.</p>
        </div>
        <div class="lugares">
          <article class="lugar estrella">
            <div class="texto">
              <p class="ceja">31 de diciembre · 11:59 p. m.</p>
              <h3>Times Square</h3>
              <p>La bola de cristal baja por el mástil, un millón de personas cuentan al mismo tiempo y yo voy a estar viéndote solo a ti.</p>
              <p class="tres">3 · 2 · 1</p>
            </div>
            <svg class="bola" viewBox="0 0 200 240" aria-hidden="true">
              <defs>
                <radialGradient id="g-bola" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="#FFF4D6"/><stop offset=".35" stop-color="#E8CD8A"/><stop offset=".75" stop-color="#C9A45C"/><stop offset="1" stop-color="#6B4A2E"/></radialGradient>
                <clipPath id="c-bola"><circle cx="100" cy="92" r="66"/></clipPath>
              </defs>
              <rect x="96" y="150" width="8" height="90" fill="#8A6424"/>
              <circle cx="100" cy="92" r="66" fill="url(#g-bola)"/>
              <g clip-path="url(#c-bola)" stroke="#6B4A2E" stroke-opacity=".45" stroke-width="1.2" fill="none">
                <path d="M20 60 Q100 30 180 60 M20 92 Q100 62 180 92 M20 124 Q100 94 180 124 M20 156 Q100 126 180 156"/>
                <path d="M40 20 Q70 92 40 170 M70 20 Q90 92 70 170 M100 20 V170 M130 20 Q110 92 130 170 M160 20 Q130 92 160 170"/>
              </g>
              <g fill="#FFF4D6"><circle cx="72" cy="66" r="3"/><circle cx="128" cy="112" r="2"/><circle cx="96" cy="128" r="1.6"/><circle cx="150" cy="70" r="1.8"/></g>
              <g stroke="#E8CD8A" stroke-width="2" stroke-linecap="round" opacity=".8"><path d="M100 8 V18 M28 92 H18 M182 92 H172 M46 38 L39 31 M154 38 L161 31"/></g>
            </svg>
          </article>
          <article class="lugar">
            <svg class="icono" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M24 4l2 4.2 4.6.6-3.4 3.1.9 4.5L24 14.2l-4.1 2.2.9-4.5-3.4-3.1 4.6-.6z"/><path d="M24 17l-7 9h4l-8 10h6l-7 8h24l-7-8h6l-8-10h4z"/><path d="M22 44v2h4v-2"/></svg>
            <h3>Rockefeller Center<span class="zona">Midtown · 30 Rock</span></h3>
            <p>El árbol más famoso del mundo, patinar (o intentarlo) en la pista y subir a Top of the Rock para ver el Empire State de frente.</p>
          </article>
          <article class="lugar">
            <svg class="icono" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M24 2v7M21.5 9h5v5h-5zM19 14h10v7H19zM16 21h16v25H16zM12 30h4v16h-4zM32 30h4v16h-4z"/><path d="M20 26v16M24 26v16M28 26v16"/></svg>
            <h3>Empire State<span class="zona">Piso 86 · 5th Ave</span></h3>
            <p>La ciudad encendida hasta el horizonte, con el aire frío en la cara y el Chrysler brillando al norte.</p>
          </article>
          <article class="lugar">
            <svg class="icono" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M24 46V26M24 32l-6-5M24 29l6-6M24 36l5-3"/><path d="M14 27a10 10 0 0 1 3-17 9 9 0 0 1 14 0 10 10 0 0 1 3 17z"/><path d="M6 8v6M3 11h6M40 36v6M37 39h6M42 12v4M40 14h4"/></svg>
            <h3>Central Park<span class="zona">The Mall · Bow Bridge</span></h3>
            <p>Caminar entre los olmos desnudos con chocolate caliente en la mano y, si tenemos suerte, nieve de verdad.</p>
          </article>
          <article class="lugar">
            <svg class="icono" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M10 40V12h8v28M30 40V12h8v28M12 20a2 2 0 0 1 4 0v6h-4zM32 20a2 2 0 0 1 4 0v6h-4z"/><path d="M2 34h44M18 14Q24 30 30 14M2 16q6 12 8 16M46 16q-6 12-8 16"/><path d="M21 22v12M24 26v8M27 22v12"/></svg>
            <h3>Brooklyn Bridge<span class="zona">Cruzarlo a pie hasta DUMBO</span></h3>
            <p>Ver caer el sol detrás de Manhattan desde el otro lado del río, con el puente enmarcando todo.</p>
          </article>
          <article class="lugar">
            <svg class="icono" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M24 3c3 3 3 6 0 9-3-3-3-6 0-9z"/><path d="M19 12h10l-2 6h-6zM21 18v8h6v-8M20 26h8l1 20h-10z"/><path d="M14 46h20"/></svg>
            <h3>Estatua de la Libertad<span class="zona">Ferry desde Battery Park</span></h3>
            <p>Viento helado, el skyline entero desde el agua y tu mano en la mía en la cubierta del ferry.</p>
          </article>
          <article class="lugar">
            <svg class="icono" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="24" cy="22" r="13"/><circle cx="24" cy="22" r="10"/><path d="M24 15v7l5 3"/><path d="M24 35v6M18 44h12M24 4v5"/></svg>
            <h3>Grand Central<span class="zona">El reloj del vestíbulo</span></h3>
            <p>Pedir un deseo bajo el reloj dorado y susurrarte algo en la Whispering Gallery, de esquina a esquina.</p>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: `
    section { padding-block: 80px; background: var(--noche); }
    .epigrafe { font-family: var(--display); font-style: italic; font-size: 1.15rem; color: var(--oro-claro); }
    .lugares { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .lugar { display: grid; grid-template-rows: auto auto 1fr; gap: 10px; padding: 24px 22px 26px; position: relative;
      background: linear-gradient(180deg, #3a271c, #2c1d14); border: 1px solid #c9a45c2e; border-radius: 4px; }
    .icono { width: 46px; height: 46px; color: var(--oro); }
    h3 { font-size: 1.5rem; color: var(--crema); }
    .zona { display: block; margin-top: 4px; font-family: var(--maquina); font-size: .78rem; color: var(--oro); letter-spacing: .04em; }
    .lugar p { color: var(--suave); font-size: .98rem; }
    .estrella { grid-column: 1 / -1; grid-template-columns: minmax(0, 1fr) minmax(180px, 300px); grid-template-rows: auto; align-items: center; gap: 24px; padding: 34px 32px;
      background: radial-gradient(80% 120% at 85% 50%, #5a3a22 0%, #3a271c 55%, #2c1d14 100%); border-color: #c9a45c66; }
    .estrella h3 { font-size: clamp(2rem, 5vw, 2.8rem); }
    .estrella p { font-size: 1.08rem; max-width: 46ch; }
    .estrella .texto { display: grid; gap: 12px; }
    .estrella .ceja { color: var(--oro); font-size: .74rem; }
    .bola { width: 100%; max-width: 300px; height: auto; justify-self: center; }
    .tres { font-family: var(--display); font-size: clamp(1.6rem, 4vw, 2.2rem) !important; letter-spacing: .2em; color: var(--oro-claro) !important; }
    @supports (animation-timeline: view()) {
      .lugar { animation: entra linear both; animation-timeline: view(); animation-range: entry 0% entry 60%; }
      @keyframes entra { from { transform: translateY(26px); opacity: .35; } to { transform: none; opacity: 1; } }
    }
    @media (max-width: 860px) { .lugares { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 620px) {
      .lugares { grid-template-columns: 1fr; }
      .estrella { grid-template-columns: 1fr; padding: 26px 22px; }
      .bola { max-width: 180px; order: -1; justify-self: start; }
    }
  `,
})
export class Mapa {}
