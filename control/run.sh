#!/bin/bash
cd ~/apps/
git pull
cd ~/apps/test1/
mkdir -p snapshots
node app.js
