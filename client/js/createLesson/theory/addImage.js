export function addImage(parent) {
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
};

function showPreview(event) {
  const file = event.target.files[0];

  const src = URL.createObjectURL(file);

  const image = document.createElement('img');

  image.src = src;

  return image;
};