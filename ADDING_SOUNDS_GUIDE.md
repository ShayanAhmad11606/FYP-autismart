# Sound Matching Game - Adding Your Own Sounds

## Quick Start: Adding Sounds

### 1. Create Sound Files Directory
The sounds directory is already created at: `frontend/public/sounds/`

### 2. Required Sound Files

#### Game Sounds (Main sounds to match)
Place these MP3 or WAV files in `frontend/public/sounds/`:

**Animals:**
- `dog.mp3` - Dog barking
- `cat.mp3` - Cat meowing
- `bird.mp3` - Bird chirping
- `cow.mp3` - Cow mooing

**Musical Instruments:**
- `piano.mp3` - Piano note
- `guitar.mp3` - Guitar strum
- `drum.mp3` - Drum beat
- `bell.mp3` - Bell ringing

**Simple Objects:**
- `car.mp3` - Car horn/engine
- `train.mp3` - Train whistle
- `phone.mp3` - Phone ringing
- `clock.mp3` - Clock ticking

**Feedback Sound:**
- `correct.mp3` - Soft pleasant chime for correct answers

### 3. Create Image Files Directory
Create directory: `frontend/public/img/`

#### Required Image Files
Place PNG or JPG files in `frontend/public/img/`:

**Animals:**
- `dog.png` - Simple dog illustration
- `cat.png` - Simple cat illustration
- `bird.png` - Simple bird illustration
- `cow.png` - Simple cow illustration

**Musical Instruments:**
- `piano.png` - Piano illustration
- `guitar.png` - Guitar illustration
- `drum.png` - Drum illustration
- `bell.png` - Bell illustration

**Simple Objects:**
- `car.png` - Car illustration
- `train.png` - Train illustration
- `phone.png` - Phone illustration
- `clock.png` - Clock illustration

## Adding More Sounds (Easy!)

### Step 1: Edit the Component
Open `frontend/src/pages/SoundMatchingGame.jsx`

Find this section (around line 15):
```javascript
const allSounds = [
  // Animals
  { id: 'dog', name: 'Dog', emoji: '🐶', audioSrc: '/sounds/dog.mp3', imageSrc: '/img/dog.png' },
  // ... more sounds
];
```

### Step 2: Add Your New Sound
Copy this template and add it to the array:

```javascript
{ 
  id: 'uniqueID',           // Unique identifier (e.g., 'elephant')
  name: 'Display Name',     // What shows under icon (e.g., 'Elephant')
  emoji: '🔷',              // Fallback emoji if image not found
  audioSrc: '/sounds/yourfile.mp3',  // Path to your sound file
  imageSrc: '/img/yourfile.png'       // Path to your image file
},
```

### Example: Adding an Elephant
```javascript
{ 
  id: 'elephant', 
  name: 'Elephant', 
  emoji: '🐘', 
  audioSrc: '/sounds/elephant.mp3', 
  imageSrc: '/img/elephant.png' 
},
```

### Step 3: Add the Files
1. Put `elephant.mp3` in `frontend/public/sounds/`
2. Put `elephant.png` in `frontend/public/img/`
3. Refresh your browser!

## Where to Get Sounds (Free Resources)

### Recommended Sites:
1. **Freesound.org** - https://freesound.org/
   - Search for specific sounds
   - Download in MP3 or WAV
   - Check license (most are free)

2. **Zapsplat.com** - https://www.zapsplat.com/
   - Free sound effects library
   - Good for animals, instruments, objects
   - Free account required

3. **Pixabay** - https://pixabay.com/sound-effects/
   - No attribution required
   - Good quality sounds

4. **BBC Sound Effects** - https://sound-effects.bbcrewind.co.uk/
   - Free for educational use
   - High quality archive

### Making Your Own:
- Record with your phone
- Use free software like **Audacity**
- Keep files short (1-3 seconds)
- Save as MP3 (smaller file size)

## Where to Get Images (Free Resources)

### Recommended Sites:
1. **Flaticon.com** - https://www.flaticon.com/
   - Simple, clean icons
   - Perfect for children
   - Free with attribution

2. **Icons8.com** - https://icons8.com/
   - Colorful, friendly icons
   - Many styles available

