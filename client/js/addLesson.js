const subjectsList = document.getElementById("lessons-select")
function createOptions(subjects) {

    subjects.forEach(element => {
        const sub = document.createElement("option")
        sub.textContent = element.name
        sub.value = element.slug
        subjectsList.appendChild(sub)
    });
}

async function fetchSubjects() {
    const res = await fetch('fetchSubjects')
    const data = await res.json()
    const updatedSubjects = data.map((subject) => {
        return {name: subject.name, slug: subject.slug}
    })
    createOptions(updatedSubjects)
}

fetchSubjects()

function previewSite() {
    const previewDiv = document.querySelector(".preview-developments")
    const buttonHeadline = document.getElementById("headline")
    const buttonParagraph = document.getElementById("paragraph")
    const buttonList = document.getElementById("list")

    buttonHeadline.addEventListener("click", () => addSubheading(previewDiv))
    buttonParagraph.addEventListener("click", () => addParagraph(previewDiv))
    buttonList.addEventListener("click", () => addList(previewDiv))
}

function resize(object) {
    object.style.height = "2em"
    const newHeight = object.scrollHeight ;
    object.style.height = newHeight + "px"
}

function addSubheading(preview) {
    const headLine = document.createElement("textarea")
    headLine.style.marginLeft = "150px"
    headLine.className = "subheading"
    headLine.textContent = "Введите заголовок"
    headLine.style.width = preview.offsetWidth-150 + "px"
    headLine.style.height = "1.95em" 
    headLine.addEventListener("input", () => resize(headLine))
    preview.appendChild(headLine)
}

function addParagraph(preview) {
    const paragraph = document.createElement("textarea")
    paragraph.style.marginLeft = "175px"
    paragraph.className = "paragraph"
    paragraph.textContent = "Введите абзац"
    paragraph.style.width = preview.offsetWidth-200 + "px"
    paragraph.style.height = "1.93em" 
    paragraph.addEventListener("input", () => resize(paragraph))
    preview.appendChild(paragraph)
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



previewSite()