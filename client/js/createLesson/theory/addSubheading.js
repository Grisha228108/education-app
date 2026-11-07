import { resize } from './resize.js';
import { createSaveLogo } from './saveProgress.js';

function addSubheading(preview) {
  const check_btn_save = document.querySelector(".save-btn")

  if (check_btn_save == null) {

    const headLine = document.createElement("textarea")
    headLine.className = "subheading subheading_create"
    headLine.placeholder = "Введите заголовок"
    headLine.style.width = preview.offsetWidth-250 + "px"
    headLine.addEventListener("input", () => resize(headLine))

    createSaveLogo(headLine, "h2", preview)
    return
  }
    alert("Заполните предыдущее поле")
}

export { addSubheading };