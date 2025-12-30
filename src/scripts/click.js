const click = new Audio("/media/sfx/click.ogg");

document.addEventListener("mousedown", (e) => {
   switch (e.button) {
      case 0:
         click.currentTime=0;
         click.play();
         break;
   }
});
