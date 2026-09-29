import datos from '../datos.json';

export interface Pasajero {
  nombre: string;
  asiento: string;
}

export const DATOS = datos as {
  vuelo: {
    aerolinea: string;
    numero: string;
    origenCodigo: string;
    origenCiudad: string;
    fechaIda: string;
    fechaRegreso: string;
  };
  pasajeros: Pasajero[];
};

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** "2026-12-29" → "29 dic 2026"; vacío → "Por confirmar". */
export function fecha(v: string): string {
  if (!v) return 'Por confirmar';
  const [a, m, d] = v.split('-');
  return `${parseInt(d, 10)} ${MESES[parseInt(m, 10) - 1]} ${a}`;
}

export function porConfirmar(v: string): string {
  return v ? v : 'Por confirmar';
}

