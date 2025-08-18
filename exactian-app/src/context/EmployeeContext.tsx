import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchEmployees } from "../services/api";

interface Employee {
  id: number;
  name: string;
  document_number: string;
  checkInTime: string;
  employee: {
    id: number;
    name: string;
    document_number: string;
  };
}

interface EmployeesContextValue {
  employees: Employee[];
  refresh: () => void;
}

const EmployeesContext = createContext<EmployeesContextValue | undefined>(
  undefined
);

export const EmployeesProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const refresh = async () => {
    const res = await fetchEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <EmployeesContext.Provider value={{ employees, refresh }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeesContext);
  if (!context)
    throw new Error("useEmployees must be used within EmployeesProvider");
  return context;
};
