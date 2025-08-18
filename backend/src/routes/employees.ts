import { Router } from "express";
import * as employeeController from "../controllers/employees";

const router = Router();

router.post("/", employeeController.create);
router.get("/inside", employeeController.listInside);

export default router;
