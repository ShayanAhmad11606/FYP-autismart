# Sound Files Directory

## Overview
This directory contains audio files for the Sound Matching Game. The game uses browser text-to-speech as a fallback, but real audio files provide a much better experience.

## Required Audio Files

### Game Sounds (12 files)

#### Animals (4 files)
- `dog.mp3` - Dog barking sound
- `cat.mp3` - Cat meowing sound
- `bird.mp3` - Bird chirping sound
- `cow.mp3` - Cow mooing sound

#### Musical Instruments (4 files)
- `piano.mp3` - Piano note/melody
- `guitar.mp3` - Guitar strum/note
- `drum.mp3` - Drum beat
- `bell.mp3` - Bell ringing sound

#### Simple Objects (4 files)
- `car.mp3` - Car engine/horn sound
- `train.mp3` - Train whistle/chugging sound
- `phone.mp3` - Phone ringing sound
- `clock.mp3` - Clock ticking sound

### Feedback Sound (1 file)
- `correct.mp3` - Soft pleasant chime for correct answers (IMPORTANT!)

**Total: 13 audio files needed**

## Audio File Specifications

### Recommended Format
- **Format**: MP3 (best browser compatibility)
- **Alternative**: WAV (higher quality, larger files)
- **Sample Rate**: 44.1 kHz
- **Bit Rate**: 128 kbps or higher
- **Duration**: 1-3 seconds (keep it short!)
- **Volume**: Normalized, soft (no sudden loud sounds)
- **Channels**: Mono or Stereo

### Important: Sensory-Friendly
For children with autism, sounds should be:
- ✅ Soft and gentle (volume at 50% in code)
- ✅ Clear and recognizable
- ✅ Short duration (1-3 seconds)
- ❌ No harsh or sudden loud sounds
- ❌ No fast-paced or repetitive sounds
- ❌ No scary or startling sounds

### File Naming
- Use lowercase filenames
- No spaces (use hyphens if needed)
- Keep names simple and descriptive

## Where to Get Sound Files

### Free Sound Resources
1. **Freesound.org** - Community-driven sound library
   - https://freesound.org/
   - Requires attribution for some sounds

2. **Zapsplat.com** - Free sound effects
   - https://www.zapsplat.com/
   - Free for personal and commercial use

3. **Pixabay** - Royalty-free sound effects
   - https://pixabay.com/sound-effects/
   - No attribution required

4. **BBC Sound Effects** - Archive of BBC sounds
   - https://sound-effects.bbcrewind.co.uk/
   - Free for personal, educational, and research use

### Creating Your Own
- Use your smartphone to record sounds
- Edit with free tools like Audacity
- Ensure high quality and clear audio

## Testing Sounds

After adding sound files, test them in the browser:

```javascript
const audio = new Audio('/sounds/dog.mp3');
audio.play();
```

## Current Fallback

The game currently uses the **Web Speech Synthesis API** when sound files are not available:

```javascript
if (window.speechSynthesis) {
  const utterance = new SpeechSynthesisUtterance('Dog');
  window.speechSynthesis.speak(utterance);
}
```

This provides text-to-speech functionality but is not as engaging as real sound effects.

## Setup Instructions

1. Download or record your sound files
2. Name them according to the list above
3. Place them in this directory (`frontend/public/sounds/`)
4. Restart your development server
5. Test the game to ensure sounds play correctly

## File Structure Example

```
frontend/public/sounds/
├── README.md (this file)
├── dog.mp3
├── cat.mp3
├── bird.mp3
├── cow.mp3
├── car.mp3
├── train.mp3
└── ... (other sound files)
```

## Updating the Game Component

If you add real audio files, you may want to update the `playSound` function in `SoundMatchingGame.jsx`:

```javascript
const playSound = (soundSrc) => {
  // Try to play actual audio file first
  const audio = new Audio(soundSrc);
  audio.play().catch((error) => {
    // Fallback to text-to-speech if file not found
    console.log('Audio file not found, using text-to-speech');
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(soundName);
      window.speechSynthesis.speak(utterance);
    }
  });
};
```

## Copyright & Licensing

⚠️ **Important**: Ensure you have the rights to use any sound files you add to this directory.

- Check license requirements
- Provide attribution where required
- Keep documentation of sources
- Only use royalty-free or properly licensed sounds

---

**Note**: The game will work without these files using text-to-speech, but adding real sound effects will significantly enhance the user experience!
