import { useState } from "react";
import { useAttendance } from "../hooks/useAttendance";
import type { AttendanceStatus, AttendanceType, FormData } from "../types/attendance";
import { getErrorMessageByType, getSuccessMessage } from "../utils/attendanceUtils";
import { ActionButton, FormInputs } from "./forms";
import { StatusMessage, WorkTimeInfo } from "./ui";

interface Props {
  type: AttendanceType;
}

export default function EmployeeAction({ type }: Props) {
  const [formData, setFormData] = useState<FormData>({ documentNumber: "", timestamp: "" });
  const [status, setStatus] = useState<AttendanceStatus>({ error: "", success: "", workTime: null });
  const [isLoading, setIsLoading] = useState(false);
  
  const { checkIn, checkOut } = useAttendance();

  const resetForm = () => {
    setFormData({ documentNumber: "", timestamp: "" });
    setStatus({ error: "", success: "", workTime: null });
  };

  const handleAction = async () => {
    if (!formData.documentNumber) {
      setStatus(prev => ({ ...prev, error: "Número de documento es requerido" }));
      return;
    }

    setStatus({ error: "", success: "", workTime: null });
    setIsLoading(true);

    try {
      if (type === "IN") {
        await checkIn(formData.documentNumber, formData.timestamp || undefined);
        setStatus(prev => ({ ...prev, success: getSuccessMessage(type) }));
        resetForm();
      } else {
        const response = await checkOut(formData.documentNumber, formData.timestamp || undefined);
        const { totalTime } = response;
        
        if (totalTime) {
          const workTime = { hours: Math.floor(totalTime / 60), minutes: totalTime % 60 };
          setStatus(prev => ({ 
            ...prev, 
            success: getSuccessMessage(type, workTime),
            workTime 
          }));
        } else {
          setStatus(prev => ({ ...prev, success: getSuccessMessage(type) }));
        }
        setFormData({ documentNumber: "", timestamp: "" });
      }
    } catch (err: any) {
      setStatus(prev => ({ ...prev, error: getErrorMessageByType(err, type) }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const isCheckIn = type === "IN";

  return (
    <div className="bg-white shadow rounded p-4 space-y-2">
      <h2 className="font-bold text-lg">
        {isCheckIn ? "Registrar Entrada" : "Registrar Salida"}
      </h2>
      
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
      
      {status.workTime && !isCheckIn && (
        <WorkTimeInfo workTime={status.workTime} />
      )}
      
      {(status.success || status.workTime) && (
        <button
          onClick={() => setStatus({ error: "", success: "", workTime: null })}
          className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded"
        >
          Limpiar
        </button>
      )}
      
      <FormInputs 
        formData={formData}
        isLoading={isLoading}
        onInputChange={handleInputChange}
      />
      
      <ActionButton 
        type={type}
        isLoading={isLoading}
        onClick={handleAction}
      />
    </div>
  );
}
