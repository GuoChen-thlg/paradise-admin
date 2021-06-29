#!/bin/bash

\cp CNAME dist

time=$(date "+%Y-%m-%d %H:%M:%S")
commit="Update page in ${time}"

cd ./dist

git init

git add .

git commit -m "$commit"

git branch gh-page

git checkout gh-page

git remote add paradise-admin github:GuoChen-thlg/paradise-admin.git

git push -u paradise-admin gh-page -f


# read -n 1