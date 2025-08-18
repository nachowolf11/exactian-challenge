import { useEmployees } from "../context/EmployeeContext";
import { checkInEmployee, checkOutEmployee } from "../services/api";

export const useAttendance = () => {
  const { refresh } = useEmployees();

  const checkIn = async (document_number: string, at?: string) => {
    try {
      await checkInEmployee(document_number, at ? new Date(at) : new Date());
      refresh();
    } catch (error) {
      throw error;
    }
  };

  const checkOut = async (document_number: string, at?: string) => {
    try {
      const response = await checkOutEmployee(
        document_number,
        at ? new Date(at) : new Date()
      );
      refresh();
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { checkIn, checkOut };
};
