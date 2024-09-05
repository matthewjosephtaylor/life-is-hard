#!/bin/bash

# Get the current date and time in YYYYMMDD.HHMM format
VERSION=$(date +"%Y%m%d.%H%M")

# Update the version in package.json
sed -i '' "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json

# Commit the version change
git add package.json
git commit -m "Update version to $VERSION"

# Tag the commit with the version
git tag "$VERSION"
git push --tags
git push

