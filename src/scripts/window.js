export function movewindow(element) {
let startX, startY, startLeft, startTop;

element.addEventListener("mousedown", (e) => {
    e.preventDefault();
    element.style.cursor = "move";

    startX = e.clientX;
    startY = e.clientY;

    startLeft = element.offsetLeft;
    startTop = element.offsetTop;

    const onMove = (event) => {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        element.style.left = `${startLeft + dx}px`;
        element.style.top = `${startTop + dy}px`;
    };

    const onUp = () => {
        element.style.cursor = "default";
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
});

}

export function spawnwindow({title:WindowTitle,icon:iconURL,x:Xpos,y:Ypos,id:iconID,open:AutoOpen,src:Isrc,width:Iwidth,height:Iheight}) {
let icon;

if(iconID) {
icon = document.getElementById(iconID);
icon.style.width="24px";
icon.style.height="24px";
icon.style.display="block";
icon.style.float="left";
icon.style.marginLeft="10px";
icon.style.marginTop="3px";
icon.style.cursor="pointer";

const iconimg = document.createElement('img');
iconimg.src=iconURL;
iconimg.style.width="20px";

icon.appendChild(iconimg);
}



const wrap = document.createElement('div');
wrap.style.display="inline-block";
wrap.style.zIndex=5;
wrap.style.padding=0;
wrap.style.margin=0;
wrap.style.position="absolute";
wrap.style.left=Xpos+"px";
wrap.style.top=Ypos+"px";

const titlebar = document.createElement('div');
titlebar.className = "title-bar";
wrap.appendChild(titlebar);

const titleimg = document.createElement('img');
titleimg.src=iconURL;
titleimg.style.width="16px";
titleimg.style.height="16px";
titleimg.style.verticalAlign="text-top";

const titletext = document.createElement('div');
titletext.className = "title-bar-text";
titletext.innerHTML = " "+WindowTitle;
titletext.prepend(titleimg);
titlebar.appendChild(titletext);

const titlecontrol = document.createElement('div');
titlecontrol.className = "title-bar-controls";
titlebar.appendChild(titlecontrol);

const minimize = document.createElement('button');
minimize.ariaLabel = "Minimize";
minimize.style.cursor = "pointer";
minimize.title = "minimize window";
titlecontrol.appendChild(minimize);

const maximize = document.createElement('button');
maximize.ariaLabel = "Maximize";
maximize.style.cursor = "pointer";
maximize.title = "fullscreen window";

titlecontrol.appendChild(maximize);

const close = document.createElement('button');
close.ariaLabel = "Close";
close.style.cursor = "pointer";
close.title = "refresh window";

titlecontrol.appendChild(close);


const ifwrap = document.createElement('div');
ifwrap.style.padding=0;
ifwrap.style.margin=0;
wrap.appendChild(ifwrap);

const iframe = document.createElement('iframe');
iframe.src = Isrc;
iframe.style.width=Iwidth;
iframe.style.height=Iheight;
iframe.style.padding=0;
iframe.style.margin=0;
iframe.style.border="1px solid #0831d9";
iframe.style.borderBottom="2px solid #0831d9";
iframe.style.borderTop="none";
iframe.style.background="#ece9d8";
ifwrap.appendChild(iframe);

movewindow(wrap);
document.body.appendChild(wrap);

close.addEventListener("click", function(event) {
event.preventDefault();
iframe.src=Isrc;

})

maximize.addEventListener("click", function(event) {
event.preventDefault();
iframe.requestFullscreen();
})

if(iconID) {
if (AutoOpen == true) {
icon.style.display="none";
} else {
wrap.style.display="none";
}
}

if(iconID) {
icon.addEventListener("click", function(event) {
event.preventDefault();
icon.style.display="none";
wrap.style.display="inline-block";
})
}

minimize.addEventListener("click", function(event) {
event.preventDefault();
if(iconID) {
icon.style.display="block";
wrap.style.display="none";
} else {
wrap.remove();
}
})
}
