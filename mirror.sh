#!/bin/bash
cd $(dirname "$0")

git push github main
git push gitlab main
git push codeberg main
