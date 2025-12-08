import express from 'express';
import * as childController from '../controllers/childController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Child management routes
router.post('/children', childController.addChild);
router.get('/children', childController.getChildren);
router.get('/children/:childId', childController.getChild);
router.put('/children/:childId', childController.updateChild);
router.delete('/children/:childId', childController.deleteChild);

// Activity tracking routes
router.post('/children/:childId/activities', childController.recordActivity);
router.get('/children/:childId/activities', childController.getChildActivities);

// Report routes
router.get('/children/:childId/report', childController.getChildReport);
router.get('/children/:childId/report/download', childController.downloadChildReportPDF);

export default router;
