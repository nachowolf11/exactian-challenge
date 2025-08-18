import type { AttendanceType } from "../../types/attendance";

interface ActionButtonProps {
  type: AttendanceType;
  isLoading: boolean;
  onClick: () => void;
}

export const ActionButton = ({ type, isLoading, onClick }: ActionButtonProps) => {
  const isCheckIn = type === "IN";
  const buttonColor = isLoading 
    ? 'bg-gray-400 cursor-not-allowed' 
    : isCheckIn 
      ? 'bg-green-500 hover:bg-green-600' 
      : 'bg-red-500 hover:bg-red-600';

  const buttonText = isLoading 
    ? 'Registrando...' 
    : isCheckIn 
      ? 'Registrar Entrada' 
      : 'Registrar Salida';

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`w-full py-2 rounded text-white ${buttonColor}`}
    >
      {buttonText}
    </button>
  );
};
