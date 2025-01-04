# Frontend Design Plan Based on Mockup

## Text Content Structure

### Welcome Section
- Main heading: "Welcome to LookerHelp"
- Subtext: "Your comprehensive resource for mastering Looker and enhancing your data analytics capabilities"

### About Section
- Full bio of Dion Edge
- Background in Looker, data engineering, and AI/ML
- Experience highlights and expertise areas

### Services Section
- Lookernomicon AI Assistant
- Live Looker Support
- Weekly Office Hours
- Docs and Scripts

### Guide Section (Accordion)
1. Getting Started steps
2. Docs and Scripts usage
3. Lookernomicon AI usage
4. Community Participation
5. Help and Support

### FAQ Section (Accordion)
12 key questions and answers covering:
- Platform overview
- Access levels
- Account creation
- Service descriptions
- Support options

### Pricing Section
Four distinct service tiers:
1. Lookernomicon ($29/month)
2. Weekly Office Hours ($499/month)
3. Monthly Live Looker Support ($3999/month)
4. Weekly Live Looker Support ($999/week)

### Legal Section (Accordion)
- Terms of Service
- Privacy Policy
- Acceptable Use Policy
- Copyright Notice

## Typography System

### Font Families
- Headers: "Architect's Daughter" (primary font)
- Body: System font stack (secondary font)

### Font Sizes
- h1: 23px (Welcome heading)
- h2: 17px (Section titles)
- Body text: 13px (Normal content)
- Product cards: 11px
- Calendar button: 11px

## Color Palette

### Primary Colors
- Header background: #19171A
- Text color: #333333
- Background: #E0E0E0
- Card background: #F0E8F3

### Accent Colors
- Pink: #FF13F0 (h1, Monthly Support button)
- Purple: #B026FF (h2, Lookernomicon button)
- Cyan: #00FEFC (Weekly Support button)
- Green: #39FF14 (Weekly Hours button, header selected text)

### Text Colors
- Header text: #E0E0E0
- Header button text: #E0E0E0
- Header select button text: #39FF14
- Product card text: #333333

## Navigation System

### Header Structure
- Fixed position at top
- Full width with centered content
- Logo + Navigation items distributed evenly horizontally
- Rectangular buttons with rounded corners

### Navigation Items (Left to Right)
1. Logo (returns to top of page)
2. LookerHelp (returns to top of index)
3. Pricing
4. Booking
5. Legal
6. Sign in with Google

### Button States
- Default: Background #333333, Text #E0E0E0
- Selected: Text #39FF14
- Hover: Opacity change for visual feedback

## Scrolling Behavior

### Smooth Scrolling
```css
html {
  scroll-behavior: smooth;
}
```

### Section Navigation
- Header offset: 80px (height of fixed header)
- Smooth scroll to section when clicking navigation items
- Sections maintain full viewport width
- Content centered within sections

### Accordion Behavior
- Smooth expand/collapse animations
- Only one section open at a time
- Arrow indicator rotation on toggle
- Maintains scroll position on expand/collapse

## Interactive Elements

### Calendar Booking Button
- Prominent placement in hero section
- Google Calendar integration
- Color: #19171A
- Text: #F0E8F3
- Font size: 11px

### Pricing Buttons
- Full width within cards
- Custom colors per tier:
  - Lookernomicon: #B026FF (white text)
  - Monthly Support: #FF13F0 (white text)
  - Weekly Hours: #39FF14 (dark text)
  - Weekly Support: #00FEFC (dark text)

### Authentication
- Google Sign-in button in header
- State changes based on auth status
- Clear visual feedback for signed-in state

## Responsive Design

### Breakpoints
- Mobile: Default
- Tablet: 768px+
- Desktop: 1024px+
- Large Desktop: 1440px+

### Mobile Adaptations
- Hamburger menu for navigation
- Stacked pricing cards
- Full-width sections
- Preserved typography scale
- Maintained color scheme

## Animation Guidelines

### Transitions
- Navigation hover: 0.2s opacity
- Accordion expand/collapse: 0.3s ease-in-out
- Button hover: 0.2s opacity
- Page section fade-in: 0.5s ease-out

### Loading States
- Smooth fade-in for content sections
- Loading indicators for auth actions
- Transition effects for route changes
- Skeleton loading for dynamic content

This design plan strictly follows the mockup specifications while ensuring a cohesive and professional user experience. All colors, fonts, sizes, and behaviors are implemented exactly as specified in the original mockup.
