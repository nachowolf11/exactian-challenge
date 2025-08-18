
import { useEmployees } from "../context/EmployeeContext";

export default function ActiveEmployees() {
  const { employees } = useEmployees();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map(attendance => (
        <div key={attendance.id} className="bg-white shadow-md rounded p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg">{attendance.employee.name}</h3>
            <p className="text-sm text-gray-500">{attendance.employee.document_number}</p>
            <p className="text-sm text-blue-600 mt-2">
              {new Date(attendance.checkInTime).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
