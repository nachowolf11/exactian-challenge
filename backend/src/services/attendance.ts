import prisma from "../lib/prisma";

export async function checkIn(document_number: string, at: Date = new Date()) {
  const employee = await prisma.employee.findUnique({
    where: { document_number },
  });

  if (!employee) {
    const error: any = new Error("Empleado no encontrado.");
    error.status = 404;
    throw error;
  }

  const open = await prisma.attendance.findFirst({
    where: { employee: { document_number }, checkOutTime: null },
  });
  if (open) {
    const error: any = new Error("El empleado ya está dentro de la empresa.");
    error.status = 409;
    throw error;
  }
  return prisma.attendance.create({
    data: { employee: { connect: { document_number } }, checkInTime: at },
  });
}

export async function checkOut(document_number: string, at: Date = new Date()) {
  const employee = await prisma.employee.findUnique({
    where: { document_number },
  });

  if (!employee) {
    const error: any = new Error("Empleado no encontrado.");
    error.status = 404;
    throw error;
  }

  const session = await prisma.attendance.findFirst({
    where: { employee: { document_number }, checkOutTime: null },
    orderBy: { checkInTime: "desc" },
  });
  if (!session) {
    const error: any = new Error(
      "El empleado no está actualmente dentro de la empresa."
    );
    error.status = 409;
    throw error;
  }
  if (at <= session.checkInTime) {
    const error: any = new Error(
      "La hora de salida debe ser posterior a la hora de entrada."
    );
    error.status = 400;
    throw error;
  }

  const ms = at.getTime() - session.checkInTime.getTime();
  const totalTime = Math.round(ms / 60000);

  return await prisma.attendance.update({
    where: { id: session.id },
    data: {
      checkOutTime: at,
      totalTime,
    },
  });
}
