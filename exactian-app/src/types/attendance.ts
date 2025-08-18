export interface FormData {
  documentNumber: string;
  timestamp: string;
}

export interface WorkTime {
  hours: number;
  minutes: number;
}

export interface AttendanceStatus {
  error: string;
  success: string;
  workTime: WorkTime | null;
}

export type AttendanceType = "IN" | "OUT";
