import { resize } from './resize.js';

export function addParagraph(preview) {
    const paragraph = document.createElement("textarea")
    paragraph.style.marginLeft = "175px"
    paragraph.className = "paragraph"
    paragraph.textContent = "Введите абзац"
    paragraph.style.width = preview.offsetWidth-200 + "px"
    paragraph.style.height = "1.93em" 
    paragraph.addEventListener("input", () => resize(paragraph))
    preview.appendChild(paragraph)
};