#!/bin/bash
source /etc/profile
sleep 40
cd /home/pi/apps/
git pull --no-edit

cd /home/pi/apps/test1/
mkdir -p snapshots
logger Starting the raspii app
node /home/pi/apps/test1/app.js &>/home/pi/logs/raspi.log
