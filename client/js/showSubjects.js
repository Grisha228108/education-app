async function fetchSubjects() {
    const res = await fetch('/fetchSubjects', { method : 'GET'})
    
    const data = await res.json()
    console.log(data)
    renderSubjects(data)
}

fetchSubjects()

function renderSubjects(arr) {
    const ul = document.querySelector(".app-list")
    arr.forEach(element => {
        const li = document.createElement("li")
        const a = document.createElement("a")
        a.className = "subjectA"
        
        a.href = `/subject/${element.slug}/${element.id}`
        a.textContent = element.name
        li.appendChild(a)
        ul.appendChild(li)
    });
    
}