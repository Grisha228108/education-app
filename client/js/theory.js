import { checkTheme } from "./theme.js"
import { fetchLessonForId } from "./generalFunction.js"

const title = document.querySelector(".theory-title")
const contentBlock = document.querySelector(".content")
const url = window.location.search
const urlParams = new URLSearchParams(url)
const pageId = urlParams.get("id")
let isOpen = false;

title.textContent = await fetchLessonForId(pageId)


// async function fetchLessonForId() {
//     const res = await fetch(`/fetchLessonForId?id=${pageId}`, { method: 'GET' })

//     const [ lesson ] = await res.json()

//     console.log(lesson)
//     title.textContent = lesson.title
// }

async function fetchLessonBlocks() {
    const res = await fetch(`/fetchLessonBlocks?id=${pageId}`, { method: 'GET' })

    const lessonBlocks = await res.json()
    const sortLessonBlocks = lessonBlocks.sort((a, b) => a.order_number - b.order_number)

    renderLesson(sortLessonBlocks)
}

fetchLessonForId()
fetchLessonBlocks()



function renderLesson(lessonBlocks) {
    lessonBlocks.forEach((block) => {
        const item = document.createElement("div");
        console.log(block)
        switch (block.block_type) {
            case "title":
                const title = document.createElement("h2");
                title.textContent = block.content;
                item.appendChild(title)
                break
            case "paragraph":
                const text = document.createElement("p");
                text.textContent = block.content;
                item.appendChild(text)

                break
            case "image":
                const image = document.createElement("img")
                image.src = block.image_url
                image.id = `${block.id}`
                image.className = "img"
                image.addEventListener("click", () => renderImage(block.id))

                item.appendChild(image)
                break
            case "list":
                if (block.content != null) {
                    const textBeforeUl = document.createElement("p");
                    textBeforeUl.textContent = block.content;
                    item.appendChild(textBeforeUl)
                }
                fetchLessonBlocksItems(block.id, item)
                break


        }
        contentBlock.appendChild(item)
    })
}


async function fetchLessonBlocksItems(block_id, item) {
    const res = await fetch(`/fetchLessonBlockItems?block_id=${block_id}`, { method: 'GET' })

    const lessonBlocksItems = await res.json()
    const sortLessonBlocksItems = lessonBlocksItems.sort((a, b) => a.order_number - b.order_number)
    
    const ul = document.createElement("ul")
    sortLessonBlocksItems.forEach((item) => {
        const li = document.createElement("li")
        const text = document.createElement("p")
        text.style.display = "inline"
        text.textContent = item.text;
        li.appendChild(text)
        ul.appendChild(li)
    })
    item.appendChild(ul)
    
}

function renderImage(blockId) {
    const image = document.getElementById(blockId)
    if (!isOpen) {
        const shadow = document.createElement("div")
        shadow.style.backgroundColor = "rgba(0, 0, 0, 0.9)"
        shadow.style.position = "fixed"
        shadow.className = "shadowKill"
        shadow.style.zIndex = "9998"
        shadow.style.width = "100%"
        shadow.style.height = "100%"
        shadow.style.top = "0";
        shadow.style.left = "0";

        image.style.position = "fixed"
        image.style.zIndex = "9999"
        image.style.width = "600px";
        image.style.left = "50%";
        image.style.top = "50%";
        image.style.transform = "translate(-50%, -50%)"

        document.body.appendChild(shadow)
        isOpen = true;
    } else {
        const shadow = document.querySelector(".shadowKill")
        if (shadow) shadow.remove()

        image.style.position = "";
        image.style.width = ""
        image.style.transform = ""
        isOpen = false;
    }
}

checkTheme()