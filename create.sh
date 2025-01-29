#!/bin/bash

# Check if a project name was provided
if [ -z "$1" ]; then
  echo "Usage: $0 project_name"
  exit 1
fi

# Set the project name
PROJECT_NAME=$1

# Run the Nuxt installation command
npx nuxi@latest init "$PROJECT_NAME" --packageManager=npm --gitInit=false

# Install the Directus SDK
cd "$PROJECT_NAME" || exit
npm install @directus/sdk

# Copy templates/docker-compose.yml file to the project directory
cp ../templates/docker-compose.yml .
# Make sure docker image is up to date
docker compose pull

# Append `uploads/*` to .gitignore
echo "# Project files" >> .gitignore
echo "uploads/*" >> .gitignore

# Create a .env file with the following contents:
echo "DIRECTUS_URL=http://localhost:8055" > .env

# Overwrite Nuxt config file with the following contents
cp ../templates/nuxt.config.ts nuxt.config.ts

# Create directus.d.ts file
cp ../templates/directus.d.ts directus.d.ts

# Make the Directus plugin
mkdir plugins
cp ../templates/directus.plugin.ts plugins/directus.ts

# Change app.vue to use page routing
cp ../templates/app.vue .

echo ""
echo "YOU MAY NEED TO EDIT THE directus.d.ts FILE IN THE PROJECT AND ARTICLE TO GET STARTED!"
echo ""
echo "Project '$PROJECT_NAME' has been created and is ready for article writing!"