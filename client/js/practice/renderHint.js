function renderHint(button, text, taskCard, buttonsDiv) {
    button.remove()
    const textHint = document.createElement("p")
    textHint.textContent = text
    const hintDiv = document.createElement("div")
    hintDiv.className = "hint"
    hintDiv.appendChild(textHint)
    taskCard.insertBefore(hintDiv, buttonsDiv)

}

export default renderHint