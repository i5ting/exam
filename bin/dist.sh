#! /bin/bash

rm -rf dist
mkdir dist

cp -rf server dist
cp -rf vendor dist
cp -rf index.html dist
cp -rf api.sh dist

tar -cvf dist.tar dist


http-server dist --cors -p 8080 -o