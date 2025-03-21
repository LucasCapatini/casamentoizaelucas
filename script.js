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
    fetch('https://script.google.com/macros/s/AKfycbx-299NsPrdftAp4wFyQCnfptLN2XhRNBw6ipHuvghZxjDrglgGf2ye6lhfQhP8BgtaZQ/exec', {
      method: 'POST',
      body: photoBlob, // Envia o blob diretamente
      headers: {
        'Content-Type': 'image/png', // Define o tipo de conteúdo
      },
    })
      .then((response) => response.text())
      .then((result) => {
        statusText.textContent = result;
      })
      .catch((error) => {
        statusText.textContent = 'Erro ao enviar: ' + error.message;
      });
  });