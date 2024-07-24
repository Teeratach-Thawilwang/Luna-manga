# Index

- Setup VPS
  - 1.Install docker
  - 2.Install docker-compose
  - 3.Install nano
  - 4.Copy nignx config and deploy script to server
  - 5.Change permission file on server
  - 6.Add deploy script to crontab
- Login to docker hub
- Push Docker Image
  - 1.Tag the image
  - 2.Push the image
- Pull Docker Image
- Deployment

---

### Setup VPS

#### 1. Install docker

```sh
sudo apt update

sudo apt install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

sudo apt install docker-ce

Reference: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04
```

#### 2. Install docker-compose

```sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker-compose --version

Reference: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04
```

#### 3. Install nano

```sh
apt install nano

# Tip
ctrl + o = save
ctrl + x = exit
```

#### 4. Copy nignx config and deploy script to server

```sh
scp -rp ./nginx <username>@<IP_address>:/root/main

scp -rp ./deploy.sh <username>@<IP_address>:/root/main
```

#### 5. Change permission file on server

```sh
# Shell to server
ssh <username>@<IP_address>

# Go to /root/main/
cd /root/main

# Change permission to able to execute
chmod +x ./deploy.sh nginx/*
```

#### 6. Add deploy script to crontab

```sh
crontab -e # select nano editor

# Place this command to end of file.
@reboot /root/main/deploy.sh
```

<br/>

### Login to docker hub

```sh
docker login
```

<br/>

### Push docker image

#### 1. Tag the image

```sh
docker tag [OPTIONS] IMAGE[:TAG] [REGISTRYHOST/][USERNAME/]NAME[:TAG]

# For example
docker tag luna_manga teeratachdocker/luna_manga:latest
```

#### 2. Push the image

```sh
docker push [REGISTRYHOST/][USERNAME/]NAME[:TAG]

# For example
docker push teeratachdocker/luna_manga:latest
```

<br/>

### Pull Docker Image

```sh
docker pull [REGISTRYHOST/][USERNAME/]NAME[:TAG]

# For example
docker pull teeratachdocker/luna_manga
```

<br/>

### Deployment

```sh
1. Build docker image
    docker-compose up -d build

2. Push docker image

3. Restart Server
```
