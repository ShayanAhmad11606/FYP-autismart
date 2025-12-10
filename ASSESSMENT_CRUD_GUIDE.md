# Quiz-Based Assessment CRUD Implementation Guide

## 🎯 Overview
Admin users can now perform full CRUD (Create, Read, Update, Delete) operations on quiz-based assessments through a comprehensive management interface.

---

## 📦 What Was Implemented

### 1. **Backend - Assessment Model** (`backend/models/Assessment.js`)
- **MongoDB Schema** with the following structure:
  - `level`: Assessment difficulty (easy, intermediate, advanced, sensory)
  - `title`: Assessment title
  - `description`: Assessment description
  - `questions`: Array of question objects with:
    - `id`: Unique question identifier
    - `category`: Question category (6 types available)
    - `question`: Question text
    - `options`: Array of 3 answer options
    - `scores`: Array of 3 scores (1-3) for each option
  - `isActive`: Boolean to enable/disable assessment
  - `createdBy`: Reference to admin who created it
  - `updatedBy`: Reference to last admin who updated it
  - Timestamps (createdAt, updatedAt)

- **Validation Rules**:
  - Each question must have exactly 3 options and 3 scores
  - Scores must be between 1-3
  - Only one active assessment per level
  - At least one question required

### 2. **Backend - Admin Controller** (`backend/controllers/adminController.js`)
Added 6 new controller functions:

#### `createAssessment()`
- Creates new assessment
- Validates level, title, description, questions
- Ensures only one active assessment per level
- Returns created assessment

#### `getAllAssessments()`
- Fetches all assessments with optional filters:
  - `?level=easy` - Filter by level
  - `?isActive=true` - Filter by status
- Populates creator/updater information
- Returns array of assessments

#### `getAssessmentById()`
- Fetches single assessment by ID
- Returns detailed assessment data

#### `updateAssessment()`
- Updates existing assessment
- Validates level conflicts
- Tracks who updated it
- Returns updated assessment

#### `deleteAssessment()`
- Permanently deletes assessment
- No soft delete implemented

#### `getActiveAssessmentByLevel()`
- Fetches the active assessment for a specific level
- Used by admin to preview active assessments

### 3. **Backend - Routes** (`backend/routes/adminRoutes.js`)
Added assessment routes under `/api/admin/assessments`:

```javascript
POST   /api/admin/assessments              // Create new assessment
GET    /api/admin/assessments              // Get all assessments
GET    /api/admin/assessments/:id          // Get single assessment
PUT    /api/admin/assessments/:id          // Update assessment
DELETE /api/admin/assessments/:id          // Delete assessment
GET    /api/admin/assessments/active/:level // Get active by level
```

All routes require authentication and admin role.

### 4. **Backend - Public Assessment Routes** (`backend/routes/assessmentRoutes.js`)
Created new route file for authenticated users:

```javascript
GET /api/assessments          // Get all active assessments
GET /api/assessments/:level   // Get active assessment by level
```

These routes are accessible by all authenticated users (caregivers, experts, admins).

### 5. **Frontend - API Service** (`frontend/src/services/api.js`)
Added `assessmentAPI` object with functions:

```javascript
assessmentAPI.getAssessments()                    // Get all active (for users)
assessmentAPI.getAssessmentByLevel(level)         // Get by level (for users)
assessmentAPI.createAssessment(data)              // Create (admin only)
assessmentAPI.getAllAssessments(filters)          // Get all (admin only)
assessmentAPI.getAssessmentById(id)               // Get by ID (admin only)
assessmentAPI.updateAssessment(id, data)          // Update (admin only)
assessmentAPI.deleteAssessment(id)                // Delete (admin only)
```

### 6. **Frontend - Admin UI** (`frontend/src/pages/AssessmentManagement.jsx`)
Complete rewrite to provide assessment CRUD interface:

#### Features:
- **Statistics Dashboard**:
  - Total assessments count
  - Active/Inactive counts
  - Total questions count

- **Search & Filters**:
  - Search by title/description
  - Filter by level (easy/intermediate/advanced/sensory)
  - Filter by status (active/inactive)

- **Assessment Table**:
  - Shows level, title, question count, status, created date
  - Edit and Delete actions for each assessment

- **Create/Edit Modal**:
  - Form for basic info (level, title, description, active status)
  - Dynamic question builder
  - Add multiple questions with:
    - Category selector (6 categories)
    - Question text
    - 3 options with scores
  - Question list with remove functionality
  - Validation before saving

#### Categories Available:
1. Eye Contact
2. Social Interaction
3. Communication
4. Repetitive Behavior
5. Sensory Sensitivity
6. Focus & Attention

### 7. **Frontend - Assessment Page Update** (`frontend/src/pages/Assessment.jsx`)
Enhanced to fetch from backend:

- Fetches active assessments on component mount
- Falls back to default questions if fetch fails
- Shows loading state while fetching
- Displays toast notifications for errors
- Maintains all existing functionality

---

## 🚀 How to Use

### For Admins:

1. **Navigate to Assessment Management**:
   - Go to Admin Panel → Assessment Management

