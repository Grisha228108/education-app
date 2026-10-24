const subjectsList = document.querySelector("#lessons-select")
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