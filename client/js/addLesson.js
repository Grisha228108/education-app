async function fetchSubjects() {
    const res = await fetch('fetchSubjects')
    const data = await res.json()
    console.log(data)
}
fetchSubjects()