2. **Create New Assessment**:
   - Click "Create New Assessment" button
   - Fill in:
     - Level (easy/intermediate/advanced/sensory)
     - Title
     - Description
     - Active status (toggle)
   - Add questions:
     - Select category
     - Enter question text
     - Enter 3 options
     - Assign scores (1=Positive, 2=Mixed, 3=Concerning)
     - Click "Add Question"
   - Review questions list
   - Click "Create Assessment"

3. **Edit Assessment**:
   - Click pencil icon on any assessment
   - Modify any fields
   - Add/remove questions
   - Click "Update Assessment"

4. **Delete Assessment**:
   - Click trash icon on any assessment
   - Confirm deletion

5. **Important Notes**:
   - Only ONE active assessment per level allowed
   - To activate a new assessment for a level, deactivate the existing one first
   - Questions are categorized for better organization
   - Scores: 1 = Typical/Positive, 2 = Mixed, 3 = Concerning

### For Users (Caregivers):
- No changes to user experience
- Assessment page automatically fetches from database
- If database fetch fails, falls back to hardcoded questions
- Take assessment as before

---

## 🔧 API Endpoints Summary

### Admin Endpoints (Require Admin Role)
```
POST   /api/admin/assessments
GET    /api/admin/assessments?level=easy&isActive=true
GET    /api/admin/assessments/:id
PUT    /api/admin/assessments/:id
DELETE /api/admin/assessments/:id
GET    /api/admin/assessments/active/:level
```

### Public Endpoints (Require Authentication)
```
GET /api/assessments
GET /api/assessments/:level
```

---

## 📊 Database Schema

```javascript
{
  level: String (enum: easy, intermediate, advanced, sensory),
  title: String,
  description: String,
  questions: [
    {
      id: String,
      category: String (enum: 6 categories),
      question: String,
      options: [String, String, String],
      scores: [Number, Number, Number]
    }
  ],
  isActive: Boolean,
  createdBy: ObjectId (ref: User),
  updatedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## ✅ Testing Steps

1. **Start Backend**:
   ```powershell
   cd backend
   npm start
   ```

2. **Start Frontend**:
   ```powershell
   cd frontend
   npm run dev
   ```

3. **Login as Admin**:
   - Use admin credentials

4. **Test CRUD Operations**:
   - ✅ Create a new assessment for "easy" level
   - ✅ Add 5 questions to it
   - ✅ View the assessment in the table
   - ✅ Edit the assessment (change title, add/remove questions)
   - ✅ Try creating another "easy" assessment (should fail - only one active per level)
   - ✅ Deactivate first assessment, then create second one (should work)
   - ✅ Delete an assessment
   - ✅ Test filters and search

5. **Test User Assessment Page**:
   - Login as caregiver
   - Go to Assessment page
   - Verify questions load from database
   - Complete assessment normally

---

## 🔒 Security Features

- ✅ Authentication required for all assessment endpoints
- ✅ Admin role required for CRUD operations
- ✅ Only authenticated users can view active assessments
- ✅ Input validation on backend
- ✅ Mongoose schema validation
- ✅ Unique active assessment per level constraint

---

## 📝 Files Modified/Created

### Backend:
- ✅ Created: `backend/models/Assessment.js`
- ✅ Modified: `backend/controllers/adminController.js`
- ✅ Modified: `backend/routes/adminRoutes.js`
- ✅ Created: `backend/routes/assessmentRoutes.js`
- ✅ Modified: `backend/server.js`

### Frontend:
- ✅ Modified: `frontend/src/services/api.js`
- ✅ Modified: `frontend/src/pages/AssessmentManagement.jsx`
- ✅ Modified: `frontend/src/pages/Assessment.jsx`
- ✅ Created: `ASSESSMENT_CRUD_GUIDE.md` (this file)

---

## 🐛 Troubleshooting

### Issue: "An active assessment already exists for this level"
**Solution**: Deactivate the existing assessment first, then create/activate the new one.

### Issue: Questions not loading in Assessment page
**Solution**: Check if any active assessments exist in the database. The page falls back to hardcoded questions if none are found.

### Issue: Can't create assessment - validation error
**Solution**: Ensure all fields are filled:
- Title and description are required
- At least one question is required
- Each question must have 3 options and 3 scores

### Issue: 401 Unauthorized
**Solution**: Ensure you're logged in as an admin user.

---

## 🎓 Future Enhancements (Optional)

1. **Bulk Import**: Import questions from CSV/Excel
2. **Question Bank**: Reusable questions across assessments
3. **Version History**: Track changes to assessments
4. **Preview Mode**: Preview assessment before activating
5. **Duplicate Assessment**: Clone existing assessment to new level
6. **Export Questions**: Export as PDF or JSON
7. **Analytics**: Track which questions are most answered correctly/incorrectly

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Check backend terminal for server errors
3. Verify MongoDB connection
4. Ensure you're using admin account
5. Check API endpoints are responding correctly

---

**Implementation Date**: December 10, 2025
**Status**: ✅ Complete and Ready for Testing
