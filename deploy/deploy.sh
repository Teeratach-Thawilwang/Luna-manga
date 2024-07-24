#!/bin/bash

DOCKER_HUB_IMAGE="teeratachdocker/luna_manga"
docker pull $DOCKER_HUB_IMAGE
docker-compose up -d --build
