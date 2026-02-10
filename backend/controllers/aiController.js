
import aiService from '../services/ai.service.js';
import { asyncHandler } from '../middleware/error.middleware.js';

// @desc    Generate AI insights for a child
// @route   POST /api/ai/generate-insight/:childId
// @access  Private (Caregiver/Expert/Admin)
export const generateInsight = asyncHandler(async (req, res) => {
    const { childId } = req.params;

    // Basic validation - check if API key exists
    if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({
            success: false,
            message: 'AI Service unavailable: API Key not configured'
        });
    }

    const insight = await aiService.generateInsights(childId);

    res.status(200).json({
        success: true,
        data: {
            insight,
            generatedAt: new Date()
        }
    });
});