3. **Freepik.com** - https://www.freepik.com/
   - Cartoon-style images
   - Free with attribution

### Image Requirements:
- **Format**: PNG (transparent background) or JPG
- **Size**: 200x200 pixels or larger
- **Style**: Simple, clear, colorful
- **Content**: Single object, centered

## File Naming Tips

✅ **Good:**
- `dog.mp3`, `dog.png`
- `piano.mp3`, `piano.png`
- `car-horn.mp3`, `car-horn.png`

❌ **Avoid:**
- `Dog Sound.mp3` (spaces)
- `PIANO.PNG` (inconsistent case)
- `car_sound_final_v2.mp3` (too complex)

## Testing Your Additions

### 1. Check Files Are in Place
```
frontend/public/
├── sounds/
│   ├── dog.mp3
│   ├── cat.mp3
│   └── elephant.mp3  ← your new file
└── img/
    ├── dog.png
    ├── cat.png
    └── elephant.png  ← your new file
```

### 2. Verify in Browser
1. Open the game
2. Start playing
3. Look for your new icon
4. Click it and check if sound plays
5. Check browser console for errors (F12)

### 3. Common Issues

**Sound doesn't play:**
- Check file path is correct
- Check file format (MP3 or WAV)
- Check file isn't corrupted
- Look in browser console for errors

**Image doesn't show:**
- Check file path is correct
- Check file format (PNG or JPG)
- Emoji fallback will show if image fails
- Look in browser console for errors

## Current Fallback System

If files are missing, the game will:
1. **Images**: Show emoji instead (🐶, 🐱, etc.)
2. **Sounds**: Use browser text-to-speech
3. **Correct chime**: Skip if file not found

This means the game works even without any files!

## Example: Complete Addition

Let's add a "Lion" sound:

### 1. Get the files
- Download `lion.mp3` from Freesound.org
- Download `lion.png` from Flaticon.com

### 2. Add to project
```bash
# Copy files to:
frontend/public/sounds/lion.mp3
frontend/public/img/lion.png
```

### 3. Edit component
```javascript
// In SoundMatchingGame.jsx, add to allSounds array:
{ 
  id: 'lion', 
  name: 'Lion', 
  emoji: '🦁', 
  audioSrc: '/sounds/lion.mp3', 
  imageSrc: '/img/lion.png' 
},
```

### 4. Save and refresh
The lion will now appear in the game!

## Sound File Specifications

### Recommended Settings:
- **Format**: MP3 (best compatibility)
- **Sample Rate**: 44.1 kHz
- **Bit Rate**: 128 kbps
- **Duration**: 1-3 seconds
- **Volume**: Normalized (not too loud)
- **Channels**: Mono or Stereo

### Using Audacity (Free):
1. Open sound file
2. Effect → Normalize → OK
3. Effect → Truncate Silence (remove quiet parts)
4. File → Export → Export as MP3
5. Choose quality: 128 kbps

## Categories for Organization

You can organize sounds by category in the code:

```javascript
const allSounds = [
  // ===== ANIMALS =====
  { id: 'dog', ... },
  { id: 'cat', ... },
  
  // ===== INSTRUMENTS =====
  { id: 'piano', ... },
  { id: 'guitar', ... },
  
  // ===== VEHICLES =====
  { id: 'car', ... },
  { id: 'train', ... },
  
  // ===== YOUR CATEGORY =====
  { id: 'newitem', ... },
];
```

## Pro Tips

### 1. Test Sounds First
Play each sound before adding to make sure:
- It's the right length (not too long)
- Volume is appropriate (not too loud)
- Quality is good (no static/noise)

### 2. Keep It Simple
- Start with 12-16 total sounds
- Add more gradually
- Test each addition

### 3. Child-Friendly
- Choose clear, recognizable sounds
- Avoid scary or sudden loud sounds
- Keep volume gentle

### 4. Image Style Consistency
- Use similar art styles for all images
- Keep colors soft and friendly
- Make sure objects are easily recognizable

## Support

If you need help:
1. Check browser console (F12) for errors
2. Verify file paths are correct
3. Test files play in browser directly
4. Check this documentation

---

**Remember**: The game works with emojis and text-to-speech even without files, so you can add sounds gradually!
