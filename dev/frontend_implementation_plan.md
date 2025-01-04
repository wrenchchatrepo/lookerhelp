# Frontend Implementation Plan for LookerHelp

## Tech Stack
- React (Create React App)
- React Router for navigation
- Google OAuth for authentication
- Stripe for payments
- Google Calendar API for booking integration

## Design System

### Typography
- Primary Font: "Architect's Daughter" for headers
- Secondary Font: System font stack for body text
- Font Sizes:
  - h1: 23px
  - h2: 17px
  - Body: 13px
  - Product Cards: 11px
  - Navigation: 13px

### Color Palette
```css
:root {
  /* Primary Colors */
  --header-bg: #19171A;
  --primary-text: #333333;
  --background: #E0E0E0;
  --card-bg: #F0E8F3;
  
  /* Accent Colors */
  --accent-pink: #FF13F0;
  --accent-purple: #B026FF;
  --accent-cyan: #00FEFC;
  --accent-green: #39FF14;
  
  /* Text Colors */
  --header-text: #E0E0E0;
  --header-select: #39FF14;
}
```

### Component Styling

#### Header
- Fixed position at top
- Full width with centered content
- Logo + Navigation items distributed evenly
- Rectangular buttons with rounded corners
- Button states:
  - Default: Background #333333, Text #E0E0E0
  - Selected: Text #39FF14
  - Hover: Slight opacity change for visual feedback

#### Navigation Menu
- Horizontal layout
- Evenly distributed items
- Items: Logo, LookerHelp, Pricing, Booking, Legal, Sign in
- Google Sign-in button aligned right
- Mobile: Hamburger menu for smaller screens

#### Section Cards
- Background: #E0E0E0
- Rounded corners
- Consistent padding
- Box shadow for depth
- Smooth hover transitions

#### Product Cards (Pricing)
- Background: #F0E8F3
- Equal width, responsive grid layout
- Custom button colors per tier:
  - Lookernomicon: #B026FF (Purple)
  - Monthly Support: #FF13F0 (Pink)
  - Weekly Hours: #39FF14 (Green)
  - Weekly Support: #00FEFC (Cyan)

#### Accordion Components
- Smooth expand/collapse animations
- Custom arrow indicator
- Hover states for better UX
- Applied to: Guide, FAQ, Legal sections

## Layout Structure

### Page Sections
1. Header (Fixed)
2. Hero/Welcome
3. About
4. Services
5. Guide (Accordion)
6. FAQ (Accordion)
7. Pricing
8. Legal (Accordion)
   - Terms of Service
   - Privacy Policy
   - Acceptable Use Policy
9. Footer

### Responsive Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large Desktop */ }
```

## Navigation & Scrolling Behavior

### Scroll Behavior
```css
html {
  scroll-behavior: smooth;
}
```

### Navigation Implementation
```javascript
// Smooth scroll to section
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  const headerOffset = 80; // Height of fixed header
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
};
```

### Route Structure
```javascript
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="pricing" element={<Pricing />} />
    <Route path="legal" element={<Legal />} />
    <Route path="booking" element={<Booking />} />
  </Route>
</Routes>
```

## Component Architecture

### Core Components
1. `Layout.js` - Main layout wrapper
2. `Header.js` - Navigation header
3. `Auth.js` - Google authentication
4. `Accordion.js` - Reusable accordion
5. `PricingCard.js` - Product tier cards
6. `BookingButton.js` - Google Calendar integration
7. `Section.js` - Reusable section wrapper

### Context Providers
1. `AuthContext.js` - Authentication state
2. `ThemeContext.js` - Theme preferences

## Implementation Phases

### Phase 1: Foundation
1. Project setup with Create React App
2. Install dependencies
3. Set up routing
4. Implement basic layout structure
5. Create core components

### Phase 2: Styling & Components
1. Implement design system
2. Style core components
3. Create and style sections
4. Implement responsive design
5. Add animations and transitions

### Phase 3: Functionality
1. Implement Google OAuth
2. Set up Stripe integration
3. Add Google Calendar booking
4. Implement accordion functionality
5. Add scroll behavior

### Phase 4: Polish & Testing
1. Cross-browser testing
2. Responsive testing
3. Performance optimization
4. Accessibility improvements
5. Content integration

## Testing Strategy
- Unit tests for components
- Integration tests for auth flow
- E2E tests for critical paths
- Accessibility testing
- Cross-browser compatibility
- Mobile responsiveness

## Performance Considerations
- Lazy loading for routes
- Image optimization
- Code splitting
- Performance monitoring
- Caching strategies

## Accessibility
- ARIA labels
- Keyboard navigation
- Focus management
- Color contrast compliance
- Screen reader compatibility

## SEO Optimization
- Meta tags
- Semantic HTML
- Sitemap
- robots.txt
- Open Graph tags
