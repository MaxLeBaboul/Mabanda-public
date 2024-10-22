import { Router } from 'express';

import { approveLoan, getAllLoan, rejectLoan } from '../controllers/loanController.js';

const router = Router()

router.get('/', getAllLoan)

router.put('/:id/approve', approveLoan)

router.put('/:id/reject', rejectLoan)

export default router;