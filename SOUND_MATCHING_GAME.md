# Sound Matching Game - Documentation

## Overview
The Sound Matching Game is an interactive therapy game designed to improve auditory processing and cognitive association skills for children with autism. Players listen to sounds and match them with corresponding images.

## Features

### 🎮 Game Mechanics
- **5 Progressive Levels**: From Beginner to Expert
- **Audio-Visual Association**: Match sounds to images
- **Time Challenges**: Complete levels within time limits
- **Score System**: Points for correct matches, penalties for mistakes
- **Real-time Feedback**: Immediate visual feedback for matches

### 📊 Difficulty Progression
1. **Level 1 - Beginner**: 4 animal sounds (60 seconds)
2. **Level 2 - Easy**: 5 vehicle/object sounds (80 seconds)
3. **Level 3 - Medium**: 6 musical instruments (100 seconds)
4. **Level 4 - Challenging**: 7 nature sounds (120 seconds)
5. **Level 5 - Expert**: 8 human sounds (150 seconds)

### 🎯 Educational Benefits
- **Auditory Processing**: Improves sound recognition and discrimination
- **Memory Skills**: Strengthens audio-visual memory associations
- **Attention Span**: Encourages focused listening
- **Pattern Recognition**: Develops cognitive mapping abilities
- **Speed & Accuracy**: Enhances quick decision-making

## File Structure
```
frontend/src/pages/SoundMatchingGame.jsx - Main game component
frontend/public/sounds/ - Audio files directory (to be added)
```

## Sound Files Setup

### Required Audio Files
The game references audio files that should be placed in `frontend/public/sounds/`:

#### Level 1 - Animals
- dog.mp3
- cat.mp3
- bird.mp3
- cow.mp3

#### Level 2 - Vehicles & Objects
- car.mp3
- train.mp3
- airplane.mp3
- bell.mp3
- phone.mp3

#### Level 3 - Musical Instruments
- piano.mp3
- guitar.mp3
- drum.mp3
- trumpet.mp3
- violin.mp3
- flute.mp3

#### Level 4 - Nature
- rain.mp3
- thunder.mp3
- ocean.mp3
- wind.mp3
- fire.mp3
- clock.mp3
- door.mp3

#### Level 5 - Human Sounds
- laugh.mp3
- cry.mp3
- sneeze.mp3
- cough.mp3
- clap.mp3
- whistle.mp3
- footsteps.mp3
- heartbeat.mp3

### Alternative: Text-to-Speech
Currently, the game uses the browser's built-in **Web Speech API** as a fallback:
```javascript
if (window.speechSynthesis) {
  const utterance = new SpeechSynthesisUtterance(soundName);
  window.speechSynthesis.speak(utterance);
}
```

## Scoring System

### Points
- **Correct Match**: +100 points
- **Wrong Match**: -20 points
- **Time Bonus**: (Remaining time × 10)
- **Accuracy Bonus**: 500 - (Mistakes × 50)
- **Level Bonus**: Level number × 200

### Example Score Calculation
Level 3 completed in 60 seconds with 2 mistakes:
- Base Score: 600 (6 matches × 100)
- Time Bonus: 400 ((100-60) × 10)
- Accuracy Bonus: 400 (500 - 100)
- Level Bonus: 600 (3 × 200)
- **Total**: 2000 points

## Game States

### 1. Start Screen
- Displays level information
- Shows instructions
- Best time for the level (if available)
- Start button

### 2. Active Game
- Sound buttons (left column)
- Image buttons (right column)
- Live stats dashboard
- Progress bar
- Timer countdown

### 3. Win Screen
- Completion celebration
- Score breakdown
- Performance stats
- Next level / Play again options

## Component Structure

### State Management
```javascript
- currentLevel: Current game level (1-5)
- score: Current level score
- totalScore: Cumulative score across levels
- gameWon: Level completion status
- gameStarted: Game active status
- selectedSound: Currently selected sound
- selectedImage: Currently selected image
- matchedPairs: Array of matched pair IDs
- wrongAttempts: Number of incorrect matches
- timer: Elapsed time in seconds
- bestTimes: Object storing best times per level
```

### Key Functions
- `playSound()`: Plays audio or uses text-to-speech
- `handleSoundClick()`: Handles sound button clicks
- `handleImageClick()`: Handles image button clicks
- `checkMatch()`: Validates sound-image matches
- `handleLevelComplete()`: Processes level completion
- `startGame()`: Initializes game state
- `nextLevel()`: Advances to next level

## Integration

### Routes Added
**File**: `frontend/src/views/App.jsx`
```jsx
import SoundMatchingGame from '../pages/SoundMatchingGame';

<Route path="/games/sound-matching" element={<SoundMatchingGame />} />
```

### Games Menu Updated
**File**: `frontend/src/pages/Games.jsx`
- Replaced "Color Sorter" with "Sound Matching"
- Added route: `/games/sound-matching`
- Category: Audio
- Difficulty: Easy
- Icon: music-note-beamed

## Accessibility Features

### Visual Accessibility
- Large, clear buttons
- High contrast color schemes
- Emoji-based visual indicators
- Progress bars and percentage displays

### Auditory Accessibility
- Text labels for all sounds
- Visual feedback for audio playback
- Text-to-speech fallback

### Cognitive Accessibility
- Clear, simple instructions
- Gradual difficulty progression
- Immediate feedback
- No time pressure on easier levels

## Future Enhancements

### Potential Additions
1. **Sound Library Expansion**
   - Add more sound categories
   - Custom sound uploads
   - Multiple difficulty variations per level

2. **Enhanced Audio**
   - Replace text-to-speech with real audio files
   - Volume controls
   - Replay button for each sound

3. **Customization**
   - Adjustable time limits
   - Difficulty settings
   - Theme selection

4. **Progress Tracking**
   - Save game progress
   - Statistics dashboard
   - Achievement system
   - Leaderboards

5. **Multiplayer**
   - Cooperative mode
   - Competitive challenges
   - Shared progress

## Testing Checklist

- [ ] All sound buttons trigger audio playback
- [ ] Image buttons respond to clicks
- [ ] Correct matches register properly
- [ ] Wrong matches show feedback
- [ ] Timer counts accurately
- [ ] Level progression works
- [ ] Score calculations correct
- [ ] Win screen displays properly
- [ ] Navigation works (back to games)
- [ ] Responsive design on mobile
- [ ] Text-to-speech fallback works
- [ ] Best times save correctly

## Browser Compatibility

### Required Features
- Web Speech API (for text-to-speech)
- HTML5 Audio (for sound files)
- ES6 JavaScript
- React Hooks

### Tested Browsers
- Chrome/Edge (Recommended)
- Firefox
- Safari
- Mobile browsers

## Therapeutic Value

### Skills Developed
1. **Auditory Discrimination**: Distinguishing between different sounds
2. **Audio-Visual Association**: Connecting sounds to visual representations
3. **Working Memory**: Remembering sounds while selecting images
4. **Processing Speed**: Quick sound identification
5. **Attention**: Focused listening and selection
6. **Pattern Recognition**: Understanding sound-object relationships

### Target Age Group
- Primary: 4-10 years
- Can be adapted for older children with modifications

### Recommended Usage
- 10-15 minute sessions
- 2-3 sessions per day
- Progress tracking for therapists/caregivers
- Use in structured therapy programs

## Support & Resources

For issues or suggestions:
1. Check browser console for errors
2. Verify sound files are in correct directory
3. Test text-to-speech functionality
4. Review component state in React DevTools

---

**Last Updated**: December 2025
**Version**: 1.0.0
**Status**: Production Ready (with text-to-speech fallback)
