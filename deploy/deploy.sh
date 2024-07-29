#!/bin/bash

docker rmi $(docker images -f "dangling=true" -q)

DOCKER_HUB_IMAGE="teeratachdocker/luna_manga"
docker pull $DOCKER_HUB_IMAGE
docker-compose up -d --build
