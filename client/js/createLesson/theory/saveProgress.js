export function createSaveLogo(element, tag, preview) {
    const wrapper = document.createElement('div');
    wrapper.className = 'save-progress-wrapper';
    
    const btn = document.createElement('button');
    btn.type = 'button';

    btn.textContent = 'Сохранить';
    btn.className = "save-btn"

    // При нажатии на кнопку сохранить, удаляется поле ввода и кнопка, на их месте появляется заголовок
    btn.addEventListener('click', () => {
      if (tag == "ul") {
        for (let i = 0; i < element.children.length; i++) {
          element.children[i].innerHTML = element.children[i].children[0].value
        }

        btn.remove();
        return;
      }

      if (element.value.length != 0) {
        const newEl = document.createElement(tag);
        newEl.textContent = element.value;
        newEl.className = element.className
        element.remove();
        btn.remove();
        wrapper.appendChild(newEl);
        return;
      };

      alert('Введите текст!');
    });

    wrapper.appendChild(element);
    wrapper.appendChild(btn);

    preview.appendChild(wrapper);
}