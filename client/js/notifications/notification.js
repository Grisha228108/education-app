function createNotification(type, text) {
    const notification = document.createElement("div")
    notification.className = "notification"
    notification.textContent = text

    switch (type) {
        case "warning":
            notification.classList.add("notification_warning")
            break
        case "success":
            notification.classList.add("notification_success")
            break
        case "error":
            notification.classList.add("notification_error")
            break
    }
    return notification
}

function showNotification(type, text) {
    let notification = document.querySelector(".notification")

    
    if (!notification) {
        let notification = createNotification(type, text);
        
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add("test-animation");
        }, 10);
        console.log(notification.style.position)
        
        console.log(notification)
        // 4. Через 4 секунды убираем его
        setTimeout(() => {
            // Убираем класс, чтобы он уехал обратно
            notification.classList.remove("test-animation");
            
            // Ждем 0.6 секунд (пока он уедет) и удаляем из HTML
            setTimeout(() => {
                notification.remove();
            }, 600);
        }, 4000);
    }
}


export default showNotification