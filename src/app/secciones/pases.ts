import { Component } from '@angular/core';
import { DATOS, fecha, porConfirmar } from '../datos';
import { azar } from '../azar';

interface Barra { x: number; w: number; }

@Component({
  selector: 'app-pases',
  template: `
    <section>
      <div class="wrap">
        <div class="encabezado">
          <p class="ceja">Sujétate fuerte</p>
          <h2>Dos pases, un mismo asiento en la historia</h2>
          <p>Uno con tu nombre y otro con el mío. El PDF oficial te espera más abajo, en la sala de guardado.</p>
        </div>
        <div class="boletos">
          @for (p of boletos; track p.nombre) {
            <article class="boleto" [attr.aria-label]="'Pase de ' + p.nombre">
              <div class="main">
                <div class="cabeza">
                  <span class="marca">{{ aerolinea }}</span>
                  <span class="clase">Clase encantada</span>
                </div>
                <div class="ruta">
                  <div><div class="cod">{{ origenCodigo }}</div><div class="ciudad">{{ origenCiudad }}</div></div>
                  <div class="avion">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" transform="rotate(90 12 12)"/></svg>
                  </div>
                  <div class="destino"><div class="cod">JFK</div><div class="ciudad">Nueva York</div></div>
                </div>
                <div class="datos">
                  <div class="dato"><small>Pasajero</small><span>{{ p.nombre }}</span></div>
                  <div class="dato"><small>Vuelo</small><span>{{ vuelo }}</span></div>
                  <div class="dato"><small>Salida</small><span>{{ ida }}</span></div>
                  <div class="dato"><small>Regreso</small><span>{{ regreso }}</span></div>
                  <div class="dato"><small>Puerta</small><span>13</span></div>
                </div>
              </div>
              <div class="talon">
                <div class="dato"><small>Asiento</small><span>{{ p.asiento || '—' }}</span></div>
                <div class="dato"><small>Destino</small><span>Año nuevo</span></div>
                <svg class="barras" viewBox="0 0 196 46" preserveAspectRatio="none" aria-hidden="true">
                  @for (b of p.barras; track $index) {
                    <rect [attr.x]="b.x" y="0" [attr.width]="b.w" height="46" fill="#2A1C13" />
                  }
                </svg>
                <p class="pie">B + F · Admite uno</p>
              </div>
            </article>
          }
        </div>
        <div class="notas">
          <span>Hora de NY: EST, UTC−5</span>
          <span>Clima: entre −3 °C y 5 °C</span>
          <span>Lleva guantes. Yo llevo el chocolate caliente.</span>
        </div>
      </div>
    </section>
  `,
  styles: `
    section { padding-block: 80px 72px; background: var(--espresso); }
    .boletos { display: grid; gap: 28px; }
    .boleto { display: grid; grid-template-columns: 1fr 210px; color: var(--tinta); filter: drop-shadow(0 22px 30px #00000080); }
    .boleto:nth-child(1) { transform: rotate(.4deg); }
    .boleto:nth-child(2) { transform: rotate(-.6deg); }
    .main, .talon { background: var(--papel); position: relative; }
    .main { border-radius: 10px 0 0 10px; padding: 22px 26px; display: grid; gap: 16px;
      -webkit-mask: radial-gradient(circle 12px at 100% 0, #0000 98%, #000) top/100% 51% no-repeat, radial-gradient(circle 12px at 100% 100%, #0000 98%, #000) bottom/100% 51% no-repeat;
      mask: radial-gradient(circle 12px at 100% 0, #0000 98%, #000) top/100% 51% no-repeat, radial-gradient(circle 12px at 100% 100%, #0000 98%, #000) bottom/100% 51% no-repeat; }
    .talon { border-radius: 0 10px 10px 0; padding: 22px 20px; display: grid; gap: 10px; align-content: space-between; border-left: 2px dashed #a0724e88;
      -webkit-mask: radial-gradient(circle 12px at 0 0, #0000 98%, #000) top/100% 51% no-repeat, radial-gradient(circle 12px at 0 100%, #0000 98%, #000) bottom/100% 51% no-repeat;
      mask: radial-gradient(circle 12px at 0 0, #0000 98%, #000) top/100% 51% no-repeat, radial-gradient(circle 12px at 0 100%, #0000 98%, #000) bottom/100% 51% no-repeat; }
    .cabeza { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding-bottom: 12px; border-bottom: 1px solid #a0724e40; }
    .marca { font-family: var(--display); font-style: italic; font-size: 1.15rem; color: var(--oro-hondo); }
    .clase { font-size: .68rem; letter-spacing: .22em; text-transform: uppercase; padding: 4px 10px; border: 1px solid var(--oro-hondo); border-radius: 20px; color: var(--oro-hondo); white-space: nowrap; }
    .ruta { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 16px; }
    .cod { font-family: var(--display); font-size: clamp(2.6rem, 8vw, 3.6rem); font-weight: 600; line-height: 1; }
    .ciudad { font-size: .78rem; color: #6b4f3a; }
    .destino { text-align: right; }
    .avion { display: flex; align-items: center; gap: 8px; color: var(--caramelo); }
    .avion::before, .avion::after { content: ""; flex: 1; border-top: 1.5px dotted currentColor; }
    .avion svg { width: 26px; height: 26px; flex: none; }
    .datos { display: grid; grid-template-columns: repeat(auto-fit, minmax(118px, 1fr)); gap: 12px 18px; }
    .dato small { display: block; font-size: .64rem; letter-spacing: .2em; text-transform: uppercase; color: #8a6d55; }
    .dato span { font-family: var(--maquina); font-size: 1.02rem; line-height: 1.3; }
    .talon .dato span { font-size: 1.25rem; }
    .barras { display: block; width: 100%; height: 46px; }
    .pie { font-size: .72rem; color: #8a6d55; font-family: var(--maquina); }
    .notas { display: flex; flex-wrap: wrap; gap: 8px 22px; margin-top: 28px; font-family: var(--maquina); font-size: .85rem; color: var(--suave); }
    .notas span::before { content: "✦ "; color: var(--oro); }
    @media (max-width: 620px) {
      .boleto { grid-template-columns: 1fr; }
      .main { border-radius: 10px 10px 0 0; padding: 20px 18px;
        -webkit-mask: radial-gradient(circle 12px at 0 100%, #0000 98%, #000) left/51% 100% no-repeat, radial-gradient(circle 12px at 100% 100%, #0000 98%, #000) right/51% 100% no-repeat;
        mask: radial-gradient(circle 12px at 0 100%, #0000 98%, #000) left/51% 100% no-repeat, radial-gradient(circle 12px at 100% 100%, #0000 98%, #000) right/51% 100% no-repeat; }
      .talon { border-radius: 0 0 10px 10px; border-left: 0; border-top: 2px dashed #a0724e88; grid-template-columns: 1fr 1fr; align-items: end;
        -webkit-mask: radial-gradient(circle 12px at 0 0, #0000 98%, #000) left/51% 100% no-repeat, radial-gradient(circle 12px at 100% 0, #0000 98%, #000) right/51% 100% no-repeat;
        mask: radial-gradient(circle 12px at 0 0, #0000 98%, #000) left/51% 100% no-repeat, radial-gradient(circle 12px at 100% 0, #0000 98%, #000) right/51% 100% no-repeat; }
      .barras, .pie { grid-column: 1 / -1; }
      .ruta { gap: 10px; }
    }
  `,
})
export class Pases {
  protected readonly aerolinea = DATOS.vuelo.aerolinea || 'Vuelo de cumpleaños';
  protected readonly origenCodigo = (DATOS.vuelo.origenCodigo || 'MEX').toUpperCase();
  protected readonly origenCiudad = DATOS.vuelo.origenCiudad;
  protected readonly vuelo = porConfirmar(DATOS.vuelo.numero);
  protected readonly ida = fecha(DATOS.vuelo.fechaIda);
  protected readonly regreso = fecha(DATOS.vuelo.fechaRegreso);
  protected readonly boletos = DATOS.pasajeros.map((p) => ({ ...p, barras: barras(p.nombre + p.asiento) }));
}

/** Código de barras decorativo, siempre igual para el mismo texto. */
function barras(texto: string): Barra[] {
  let h = 0;
  for (const ch of texto) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const r = azar((h % 2147483646) + 1);
  const out: Barra[] = [];
  for (let x = 0; x < 196;) {
    const w = r() < 0.5 ? 1.2 : r() < 0.7 ? 2.4 : 3.6;
    out.push({ x: +x.toFixed(1), w });
    x += w + (r() < 0.6 ? 1.6 : 3);
  }
  return out;
}
