const urlPath = window.location.pathname
const subject = urlPath.split("/")[2]
const subjectId = urlPath.split("/")[3]
console.log(subject)

const subjectH1 = document.body.querySelector(".subject-title")

async function fetchLessons() {
    
    const data = await fetchData()
    const theory = document.querySelector(".subject-list--theory")
    const practic = document.querySelector(".subject-list")
    data.forEach((lesson) => {

        const li = document.createElement("li")
        li.className = "subject-item"
        const a = document.createElement("a")
        a.className = "subject-link"
        if (lesson.lesson_type == "theory") {
            a.textContent = "Урок №" + lesson.order_number
            a.href = `/theory.html?id=${lesson.id}`
            theory.appendChild(li)
        } else {
            a.textContent = "Задача №" + lesson.order_number
            a.href = `/practice.html?id=${lesson.id}`
            practic.appendChild(li)
        }
        if (lesson.order_number == 1) {
            a.classList.add("first")
            console.log(a.classList)
        }
        li.appendChild(a)
    })
}
// switch (pageItem) {
//     case "1":
//         subjectH1.textContent = "Физика"
//         break
//     case "2":
//         subjectH1.textContent = "Математика"
//         break
//     case "3":
//         subjectH1.textContent = "Информатика"
//         break
// }

subjectH1.textContent = subject[0].toUpperCase() + subject.slice(1)

async function fetchData() {
    const res = await fetch(`/fetchLessons/${subjectId}`, {
        method: "GET"
    })

    const resData = await res.json()
    console.log(resData)
    return resData
} 



fetchData()
fetchLessons()
// const subjectA = document.body.querySelectorAll(".subject-link")
// subjectA.forEach((element) => {
//     const hrefInHalf = element.href.split("?")
//     element.href = hrefInHalf[0] + "?item=" + pageItem + "&" + hrefInHalf[1]
// })

