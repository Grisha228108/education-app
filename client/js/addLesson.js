import { addSubheading } from './createLesson/theory/addSubheading.js';
import { addParagraph } from './createLesson/theory/addParagraph.js';
import { addList } from './createLesson/theory/createList.js';


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

previewSite()