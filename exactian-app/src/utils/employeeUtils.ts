export const validateEmployeeForm = (
  name: string,
  documentNumber: string
): string | null => {
  if (!name || !documentNumber) {
    return "Nombre y número de documento son requeridos";
  }
  return null;
};

export const getEmployeeSuccessMessage = (): string => {
  return "¡Empleado creado exitosamente!";
};
