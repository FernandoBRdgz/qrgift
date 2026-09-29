import { Component } from '@angular/core';
import { Sobre } from './secciones/sobre';
import { Hero } from './secciones/hero';
import { Pases } from './secciones/pases';
import { Bosque } from './secciones/bosque';
import { Mapa } from './secciones/mapa';
import { Manzana } from './secciones/manzana';
import { Guardar } from './secciones/guardar';
import { Cierre } from './secciones/cierre';

@Component({
  selector: 'app-inicio',
  imports: [Sobre, Hero, Pases, Bosque, Mapa, Manzana, Guardar, Cierre],
  template: `
    <app-sobre />
    <main>
      <app-hero />
      <app-pases />
      <app-bosque />
      <app-mapa />
      <app-manzana />
      <app-guardar />
      <app-cierre />
    </main>
  `,
})
export class Inicio {}
