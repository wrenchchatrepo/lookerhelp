#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting LookerHelp MVP Setup...${NC}\n"

# Check for required tools
echo "Checking required tools..."
command -v node >/dev/null 2>&1 || { echo -e "${RED}Node.js is required but not installed.${NC}" >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo -e "${RED}npm is required but not installed.${NC}" >&2; exit 1; }
command -v firebase >/dev/null 2>&1 || { echo -e "${RED}Firebase CLI is required but not installed. Install with: npm install -g firebase-tools${NC}" >&2; exit 1; }

# Setup Frontend
echo -e "\n${BLUE}Setting up frontend...${NC}"
cd client
echo "Installing frontend dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating frontend .env file..."
    cp .env.example .env
    echo -e "${GREEN}Created .env file. Please update with your configuration.${NC}"
fi

# Setup Cloud Functions
echo -e "\n${BLUE}Setting up Cloud Functions...${NC}"
cd ../functions
echo "Installing Cloud Functions dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating Cloud Functions .env file..."
    cp .env.example .env
    echo -e "${GREEN}Created .env file. Please update with your configuration.${NC}"
fi

# Firebase setup
echo -e "\n${BLUE}Setting up Firebase...${NC}"
echo "Please login to Firebase if you haven't already..."
firebase login

# Create BigQuery tables
echo -e "\n${BLUE}BigQuery Setup Instructions:${NC}"
echo "1. Go to BigQuery Console"
echo "2. Select project: miguelai"
echo "3. Run the SQL commands in bigquery_setup.sql"

echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "\nNext steps:"
echo "1. Update environment variables in:"
echo "   - client/.env"
echo "   - functions/.env"
echo "2. Run BigQuery setup commands"
echo "3. Start development with:"
echo "   - Frontend: cd client && npm start"
echo "   - Functions: cd functions && npm run serve"

# Return to root directory
cd ..

echo -e "\n${BLUE}Happy coding!${NC}"
