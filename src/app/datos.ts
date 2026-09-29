import datos from '../datos.json';

export interface Escala {
  codigo: string;
  ciudad: string;
  hora: string;
  terminal: string;
}

export interface Vuelo {
  numero: string;
  sale: Escala;
  llega: Escala;
  /** Asiento por nombre de pasajero. */
  asientos: Record<string, string>;
}

export interface Trayecto {
  titulo: string;
  fecha: string;
  /** Lo que dice el talón en "Destino". */
  talon: string;
  vuelos: Vuelo[];
}

export const DATOS = datos as {
  aerolinea: string;
  pasajeros: string[];
  trayectos: Trayecto[];
};

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MESES_LARGOS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

function partes(v: string): [number, number, number] {
  const [a, m, d] = v.split('-').map((n) => parseInt(n, 10));
  return [a, m, d];
}

/** "2026-12-30" → "30 dic 2026"; vacío → "Por confirmar". */
export function fecha(v: string): string {
  if (!v) return 'Por confirmar';
  const [a, m, d] = partes(v);
  return `${d} ${MESES[m - 1]} ${a}`;
}

/** "2026-12-30" → "miércoles 30 de diciembre". */
export function fechaLarga(v: string): string {
  if (!v) return 'Por confirmar';
  const [a, m, d] = partes(v);
  const dia = DIAS[new Date(Date.UTC(a, m - 1, d)).getUTCDay()];
  return `${dia} ${d} de ${MESES_LARGOS[m - 1]}`;
}
