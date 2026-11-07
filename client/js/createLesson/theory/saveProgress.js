export function createSaveLogo(element, tag, preview) {
    const wrapper = document.createElement('div');
    const btn = document.createElement('button');

    btn.textContent = 'Сохранить';
    btn.className = "save-btn"

    // При нажатии на кнопку сохранить, удаляется поле ввода и кнопка, на их месте появляется заголовок
    btn.addEventListener('click', () => {
      if (element.value.length != 0) {
        const heading = document.createElement(tag);
        heading.textContent = element.value;
        heading.className = element.className
        element.remove();
        btn.remove();
        wrapper.appendChild(heading);
        return;
      };

      alert('Введите текст!');
    });

    wrapper.appendChild(element);
    wrapper.appendChild(btn);

    preview.appendChild(wrapper);
}