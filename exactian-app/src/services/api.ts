import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export interface ApiError {
  error: string;
  message: string;
}

export const fetchEmployees = () => api.get("/employees/inside");
export const createEmployee = (name: string, document_number: string) =>
  api.post("/employees", { name, document_number });
export const checkInEmployee = (document_number: string, at: Date) =>
  api.post("/attendance/check-in", { document_number, at });
export const checkOutEmployee = (document_number: string, at: Date) =>
  api.post("/attendance/check-out", { document_number, at });

export const isDuplicateDocumentError = (error: unknown): boolean => {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<ApiError>;
    return axiosError.response?.status === 409;
  }
  return false;
};

export const isNotFoundError = (error: unknown): boolean => {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<ApiError>;
    return axiosError.response?.status === 404;
  }
  return false;
};

export const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<ApiError>;
    if (axiosError.response?.data?.error) {
      return axiosError.response.data.error;
    }
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
  }
  return "Error desconocido";
};
