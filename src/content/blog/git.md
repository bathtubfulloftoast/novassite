---
title: 'git repo shrinking'
description: 'dicking around with shit and shit and stuff'
pubDate: '12/10/2025 1:30 PM'
---

okay so the git repo for novassite is fucking massive *mostly cause ive been too lazy to setup git lfs*...
however as of like yesterday ive decided i want to remove all the old binary files and setup git lfs
however, to remove them i have to like....
get rid of them...........
fuckckking...

so i need a tool that can redo git repos 
and i found those tools!!!
two main ones to be exact

# [git-filter-repo](https://github.com/newren/git-filter-repo)
the best one ive found 

it just like...
does its job....
thank you git-filter-repo

# [BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
this is the reason i wrote this blogpost

what the FUCK
its whole thing is sucking itself off while at the same time being absolutely dogshit

# Tests
as a test i took novassite repo and cloned it to other git repositories 
then i deleted the public directory and force pushed the new histories
then i pushed the changes and cloned them back from git.gay

here were the results

* 309M    novassite.git
* 206M    bfg-deleter-test.git
* 64M     git-filter-repo-deleter-test.git

note: BFG HAD A FUCKING ADVANTAGE WITH ME DELETING EVERY FILE OVER 2MB
HOW DID IT LOSE???

anyways i just wanted to shit on **B**ig **F**ucking **G**uy
thats it bye i love you