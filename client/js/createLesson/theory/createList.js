import { resize } from './resize.js';
import { createSaveLogo } from './saveProgress.js';

function addList(preview) {
    const check_btn_save = document.querySelector(".save-btn");

    if (check_btn_save !== null) {
        alert("Заполните предыдущее поле");
        return;
    };

    const wrapper = document.createElement('div');
    wrapper.className = 'list-wrapper';

    const ul = document.createElement("ul")
    const nameList = document.createElement("textarea")
    
    const addElementButton = document.createElement("button")
    addElementButton.className = "auxil-btn"
    addElementButton.id = "elementList"
    addElementButton.type = "button"
    addElementButton.textContent = "Добавить новый элемент"
    addElementButton.addEventListener("click", () => createElementList(ul, preview));

    createElementList(ul, preview);

    nameList.className = "paragraph paragraph_create";
    nameList.placeholder = "Введите название списка";
    nameList.style.width = preview.offsetWidth-300 + "px";
    nameList.addEventListener("input", () => resize(nameList));

    wrapper.appendChild(ul);
    wrapper.appendChild(addElementButton);

    preview.appendChild(wrapper);
    createSaveLogo(ul, "ul", wrapper);
};

function createElementList(ul, preview) {
    const li = document.createElement("li");

    li.className = "element-ul";

    const paragraph = document.createElement("textarea");

    paragraph.className = "paragraph paragraph_create";
    paragraph.placeholder = "Введите элемент списка";
    paragraph.style.width = preview.offsetWidth-325 + "px";
    paragraph.addEventListener("input", () => resize(paragraph));

    li.appendChild(paragraph);
    ul.appendChild(li);
}

export { addList };