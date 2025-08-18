import prisma from "../lib/prisma";

export async function createEmployee(data: {
  name: string;
  document_number: string;
}) {
  try {
    return await prisma.employee.create({ data });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      throw new Error("Ya existe un empleado con este número de documento");
    }
    throw error;
  }
}

export async function listInsideEmployees() {
  return await prisma.attendance.findMany({
    where: {
      checkOutTime: null,
    },
    include: {
      employee: {
        select: {
          id: true,
          name: true,
          document_number: true,
        },
      },
    },
    orderBy: {
      checkInTime: "desc",
    },
  });
}
