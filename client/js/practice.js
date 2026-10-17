import { fetchLessonForId } from "./generalFunction.js"
import renderHint from "./practice/renderHint.js"
import { fetchTasks, fetchAnswers } from "./practice/fetchFunctions.js"
import showNotification from "./notifications/notification.js"

const title = document.querySelector(".practice-title")
const taskLevel = document.querySelector(".task-level")
const taskQuestion = document.querySelector(".task-question")
const answersDiv = document.querySelector(".answers")
const buttonsDiv = document.querySelector(".buttons")
const taskCard = document.querySelector(".task-card")
const currentQuestionNumber = document.querySelector(".task-number")
const sidebarQuestionNumber = document.querySelector(".progress-text")
const questionCounter = document.querySelector(".page-counter")
const bottomNav = document.querySelector(".bottom-nav")
const progressFill = document.querySelector(".progress-fill")

const nextQuestion = document.getElementById("next-question")
const prevQuestion = document.getElementById("prev-question")

let taskId;
let currentQuestionIndex = 0
let isLineQuestion = true

const url = window.location.search
const urlParams = new URLSearchParams(url)
const pageId = urlParams.get("id")

title.textContent = await fetchLessonForId(pageId)
const tasks = await fetchTasks(pageId)
const savedResponses = Array(tasks.length) // список с данными о решённых задачах пока все задания на 0 из 1
const savedId = Array(tasks.length) // список для сохранения туда index текущего отмеченого ответа

renderInfo(tasks, currentQuestionIndex)

function renderInfo(resData, questionIndex) {
    progressFill.style.width = `${currentQuestionIndex/resData.length*100}%`
    const afterButton = document.querySelector(".hint-btn")
    const hint = document.querySelector(".hint")
    if (afterButton) {
        afterButton.remove()
    }
    if (hint) {
        hint.remove()
    }

    const questionAmount = `${resData[questionIndex].order_number}/${resData.length}`

    taskQuestion.textContent = resData[questionIndex].question
    taskLevel.textContent = resData[questionIndex].difficulty
    currentQuestionNumber.textContent = `Задание ` + questionAmount
    sidebarQuestionNumber.textContent = `${resData[questionIndex].order_number-1}/${resData.length} заданий`
    questionCounter.textContent = questionAmount
    taskId = resData[questionIndex].id

    if (resData[questionIndex].hint) {
        const button = document.createElement("button")
        button.className = "btn hint-btn"
        button.textContent = "Подсказка"
        buttonsDiv.appendChild(button)

        button.addEventListener("click", () => renderHint(button, resData[questionIndex].hint, taskCard, buttonsDiv))
    }
}

let answersList = await fetchAnswers(taskId)

renderAnswers(answersList)

function renderAnswers(resData) {
    answersDiv.replaceChildren()

    resData.forEach((element, index) => {
        const div = document.createElement("div")
        div.className = "answer-info"
        const input = document.createElement("input")
        input.type = "radio"
        input.name = "button"
        input.id = index

        if (input.id == savedId[currentQuestionIndex]) {
            input.checked = true
        }

        div.addEventListener("click", function() {
            input.checked = true
        })

        const span = document.createElement("span")
        span.className = "answer-text"
        span.textContent = element.answer_text
        div.appendChild(input)
        div.appendChild(span)
        answersDiv.appendChild(div)
        
    });
}

nextQuestion.addEventListener("click", () => renderAll(true, tasks))
prevQuestion.addEventListener("click", () => renderAll(false, tasks))
prevQuestion.remove()
let completionBtn // завершение 

async function renderAll(next, resData) {
    let onButton = answersDiv.querySelector("input:checked")
    
    if (onButton || !next) {

        if (next) {
            savedResponses[currentQuestionIndex] = parseInt(answersList[onButton.id].is_correct)
            savedId[currentQuestionIndex] = onButton.id
            console.log(savedResponses)
            currentQuestionIndex++
        } else {
            currentQuestionIndex--
        }
        renderInfo(tasks, currentQuestionIndex)
        answersList = await fetchAnswers(taskId)
        renderAnswers(answersList)
        

        if (currentQuestionIndex+1 == resData.length || currentQuestionIndex == 0) {
            if (next) {
                nextQuestion.remove()

                completionBtn = document.createElement("button")
                completionBtn.textContent = "Завершить тест"
                completionBtn.className = "btn"
                completionBtn.addEventListener("click", showResults)
                bottomNav.appendChild(completionBtn)
            } else {
                prevQuestion.remove()
            }
            
            isLineQuestion = true
            
        } else {
            if (isLineQuestion) {
                isLineQuestion = false
                if (next) {
                    bottomNav.insertBefore(prevQuestion, bottomNav.firstElementChild)
                } else {
                    bottomNav.appendChild(nextQuestion)
                    if (completionBtn) {
                        completionBtn.remove()
                    }
                }
                
            }
        }
    } else {
        showNotification("warning", "Пожалуйста выберите один из вариантов ответа")
    }
}


