# 📊 Assessment Question Categories Breakdown

## Category Distribution

All 50 questions have been categorized into the 6 symptom areas shown in your progress overview.

---

## 📈 Category Summary

| Category | Total Questions | Percentage |
|----------|----------------|------------|
| **Eye Contact** | 4 questions | 8% |
| **Social Interaction** | 16 questions | 32% |
| **Communication** | 12 questions | 24% |
| **Repetitive Behavior** | 6 questions | 12% |
| **Sensory Sensitivity** | 6 questions | 12% |
| **Focus & Attention** | 10 questions | 20% |
| **TOTAL** | **50 questions** | **100%** |

---

## 🎯 Detailed Category Breakdown

### 👁️ Eye Contact (4 questions)
**Badge Color:** Green/Success  
**Icon:** `bi-eye`

**Questions:**
1. **Easy Level**
   - Q4: "Does your child make eye contact during conversation?"
   - Q8: "Does your child smile back when someone smiles?"

2. **Intermediate Level**
   - Q14: "Does your child show interest in others?"

3. **Advanced Level**
   - Q15: "Guessing others' feelings:"

**Focus:** Direct eye contact, visual engagement, reading facial expressions

---

### 👥 Social Interaction (16 questions)
**Badge Color:** Orange/Warning  
**Icon:** `bi-people`

**Questions:**
1. **Easy Level**
   - Q1: "When meeting someone new, your child usually:"
   - Q2: "Does your child like playing with other children?"
   - Q5: "When upset, does your child seek comfort?"
   - Q12: "Does your child share toys?"
   - Q13: "Does your child show excitement during play?"
   - Q14: "Does your child enjoy pretend play?"

2. **Intermediate Level**
   - Q1: "How does your child react to a new toy?"
   - Q2: "In a group, your child prefers to:"

3. **Advanced Level**
   - Q1: "If a friend is sad, your child:"
   - Q6: "Group play rule following:"
   - Q8: "If child makes a mistake in a game:"
   - Q11: "Turn-taking in games:"
   - Q13: "Reaction to losing a game:"

**Focus:** Peer interaction, sharing, empathy, group participation, play behaviors

---

### 💬 Communication (12 questions)
**Badge Color:** Green/Success  
**Icon:** `bi-chat-dots`

**Questions:**
1. **Easy Level**
   - Q9: "Does your child point to show interest?"
   - Q10: "Does your child wave goodbye without reminding?"
   - Q15: "When confused, does your child ask for help?"

2. **Intermediate Level**
   - Q5: "Does your child ask questions when confused?"
   - Q12: "Does your child follow 2-step directions?"
   - Q15: "Does your child stay on topic while talking?"

3. **Advanced Level**
   - Q3: "Describing feelings:"
   - Q9: "Understanding new rules:"
   - Q10: "Explaining why they are upset:"
   - Q12: "Talking about past events:"
   - Q14: "Understanding jokes:"

**Focus:** Verbal/non-verbal communication, expressing needs, understanding instructions, conversation skills

---

### 🔄 Repetitive Behavior (6 questions)
**Badge Color:** Blue/Info  
**Icon:** `bi-arrow-repeat`

**Questions:**
1. **Intermediate Level**
   - Q6: "Does your child enjoy routine?"
   - Q7: "Does your child repeat movements?"
   - Q8: "How does your child react to sudden plan changes?"

2. **Advanced Level**
   - Q4: "Adapting to changes in games:"
   - Q7: "If routine is disrupted:"

3. **Sensory Level**
   - Q3: "Interest in lights/spinning objects?"

**Focus:** Routine adherence, flexibility, repetitive movements, resistance to change

---

### 💡 Sensory Sensitivity (6 questions)
**Badge Color:** Orange/Warning  
**Icon:** `bi-lightbulb`

**Questions:**
1. **Easy Level**
   - Q7: "Does your child like trying new foods?"

2. **Intermediate Level**
   - Q4: "How does your child respond to loud noises?"
   - Q13: "Reaction to noisy places:"

3. **Sensory Level**
   - Q1: "Clothing texture preference:"
   - Q4: "Strong reaction to smells?"
   - Q5: "Covering ears at sudden sounds?"

**Focus:** Sensory processing, reactions to textures/sounds/smells, food preferences

---

### 🎯 Focus & Attention (10 questions)
**Badge Color:** Blue/Info  
**Icon:** `bi-crosshair`

