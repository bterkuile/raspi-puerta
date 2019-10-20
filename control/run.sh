#!/bin/bash
source /etc/profile
sleep 20
cd /home/pi/apps/
git pull --no-edit > /home/pi/logs/git-pull.log
sleep 2
cd /home/pi/apps/test1/
mkdir -p snapshots
logger Starting the raspii app
node /home/pi/apps/test1/app.js &>/home/pi/logs/raspi.log
