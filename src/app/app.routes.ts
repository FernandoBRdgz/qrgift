import { Routes } from '@angular/router';
import { Inicio } from './inicio';

export const routes: Routes = [
  { path: '', component: Inicio },
  // Página sin enlaces para volver a generar la tarjeta con el QR.
  { path: 'tarjeta', loadComponent: () => import('./tarjeta/tarjeta').then((m) => m.Tarjeta) },
  { path: '**', redirectTo: '' },
];
