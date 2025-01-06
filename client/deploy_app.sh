#!/bin/bash

# Build the React app for main site
echo "Building main site..."
npm run build

# Deploy both targets to Firebase
echo "Deploying to Firebase..."
firebase deploy --only hosting:main,hosting:test

echo "Deployment complete!"
echo "Main site: https://miguelai.web.app"
echo "Test page: https://test-miguelai.web.app"
echo ""
echo "Next steps:"
echo "1. Verify the test page loads correctly"
echo "2. Check Google OAuth authentication works"
echo "3. Test the Vertex AI agent integration"
