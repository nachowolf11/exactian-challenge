import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import * as service from "../services/attendance";

const bodySchema = z.object({
  document_number: z.string(),
  at: z.string().datetime().optional(),
});

export async function postCheckIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { document_number, at } = bodySchema.parse(req.body);
    const dt = at ? new Date(at) : new Date();
    const session = await service.checkIn(document_number, dt);
    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
}

export async function postCheckOut(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { document_number, at } = bodySchema.parse(req.body);
    const dt = at ? new Date(at) : new Date();
    const result = await service.checkOut(document_number, dt);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
