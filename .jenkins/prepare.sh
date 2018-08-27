#! /bin/bash

echo "init dependencies"
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc

mkdir -p ~/.ssh
cat $JENKINS_PRIVATE_KEY >> ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

git config --global user.email jenkins@bearer.sh
git config --global user.name   jenkins-br

git_url=$(git config --get remote.origin.url | sed "s/https:\/\/github\.com\//git@github\.com:/")
git remote set-url origin $git_url

echo $git_url