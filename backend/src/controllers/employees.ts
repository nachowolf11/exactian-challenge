import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import * as employeeService from "../services/employees";

const createSchema = z.object({
  name: z.string().min(1),
  document_number: z.string().min(1),
});

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createSchema.parse(req.body);
    const employee = await employeeService.createEmployee(data);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
}

export async function listInside(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const employees = await employeeService.listInsideEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
}
