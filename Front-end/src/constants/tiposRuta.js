/** Tipos de ruta definidos en la entidad TipoRuta (NACIONAL, PROVINCIAL, INTERNACIONAL). */
export const TIPOS_RUTA = [
  { value: 'NACIONAL', label: 'Nacional' },
  { value: 'PROVINCIAL', label: 'Provincial' },
  { value: 'INTERNACIONAL', label: 'Internacional' },
];

export function tipoRutaFromNombre(nombre) {
  if (!nombre) return null;
  const value = nombre.toUpperCase();
  const item = TIPOS_RUTA.find((t) => t.value === value);
  return {
    nombreTipoDeRuta: value,
    descTipoRuta: item?.label ?? value,
  };
}
