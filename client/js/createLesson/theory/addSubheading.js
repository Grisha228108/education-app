import { resize } from './resize.js';

function addSubheading(preview) {
    const wrapper = document.createElement('div');
    const btn = document.createElement('button');

    btn.textContent = 'Сохранить';

    // При нажатии на кнопку сохранить, удаляется поле ввода и кнопка, на их месте появляется заголовок
    btn.addEventListener('click', () => {
      if (headLine.value.length !== 0) {
        const heading = document.createElement('h2');
        heading.textContent = headLine.value;
        headLine.remove();
        btn.remove();
        wrapper.appendChild(heading);
        return;
      };

      alert('Введите текст заголовка!');
    });

    const headLine = document.createElement("textarea")
    headLine.className = "subheading subheading_create"
    headLine.placeholder = "Введите заголовок"
    headLine.style.width = preview.offsetWidth-150 + "px"
    headLine.addEventListener("input", () => resize(headLine))

    wrapper.appendChild(headLine);
    wrapper.appendChild(btn);

    preview.appendChild(wrapper);
}

export { addSubheading };