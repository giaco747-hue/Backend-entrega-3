import { Router } from 'express';
import { getServices, getServiceById, createService } from '../controllers/services.controller.js';

const router = Router();

router.get('/', getServices);
router.get('/:sid', getServiceById);
router.post('/', createService);

export default router;