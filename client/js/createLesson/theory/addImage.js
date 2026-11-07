export function addImage(parent) {
  const check_btn_save = document.querySelector(".save-btn")

  if (check_btn_save == null) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.addEventListener('change', (event) => {
      const image = showPreview(event);
      parent.appendChild(image);
      input.remove();
      // Удалить input
    });

    parent.appendChild(input);
    return
  }
  alert("Заполните предыдущее поле")
};

function showPreview(event) {
  const file = event.target.files[0];

  const src = URL.createObjectURL(file);

  const image = document.createElement('img');

  image.src = src;

  return image;
};