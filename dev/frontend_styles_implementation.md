# Frontend Styles Implementation Plan

## Global Styles

```css
/* Reset & Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: var(--primary-text);
  background-color: var(--background);
}

h1, h2 {
  font-family: "Architect's Daughter", cursive;
  margin-bottom: 1rem;
}

h1 {
  font-size: 23px;
  color: var(--accent-pink);
}

h2 {
  font-size: 17px;
  color: var(--accent-purple);
}
```

## Component-Specific Styles

### Header Component
```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: var(--header-bg);
  z-index: 1000;
  padding: 0 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo {
  height: 40px;
  cursor: pointer;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #333333;
  color: var(--header-text);
  text-decoration: none;
  transition: opacity 0.2s;
}

.nav-link:hover {
  opacity: 0.9;
}

.nav-link.active {
  color: var(--header-select);
}

.sign-in-button {
  margin-left: 2rem;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .nav-menu.open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    background-color: var(--header-bg);
    padding: 1rem;
  }
  
  .hamburger {
    display: block;
  }
}
```

### Section Component
```css
.section {
  padding: 4rem 2rem;
  margin: 2rem auto;
  max-width: 1200px;
  background-color: var(--background);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-content {
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .section {
    padding: 2rem 1rem;
    margin: 1rem;
  }
}
```

### Accordion Component
```css
.accordion {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 1rem;
}

.accordion-header {
  padding: 1rem;
  background-color: var(--card-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.accordion-content {
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.accordion-content.open {
  padding: 1rem;
  max-height: 1000px;
}

.accordion-arrow {
  transition: transform 0.3s ease;
}

.accordion-arrow.open {
  transform: rotate(180deg);
}
```

### Pricing Cards
```css
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.pricing-card {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  font-size: 11px;
}

.pricing-card h3 {
  margin-bottom: 1rem;
}

.pricing-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  color: var(--header-text);
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.pricing-button:hover {
  opacity: 0.9;
}

/* Product-specific button styles */
.lookernomicon .pricing-button {
  background-color: var(--accent-purple);
}

.monthly-support .pricing-button {
  background-color: var(--accent-pink);
}

.weekly-hours .pricing-button {
  background-color: var(--accent-green);
  color: var(--primary-text);
}

.weekly-support .pricing-button {
  background-color: var(--accent-cyan);
  color: var(--primary-text);
}
```

### Booking Calendar Button
```css
.calendar-button {
  background-color: var(--header-bg);
  color: var(--card-bg);
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 11px;
  text-align: center;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;
}

.calendar-button:hover {
  opacity: 0.9;
}
```

### Auth Component
```css
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  margin-top: 80px;
}

.google-sign-in {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: white;
  color: var(--primary-text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.google-sign-in:hover {
  background-color: #f5f5f5;
}
```

## Animation Keyframes
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}
```

## Utility Classes
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.text-center {
  text-align: center;
}

.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }

.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 2rem; }

.hidden {
  display: none;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
