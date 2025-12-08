# Quick Start Guide - Child Management System

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
# Backend
cd backend
npm install pdfkit

# Frontend  
cd frontend
npm install chart.js react-chartjs-2
```

### Step 2: Start the Servers
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 3: Use the System

#### As a Caregiver:

**1. Add Your First Child**
- Navigate to "My Children" in the navbar
- Click "Add Child"
- Fill in: Name, Age, Gender (required)
- Optionally add: DOB, Diagnosis, Special Needs, Notes
- Click "Add Child"

**2. Select a Child**
- Go to any game (Memory Match, Color Matching)
- Use the Child Selector at the top
- Click on the child you want to track

**3. Play Games**
- Complete the game as normal
- Performance is automatically recorded!
- No additional action needed

**4. View Reports**
- Navigate to "Reports" in navbar
- Select the child from dropdown
- See detailed statistics and charts
- Click "Download PDF" for a report file

---

## 📋 Quick Reference

### Navigation Links
- `/children` - Manage Children
- `/child-reports` - View Reports
- `/games` - Therapy Games
- `/dashboard` - Overview

### Key Components
```javascript
// Use in any game/assessment
import { useChild } from '../context/ChildContext';
import ChildSelector from '../components/ChildSelector';

const { selectedChild, recordActivity } = useChild();
```

### Record Activity
```javascript
recordActivity({
  activityType: 'game',
  activityName: 'Your Game',
  score: 850,
  maxScore: 1000,
  percentage: 85,
  duration: 120,
  difficulty: 'medium',
  correctAnswers: 8,
  incorrectAnswers: 2
});
```

---

## ✅ Checklist

### Before Using:
- [ ] Backend server running
- [ ] Frontend server running
- [ ] Logged in as caregiver
- [ ] Firebase configured

### To Track Progress:
- [ ] Child added in system
- [ ] Child selected before game
- [ ] Game completed successfully
- [ ] Check reports page for data

---

## 🎯 Common Tasks

### Add Multiple Children
1. Go to "My Children"
2. Click "Add Child" for each
3. Fill forms and save

### Switch Between Children
1. Use Child Selector on game page
2. Or select from Dashboard
3. Selection saved automatically

### Download Monthly Report
1. Go to "Reports"
2. Select child
3. Click "Download PDF"
4. Save file with auto-generated name

---

## 🆘 Need Help?

See `CHILD_MANAGEMENT_SYSTEM.md` for:
- Detailed documentation
- API reference
- Troubleshooting guide
- Advanced features

---

**Ready to go! 🎉**
