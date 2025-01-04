# LookerHelp Test Plan

## Unit Tests

### Components
```javascript
// Auth.test.js
describe('Auth Component', () => {
  it('shows login button for visitors', () => {})
  it('redirects to Google OAuth', () => {})
  it('handles OAuth callback with token', () => {})
  it('stores session in localStorage', () => {})
  it('shows error on auth failure', () => {})
  it('redirects to intended route after auth', () => {})
})

// ProtectedRoute.test.js
describe('ProtectedRoute Component', () => {
  it('allows access with valid session', () => {})
  it('redirects to login without session', () => {})
  it('checks subscription status for protected content', () => {})
  it('saves redirect path in localStorage', () => {})
})

// Layout.test.js
describe('Layout Component', () => {
  it('shows correct nav items for visitor', () => {})
  it('shows user menu when authenticated', () => {})
  it('handles logout', () => {})
  it('displays subscription status', () => {})
})

// Subscribe.test.js
describe('Subscribe Component', () => {
  it('shows correct pricing tiers', () => {})
  it('links to correct Stripe payment URLs', () => {})
  it('displays included features', () => {})
  it('shows current subscription status', () => {})
})
```

### Context
```javascript
// AuthContext.test.js
describe('AuthContext', () => {
  it('provides user state to children', () => {})
  it('updates user state on login', () => {})
  it('clears state on logout', () => {})
  it('persists session between reloads', () => {})
  it('handles token expiration', () => {})
})
```

### Utils
```javascript
// sessionUtils.test.js
describe('Session Utils', () => {
  it('validates JWT tokens', () => {})
  it('handles expired tokens', () => {})
  it('refreshes session when needed', () => {})
})

// apiUtils.test.js
describe('API Utils', () => {
  it('adds auth headers to requests', () => {})
  it('handles API errors', () => {})
  it('retries failed requests', () => {})
})
```

## Integration Tests

### Authentication Flow
```javascript
describe('Authentication Flow', () => {
  it('completes full OAuth process', () => {})
  it('maintains session across page loads', () => {})
  it('handles session expiration', () => {})
  it('preserves redirect after login', () => {})
})

describe('Authorization Flow', () => {
  it('protects subscriber-only content', () => {})
  it('protects looker-level content', () => {})
  it('shows appropriate upgrade prompts', () => {})
})
```

### Subscription Flow
```javascript
describe('Subscription Management', () => {
  it('shows correct initial state', () => {})
  it('updates after successful payment', () => {})
  it('handles subscription cancellation', () => {})
  it('manages seat allocation', () => {})
})

describe('Payment Integration', () => {
  it('redirects to correct Stripe links', () => {})
  it('handles successful payments', () => {})
  it('handles cancelled payments', () => {})
  it('updates subscription status', () => {})
})
```

### Navigation
```javascript
describe('Navigation Flow', () => {
  it('shows correct pages for visitor', () => {})
  it('shows subscriber pages when authenticated', () => {})
  it('handles deep linking', () => {})
  it('preserves state during navigation', () => {})
})
```

## End-to-End Tests

### User Journeys
```javascript
describe('Visitor to Subscriber Journey', () => {
  it('completes visitor -> subscriber flow', () => {
    // 1. Land on home page
    // 2. Click sign in
    // 3. Complete Google OAuth
    // 4. Access subscriber content
  })
  
  it('completes subscriber -> looker flow', () => {
    // 1. Start as subscriber
    // 2. Click upgrade
    // 3. Complete Stripe payment
    // 4. Access looker features
  })
})

describe('Content Access', () => {
  it('manages guide access by tier', () => {})
  it('controls slack access by subscription', () => {})
  it('handles subscription expiration', () => {})
})
```

### Error Scenarios
```javascript
describe('Error Handling', () => {
  it('handles network failures', () => {})
  it('recovers from auth errors', () => {})
  it('manages API timeouts', () => {})
  it('shows appropriate error messages', () => {})
})
```

## Performance Tests

### Load Testing
```javascript
describe('Page Performance', () => {
  it('loads landing page under 2s', () => {})
  it('completes auth flow under 5s', () => {})
  it('navigates pages under 1s', () => {})
})

describe('API Performance', () => {
  it('verifies subscriptions under 500ms', () => {})
  it('handles concurrent requests', () => {})
})
```

### Resource Usage
```javascript
describe('Resource Optimization', () => {
  it('keeps bundle size under limit', () => {})
  it('optimizes image loading', () => {})
  it('implements proper caching', () => {})
})
```

## Security Tests

### Authentication Security
```javascript
describe('Auth Security', () => {
  it('prevents token manipulation', () => {})
  it('validates OAuth state', () => {})
  it('requires secure origins', () => {})
  it('implements CORS correctly', () => {})
})
```

### Data Protection
```javascript
describe('Data Security', () => {
  it('encrypts sensitive data', () => {})
  it('sanitizes user input', () => {})
  it('prevents XSS attacks', () => {})
  it('validates API inputs', () => {})
})
```

## Accessibility Tests

### WCAG Compliance
```javascript
describe('Accessibility Standards', () => {
  it('meets WCAG 2.1 AA standards', () => {})
  it('supports keyboard navigation', () => {})
  it('implements proper ARIA labels', () => {})
  it('maintains color contrast', () => {})
})
```

## Browser Compatibility

### Cross-browser Testing
```javascript
describe('Browser Support', () => {
  it('works in Chrome', () => {})
  it('works in Firefox', () => {})
  it('works in Safari', () => {})
  it('works in Edge', () => {})
  it('supports mobile browsers', () => {})
})
```

## Test Environment Setup
```javascript
// Global test setup
beforeAll(() => {
  // Mock Firebase Functions
  // Mock Google OAuth
  // Mock Stripe
  // Mock BigQuery
})

// Test utilities
const mockAuthState = (level) => {
  // Set up auth state for testing
}

const mockSubscription = (tier) => {
  // Set up subscription state for testing
}

// Clean up
afterEach(() => {
  // Clear localStorage
  // Reset mocks
})
```

## Test Data
```javascript
const mockUsers = {
  visitor: { /* ... */ },
  subscriber: { /* ... */ },
  looker: { /* ... */ }
}

const mockSubscriptions = {
  weekly: { /* ... */ },
  monthly: { /* ... */ },
  office_hours: { /* ... */ }
}

const mockResponses = {
  auth_success: { /* ... */ },
  auth_error: { /* ... */ },
  subscription_active: { /* ... */ }
}
