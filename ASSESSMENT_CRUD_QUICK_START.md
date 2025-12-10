# Quick Start: Assessment CRUD Operations

## 🚀 Quick Test Guide

### 1. Start the Application
```powershell
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 2. Access Admin Panel
- Login with admin credentials
- Navigate to: **Assessment Management** page

### 3. Create Your First Assessment

**Step 1**: Click "Create New Assessment"

**Step 2**: Fill Basic Info:
- Level: Select "easy"
- Title: "Level 1 - Easy (Observation Based)"
- Description: "Basic observation questions about daily interactions"
- Status: Keep "Active" toggled on

**Step 3**: Add Questions:

**Example Question 1:**
- Category: Social Interaction
- Question: "When meeting someone new, your child usually:"
- Option 1: "Smiles and says hello" → Score: 1 (Positive)
- Option 2: "Stays quiet" → Score: 2 (Mixed)
- Option 3: "Walks away" → Score: 3 (Concerning)
- Click "Add Question"

**Example Question 2:**
- Category: Eye Contact
- Question: "Does your child make eye contact during conversation?"
- Option 1: "Often" → Score: 1
- Option 2: "Sometimes" → Score: 2
- Option 3: "Rarely" → Score: 3
- Click "Add Question"

**Step 4**: Add more questions (aim for 10-15 per level)

**Step 5**: Click "Create Assessment"

### 4. Test Other Operations

**Edit Assessment:**
- Click pencil icon next to assessment
- Modify title or add/remove questions
- Click "Update Assessment"

**Delete Assessment:**
- Click trash icon
- Confirm deletion

**Filter & Search:**
- Use search box to find by title
- Filter by level dropdown
- Filter by status dropdown

### 5. Test User Experience
- Logout from admin
- Login as caregiver
- Go to Assessment page
- Verify questions load from your created assessment
- Complete assessment to verify it works

---

## 📋 API Quick Reference

### Admin APIs (Require Admin Role)
```javascript
// Import
import { assessmentAPI } from '../services/api';

// Create
await assessmentAPI.createAssessment({
  level: 'easy',
  title: 'My Assessment',
  description: 'Description here',
  questions: [...],
  isActive: true
});

// Get all
await assessmentAPI.getAllAssessments();
await assessmentAPI.getAllAssessments({ level: 'easy', isActive: true });

// Get by ID
await assessmentAPI.getAssessmentById(assessmentId);

// Update
await assessmentAPI.updateAssessment(assessmentId, {
  title: 'Updated Title',
  isActive: false
});

// Delete
await assessmentAPI.deleteAssessment(assessmentId);
```

### User APIs (Require Authentication)
```javascript
// Get all active assessments
await assessmentAPI.getAssessments();

// Get by level
await assessmentAPI.getAssessmentByLevel('easy');
```

---

## 📊 Assessment Levels

| Level | Label | Typical Question Count |
|-------|-------|----------------------|
| `easy` | Level 1 - Easy | 10-15 questions |
| `intermediate` | Level 2 - Intermediate | 10-15 questions |
| `advanced` | Level 3 - Advanced | 10-15 questions |
| `sensory` | Bonus - Sensory & Attention | 5-10 questions |

---

## 🎯 Question Categories

1. **Eye Contact** - Questions about visual engagement
2. **Social Interaction** - Questions about social behaviors
3. **Communication** - Questions about verbal/non-verbal communication
4. **Repetitive Behavior** - Questions about routine and repetitive actions
5. **Sensory Sensitivity** - Questions about sensory processing
6. **Focus & Attention** - Questions about concentration and attention

---

## 🎨 Scoring System

| Score | Meaning | Color | Interpretation |
|-------|---------|-------|----------------|
| 1 | Positive/Typical | Green | Healthy behavior |
| 2 | Mixed/Sometimes | Yellow | Moderate concern |
| 3 | Concerning/Rare | Red | Higher concern |

---

## ⚠️ Important Rules

1. **One Active Per Level**: Only ONE active assessment allowed per level
   - To create new active assessment for a level, deactivate existing one first

2. **Minimum Requirements**:
   - At least 1 question required
   - Each question needs exactly 3 options
   - Each option needs a score (1-3)

3. **Question ID Format**: Auto-generated as `{level}_{number}`
   - Example: `easy_1`, `easy_2`, etc.

---

## 🔍 Common Use Cases

### Scenario 1: Replace All Questions for a Level
1. Edit existing active assessment
2. Remove all old questions (click trash icon on each)
3. Add new questions
4. Update assessment

### Scenario 2: Create Multiple Versions
1. Deactivate current active assessment (edit → toggle off)
2. Create new assessment for same level
3. Activate it
4. Old assessment remains in database (inactive)

### Scenario 3: Temporarily Disable Assessment
1. Edit assessment
2. Toggle "Active" off
3. Update assessment
4. Users won't see it, but data is preserved

---

## 🎓 Tips for Creating Good Assessments

1. **Clear Questions**: Use simple, direct language
2. **Consistent Options**: Keep similar option patterns across questions
3. **Balanced Categories**: Distribute questions across all 6 categories
4. **Logical Progression**: Easier questions first, complex ones later
5. **Age-Appropriate**: Match complexity to target age group (8-10 years)

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't create assessment | Check if active one exists for that level |
| Questions not saving | Verify all fields filled (question + 3 options) |
| Assessment not showing | Check "Active" toggle is ON |
| 401 Error | Login as admin user |
| Empty table | No assessments created yet - click "Create New" |

---

## 📁 File Locations

### Backend:
- Model: `backend/models/Assessment.js`
- Controller: `backend/controllers/adminController.js`
- Admin Routes: `backend/routes/adminRoutes.js`
- Public Routes: `backend/routes/assessmentRoutes.js`

### Frontend:
- Admin UI: `frontend/src/pages/AssessmentManagement.jsx`
- User UI: `frontend/src/pages/Assessment.jsx`
- API Service: `frontend/src/services/api.js`

---

**Ready to start? Follow Step 1 above! 🚀**
