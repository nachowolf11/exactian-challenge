import type { EmployeeFormData } from "../../types/employee";

interface EmployeeFormInputsProps {
  formData: EmployeeFormData;
  isLoading: boolean;
  onInputChange: (field: keyof EmployeeFormData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EmployeeFormInputs = ({ formData, isLoading, onInputChange }: EmployeeFormInputsProps) => (
  <>
    <input
      className="border p-2 rounded w-full"
      placeholder="Nombre"
      value={formData.name}
      onChange={onInputChange("name")}
      disabled={isLoading}
    />
    <input
      className="border p-2 rounded w-full"
      placeholder="Número de Documento"
      value={formData.documentNumber}
      onChange={onInputChange("documentNumber")}
      disabled={isLoading}
    />
  </>
);