function showResults() {
    let onButton = answersDiv.querySelector("input:checked")
    if (onButton) {
        savedResponses[currentQuestionIndex] = parseInt(answersList[onButton.id].is_correct)
        progressFill.style.width = "100%"
        bottomNav.remove()
        taskQuestion.textContent = "Результаты теста"
        answersDiv.remove()
        buttonsDiv.remove()
        console.log(savedResponses)
        sidebarQuestionNumber.textContent = "Выполнено!"
        const finalScore = savedResponses.reduce((a, b) => a + b)
        console.log(finalScore)

        const answersDescr = document.createElement('p')
        answersDescr.className = "descr descr_big"
        answersDescr.textContent = `Правильных ответов: ${finalScore}/${tasks.length}`
        taskCard.appendChild(answersDescr)
        const correctPercent = Math.round(finalScore / tasks.length * 100)
        const correctPercentBlock = document.createElement("div")
        correctPercentBlock.className = "descr percent_block"
        const percentText = document.createElement("p")
        percentText.textContent = "Процент правильных ответов:  "
        correctPercentBlock.appendChild(percentText)
        let correctColor
        if (correctPercent >= 75) {
            correctColor = "green"
        } else if (correctPercent >= 50) {
            correctColor = "orange"
        } else {
            correctColor = "red"
        }
        const numberPart = document.createElement("span")
        numberPart.textContent = correctPercent + "%" // Добавили значок процента
        numberPart.className = correctColor
        correctPercentBlock.appendChild(numberPart)
        taskCard.appendChild(correctPercentBlock)
        renderTestReview()
    }  else {
        showNotification("warning", "Пожалуйста выберите один из вариантов ответа")
    }
}


function renderTestReview() {
    // 1. Заголовок
    const titleReview = document.createElement('h3')
    titleReview.textContent = "Разбор ответов:"
    titleReview.style.marginTop = "30px"
    titleReview.style.color = "#4dc9f6"
    taskCard.appendChild(titleReview)

    // 2. Контейнер для списка
    const reviewContainer = document.createElement('div')
    reviewContainer.className = "review-list"
    taskCard.appendChild(reviewContainer)

    // 3. Проходим циклом по всем вопросам
    tasks.forEach((task, index) => {
        // Создаем строку
        const row = document.createElement('div')
        row.className = "review-item"
        
        // Проверяем, правильный ли ответ
        const isCorrect = savedResponses[index] === 1
        const statusText = isCorrect ? "Верно" : "Неверно"
        const statusIcon = isCorrect ? "✅" : "❌"

        // Создаем ЛЕВУЮ часть (Номер + Текст вопроса)
        const leftPart = document.createElement('div')
        leftPart.className = "review-question"

        const numberSpan = document.createElement('span')
        numberSpan.className = "review-number"
        numberSpan.textContent = `${index + 1}.`

        const textSpan = document.createElement('span')
        textSpan.className = "review-text"
        textSpan.textContent = task.question

        leftPart.appendChild(numberSpan)
        leftPart.appendChild(textSpan)

        // Создаем ПРАВУЮ часть (Иконка + Статус)
        const rightPart = document.createElement('div')
        rightPart.className = "review-status"
        if (isCorrect) {
            rightPart.classList.add("status-correct")
        } else {
            rightPart.classList.add("status-wrong")
        }
        
        // Просто добавляем иконку и текст через textContent (так проще всего)
        rightPart.textContent = `${statusIcon} ${statusText}`

        // Собираем строку вместе
        row.appendChild(leftPart)
        row.appendChild(rightPart)
        
        // Добавляем в общий контейнер
        reviewContainer.appendChild(row)
    });
}
