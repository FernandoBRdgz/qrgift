import { Component } from '@angular/core';

@Component({
  selector: 'app-manzana',
  template: `
    <section>
      <div class="wrap">
        <svg viewBox="0 0 200 220" aria-hidden="true">
          <defs>
            <radialGradient id="g-manzana" cx="36%" cy="34%" r="75%"><stop offset="0" stop-color="#E0473F"/><stop offset=".45" stop-color="#9E1C1C"/><stop offset="1" stop-color="#3D0808"/></radialGradient>
            <linearGradient id="g-hoja" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8CD8A"/><stop offset="1" stop-color="#8A6424"/></linearGradient>
          </defs>
          <path d="M100 58c-14-12-40-16-60-2C14 74 14 118 30 152c14 30 36 54 56 54 8 0 10-4 14-4s6 4 14 4c20 0 42-24 56-54 16-34 16-78-10-96-20-14-46-10-60 2z" fill="url(#g-manzana)"/>
          <path d="M58 82c-10 10-14 26-12 40" stroke="#fff" stroke-opacity=".35" stroke-width="6" stroke-linecap="round" fill="none"/>
          <path d="M100 60c0-18 4-34 12-46" stroke="#5A3D28" stroke-width="6" stroke-linecap="round" fill="none"/>
          <path d="M108 30c14-18 40-20 52-12-8 16-32 24-52 12z" fill="url(#g-hoja)"/>
        </svg>
        <p class="ceja">La Gran Manzana</p>
        <h2>Esta vez la manzana es para los dos</h2>
        <p>No tienes que elegir nada. Solo sujetarte fuerte y dejar que yo te lleve.</p>
        <p class="susurro">…y el león se enamoró del cordero.</p>
      </div>
    </section>
  `,
  styles: `
    section { padding-block: 96px; background: #0c0806; text-align: center; overflow: hidden; }
    .wrap { display: grid; justify-items: center; gap: 22px; }
    svg { width: min(250px, 62vw); height: auto; filter: drop-shadow(0 30px 40px #9e1c1c33); }
    h2 { font-size: clamp(2rem, 6vw, 3.2rem); color: var(--crema); }
    p { color: var(--suave); max-width: 40ch; }
    .ceja { color: var(--oro); }
    .susurro { font-family: var(--display); font-style: italic; color: #a8928040; font-size: .95rem; transition: color .6s; }
    .susurro:hover { color: #a89280; }
  `,
})
export class Manzana {}
