#!/bin/bash

# Get the current date and time in YYYY.M.D-HHMM format without leading zeros
VERSION=$(date +"%Y.%-m.%-d-%H%M")

echo "Updating version to $VERSION"

# Update the version in package.json
sed -i '' "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json

# Commit the version change
git add package.json
git commit -m "Update version to $VERSION"

# Tag the commit with the version
git tag "$VERSION"
git remote | xargs -I {} git push {} --tags
git remote | xargs -I {} git push {} --all
