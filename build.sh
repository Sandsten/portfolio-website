#!/bin/bash
# run ./build.sh <version> to build a docker image tagged with :<version> and :latest
echo "Building sandsten/portfolio image with tag :"$1 "and :latest"
docker build -t sandsten/portfolio:latest -t sandsten/portfolio:$1 .
# Push the newly built image and its tags to docker hub
docker push sandsten/portfolio:latest
docker push sandsten/portfolio:$1