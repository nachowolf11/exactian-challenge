import { useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import { createEmployee, getErrorMessage } from "../services/api";
import type { EmployeeFormData, EmployeeStatus } from "../types/employee";
import { getEmployeeSuccessMessage, validateEmployeeForm } from "../utils/employeeUtils";
import { CreateEmployeeButton, EmployeeFormInputs } from "./forms";
import { StatusMessage } from "./ui";

export default function EmployeeCreate() {
  const [formData, setFormData] = useState<EmployeeFormData>({ name: "", documentNumber: "" });
  const [status, setStatus] = useState<EmployeeStatus>({ error: "", success: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useEmployees();

  const handleSubmit = async () => {
    if (isLoading) return;
    setStatus({ error: "", success: "" });

    const validationError = validateEmployeeForm(formData.name, formData.documentNumber);
    if (validationError) {
      setStatus(prev => ({ ...prev, error: validationError }));
      return;
    }

    setStatus({ error: "", success: "" });
    setIsLoading(true);

    try {
      await createEmployee(formData.name, formData.documentNumber);
      setFormData({ name: "", documentNumber: "" });
      refresh();
      setStatus(prev => ({ ...prev, success: getEmployeeSuccessMessage() }));
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err);
      setStatus(prev => ({ ...prev, error: errorMsg }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof EmployeeFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="bg-white shadow rounded p-4 space-y-2">
      <h2 className="font-bold text-lg">Crear Empleado</h2>

      {status.error && (
        <StatusMessage
          message={status.error}
          className="bg-red-100 border-red-400 text-red-700"
        />
      )}

      {status.success && (
        <StatusMessage
          message={status.success}
          className="bg-green-100 border-green-400 text-green-700"
        />
      )}

      <EmployeeFormInputs
        formData={formData}
        isLoading={isLoading}
        onInputChange={handleInputChange}
      />

      <CreateEmployeeButton
        isLoading={isLoading}
        onClick={handleSubmit}
      />
    </div>
  );
}
