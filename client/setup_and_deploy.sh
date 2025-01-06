#!/bin/bash

echo "Step 1: Firebase Authentication"
firebase login --reauth

echo "Step 2: Building main site..."
npm run build

echo "Step 3: Preparing test site..."
mkdir -p test
cp public/app.html test/index.html

echo "Step 4: Deploying to Firebase..."
firebase deploy --only hosting:main,hosting:test

echo "Deployment complete!"
echo "Main site: https://miguelai.web.app"
echo "Test page: https://test-miguelai.web.app"
echo ""
echo "Next steps:"
echo "1. Verify the test page loads correctly"
echo "2. Check Google OAuth authentication works"
echo "3. Test the Vertex AI agent integration"
