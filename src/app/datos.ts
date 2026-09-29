import datos from '../datos.json';

export interface Pasajero {
  nombre: string;
  asiento: string;
}

export const DATOS = datos as {
  pdf: { liga: string; modo: 'descarga' | 'vista' | string };
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

/**
 * Convierte una liga para compartir de Google Drive en descarga directa o vista previa.
 * Cualquier otra liga (o una ruta como "pase.pdf" dentro de /public) se deja igual.
 */
export function ligaPdf(liga: string, modo: string): string {
  liga = (liga || '').trim();
  if (!liga) return '';
  const m = liga.match(/\/d\/([A-Za-z0-9_-]{10,})/) || liga.match(/[?&]id=([A-Za-z0-9_-]{10,})/);
  if (!m) return liga;
  return modo === 'vista'
    ? `https://drive.google.com/file/d/${m[1]}/view`
    : `https://drive.google.com/uc?export=download&id=${m[1]}`;
}
