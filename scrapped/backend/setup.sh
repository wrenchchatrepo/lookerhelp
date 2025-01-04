#!/bin/bash

# Remove existing virtual environment if it exists
rm -rf venv

# Create new virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Upgrade pip within the virtual environment
python3 -m pip install --upgrade pip

# Install requirements
python3 -m pip install -r requirements.txt

echo "Setup complete! Virtual environment is activated and dependencies are installed."
