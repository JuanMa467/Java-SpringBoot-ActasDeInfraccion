/** Gravedades de tipo de infracción (catálogo fijo en formularios). */
export const GRAVEDADES_INFRACCION = [
  { value: 'LEVE', label: 'Leve' },
  { value: 'MODERADA', label: 'Moderada' },
  { value: 'GRAVE', label: 'Grave' },
  { value: 'MUY GRAVE', label: 'Muy grave' },
];

export function tipoInfraccionBody({ descrInfrac, tipoGravedad, importeAsignadoInfrac, porcentajeDescuento }) {
  return {
    descrInfrac,
    tipoGravedad,
    importeAsignadoInfrac: parseFloat(importeAsignadoInfrac) || 0,
    porcentajeDescuento: parseFloat(porcentajeDescuento) || 0,
  };
}
