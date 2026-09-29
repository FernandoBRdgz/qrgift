/** Generador pseudoaleatorio con semilla, para que el skyline y el bosque salgan siempre iguales. */
export function azar(semilla: number): () => number {
  let s = semilla % 2147483647 || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const movimientoReducido = (): boolean =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
