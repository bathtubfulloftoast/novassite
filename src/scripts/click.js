document.addEventListener("mouseup", (e) => {
   switch (e.button) {
      case 0:
         const click = new Audio("/media/sfx/click.ogg");
         click.play();
         break;
   }
});
