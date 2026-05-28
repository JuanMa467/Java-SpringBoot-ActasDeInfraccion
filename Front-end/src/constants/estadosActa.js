/** Estados del acta (enum de dominio — no se cargan desde API). */
export const ESTADOS_ACTA = [
  { value: 'PENDIENTE', label: 'Pendiente' },
  { value: 'ACTIVA', label: 'Activa' },
  { value: 'CERRADA', label: 'Cerrada' },
  { value: 'ANULADA', label: 'Anulada' },
];

export function estadoActaFromNombre(nombre) {
  if (!nombre) return null;
  return { nombreEstadoActa: nombre, descripcionEstadoActa: nombre };
}
