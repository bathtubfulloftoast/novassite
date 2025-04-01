const colorscheme = document.createElement('link');
colorscheme.rel = "stylesheet";

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
colorscheme.href = "/styles/dark.css";
} else {
colorscheme.href = "/styles/light.css";
}

document.head.appendChild(colorscheme);
