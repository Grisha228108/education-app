export function resize(object) {
    object.style.height = "1.93em"
    const newHeight = object.scrollHeight ;
    object.style.height = newHeight + "px"
};