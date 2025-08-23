# NOTICE
ALICE REMEMBER TO FUCKING CONVERT THE VIDEOS WITH FFMPEG
``for i in *.*; do ffmpeg -i "$i" -vf "scale='if(gt(iw,ih),900,-2)':'if(gt(ih,iw),900,-2)',fps=24" -cpu-used 4 -deadline realtime "ass/${i%.*}.webm"; done``
