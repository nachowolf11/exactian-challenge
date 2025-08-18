export const formatWorkTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
};

export const getSuccessMessage = (
  type: "IN" | "OUT",
  workTime?: { hours: number; minutes: number }
) => {
  if (type === "IN") return "¡Empleado registró entrada exitosamente!";

  if (!workTime) return "¡Empleado registró salida exitosamente!";

  return workTime.hours >= 8
    ? `¡Empleado registró salida exitosamente! ⚠️ El empleado trabajó más de 8 horas.`
    : "¡Empleado registró salida exitosamente!";
};

export const getErrorMessageByType = (err: any, type: "IN" | "OUT") => {
  if (err?.response?.status === 404)
    return "Empleado no encontrado. Verifica el número de documento.";

  if (err?.response?.status === 409) {
    return type === "IN"
      ? "El empleado ya está dentro de la empresa."
      : "El empleado no está actualmente dentro de la empresa.";
  }

  return err?.response?.data?.error || "Error desconocido";
};
