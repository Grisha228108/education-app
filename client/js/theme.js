function checkTheme() {
    const url = window.location.search
    const theme = new URLSearchParams(url).get("theme")

    const button = document.createElement("a")
    if (theme === "light") {
        addLightStyles()
        const urlSplit = url.split("&")
        const urlFilter = urlSplit.filter((str) => {
            if (str !== "theme=light") {
                return str
            }
        })
        button.href = urlFilter.join("&")
        button.textContent = "Переключить на тёмную тему"
    } else {
        button.href = url+"&theme=light"
        button.textContent = "Переключить на светлую тему"
    }

    document.body.appendChild(button)
}


function addLightStyles() {
    const titles = document.querySelectorAll("h2, p, img, ul, li, h1")
    document.body.classList.add("light-body")
    titles.forEach((element) => {
        switch (element.tagName) {
            case "H1":
                element.classList.add("light-h1")
                break
            case "H2":
                element.classList.add("light-h2")
                break
            case "IMG":
                element.classList.add("light-image")
                break
            case "P":
                element.classList.add("light-p")
                break
        }
    })
}


export {checkTheme}