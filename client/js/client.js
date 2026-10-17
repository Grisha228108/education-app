const form = document.querySelector("form")
const getForm = document.querySelector(".get-lang")
const cartForm = document.querySelector(".cart-form")
const usersForm = document.getElementById("users-items")
const textForm = document.getElementById("write-form")
const validateForm = document.getElementById("users-validate")
const taskForm = document.getElementById("task-form")
const subjectForm = document.querySelector(".app-list")


form.addEventListener("submit", async (event) => {
    event.preventDefault()
    
    const langName = form.langName.value
    const langDate = form.langDate.value

    const obj = {
        langName, 
        langDate
    }

    const res = await fetch("/addNewLang", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj)
    })

    const resText = await res.text()
    console.log(resText)
})

getForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const langName = getForm.langName.value
    const res = await fetch(`/getLang?lang=${langName}`, {
        method: "GET"
    })

    const resData = await res.json()
    console.log(resData)
})

textForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const text = textForm.text.value
    console.log(text)
    const res = await fetch("/write", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({text})
    })
    const answer = await res.json()
    console.log(answer["message"])
})

validateForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const name = validateForm.name.value, email = validateForm.email.value
    const res = await fetch("/users/validate", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email})
    })
    const answer = await res.json()
    console.log(answer)
})

taskForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const titleTask = taskForm.titleTask.value, completed = taskForm.completed.value, id = taskForm.taskId.value
    const res = await fetch(`/tasks/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({titleTask, completed})
    })
    
    const answer = await res.json()

    console.log(answer)
})


// триггер.слушатель(в любой момент, (информация о том что произошло) => {не перезагружать страницу})
// cartForm.addEventListener("submit", async (event) => {
//     event.preventDefault()
//     const name = cartForm.name.value, price = cartForm.price.value
//     const data = {
//         name, 
//         price
//     }

//     const res = await fetch("/cart", {
//         method: "POST", 
//         headers: {"Content-Type": "application/json"},

//         body: JSON.stringify(data)
//     })

//     const resData = await res.json()
//     console.log(resData)
// })

usersForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const name = usersForm.name.value
    const data = {
        name
    }

    const res = await fetch("/edit-users", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })

})


const number = [1, 5, 7, 12, 44, 22, 35, 48, 27, 13]
const sortNumber = number.filter(num => num%2 == 1)
console.log(sortNumber)