import { Router } from 'express';
import attendance from './attendance';
import employees from './employees';

const router = Router();

router.use('/attendance', attendance);
router.use('/employees', employees);

export default router;