import { resize } from './resize.js';

export function addParagraph(preview) {
    const check_btn_save = document.querySelector(".save-btn")
    console.log(check_btn_save)
    if (check_btn_save == null) {
        const paragraph = document.createElement("textarea")
        paragraph.className = "paragraph paragraph_create"
        paragraph.placeholder = "Введите абзац"
        paragraph.style.width = preview.offsetWidth-400 + "px"
        paragraph.addEventListener("input", () => resize(paragraph))
        preview.appendChild(paragraph)
        return
    }
    alert("Заполните предыдущее поле")
};