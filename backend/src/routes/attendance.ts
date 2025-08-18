import { Router } from "express";
import * as attendanceController from "../controllers/attendance";

const router = Router();

router.post("/check-in", attendanceController.postCheckIn);
router.post("/check-out", attendanceController.postCheckOut);

export default router;
