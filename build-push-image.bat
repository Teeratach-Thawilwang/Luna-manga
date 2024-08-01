
cd app
npm run build

cd ..
docker-compose up -d --build
docker tag luna_manga teeratachdocker/luna_manga:latest
docker push teeratachdocker/luna_manga:latest