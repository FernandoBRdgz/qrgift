import { Component, DOCUMENT, afterNextRender, inject, signal } from '@angular/core';
import { Imagenes, generarImagenes } from './dibujo';

/**
 * Página sin enlaces (/tarjeta) para regenerar la tarjeta con el QR.
 * El QR apunta a la raíz del sitio publicado; para pruebas locales se puede forzar con ?url=https://…
 */
@Component({
  selector: 'app-tarjeta',
  template: `
    <main class="wrap">
      <p class="ceja">Solo para Fer</p>
      <h1>Tarjeta con el QR</h1>
      <p class="nota">El QR abre <code>{{ url }}</code>. La tarjeta mide 1200×1800 px, que son 4×6 in (10×15 cm) a 300 dpi.</p>
      @if (imagenes(); as img) {
        <div class="botones">
          <a class="btn" [href]="img.tarjeta" download="tarjeta-qr-brenda.png">Descargar tarjeta</a>
          <a class="btn" [href]="img.qr" download="qr-brenda.png">Descargar solo el QR</a>
        </div>
        <img id="img-tarjeta" [src]="img.tarjeta" alt="Tarjeta de cumpleaños para Bren con el QR" width="1200" height="1800">
        <img id="img-qr" [src]="img.qr" alt="QR solo" width="1160" height="1160" hidden>
      } @else {
        <p class="nota">{{ error() || 'Generando…' }}</p>
      }
    </main>
  `,
  styles: `
    main { padding-block: 48px 80px; display: grid; gap: 18px; max-width: 640px; }
    h1 { font-size: clamp(2rem, 6vw, 3rem); color: var(--crema); }
    .nota { color: var(--suave); }
    code { font-family: var(--maquina); color: var(--oro-claro); word-break: break-all; }
    .botones { display: flex; flex-wrap: wrap; gap: 10px; }
    .btn { padding: 12px 18px; border-radius: 3px; border: 1px solid var(--oro); color: var(--oro-claro); text-decoration: none; }
    .btn:first-child { background: var(--oro); color: var(--tinta); }
    img { width: 100%; height: auto; border-radius: 4px; }
  `,
})
export class Tarjeta {
  private readonly doc = inject(DOCUMENT);
  protected readonly url = new URLSearchParams(this.doc.location.search).get('url') || this.doc.baseURI;
  protected readonly imagenes = signal<Imagenes | null>(null);
  protected readonly error = signal('');

  constructor() {
    afterNextRender(() => {
      generarImagenes(this.url)
        .then((img) => this.imagenes.set(img))
        .catch(() => this.error.set('No se pudo generar el QR. Recarga la página.'));
    });
  }
}
