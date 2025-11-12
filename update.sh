#!/bin/bash

if [ "$1" == "-noprod" ]; then
echo "assuming site only update."
pm2 stop novassite

git pull
pnpm i
pnpm run build

pm2 start novassite
exit 0
fi


clear
printf 'What do you want to update?\n(Site Bot Pull Reset All)\n(S/B/P/R/A)'
read updans

clear
pm2 stop novassite
if [ "$updans" != "${updans#[Ss]}" ] ;then
echo "only updating site"
git pull
pnpm i
pnpm run build

elif [ "$updans" != "${updans#[Bb]}" ] ;then
echo "only updating bot"
git pull
pnpm i
node deploy-commands.js

elif [ "$updans" != "${updans#[Pp]}" ] ;then
echo "just pulling update nothing else."
git pull

elif [ "$updans" != "${updans#[Rr]}" ] ;then
printf "THIS WILL RESET THE GIT REPO OVERWRITING ANY LOCAL CHANGES\nare you sure you wish to reset?\n(y/N)"
read resetans
if [ "$resetans" != "${resetans#[Yy]}" ] ;then
echo "resetting."
git reset --hard
git pull
fi

else
echo "updating everything."
git pull
pnpm i
pnpm run build
node deploy-commands.js
fi

pm2 start novassite
