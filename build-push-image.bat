
cd app
call npm run build

cd ..
call docker-compose up -d --build
docker tag luna_manga teeratachdocker/luna_manga:latest
docker push teeratachdocker/luna_manga:latest