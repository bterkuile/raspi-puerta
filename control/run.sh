#!/bin/bash
source /etc/profile
sleep 40
cd /home/pi/apps/
git pull --no-edit > /home/pi/logs/git-pull.log 2&1

cd /home/pi/apps/test1/
mkdir -p snapshots
logger Starting the raspii app
node /home/pi/apps/test1/app.js &>/home/pi/logs/raspi.log
