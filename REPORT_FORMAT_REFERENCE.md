# Child Report Formatting - Quick Reference

## Report Structure

### Web Report (ChildReports.jsx)
```
┌─────────────────────────────────────────────┐
│  Progress Reports                [Download] │
├─────────────────────────────────────────────┤
│  Child Selector: [Dropdown]                 │
├─────────────────────────────────────────────┤
│  📋 CHILD INFORMATION                       │
│  ┌──────────────────────────────────────┐  │
│  │ [Avatar]  Name: John Doe             │  │
│  │           Age: 8 years               │  │
│  │           Gender: Male               │  │
│  │           DOB: January 15, 2016      │  │
│  │           Diagnosis: ASD Level 2     │  │
│  └──────────────────────────────────────┘  │
├─────────────────────────────────────────────┤
│  📊 ACTIVITY SUMMARY                        │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐              │
│  │ 24 │ │ 12 │ │  8 │ │85% │              │
│  │Act │ │Game│ │Asmt│ │Avg │              │
│  └────┘ └────┘ └────┘ └────┘              │
├─────────────────────────────────────────────┤
│  🧠 COGNITIVE ASSESSMENT                    │
│  ┌──────────────────────────────────────┐  │
│  │ Level: [Good] Trend: [Improving]    │  │
│  │                                      │  │
│  │ ⭐ Strengths                         │  │
│  │ ✓ Strong in Color Matching (85%)    │  │
│  │ ✓ Good memory retention             │  │
│  │                                      │  │
│  │ ⚠️ Areas for Improvement             │  │
│  │ ✓ Needs practice in Sound Match     │  │
│  │                                      │  │
│  │ 💡 Recommendations                   │  │
│  │ ✓ Continue current activities       │  │
│  └──────────────────────────────────────┘  │
├─────────────────────────────────────────────┤
│  📈 PROGRESS OVER TIME                      │
│  [Line Chart with dates and scores]        │
├─────────────────────────────────────────────┤
│  📊 PERFORMANCE BY ACTIVITY                 │
│  [Bar Chart by activity type]              │
├─────────────────────────────────────────────┤
│  📋 RECENT ACTIVITIES                       │
│  ┌──────────────────────────────────────┐  │
│  │ Activity | Type | Score | Time | Date│  │
│  ├──────────────────────────────────────│  │
│  │ Memory   | Game | 8/10  | 5m   | ... │  │
│  │ Colors   | Game | 9/10  | 3m   | ... │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### PDF Report (generatePDFContent)
```
┌─────────────────────────────────────────────┐
│          AutiSmart                          │
│       Progress Report                       │
│   Generated on December 8, 2025            │
│  ────────────────────────────────────────  │
│                                             │
│  Child Information                          │
│  Name:           John Doe                   │
│  Age:            8 years                    │
│  Gender:         Male                       │
│  Date of Birth:  January 15, 2016          │
│  Diagnosis:      ASD Level 2               │
│                                             │
│  Activity Summary                           │
│  • Total Activities Completed: 24          │
│  • Games Played: 12                        │
│  • Assessments Completed: 8                │
│  • Therapy Sessions: 4                     │
│  Average Performance Score: 85.3%          │
│                                             │
│  Performance by Activity Type               │
│  Breakdown of 4 different activities       │
│                                             │
│  1. Color Matching Game                    │
│     Attempts: 8                            │
│     Average Score: 87.5% [GREEN]           │
│                                             │
│  2. Memory Match                           │
│     Attempts: 6                            │
│     Average Score: 82.3% [GREEN]           │
│                                             │
├─ [NEW PAGE] ────────────────────────────────┤
│  Cognitive Assessment                       │
│  Overall Level: Good [TEAL]                │
│  Progress Trend: Improving [GREEN]         │
│                                             │
│  Strengths:                                 │
│  • Strong performance in Color Matching    │
│  • Good memory retention                   │
│                                             │
│  Areas for Improvement:                    │
│  • Needs practice in Sound Matching        │
│                                             │
│  Recommendations:                          │
│  • Continue current activities             │
│  • Increase engagement with games          │
│                                             │
├─ [NEW PAGE] ────────────────────────────────┤
│  Recent Activities                          │
│  Showing last 10 activities                │
│                                             │
│  1. Memory Match Game                      │
│     Date: Dec 8, 2025, 2:30 PM            │
│     Type: Game                             │
│     Score: 8/10 (80.0%)                   │
│     Duration: 5m 23s                       │
│     Difficulty: Medium                     │
│                                             │
│  2. Color Matching                         │
│     Date: Dec 7, 2025, 3:15 PM            │
│     Type: Game                             │
│     Score: 9/10 (90.0%)                   │
│     Duration: 3m 45s                       │
│     Difficulty: Easy                       │
│                                             │
│  [Footer] Generated by AutiSmart -         │
│           Supporting Autism Care            │
└─────────────────────────────────────────────┘
```

## Color Coding

### Score Performance
- **≥80%**: 🟢 Green (Success) - Excellent
- **≥60%**: 🔵 Blue (Primary) - Good
- **≥40%**: 🟠 Orange (Warning) - Needs Work
- **<40%**: 🔴 Red (Danger) - Needs Support

### Cognitive Levels
- **Excellent**: 🟢 Green (#52b788)
- **Good**: 🔵 Teal (#61C3B4)
- **Fair**: 🟠 Orange (#f4a261)
- **Needs Support**: 🔴 Red (#e63946)

### Progress Trends
- **Improving**: 🟢 Green
- **Stable**: 🔵 Blue/Teal
- **Declining**: 🔴 Red

### Activity Types
- **Game**: 🎮 Blue badge
- **Assessment**: 📋 Info badge
- **Therapy**: 💚 Success badge

## Date Formats

### Web Display
- **Full Date**: "December 8, 2025"
- **Short Date**: "Dec 8, 2025"
- **Date of Birth**: "January 15, 2016"

### PDF Display
- **Header**: "December 8, 2025"
- **Activity List**: "Dec 8, 2025, 2:30 PM"

## Number Formats

### Percentages
- Always 1 decimal place: `85.3%`
- Not: `85.329%` or `85%`

### Duration
- Format: `5m 23s`
- Calculation: `Math.floor(seconds/60)}m ${seconds%60}s`

### Scores
- Format: `8/10 (80.0%)`
- Always show both absolute and percentage

## Key Features

### Empty States
- Show helpful messages when no data available
- Guide users on next steps
- Use friendly icons

### Responsive Design
- Mobile-friendly tables
- Collapsible sections on small screens
- Readable font sizes

### Accessibility
- Good color contrast
- Screen reader friendly
- Keyboard navigation support

### Charts
- Clear labels and legends
- Tooltips with formatted data
- Percentage symbols on axes
- Proper date formatting
- Color-coded bars/lines

## Common Issues Fixed

1. ❌ `completedAt.toDate()` → ✅ `new Date(completedAt)`
2. ❌ Raw activity type → ✅ Capitalized type
3. ❌ No duration display → ✅ "Xm Ys" format
4. ❌ Generic date format → ✅ Localized format
5. ❌ Missing empty states → ✅ Helpful messages
6. ❌ Inconsistent decimals → ✅ Always .toFixed(1)

## Testing Checklist

- [ ] Report displays with no activities
- [ ] Report displays with 1-5 activities
- [ ] Report displays with 10+ activities
- [ ] PDF downloads successfully
- [ ] Charts render correctly
- [ ] Dates format properly
- [ ] Mobile view works
- [ ] Dark theme compatible
- [ ] All badges color-coded correctly
- [ ] Empty states show helpful text
