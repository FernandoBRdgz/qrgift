import { Component } from '@angular/core';
import { Sobre } from './secciones/sobre';
import { Hero } from './secciones/hero';
import { Pases } from './secciones/pases';
import { Bosque } from './secciones/bosque';
import { Manzana } from './secciones/manzana';
import { Guardar } from './secciones/guardar';
import { Cierre } from './secciones/cierre';

@Component({
  selector: 'app-inicio',
  imports: [Sobre, Hero, Pases, Bosque, Manzana, Guardar, Cierre],
  template: `
    <app-sobre />
    <main>
      <app-hero />
      <app-pases />
      <app-bosque />
      <app-manzana />
      <app-guardar />
      <app-cierre />
    </main>
  `,
})
export class Inicio {}
