import { resize } from './resize.js';

function addList(preview) {
    const ul = document.createElement("ul")
    const nameList = document.createElement("textarea")
    const liButton = document.createElement("li")
    liButton.className = "element-ul"
    const addElementButton = document.createElement("button")

    addElementButton.className = "auxil-btn"
    addElementButton.style.marginLeft = "175px"
    addElementButton.id = "elementList"
    addElementButton.type = "button"
    addElementButton.textContent = "Добавить новый элемент"
    addElementButton.style.display = "inline"
    addElementButton.addEventListener("click", () => createElementList(ul, preview))

    createElementList(ul, preview)

    nameList.style.marginLeft = "175px"
    nameList.className = "paragraph"
    nameList.textContent = "Введите название списка"
    nameList.style.width = preview.offsetWidth-200 + "px"
    nameList.style.height = "1.93em" 
    nameList.addEventListener("input", () => resize(nameList))

    preview.appendChild(nameList)
    liButton.appendChild(addElementButton)
    ul.appendChild(liButton)
    preview.appendChild(ul)
}

function createElementList(ul, preview) {
    const li = document.createElement("li")
    li.className = "element-ul"
    const paragraph = document.createElement("textarea")
    paragraph.style.marginLeft = "175px"
    paragraph.className = "paragraph"
    paragraph.textContent = "Введите элемент списка"
    paragraph.style.width = preview.offsetWidth-200 + "px"
    paragraph.style.height = "1.93em" 
    paragraph.style.display = "inline"
    paragraph.addEventListener("input", () => resize(paragraph))
    li.appendChild(paragraph)
    ul.insertBefore(li, ul.lastElementChild)
}

export { addList };