import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status || 400;
  const message = err.message || "Error inesperado";
  res.status(status).json({ error: message });
}
