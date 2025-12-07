# Image Files Directory

## Overview
This directory contains images for the Sound Matching Game icons. The game uses emoji fallbacks if images are not available, but real images provide a better visual experience.

## Required Image Files (12 files)

### Animals (4 files)
- `dog.png` - Simple dog illustration
- `cat.png` - Simple cat illustration
- `bird.png` - Simple bird illustration
- `cow.png` - Simple cow illustration

### Musical Instruments (4 files)
- `piano.png` - Piano illustration
- `guitar.png` - Guitar illustration
- `drum.png` - Drum illustration
- `bell.png` - Bell illustration

### Simple Objects (4 files)
- `car.png` - Car illustration
- `train.png` - Train illustration
- `phone.png` - Phone illustration (smartphone or traditional)
- `clock.png` - Clock/alarm clock illustration

## Image Specifications

### File Format
- **Preferred**: PNG (with transparent background)
- **Alternative**: JPG (solid background)
- **Avoid**: GIF, BMP, WebP (compatibility issues)

### Size & Dimensions
- **Recommended Size**: 200x200 pixels minimum
- **Maximum Size**: 512x512 pixels (for performance)
- **Aspect Ratio**: Square (1:1) works best
- **File Size**: Under 100KB per image

### Style Guidelines

#### ✅ Good Characteristics:
- **Simple & Clear**: Easy to recognize at a glance
- **Centered Object**: Main subject in the middle
- **Soft Colors**: Pastel or muted tones
- **Friendly Style**: Cartoon or illustration style
- **No Text**: Icon should be self-explanatory
- **No Clutter**: Clean background, single object
- **Child-Friendly**: Appealing to children

#### ❌ Avoid:
- Complex, detailed illustrations
- Dark or harsh colors
- Scary or realistic animals
- Multiple objects in one image
- Small details that are hard to see
- Photos (prefer illustrations)

