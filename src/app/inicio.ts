import { Component } from '@angular/core';
import { Sobre } from './secciones/sobre';
import { Hero } from './secciones/hero';
import { Pases } from './secciones/pases';
import { Bosque } from './secciones/bosque';

@Component({
  selector: 'app-inicio',
  imports: [Sobre, Hero, Pases, Bosque],
  template: `
    <app-sobre />
    <main>
      <app-hero />
      <app-pases />
      <app-bosque />
    </main>
  `,
})
export class Inicio {}
