#! /bin/bash

echo "init dependencies"
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
ls -la ~/.npmrc 