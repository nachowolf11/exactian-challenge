interface CreateEmployeeButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export const CreateEmployeeButton = ({ isLoading, onClick }: CreateEmployeeButtonProps) => {
  const buttonColor = isLoading 
    ? 'bg-gray-400 cursor-not-allowed' 
    : 'bg-blue-500 hover:bg-blue-600';

  const buttonText = isLoading ? 'Creando...' : 'Crear Empleado';

  return (
    <button 
      className={`w-full py-2 rounded text-white ${buttonColor}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {buttonText}
    </button>
  );
};
