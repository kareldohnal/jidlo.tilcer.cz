#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Print each command for easier debugging
set -x

# Change to the directory where the script is located
cd "$(dirname "$0")"

# Update the local repository with the latest changes
git fetch
git pull

# Install any new dependencies
npm install

# Build the project
npm run build

# Print a completion message
echo "Update and build process completed successfully."