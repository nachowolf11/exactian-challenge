import type { FormData } from "../../types/attendance";

interface FormInputsProps {
  formData: FormData;
  isLoading: boolean;
  onInputChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInputs = ({ formData, isLoading, onInputChange }: FormInputsProps) => (
  <>
    <input
      type="text"
      placeholder="Número de Documento"
      className="border p-2 rounded w-full"
      value={formData.documentNumber}
      onChange={onInputChange("documentNumber")}
      disabled={isLoading}
    />
    
    <input
      type="datetime-local"
      className="border p-2 rounded w-full"
      value={formData.timestamp}
      onChange={onInputChange("timestamp")}
      disabled={isLoading}
    />
  </>
);
