#!/bin/bash

echo "Step 1: Building production site..."
npm run build

echo "Step 2: Deploying to lookerhelp.com..."
firebase deploy --only hosting:production

echo "Deployment complete!"
echo "Production site: https://lookerhelp.com"
