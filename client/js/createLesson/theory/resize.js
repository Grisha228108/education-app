export function resize(object) {
    object.style.height = "2em"
    const newHeight = object.scrollHeight ;
    object.style.height = newHeight + "px"
};