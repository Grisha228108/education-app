async function fetchTasks(pageId) {
    const res = await fetch(`/fetchPracticeTasks/${pageId}`, {
        method: "GET"
    })

    const resData = await res.json()
    return resData
}

async function fetchAnswers(taskId) {
    const res = await fetch(`/fetchPracticeAnswers?taskId=${taskId}`, {
        method: "GET"
    })

    const resData = await res.json()
    return resData
}

export { fetchTasks, fetchAnswers }