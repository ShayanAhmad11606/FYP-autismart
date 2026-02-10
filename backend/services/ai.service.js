
import { GoogleGenerativeAI } from '@google/generative-ai';
import Child from '../models/Child.js';
import Assessment from '../models/Assessment.js';
import Activity from '../models/Activity.js';

class AIService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.genAI = this.apiKey ? new GoogleGenerativeAI(this.apiKey) : null;
  }

  async generateInsights(childId) {
    if (!this.genAI) {
      throw new Error('Gemini API key is not configured');
    }

    try {
      // 1. Fetch comprehensive child data
      const child = await Child.findById(childId);
      if (!child) throw new Error('Child not found');

      const activities = await Activity.find({ child: childId })
        .sort({ completedAt: -1 })
        .limit(10);

      // unique games played
      const uniqueGames = [...new Set(activities.map(a => a.activityName))];
      
      const averageScore = activities.length > 0 
        ? activities.reduce((acc, curr) => acc + (curr.score || 0), 0) / activities.length 
        : 0;

      // 2. Construct prompt for Gemini
      const prompt = `
        As an expert child development specialist, analyze the following progress report for a child named ${child.name}, age ${child.age}.
        
        **Child Profile:**
        - Gender: ${child.gender}
        - Diagnosis: ${child.diagnosis || 'None specified'}
        - Special Needs: ${child.specialNeeds || 'None specified'}
        
        **Recent Activity:**
        - Total Activities Logged: ${activities.length} (recent sample)
        - Average Performance Score: ${averageScore.toFixed(1)}%
        - Games/Activities Played: ${uniqueGames.join(', ') || 'None yet'}
        
        **Latest Performance Details:**
        ${activities.map(a => `- ${a.activityName}: ${a.score}% (${new Date(a.completedAt).toLocaleDateString()})`).join('\n')}
        
        **Task:**
        Provide a concise, encouraging 3-paragraph summary for the parents:
        1. **Overview:** A warm summary of ${child.name}'s recent engagement and progress.
        2. **Strengths:** Identify 2-3 specific areas where the child is showing good effort or results based on the data.
        3. **Recommendation:** One actionable, simple tip for the caregiver to support their development at home based on their activity patterns.
        
        Keep the tone professional yet empathetic and encouraging. Avoid medical jargon.
      `;

      // 3. Call Gemini API
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
      
    } catch (error) {
      console.error('Error in AI Service:', error);
      throw new Error('Failed to generate AI insights: ' + error.message);
    }
  }
}

export default new AIService();
