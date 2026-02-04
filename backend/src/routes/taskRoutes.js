import { Router } from 'express';
import {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
} from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// All routes are protected
router.use(authMiddleware);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
