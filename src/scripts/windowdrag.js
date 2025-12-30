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
