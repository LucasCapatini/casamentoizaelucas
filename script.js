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
    fetch('https://script.google.com/macros/s/AKfycbwHqSbvlgDkG4H4e4TFuRb8PMgXxkfeO74Q7xFrFua9t0cpA28lWi6Dsbo6xSsGELa3Ew/exec', {
        redirect: "follow",
        method: 'POST',
        body: photoBlob,
        headers: {
          'Content-Type': 'image/png',
          'Access-Control-Allow-Origin': 'https://lucascapatini.github.io/casamentoizaelucas/'
        },
        mode: 'no-cors',
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            statusText.textContent = result.success;
          } else if (result.error) {
            statusText.textContent = result.error;
          }
        })
        .catch((error) => {
          statusText.textContent = 'Erro ao enviar: ' + error.message;
        });
  });