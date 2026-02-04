import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// All routes are protected
router.use(authMiddleware);

router.get('/', getProfile);
router.put('/', updateProfile);

export default router;