**Questions:**
1. **Easy Level**
   - Q3: "Does your child respond when you call their name?"
   - Q6: "Does your child enjoy listening to stories or songs?"
   - Q11: "Does your child react when someone enters the room?"

2. **Intermediate Level**
   - Q3: "Does your child notice small changes?"
   - Q9: "Does your child listen till the end when spoken to?"
   - Q10: "Classroom activity participation:"
   - Q11: "Puzzle/task reaction:"

3. **Advanced Level**
   - Q2: "Handling 2 tasks at once:"
   - Q5: "Reaction to new learning activity:"

4. **Sensory Level**
   - Q2: "Easily distracted during homework?"

**Focus:** Attention span, task completion, listening skills, multi-tasking, distractibility

---

## 🎨 Visual Representation in UI

### Category Badges
Each question now displays a color-coded badge showing its category:

```
[Q1] [👥 Social Interaction]
Question text here...
```

### Results Page - Symptom Progress Overview
After completing the assessment, users will see:

```
Symptom Progress Overview

Eye Contact        ↑    [████████████░░░░░] 65%
Social Interaction ↑    [██████░░░░░░░░░░░] 45%
Communication      ↑    [█████████████░░░░] 70%
Repetitive Behavior ↓   [████████░░░░░░░░░] 50%
Sensory Sensitivity ↑   [█████░░░░░░░░░░░░] 35%
Focus & Attention  ↑    [█████████░░░░░░░░] 55%
```

- **Green bars (60%+):** Strong performance
- **Orange bars (40-59%):** Moderate concern
- **Blue bars (<40%):** Needs attention

---

## 📊 Scoring Logic by Category

### Formula
```javascript
Category Percentage = (Total Possible - Actual Score) / Total Possible × 100
```

### Example Calculation
**Category:** Eye Contact (4 questions)
- Total possible score: 4 × 3 = 12
- Actual score: 5
- Performance: (12 - 5) / 12 × 100 = **58%**

### Interpretation
- **Higher % = Better performance** (inverse scoring)
- Score of 1 per question = Best outcome
- Score of 3 per question = Most concerning

---

## 🎯 Usage in Results

### Category Icons & Colors

| Category | Icon | Badge Color | Progress Bar |
|----------|------|-------------|--------------|
| Eye Contact | 👁️ `bi-eye` | Green | Green/Orange/Blue |
| Social Interaction | 👥 `bi-people` | Orange | Green/Orange/Blue |
| Communication | 💬 `bi-chat-dots` | Green | Green/Orange/Blue |
| Repetitive Behavior | 🔄 `bi-arrow-repeat` | Blue | Green/Orange/Blue |
| Sensory Sensitivity | 💡 `bi-lightbulb` | Orange | Green/Orange/Blue |
| Focus & Attention | 🎯 `bi-crosshair` | Blue | Green/Orange/Blue |

---

## 🔍 Professional Insights

### Category Importance

**High Impact Categories (More Questions):**
1. **Social Interaction** (16Q) - Most comprehensive
2. **Communication** (12Q) - Critical for development
3. **Focus & Attention** (10Q) - Academic success indicator

**Specialized Categories (Fewer Questions):**
1. **Eye Contact** (4Q) - Key autism indicator
2. **Repetitive Behavior** (6Q) - Pattern recognition
3. **Sensory Sensitivity** (6Q) - Environmental adaptation

---

## 📱 Mobile Display

Categories are responsive and adjust for screen size:

**Desktop:** Full category name with icon  
**Mobile:** Icon + abbreviated name

---

## 🎓 Educational Value

### For Parents
- **Clear categorization** helps understand specific areas
- **Visual progress bars** make results easy to interpret
- **Category-specific insights** guide next steps

### For Professionals
- **Structured data** for clinical review
- **Category breakdown** identifies specific concerns
- **Quantifiable metrics** for tracking progress

---

## 🚀 Implementation Features

### ✅ Completed
- [x] All 50 questions categorized
- [x] Category badges on each question
- [x] Category-wise score calculation
- [x] Visual progress bars for each category
- [x] Color-coded results
- [x] Icons for each category
- [x] Trend indicators (↑↓)

### 🔮 Future Enhancements
- [ ] Category-specific recommendations
- [ ] Historical category tracking
- [ ] Compare with age norms per category
- [ ] Export category reports
- [ ] Professional interpretation per category

---

**Last Updated:** November 29, 2025  
**Total Categories:** 6  
**Total Questions:** 50  
**Distribution:** Balanced across developmental areas
