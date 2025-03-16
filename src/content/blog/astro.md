---
title: 'My experience moving my site'
description: 'spoiler alert: BRUTAL HELLISH TORTURE GOD SAVE ME I HATE EVERYTHING KILL ME'
pubDate: '11/6/2024 7:27 AM'
---
hello everybody!
the blog is back in action!
its ugly as shit once again but its legible so i dont fucking care!
so lets discuss my experiences moving the site from php to astro so far

## 1. random errors
so
random errors
hooray

so unlike php and regular html, astro is a little bitch about everything
properly closing basic html tags and the such
doing the blog has been hell

## 2. awful documentation
so if you look at the documentation for astro
it seems fine right?
WRONG
I DONT GET IT 
ITS 
WHAT ARE YOU ***SAYING***
DIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE

yes php doesnt have like
shit for documentation
but its also pretty fucking neat in the fact you list a directory and it shoves that shit in an array and youre fine

## 3. i dont get it
AAAAAAAAAAAAAAAAAAAAAAAAAAAA

## 4. everything must be declared
so
this is 
awful
by default any file or anything you declare will be treated such as an import
where itl do whatever it wants
which sucks ASS when you have 3 seperate things acting on their own
so you have to declare to ignore that

then
unless you want to shove images wherever the fuck you have to declare them in the location with the code you want
they have to be declared in code twice
fine right?
no shit they have to be declared right
NOPE.

instead of 

```
&lt;img src="image.png"&gt;
```

you have to do

```
---
// this is the header for code
import swagimage from './image.png';
---
&lt;img src={swagimage.src}&gt;
```
AAAAAAAAAAAAAAAA

## final thoughts
im so overwhelmed i can barely think
uh
blog wont be ugly for forever me promis :)
