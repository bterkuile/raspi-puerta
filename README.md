raspi-puerta
================================================
Raspberry control system for entry gates

Installation on the Raspberry PI
------------------------------------------------
### 1. Install the system
....
Activate ssh login

### 2. Install this repo
```
ssh pi@<ip of raspberry pi>
git clone git@github.com:bterkuile/raspi-puerta.git apps
```

### 3. Configure the ENV variables
```
sudo vi /etc/profile
```
with additions:
```
export SERVER_AUTH_TOKEN='<<<very secret token to get access to the server>>>'
export SERVER_HOST='<<<less secret server receiving the updates>>>'
export NPM_CONFIG_PREFIX=/home/pi/.npm-global
export NODE_PATH=$NPM_CONFIG_PREFIX/lib/node_modules
```
An example hostname could be: `http://192.168.0.107`

### 4. Schedule the update script on reboot
```
crontab -e
```
with contents:
```
@reboot ~/apps/control/run.sh
```
