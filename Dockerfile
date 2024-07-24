FROM node:22-slim

WORKDIR /root/main
COPY app/dist/ ./dist

RUN npm install -g serve
