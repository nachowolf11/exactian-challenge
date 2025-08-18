import type { WorkTime } from "../../types/attendance";

interface WorkTimeInfoProps {
  workTime: WorkTime;
}

export const WorkTimeInfo = ({ workTime }: WorkTimeInfoProps) => {
  const isOvertime = workTime.hours >= 8;
  const bgColor = isOvertime 
    ? 'bg-yellow-100 border-yellow-400 text-yellow-700' 
    : 'bg-blue-100 border-blue-400 text-blue-700';

  return (
    <div className={`border px-4 py-3 rounded ${bgColor}`}>
      <div className="font-semibold">
        Tiempo trabajado: {workTime.hours}h {workTime.minutes}m
      </div>
      {isOvertime && (
        <div className="text-sm mt-1">
          ⚠️ El empleado trabajó más de 8 horas
        </div>
      )}
    </div>
  );
};
