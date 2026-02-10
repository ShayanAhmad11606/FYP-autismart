
import express from 'express';
import { generateInsight } from '../controllers/aiController.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protect all routes
router.use(verifyToken);

router.post('/generate-insight/:childId', generateInsight);

export default router;