### Recommended Color Palette
- Soft blues (#5a67d8, #cbd5e0)
- Soft greens (#48bb78, #c6f6d5)
- Soft yellows (#fbbf24, #fef3c7)
- Soft pinks (#f687b3, #fed7e2)
- Soft purples (#9f7aea, #e9d8fd)

## Where to Get Images

### Free Icon Resources

1. **Flaticon** - https://www.flaticon.com/
   - Best for simple, clean icons
   - Search by keyword (e.g., "dog", "piano")
   - Download PNG with transparent background
   - Free with attribution

2. **Icons8** - https://icons8.com/
   - Many style options (cute, fluffy, color, etc.)
   - Choose "Fluffy" or "Cute Color" style for children
   - Download PNG, 256x256 or 512x512
   - Free with attribution

3. **Freepik** - https://www.freepik.com/
   - Cartoon and illustration style
   - Search "cute [animal/object] icon"
   - Free with attribution

4. **Pixabay** - https://pixabay.com/
   - No attribution required
   - Fewer icon options, but completely free

5. **The Noun Project** - https://thenounproject.com/
   - Simple line icons
   - Good for minimalist design
   - Free with attribution

### Example Searches
- "cute dog icon"
- "cartoon piano"
- "simple car illustration"
- "friendly animal icons"
- "children's book illustrations"

## How to Add Images

### Step 1: Download
1. Go to icon website (e.g., Flaticon)
2. Search for your item (e.g., "cat")
3. Select a simple, friendly icon
4. Download as PNG, 256x256 or larger

### Step 2: Rename
Rename the file to match the sound ID:
- `flaticon-cat-12345.png` → `cat.png`
- Keep names simple and lowercase
- Match the name in the code exactly

### Step 3: Add to Project
Place the file in this directory:
```
frontend/public/img/cat.png
```

### Step 4: Test
1. Refresh the game in browser
2. Start playing
3. Icon should show your image
4. If not, check browser console (F12) for errors

## Image Editing Tips

### Using Free Tools

**1. Remove Background (if needed)**
- Use https://www.remove.bg/
- Upload your image
- Download PNG with transparent background

**2. Resize Image**
- Use https://www.iloveimg.com/resize-image
- Set to 256x256 pixels
- Maintain aspect ratio
- Download resized image

**3. Change Colors (if needed)**
- Use https://www.photopea.com/ (free Photoshop alternative)
- Open image
- Adjust hue/saturation to softer colors
- Export as PNG

## File Organization

```
frontend/public/img/
├── README.md (this file)
├── dog.png
├── cat.png
├── bird.png
├── cow.png
├── piano.png
├── guitar.png
├── drum.png
├── bell.png
├── car.png
├── train.png
├── phone.png
└── clock.png
```

## Fallback System

If an image file is missing:
1. The game will try to load the image
2. If it fails, emoji will display instead (🐶, 🐱, etc.)
3. No error to the user - seamless fallback
4. Game continues to work normally

This means you can add images gradually!

## Testing Your Images

### Quick Test in Browser
1. Open: `http://localhost:5174/img/dog.png`
2. Image should display
3. If "404 Not Found" - file is missing or misnamed

### Test in Game
1. Start the game
2. Look for your icon
3. Check if image shows or emoji fallback
4. Test clicking the icon

### Common Issues

**Image doesn't show:**
- ✓ Check filename matches exactly (case-sensitive)
- ✓ Check file is PNG or JPG
- ✓ Check file is in correct directory
- ✓ Check browser console (F12) for errors
- ✓ Try hard refresh (Ctrl+Shift+R)

**Image is too small/large:**
- Resize to 256x256 pixels
- Use https://www.iloveimg.com/resize-image

**Image has wrong background:**
- Remove background
- Use https://www.remove.bg/
- Download PNG version

## Accessibility Considerations

### For Children with Autism:
- **High Contrast**: Object should stand out from background
- **Simple Shapes**: Easy to process visually
- **Consistent Style**: All images should look similar
- **No Busy Patterns**: Avoid detailed backgrounds
- **Soft Colors**: Easier on the eyes

### Design Principles:
1. One object per image
2. Clear silhouette
3. Friendly, non-threatening
4. Age-appropriate
5. Culturally sensitive

## Example: Adding a Lion Image

### 1. Find Image
- Go to Flaticon.com
- Search "cute lion"
- Choose a simple, friendly lion icon
- Download PNG, 256x256

### 2. Prepare File
- Rename: `lion.png`
- Check size: should be around 20-50KB
- Check dimensions: 256x256 or similar

### 3. Add to Project
- Place in: `frontend/public/img/lion.png`

### 4. Update Code
In `SoundMatchingGame.jsx`, add:
```javascript
{ 
  id: 'lion', 
  name: 'Lion', 
  emoji: '🦁', 
  audioSrc: '/sounds/lion.mp3', 
  imageSrc: '/img/lion.png' 
},
```

### 5. Test
- Refresh browser
- Play game
- Lion icon should appear with your image

## Batch Processing

If adding many images:

### 1. Download All Images
- Create a folder on desktop
- Download all needed icons
- Same style/set if possible

### 2. Batch Rename
- Windows: Use PowerRename or Bulk Rename Utility
- Mac: Use Automator or Name Changer

### 3. Batch Resize
- Use https://www.iloveimg.com/resize-image
- Upload all images
- Resize to 256x256
- Download ZIP

### 4. Copy to Project
- Extract ZIP
- Copy all files to `frontend/public/img/`

## Attribution

If using free icons that require attribution:

### Where to Add Credits:
Create a file: `frontend/public/img/CREDITS.txt`

Example content:
```
Icon Credits:

Dog icon by Freepik from Flaticon
Cat icon by Freepik from Flaticon
Piano icon by Smashicons from Flaticon
...etc

All icons from Flaticon.com
Used under free license with attribution
```

### In Your App (Optional):
Add to Settings or About page:
- "Icons by Flaticon contributors"
- Link to https://www.flaticon.com

## Pro Tips

### 1. Use Icon Packs
- Download an entire set of related icons
- Ensures consistent style
- Faster than individual downloads

### 2. Keep Source Files
- Save original files before editing
- Keep a backup folder
- Document where you got each icon

### 3. Organize by Category
Consider subfolders if you add many:
```
img/
├── animals/
├── instruments/
└── objects/
```
(But update paths in code accordingly)

### 4. Optimize File Size
- Use https://tinypng.com/ to compress
- Reduces loading time
- No visible quality loss

## Support

Need help?
1. Check filename matches code exactly
2. View browser console for errors (F12)
3. Test image URL directly in browser
4. See ADDING_SOUNDS_GUIDE.md for more help

---

**Remember**: The game works with emoji fallbacks, so you can add images gradually at your own pace!
