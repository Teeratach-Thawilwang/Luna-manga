#!/bin/bash

cd /root/main/
docker rmi $(docker images -f "dangling=true" -q)
docker-compose stop app
docker container prune -f

DOCKER_HUB_IMAGE="teeratachdocker/luna_manga"
docker pull $DOCKER_HUB_IMAGE
docker-compose up -d --build
docker-compose restart
