async function fetchLessonForId(pageId) {
    const res = await fetch(`/fetchLessonForId?id=${pageId}`, { method: 'GET' })

    const [ lesson ] = await res.json()

    console.log(lesson)
    return lesson.title
}
export {fetchLessonForId}