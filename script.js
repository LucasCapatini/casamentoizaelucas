const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const previewDiv = document.getElementById('preview');
const uploadButton = document.getElementById('upload');
const statusText = document.getElementById('status');

let photoBlob = null;

// Acessar a webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((error) => {
    statusText.textContent = 'Erro ao acessar a webcam: ' + error.message;
  });

// Capturar foto
captureButton.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  // Exibir a foto capturada
  const photoUrl = canvas.toDataURL('image/png');
  previewDiv.innerHTML = `<img src="${photoUrl}" alt="Foto Capturada">`;
  uploadButton.style.display = 'block';

  // Converter a foto para Blob
  canvas.toBlob((blob) => {
    photoBlob = blob;
  }, 'image/png');
});

// Enviar foto para o Google Drive
uploadButton.addEventListener('click', () => {
    if (!photoBlob) {
      statusText.textContent = 'Nenhuma foto capturada.';
      return;
    }
  
    statusText.textContent = 'Enviando...';
  
    // Enviar o blob diretamente
    fetch('https://script.google.com/macros/s/AKfycbx5DxC9oPFZcdXZnZXbqLClh7b_QcyF0TstIjbh-kdw/dev', {
        method: 'POST',
        body: photoBlob,
        headers: {
          'Content-Type': 'image/png',
        },
        mode: 'no-cors', // Desativa o CORS
      })
        .then(() => {
          statusText.textContent = 'Foto enviada com sucesso!';
        })
        .catch((error) => {
          statusText.textContent = 'Erro ao enviar: ' + error.message;
        });
  });