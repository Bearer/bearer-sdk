#! /bin/bash

ARG="--yes --npm-tag=$LERNA_TAG"

if [ ! .npmrc ]; then
  echo "Missing .npmrc file"
  exit 1
fi

if [ ! -f ~/.gitconfig ]; then
  echo "Missing ~/.gitconfig file"
  exit 1
fi

echo "Starting publishing"
echo "$FORCE"
if [ $FORCE ==  "true"]; then 
  echo "The force is true"
else
  # yarn lerna-publish $ARG
  echo "The force is false"
fi
