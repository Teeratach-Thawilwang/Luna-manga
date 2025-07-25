﻿# Index
- [Preview](#preview)
- [Setup VPS](#setup-vps)
  - [1. Copy deploy material to server](#1-copy-deploy-material-to-server)
  - [2. Install docker, docker-compose, nano](#2-install-docker-docker-compose-nano)
  - [3. Add deploy script to crontab](#3-add-deploy-script-to-crontab)
- [Setup ssh with pem](#setup-ssh-with-pem)
- [Login to docker hub](#login-to-docker-hub)
- [Push Docker Image](#push-docker-image)
  - [1. Tag the image](#1-tag-the-image)
  - [2. Push the image](#2-push-the-image)
- [Pull Docker Image](#pull-docker-image)
- [Deployment](#deployment)

---

### [Preview](#index)
- [▶️ Video](https://drive.google.com/file/d/1h7yy3vXf69Iix55hTbi401QmNXm-fshx/view)


### [Setup VPS](#index)

#### 1. Copy deploy material to server

```sh
# Shell to server
ssh <username>@<IP_address>

# Create /root/main folder
mkdir /root/main

# Copy file to server
scp -rp ./deploy/* <username>@<IP_address>:/root/main
# or use pem if you setup already.
scp -i <path_to_private_pem> -rp ./deploy/* <username>@<IP_address>:/root/main

#Example
scp -i Frontend.pem -rp ./deploy/* root@luna-manga.com:/root/main

# Change permission to executable
chmod -R +x /root/main
```

#### 2. Install docker, docker-compose, nano

```sh
# Run setup.sh script
./setup.sh

# Tip Nano
ctrl + o = save
ctrl + x = exit

Reference: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04

Reference: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04
```

#### 3. Add deploy script to crontab

```sh
crontab -e # select nano editor

# Place this command to end of file.
@reboot /root/main/deploy.sh
```

### [Setup ssh with pem](#index)

```sh
  # 1. Create rsa private, public key
  ssh-keygen -t rsa -b 2048

  # 2. Save rsa private to client

  # 3. Add rsa.pub to server at authorized_keys on .ssh directory
  nano ~/.ssh/authorized_keys

  # 4. Change ssh config
  sudo nano /etc/ssh/sshd_config
      # set PubkeyAuthentication yes
      # set PasswordAuthentication no

  # 5. Restart ssh service
  sudo systemctl restart sshd

  # 6. Test ssh on client to server
  ssh -i <path_to_rsa_private_file> <username>@<VPS_IP_Address>

  # 7. Add Remote ssh on vscode
  Host <Name_SSH>
    HostName <VPS_IP_Address>
    User <username>
    IdentityFile <path_to_rsa_private_file>
    # passphrase <comment_passphrase_to_remind_yourself>
```

### [Login to docker hub](#index)

```sh
docker login
```

### [Push docker image](#index)

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

### [Pull Docker Image](#index)

```sh
docker pull [REGISTRYHOST/][USERNAME/]NAME[:TAG]

# For example
docker pull teeratachdocker/luna_manga
```

### [Deployment](#index)

```sh
1. Build dist
    npm run build

2. Build docker image
    docker-compose up -d --build

3. Push docker image
    docker tag luna_manga teeratachdocker/luna_manga:latest
    docker push teeratachdocker/luna_manga:latest

4. Restart Server

5. Check container status
    docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"
```
