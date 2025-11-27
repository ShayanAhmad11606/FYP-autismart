# CSS Modular Structure Documentation

## Overview
The AutiSmart CSS has been refactored from a single `custom.css` file into a modular, organized structure with separate files for each component and concern.

## File Structure

```
frontend/src/
├── index.css                    # Main entry point (imports all modules)
└── styles/
    ├── variables.css            # Design tokens & CSS custom properties
    ├── global.css               # Base styles, resets, utilities
    ├── buttons.css              # Button styles
    ├── cards.css                # Card component styles
    ├── badges.css               # Badge styles
    ├── forms.css                # Form input styles
    ├── tables.css               # Table styles
    ├── progress.css             # Progress bar styles
    ├── navbar.css               # Navbar component styles
    ├── sidebar.css              # Sidebar component styles
    ├── footer.css               # Footer component styles
    ├── themeToggle.css          # Theme toggle switch styles
    ├── hero.css                 # Hero section styles
    ├── statCard.css             # Stat card component styles
    └── darkTheme.css            # Dark theme overrides
```

## Module Descriptions

### Core System

#### `variables.css`
- All CSS custom properties (design tokens)
- Color palette (primary, accent, neutral, status colors)
- Spacing scale, border radius, transitions
- Light and dark theme variables

#### `global.css`
- Base styles and CSS reset
- Body typography and background
- Accessibility features (prefers-reduced-motion)
- Utility classes (text-primary-custom, etc.)

### Component Styles

#### `buttons.css`
- Primary and secondary button styles
- Hover, active, and focus states
- Gradient backgrounds
- Accessibility support

#### `cards.css`
- Base card styles
- Card variants (stat, success, warning, danger, info)
- Hover effects
- Dark theme support

#### `badges.css`
- Badge variants with gradients
- Pill-shaped rounded badges
- Color-coded status indicators

#### `forms.css`
- Input and select field styles
- Focus states with soft shadows
- Placeholder text styling
- Dark theme form support

#### `tables.css`
- Table base styles
- Gradient headers
- Row hover effects
- Dark theme table support

#### `progress.css`
- Progress bar with gradient fill
- Smooth animations
- Subtle shadow effects

#### `navbar.css`
- Navbar gradient background
- Brand and link styles
- Hover animations
- Responsive styles

#### `sidebar.css`
- Sidebar layout and background
- Link styles with hover effects
- Active state indicators
- Dark theme support

#### `footer.css`
- Footer layout (4-column grid)
- Social media icons
- Contact information styles
- Bottom bar with legal links
- Dark theme footer
- Responsive adjustments

#### `themeToggle.css`
- Toggle button track and knob
- Light theme (sky blue track, warm knob)
- Dark theme (indigo track, cool knob)
- Icon visibility states
- Smooth transitions

#### `hero.css`
- Hero section gradient background
- Overlay effects
- Responsive padding

#### `statCard.css`
- Stat card with gradient accent
- Hover animations
- Value text with gradient fill
- Label styling

### Theme Support

#### `darkTheme.css`
- Dark theme overrides for Bootstrap components
- Modal, accordion, button outline styles
- List group items
- Alert component dark theme

## Import Order

The main `index.css` imports modules in this order:

1. **Core System** (variables, global)
2. **Components** (buttons, cards, forms, etc.)
3. **Theme Overrides** (darkTheme)

This ensures:
- Variables are available to all components
- Base styles are applied first
- Component styles can override base styles
- Theme overrides apply last

## Usage

### In Your Application

The main entry point (`index.css`) is already imported in your `main.jsx`:

```javascript
import './index.css'
```

All modular CSS files are automatically loaded through the `@import` statements.

### Adding New Styles

To add a new component style file:

1. Create a new file in `frontend/src/styles/`
2. Add the styles for your component
3. Import it in `index.css`:

```css
@import './styles/yourNewComponent.css';
```

### Overriding Styles

You can override styles in two ways:

1. **In the component's CSS file** - Modify the specific CSS file directly
2. **In a custom override file** - Create a new file and import it last in `index.css`

## Benefits of This Structure

### ✅ Maintainability
- Easy to find styles for specific components
- Changes are isolated to relevant files
- Clear separation of concerns

### ✅ Scalability
- Easy to add new component styles
- No file size issues
- Better code organization

### ✅ Performance
- Browser can cache individual CSS files
- Smaller files load faster
- Better for HTTP/2 multiplexing

### ✅ Developer Experience
- Easier to navigate and edit
- Reduced merge conflicts
- Better IDE support and autocomplete

### ✅ Reusability
- Components can be easily extracted
- Styles are self-contained
- Easier to share across projects

## CSS Custom Properties

All design tokens are centralized in `variables.css`:

```css
/* Example usage in any CSS file */
.my-component {
  background: var(--primary);
  padding: var(--space-lg);
  border-radius: var(--radius-card);
  transition: var(--transition-smooth);
}
```

## Dark Theme

Dark theme works through:
1. `[data-theme="dark"]` attribute on document root (set by ThemeContext)
2. CSS custom properties that change in dark theme (in `variables.css`)
3. Component-specific overrides (in individual component files + `darkTheme.css`)

## Accessibility Features

All component files include:
- Focus states for interactive elements
- Sufficient color contrast
- `prefers-reduced-motion` support
- Semantic HTML consideration

## Migration Notes

The old `custom.css` file is still present but is no longer imported. All styles have been migrated to the new modular structure.

### What Changed:
- **Before**: 1 large `custom.css` file (~700+ lines)
- **After**: 15 focused CSS modules (~50-150 lines each)

### Backwards Compatibility:
- All class names remain the same
- CSS custom properties are unchanged
- Visual appearance is identical
- No changes needed in component JSX files

## Troubleshooting

### Styles Not Loading?
1. Check that `index.css` is imported in `main.jsx`
2. Verify all `@import` paths are correct
3. Clear browser cache
4. Check browser console for CSS errors

### Dark Theme Not Working?
1. Ensure `ThemeContext` is setting `data-theme` attribute
2. Check `variables.css` has dark theme variable definitions
3. Verify component-specific dark overrides exist

### Missing Styles?
1. Check if the component's CSS file is imported in `index.css`
2. Verify the import order (variables should be first)
3. Look for typos in class names

## Future Enhancements

Possible improvements to consider:

1. **CSS Modules** - Scoped styles per component
2. **PostCSS** - Process CSS with modern features
3. **CSS-in-JS** - Styled-components or Emotion
4. **Sass/SCSS** - Variables, mixins, nesting
5. **Tailwind CSS** - Utility-first framework

---

**Last Updated**: November 27, 2025
**Version**: 2.0 (Modular Architecture)
